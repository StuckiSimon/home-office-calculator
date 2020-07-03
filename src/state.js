import { atom } from 'recoil';
import parkingPrices from './reference/parkingPrices.json';
import officeSpaceRentPrices from './reference/officeSpaceRentPrices.json';
import { DAILY_COMMUTE_TIME_MINUTES } from './constants';

const INITIAL_INDEX = '';

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
  default: '',
});

export const locationSqmPriceState = atom({
  key: 'locationSqmPriceState',
  default: officeSpaceRentPrices[INITIAL_INDEX],
});

export const locationParkingPriceState = atom({
  key: 'locationParkingPriceState',
  default: parkingPrices[INITIAL_INDEX],
});

export const employeeAreaState = atom({
  key: 'employeeAreaState',
  default: 10,
});

export const officeEnergyStandardState = atom({
  key: 'officeEnergyStandardState',
  default: 'san',
});

export const officeHeatingSourceState = atom({
  key: 'officeHeatingSourceState',
  default: 'oil',
});

// Must be referenced by index constants
export const commuteMixState = atom({
  key: 'commuteMixState',
  default: [0.52, 0.17, 0.14, 0.07, 0.09],
});

export const commuteTimeState = atom({
  key: 'commuteTimeState',
  default: DAILY_COMMUTE_TIME_MINUTES,
});
