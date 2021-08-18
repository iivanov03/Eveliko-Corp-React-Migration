import React from 'react';
import * as dateFns from 'date-fns';

class Week extends React.Component {
  state = {
    currentWeek: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "EEEE MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentWeek, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <div className="icon">
            chevron_right
          </div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "iiii";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentWeek, {weekStartsOn: 1});

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentWeek, selectedDate } = this.state;
    const weekStart = dateFns.startOfWeek(currentWeek, {weekStartsOn: 1});
    const weekEnd = dateFns.endOfWeek(weekStart, {weekStartsOn: 1});
    //const startDate = dateFns.startOfWeek(monthStart);
    //const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
 
    let days = [];
    let day = weekStart;
    let formattedDate = "";

    while (day <= weekEnd) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, weekStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.toDate(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextWeek = () => {
    this.setState({
      currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
    });
  };

  prevWeek = () => {
    this.setState({
      currentWeek: dateFns.subWeeks(this.state.currentWeek, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Week;