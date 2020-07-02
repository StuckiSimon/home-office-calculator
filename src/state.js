import { atom } from 'recoil';

export const employeeCountState = atom({
  key: 'employeeCountState',
  default: 10,
});

export const homeOfficeDaysState = atom({
  key: 'homeOfficeDaysState',
  default: 2,
});

export const locationState = atom({
  key: 'locationState',
  default: 'PLZ8000',
});

export const employeeAreaState = atom({
  key: 'employeeAreaState',
  default: 10,
});
