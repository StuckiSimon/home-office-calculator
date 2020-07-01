import { selector } from 'recoil';
import { employeeCountState, homeOfficeDaysState } from './state';

const WORK_DAYS = 5;

const getAreaForEmployees = (employees) => {
  return 6 + employees * 6;
};

const optimalWorkplaceCountState = selector({
  key: 'optimalWorkplaceCountState',
  get: ({ get }) => {
    const employees = get(employeeCountState);
    const homeOfficeDays = get(homeOfficeDaysState);

    return Math.ceil(((WORK_DAYS - homeOfficeDays) / WORK_DAYS) * employees);
  },
});

const getWorkplaceStatsFor = (workplaceCount) => ({
  workplaces: workplaceCount,
  area: getAreaForEmployees(workplaceCount),
});

export const workSpaceState = selector({
  key: 'workSpaceState',
  get: ({ get }) => {
    const normalWorkplaceCount = get(employeeCountState);
    const optimalWorkplaceCount = get(optimalWorkplaceCountState);

    const normalWorkplaceStats = getWorkplaceStatsFor(normalWorkplaceCount);
    const optimalWorkplaceStats = getWorkplaceStatsFor(optimalWorkplaceCount);

    return {
      normal: normalWorkplaceStats,
      optimal: optimalWorkplaceStats,
      diff: {
        workplaces:
          normalWorkplaceStats.workplaces - optimalWorkplaceStats.workplaces,
        area: normalWorkplaceStats.area - optimalWorkplaceStats.area,
      },
    };
  },
});
