import React, { Component } from 'react';
import './App.css';
import ActivityCard from "./components/ActivityCard";
import getActivities from "./helpers/getActivities";
import calculateMonthlyData from "./helpers/calculateMonthlyData";
import MonthTotalsCard from "./components/MonthTotalsCard";

class App extends Component {
  state = {
    activities: [],
    summedMonthData: [],
  };

  componentDidMount() {
    getActivities().then((activities) => {
      this.setState({ activities, summedMonthData: calculateMonthlyData(activities) });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Your strava activities
        </header>

        <div className="activities__container">
          {this.state.summedMonthData.map((monthData) => (
            <MonthTotalsCard monthData={monthData} key={monthData.month} />
          ))}
        </div>
        <div className="activities__container">
          {this.state.activities && this.state.activities.map((activity) => (
            <ActivityCard activity={activity} key={activity.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
