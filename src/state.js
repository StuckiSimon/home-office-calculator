import { atom } from 'recoil';

export const employeeCountState = atom({
  key: 'employeeCountState',
  default: 0,
});

export const homeOfficeDaysState = atom({
  key: 'homeOfficeDaysState',
  default: 0,
});