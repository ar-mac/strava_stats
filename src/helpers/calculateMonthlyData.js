import { groupBy, max, reduce, sum } from "lodash";
import moment from "moment";

export default function calculateMonthlyData(activities) {
  const activitiesPerMonth = groupBy(
    activities,
    (activity) => moment(activity.startDate).format('MMM')
  );
  return reduce(activitiesPerMonth, (result, activities, monthNumber) => {
    return [
      ...result,
      {
        month: monthNumber,
        distance: sum(activities.map((activity) => activity.distance)),
        totalElevationGain: sum(activities.map((activity) => activity.totalElevationGain)),
        maxSpeed: max(activities.map((activity) => activity.maxSpeed)),
        movingTime: sum(activities.map((activity) => activity.movingTime)) / 60,
        kudosCount: sum(activities.map((activity) => activity.kudosCount)),
        averageSpeed: sum(activities.map((activity) => activity.averageSpeed)) / activities.length,
      },
    ]
  }, []);
}
