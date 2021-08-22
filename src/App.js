import React from "react";

import "./App.scss";

import MonthCal from './components/Month'
import WeekCal from "./components/Week";

class App extends React.Component {

  state = {
    currentView: 1,
    nextView: 2
  }

  setCurrentView(viewNumber) {
    this.setState({ currentView: viewNumber, nextView: viewNumber });
  }


  render() {
    return (
      <div className="calendar-content">
            <button
              className="button-month"
              onClick={() => this.setCurrentView(1)}
            >Month</button>
            <button
              className="button-week"
              onClick={() => this.setCurrentView(2)}
            >Week</button>

            {
              this.state.currentView === 1
                ? <MonthCal />
                : <WeekCal />
            } 
      </div>
    );
  }
}

export default App;