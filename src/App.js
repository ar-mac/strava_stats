import React, { Component } from 'react';
import { groupBy, reduce, sum, max } from 'lodash';
import moment from 'moment';
import './App.css';
import ActivityCard from "./components/ActivityCard";
import getActivities from "./api/getActivities";

class App extends Component {
  state = {
    activities: [],
    summedMonthData: {},
  };

  componentDidMount() {
    getActivities().then((activities) => {
      const activitiesPerMonth = groupBy(activities, (activity) => {
        return moment(activity.startDate).format('MMM');
      });
      const summedMonthData = reduce(activitiesPerMonth, (result, activities, monthNumber) => {
        return {
          ...result,
          [monthNumber]: {
            distance: sum(activities.map((activity) => activity.distance)),
            totalElevationGain: sum(activities.map((activity) => activity.totalElevationGain)),
            maxSpeed: max(activities.map((activity) => activity.maxSpeed)),
            movingTime: sum(activities.map((activity) => activity.movingTime)) / 60,
            kudosCount: sum(activities.map((activity) => activity.kudosCount)),
            averageSpeed: sum(activities.map((activity) => activity.averageSpeed)) / activities.length,
          },
        }
      }, {});
      this.setState({ activities, summedMonthData });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Your strava activities
        </header>

        <pre>{JSON.stringify(this.state.summedMonthData)}</pre>
        {/*TODO: Aggregate activities per month and display total data*/}
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
