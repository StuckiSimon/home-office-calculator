import { atom } from 'recoil';
import parkingPrices from './reference/parkingPrices.json';
import officeSpaceRentPrices from './reference/officeSpaceRentPrices.json';

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
