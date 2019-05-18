import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MonthTotalsCard extends Component {
  static propTypes = {
    monthData: PropTypes.object.isRequired,
  };

  render() {
    const { monthData } = this.props;
    return (
      <div className="activities__card">
        <div>month: {monthData.month}</div>
        <div>distance: {(monthData.distance / 1000).toFixed(2)}km</div>
        <div>elevation: {monthData.totalElevationGain}m</div>
        <div>max speed: {monthData.maxSpeed.toFixed(2)}km/h</div>
        <div>average speed: {monthData.averageSpeed.toFixed(2)}km/h</div>
        <div>activity time: {Math.round(monthData.movingTime)}min</div>
        <div>kudosCount: {monthData.kudosCount}</div>
      </div>
    );
  }
}
