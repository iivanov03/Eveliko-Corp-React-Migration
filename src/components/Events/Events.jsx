import React from 'react';
//import * as dateFns from 'date-fns';
import moment from 'moment';
import postData from '../../data/eventPosts.json'
class Events extends React.Component {
    constructor() {
        super();
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

        //let event1 = {
        //    name: "Someone",
        //    title: "Sick Leave",
        //    position: "BeckEndDev",
        //    date: moment(),
        //    dynamic: false,
        //    imageUrl: "https:\/\/www.eveliko.com\/images\/default-source\/People\/beni.png?sfvrsn=0"
        //};

        //let event2 = {
        //    title: "Event 2",
        //    date: moment().startOf("day").subtract(2, "d"),
        //    dynamic: false
        //};

        //allEvents.push(event1);
        //allEvents.push(event2);
        allEvents.push(postData['hits']['hits'])

        for (var i = 0; i < allEvents.length; i++) {
            monthEvents.push(allEvents[i]);
        }

        this.setState({
            selectedMonthEvents: monthEvents
        });
    }

    render() {
        const currentSelectedMonth = moment(this.state.currentMonth).format().slice(0, 10);
        const monthEvents = this.state.selectedMonthEvents;
        const monthEventsRendered = monthEvents.map((event, i) => {
            console.log(event[0]['_source']['estimate_title'])
            return (
                <div
                    key={event[0]['_source']['estimate_title']}
                    className="event-container"
                >
                    <img alt="image" />   
                    <div className="event-title event-attribute">{event[0]['_source']['estimate_title']}</div>
                    <div className="event-time event-attribute">
                        {event[0]['_source']['Time']}
                    </div>
                    <h3>{event[0]['_source']['Owner']}</h3>
                    <tr>
                        <td><strong>Position:</strong></td>
                        <td></td>
                    </tr>
                    
                </div>
            );
        });

        const dayEventsRendered = [];
        
        for (var i = 0; i < monthEventsRendered.length; i++) {
            const monthDateEvent = monthEvents[i][0]['_source']['Time'].slice(0, 10)
            console.log(monthEventsRendered.length)
            //console.log(monthDateEvent)
            //console.log(currentSelectedMonth)
            if (moment(monthDateEvent).isSame(currentSelectedMonth, 'day')) {
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