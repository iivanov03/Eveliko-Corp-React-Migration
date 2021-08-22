import React from 'react';
import moment from 'moment';
class WeekCal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedWeek: moment().startOf('week'),
            selectedDay: moment().startOf('day'),
            selectedWeekEvents: [],
            showEvents: false
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.goToCurrentWeekView = this.goToCurrentWeekView.bind(this);

        this.initialiseEvents();
    }

    previous() {
        const currentWeekView = this.state.selectedWeek;

        this.setState({
            selectedWeek: currentWeekView.subtract(1, "week")
        });
    }

    next() {
        const currentWeekView = this.state.selectedWeek;
        this.setState({
            selectedWeek: currentWeekView.add(1, "week")
        });
    }

    select(day) {
        this.setState({
            selectedWeek: day.date,
            selectedDay: day.date.clone(),
            showEvents: true
        });
    }

    goToCurrentWeekView() {
        this.setState({
            selectedWeek: moment()
        });
    }

    showCalendar() {
        this.setState({
            selectedWeek: this.state.selectedWeek,
            selectedDay: this.state.selectedDay,
            showEvents: false
        });
    }

    renderWeekLabel() {
        const currentWeekView = this.state.selectedWeek;
        return (
            <span className="box month-label">
                {currentWeekView.format("MMMM YYYY")}
            </span>
        );
    }

    renderDayLabel() {
        const currentSelectedDay = this.state.selectedDay;
        return (
            <span className="box month-label">
                {currentSelectedDay.format("DD MMMM YYYY")}
            </span>
        );
    }

    renderTodayLabel() {
        return (
            <span className="box today-label" onClick={this.goToCurrentWeekView}>
                Today
            </span>
        );
    }

    renderWeeks() {
        const currentWeekView = this.state.selectedWeek;

        let weeks = [];
        let previousCurrentNextView = currentWeekView
            .clone()
            .startOf("week")
            .subtract(1, "d")
            .day("Monday");

        weeks.push(<Week
            previousCurrentNextView={previousCurrentNextView.clone()}
            currentWeekView={this.state.selectedWeek}
            weekEvents={this.state.selectedWeekEvents}
            selected={this.state.selectedDay}
            select={day => this.select(day)}
        />)

        return weeks;
    }

    initialiseEvents() {
        const weekEvents = this.state.selectedWeekEvents;

        let allEvents = [];

        let event = {
            name: "Someone",
            title: "Sick Leave",
            position: "BeckEndDev",
            date: moment(),
            imageUrl: "https:\/\/www.eveliko.com\/images\/default-source\/People\/beni.png?sfvrsn=0"
        };

        allEvents.push(event);

        for (let i = 0; i < allEvents.length; i++) {
            weekEvents.push(allEvents[i]);
        }

        this.setState({
            selectedWeekEvents: weekEvents
        });
    }

    render() {
        const showEvents = this.state.showEvents;

        if (showEvents) {
            return (
                <section className="main-calendar">
                    <header className="calendar-header">
                        <div className="row title-header">
                            {this.renderDayLabel()}
                        </div>
                        <div className="row button-container">
                            <div className="icon" onClick={this.showCalendar}>
                                chevron_left
                            </div>
                        </div>
                    </header>
                    <Events
                        selectedWeek={this.state.selectedWeek}
                        selectedDay={this.state.selectedDay}
                        selectedWeekEvents={this.state.selectedWeekEvents}
                    />
                </section>
            );
        } else {
            return (
                <section className="main-calendar">
                    <header className="calendar-header">
                        <div className="row title-header">
                            <div className="icon" onClick={this.previous}>
                                chevron_left
                            </div>
                            <div className="box header-text">
                                {this.renderTodayLabel()}
                                {this.renderWeekLabel()}
                            </div>
                            <div className="icon" onClick={this.next}>
                                chevron_right
                            </div>
                        </div>
                        <DayNames />
                    </header>
                    <div className="days-container">
                        {this.renderWeeks()}
                    </div>
                </section>
            );
        }
    }
}

class Events extends React.Component {
    render() {
        const currentSelectedDay = this.props.selectedDay;
        const weekEvents = this.props.selectedWeekEvents;

        const weekEventsRendered = weekEvents.map((event, i) => {
            return (
                <div
                    key={event.title}
                    className="event-container"
                >
                    <div className="card">
                        <img src={event.imageUrl} alt="image" />
                        <div className="person-name">
                            <p>{event.name}</p>
                        </div>
                        <div className="leave-reason">
                            <p>
                                {event.title}
                            </p>
                        </div>
                    </div>
                </div>
            );
        });

        const dayEventsRendered = [];

        for (let i = 0; i < weekEventsRendered.length; i++) {
            if (weekEvents[i].date.isSame(currentSelectedDay, "day")) {
                dayEventsRendered.push(weekEventsRendered[i]);
            }
        }

        return (
            <div className="day-events">
                {dayEventsRendered}
            </div>
        );
    }
}

class DayNames extends React.Component {
    render() {
        return (
            <div className="row days-header">
                <span className="box day-name">Mon</span>
                <span className="box day-name">Tue</span>
                <span className="box day-name">Wed</span>
                <span className="box day-name">Thu</span>
                <span className="box day-name">Fri</span>
                <span className="box day-name">Sat</span>
                <span className="box day-name">Sun</span>
            </div>
        );
    }
}

class Week extends React.Component {
    render() {
        let days = [];
        let date = this.props.previousCurrentNextView;
        let currentWeekView = this.props.currentWeekView;
        let selected = this.props.selected;
        let select = this.props.select;
        let weekEvents = this.props.weekEvents;

        for (let i = 0; i < 7; i++) {
            let dayHasEvents = false;

            for (let j = 0; j < weekEvents.length; j++) {
                if (weekEvents[j].date.isSame(date, "day")) {
                    dayHasEvents = true;
                }
            }

            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentWeek: date.month() === currentWeekView.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                hasEvents: dayHasEvents
            };

            days.push(<Day day={day} selected={selected} select={select} />);
            date = date.clone();
            date.add(1, "d");
        }
        return (
            <div className="row week">
                {days}
            </div>
        );
    }
}

class Day extends React.Component {
    render() {
        let day = this.props.day;
        let selected = this.props.selected;
        let select = this.props.select;

        return (
            <div
                className={
                    "day" +
                    (day.isToday ? " today" : "") +
                    (day.isCurrentWeek ? "" : " different-month") +
                    (day.date.isSame(selected) ? " selected" : "") +
                    (day.hasEvents ? " has-events" : "")
                }
                onClick={() => select(day)}
            >
                <div className="day-number">{day.number}</div>
            </div>
        );
    }
}

export default WeekCal;
