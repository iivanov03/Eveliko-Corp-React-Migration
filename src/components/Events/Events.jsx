import React from 'react';
//import * as dateFns from 'date-fns';
import moment from 'moment';

class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            selectedMonthEvents: []
        }
        this.initialiseEvents()
    }


    initialiseEvents() {
        let monthEvents = this.state.selectedMonthEvents;

        let allEvents = [];

        let testevent1 = {
            name: "Someone",
            title: "Sick Leave",
            position: "BeckEndDev",
            date: moment(),
            dynamic: false,
            imageUrl: "https:\/\/www.eveliko.com\/images\/default-source\/People\/beni.png?sfvrsn=0"
        };

        let testevent2 = {
            title: "Event 2",
            date: moment().startOf("day").subtract(2, "d"),
            dynamic: false
        };

        allEvents.push(testevent1);
        allEvents.push(testevent2);

        for (var i = 0; i < allEvents.length; i++) {
            monthEvents.push(allEvents[i]);
        }
        console.log(monthEvents);

        this.setState({
            selectedMonthEvents: monthEvents
        });
        console.log(this.state.selectedMonthEvents)
    }

    render() {
        const currentSelectedMonth = this.state.currentMonth;
        const monthEvents = this.state.selectedMonthEvents;

        const monthEventsRendered = monthEvents.map((event, i) => {
            return (
                <div
                    key={event.title}
                    className="event-container"
                >
                    <img src={event.imageUrl} alt="image" />   
                    <div className="event-title event-attribute">{event.title}</div>
                    <div className="event-time event-attribute">
                        {event.date.format("MMMM Do")}
                    </div>
                    <h3>{event.name}</h3>
                    <tr>
                        <td><strong>Position:</strong></td>
                        <td>{event.position}</td>
                    </tr>
                    
                </div>
            );
        });

        const dayEventsRendered = [];

        for (var i = 0; i < monthEventsRendered.length; i++) {
            if (monthEvents[i].date.isSame(currentSelectedMonth, "month")) {
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



export default Events