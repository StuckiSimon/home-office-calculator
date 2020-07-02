import { selector } from 'recoil';
import {
  commuteMixState,
  employeeAreaState,
  employeeCountState,
  homeOfficeDaysState,
  locationParkingPriceState,
  locationSqmPriceState,
  officeEnergyStandardState,
  officeHeatingSourceState,
} from './state';
import {
  COMMUTE_EMISSIONS,
  COMMUTE_MIX_CAR_INDEX,
  DAILY_COMMUTE_DISTANCE_KM,
  DAILY_COMMUTE_TIME_MINUTES,
  DAYS_PER_MONTH,
  HEATING_COST_PER_M2,
} from './constants';
import buildingEnergyStandards from './reference/buildingEnergyStandards.json';
import heatingSources from './reference/heatingSources.json';

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

/**
 * used for obtaining normal, optimal & diff values
 */
const getCalculation = (selector, { get }) => {
  const normalWorkplaceCount = get(employeeCountState);
  const optimalWorkplaceCount = get(optimalWorkplaceCountState);

  const normal = selector(normalWorkplaceCount, { get });
  const optimal = selector(optimalWorkplaceCount, { get });
  const diff = normal - optimal;
  return { normal, optimal, diff };
};

const officeSpace = (places, areaPerEmployee) => places * areaPerEmployee;

export const officeRentSelector = selector({
  key: 'officeRentSelector',
  get: ({ get }) => {
    const areaPerEmployee = get(employeeAreaState);
    const locationSqmPrice = get(locationSqmPriceState);
    return getCalculation(
      (places) => {
        return officeSpace(places, areaPerEmployee) * locationSqmPrice;
      },
      { get }
    );
  },
});

export const officeHeatingPriceSelector = selector({
  key: 'officeHeatingPriceSelector',
  get: ({ get }) => {
    const areaPerEmployee = get(employeeAreaState);
    return getCalculation(
      (places) => {
        return officeSpace(places, areaPerEmployee) * HEATING_COST_PER_M2;
      },
      { get }
    );
  },
});

export const parkingPriceSelector = selector({
  key: 'parkingPriceSelector',
  get: ({ get }) => {
    const carPercentage = get(commuteMixState)[COMMUTE_MIX_CAR_INDEX];
    const parkingPrice = get(locationParkingPriceState);
    return getCalculation(
      (places) => {
        return Math.round(carPercentage * places) * parkingPrice;
      },
      { get }
    );
  },
});

// in g CO2
export const officeHeatingEmissionsSelector = selector({
  key: 'officeHeatingEmissionsSelector',
  get: ({ get }) => {
    const areaPerEmployee = get(employeeAreaState);
    const energyStandard = get(officeEnergyStandardState);
    const energyStandardPowerPerM2 =
      buildingEnergyStandards[energyStandard].value;
    const heatingSource = get(officeHeatingSourceState);
    const heatingSourceCo2PerPowerUnit = heatingSources[heatingSource].value;
    return getCalculation(
      (places) => {
        return Math.round(
          officeSpace(places, areaPerEmployee) *
            energyStandardPowerPerM2 *
            heatingSourceCo2PerPowerUnit
        );
      },
      { get }
    );
  },
});

export const commuteEmissionsSelector = selector({
  key: 'commuteEmissionsSelector',
  get: ({ get }) => {
    const commuteMix = get(commuteMixState);
    const avgEmissionsPerKm = commuteMix
      .map((prob, i) => COMMUTE_EMISSIONS[i] * prob)
      .reduce((acc, emission) => acc + emission, 0);

    return getCalculation(
      (places) => {
        return Math.round(
          avgEmissionsPerKm *
            places *
            DAILY_COMMUTE_DISTANCE_KM *
            DAYS_PER_MONTH
        );
      },
      { get }
    );
  },
});

// in Minutes
export const commuteTimeSelector = selector({
  key: 'commuteTimeSelector',
  get: ({ get }) => {
    return getCalculation(
      (places) => {
        return Math.round(places * DAILY_COMMUTE_TIME_MINUTES * DAYS_PER_MONTH);
      },
      { get }
    );
  },
});
