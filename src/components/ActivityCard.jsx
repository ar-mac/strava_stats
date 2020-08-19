import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class ActivityCard extends Component {
  static propTypes = {
    activity: PropTypes.object.isRequired,
  };

  render() {
    const { activity } = this.props;
    return (
      <div className="activities__card">
        <div>{activity.name} ({activity.type})</div>
        <div>{moment(activity.startDate).format('D MMM H:m A')}</div>
        <div>distance: {(activity.distance / 1000).toFixed(2)}km</div>
        <div>elevation: {activity.totalElevationGain.toFixed(2)}m</div>
        <div>max speed: {activity.maxSpeed}km/h</div>
        <div>activity time: {Math.round(activity.movingTime / 60)}min</div>
      </div>
    );
  }
}
