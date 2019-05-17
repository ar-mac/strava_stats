import React, {Component}from 'react';
import './App.css';
import ActivityCard from "./components/ActivityCard";

class App extends Component {
  state = {
    activities: [],
  };

  componentDidMount() {
    const activities = JSON.parse(localStorage.getItem('activities'));
    if (activities) {
      this.setState({activities});
    } else {
      this.fetchActivities()
    }
  }

  fetchActivities() {
    fetch("https://www.strava.com/api/v3/athlete/activities?page=1&per_page=40", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer [[TOKEN]]",
      },
    })
      .then(response => {
        response.json().then((data) => {
          const activities = data.map((activity) => ({
            id: activity.id,
            type: activity.type,
            name: activity.name,
            distance: activity.distance,
            startDate: activity.start_date,
            startDateLocal: activity.start_date_local,
            totalElevationGain: activity.total_elevation_gain,
            maxSpeed: activity.max_speed,
            movingTime: activity.moving_time,
            kudosCount: activity.kudos_count,
            averageSpeed: activity.average_speed,
          }));
          localStorage.setItem('activities', JSON.stringify(activities));
          this.setState({activities})
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Your strava activities
        </header>
        <div className="activities__container">
          {this.state.activities && this.state.activities.map((activity) => (
            <ActivityCard activity={activity} key={activity.id}/>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
