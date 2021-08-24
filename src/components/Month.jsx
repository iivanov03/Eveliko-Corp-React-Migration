import React from 'react';
import moment from 'moment';
class MonthCal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMonth: moment(),
            selectedDay: moment().startOf('day'),
            selectedMonthEvents: [],
            showEvents: false
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this);

        this.initialiseEvents();
    }

    previous() {
        const currentMonthView = this.state.selectedMonth;

        this.setState({
            selectedMonth: currentMonthView.subtract(1, "month")
        });
    }

    next() {
        const currentMonthView = this.state.selectedMonth;
        this.setState({
            selectedMonth: currentMonthView.add(1, "month")
        });
    }

    select(day) {
        this.setState({
            selectedMonth: day.date,
            selectedDay: day.date.clone(),
            showEvents:  day.hasEvents === true ? true : false
        });
    }

    goToCurrentMonthView() {
        this.setState({
            selectedMonth: moment()
        });
    }

    showCalendar() {
        this.setState({
            selectedMonth: this.state.selectedMonth,
            selectedDay: this.state.selectedDay,
            showEvents: false
        });
    }

    renderMonthLabel() {
        const currentMonthView = this.state.selectedMonth;
        return (
            <span className="box month-label">
                {currentMonthView.format("MMMM YYYY")}
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
            <span className="box today-label" onClick={this.goToCurrentMonthView}>
                Today
            </span>
        );
    }

    renderWeeks() {
        const currentMonthView = this.state.selectedMonth;
        const currentSelectedDay = this.state.selectedDay;
        const monthEvents = this.state.selectedMonthEvents;

        let weeks = [];
        let done = false;
        let previousCurrentNextView = currentMonthView
            .clone()
            .startOf("month")
            .subtract(1, "d")
            .day("Monday");
        let count = 0;
        let monthIndex = previousCurrentNextView.month();

        while (!done) {
            weeks.push(
                <Week
                    previousCurrentNextView={previousCurrentNextView.clone()}
                    currentMonthView={currentMonthView}
                    monthEvents={monthEvents}
                    selected={currentSelectedDay}
                    select={day => this.select(day)}
                />
            );
            previousCurrentNextView.add(1, "w");
            done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
            monthIndex = previousCurrentNextView.month();
        }
        return weeks;
    }

    initialiseEvents() {
        const monthEvents = this.state.selectedMonthEvents;

        let allEvents = [];

        let event = {
            name: "Pavel Donchev",
            title: "Vacantion",
            position: "BeckEndDev",
            date: moment(),
            imageUrl: "https:\/\/www.eveliko.com\/images\/systemlibrariesprovider\/sys-profile-images\/pavel_avatar_5bb030f4-4ba9-48e3-945c-103560ba1ab5.jpg?sfvrsn=0"
        }

        allEvents.push(event);

        for (let i = 0; i < allEvents.length; i++) {
            monthEvents.push(allEvents[i]);
        }

        this.setState({
            selectedMonthEvents: monthEvents
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
                            <div className="box icon" onClick={this.showCalendar}>
                                chevron_left
                            </div>
                        </div>
                    </header>
                    <Events
                        selectedMonth={this.state.selectedMonth}
                        selectedDay={this.state.selectedDay}
                        selectedMonthEvents={this.state.selectedMonthEvents}
                    />
                </section>
            );
        } else {
            return (
                <section className="main-calendar">
                    <header className="calendar-header">
                        <div className="row title-header">
                            <div className="box icon" onClick={this.previous}>
                                chevron_left
                            </div>
                            <div className="box header-text">
                                {this.renderTodayLabel()}
                                {this.renderMonthLabel()}
                            </div>
                            <div className="box icon" onClick={this.next}>
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
        const monthEvents = this.props.selectedMonthEvents;

        const monthEventsRendered = monthEvents.map((event, i) => {
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

        for (let i = 0; i < monthEventsRendered.length; i++) {
            if (monthEvents[i].date.isSame(currentSelectedDay, "day")) {
                dayEventsRendered.push(monthEventsRendered[i]);
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
        let currentMonthView = this.props.currentMonthView;
        let selected = this.props.selected;
        let select = this.props.select;
        let monthEvents = this.props.monthEvents;

        for (let i = 0; i < 7; i++) {
            let dayHasEvents = false;

            for (let j = 0; j < monthEvents.length; j++) {
                if (monthEvents[j].date.isSame(date, "day")) {
                    dayHasEvents = true;
                } else {
                    dayHasEvents = false;
                }
            }

            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === currentMonthView.month(),
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
                    (day.isCurrentMonth ? "" : " different-month") +
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

export default MonthCal;
