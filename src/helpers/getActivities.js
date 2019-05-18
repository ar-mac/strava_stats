function fetchActivities() {
  return fetch("https://www.strava.com/api/v3/athlete/activities?page=1&per_page=40", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_STRAVA_ACCESS_TOKEN}`,
    },
  }).then(response => {
    return response.json().then((data) => {
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
      return activities;
    });
  });
}

export default function getActivities() {
  const activities = JSON.parse(localStorage.getItem('activities'));
  if (activities) {
    return new Promise((resolve) => resolve(activities));
  } else {
    return fetchActivities();
  }
};
