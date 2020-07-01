import { selector } from 'recoil';
import { employeeCountState, homeOfficeDaysState } from './state';

const getAreaForEmployees = (employees) => {
  return 6 + employees * 6;
};

export const workSpaceState = selector({
  key: 'workSpaceState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const employees = get(employeeCountState);
    const homeOfficeDays = get(homeOfficeDaysState);

    const using = (5 - homeOfficeDays) / 5;
    return {
      areaRequiredPerWeekPerEmployeeWithHomeOffice: getAreaForEmployees(
        employees * using
      ),
      areaRequiredPerWeekPerEmployee: getAreaForEmployees(employees),
    };
  },
});
