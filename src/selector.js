import { selector } from 'recoil';
import { employeeCountState, homeOfficeDaysState } from './state';

export const workSpaceState = selector({
  key: 'workSpaceState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const employees = get(employeeCountState);
    const homeOfficeDays = get(homeOfficeDaysState);

    const using = (5 - homeOfficeDays) / 5;
    const areaPerEmployee = 15;
    const areaRequiredPerWeekPerEmployee = using * areaPerEmployee;
    return {
      areaRequiredPerWeekPerEmployeeWithHomeOffice:
        employees * areaRequiredPerWeekPerEmployee,
      areaRequiredPerWeekPerEmployee: employees * areaPerEmployee,
    };
  },
});
