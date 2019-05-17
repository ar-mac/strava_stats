import React, {Component}from 'react';
import './App.css';
import ActivityCard from "./components/ActivityCard";
import getActivities from "./api/getActivities";

class App extends Component {
  state = {
    activities: [],
  };

  componentDidMount() {
    getActivities().then((activities) => {
      this.setState({ activities });
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
            <ActivityCard activity={activity} key={activity.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
