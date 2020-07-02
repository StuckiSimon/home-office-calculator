import { selector } from 'recoil';
import {
  employeeAreaState,
  employeeCountState,
  homeOfficeDaysState,
} from './state';

const WORK_DAYS = 5;

const getAreaForEmployees = (employees, { get }) => {
  const m2 = get(employeeAreaState);
  return employees * m2;
};

const optimalWorkplaceCountState = selector({
  key: 'optimalWorkplaceCountState',
  get: ({ get }) => {
    const employees = get(employeeCountState);
    const homeOfficeDays = get(homeOfficeDaysState);

    return Math.ceil(((WORK_DAYS - homeOfficeDays) / WORK_DAYS) * employees);
  },
});

const getWorkplaceStatsFor = (workplaceCount, opts) => ({
  workplaces: workplaceCount,
  area: getAreaForEmployees(workplaceCount, opts),
});

export const workSpaceState = selector({
  key: 'workSpaceState',
  get: ({ get }) => {
    const normalWorkplaceCount = get(employeeCountState);
    const optimalWorkplaceCount = get(optimalWorkplaceCountState);

    const normalWorkplaceStats = getWorkplaceStatsFor(normalWorkplaceCount, {
      get,
    });
    const optimalWorkplaceStats = getWorkplaceStatsFor(optimalWorkplaceCount, {
      get,
    });

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
