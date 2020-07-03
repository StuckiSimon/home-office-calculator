import { selector } from 'recoil';
import ow from 'ow';
import { employeeCountState, homeOfficeDaysState } from './state';

const validateProbe = (val, prober) => {
  try {
    ow(val, prober);
    return true;
  } catch (e) {
    return false;
  }
};

const validate = (val, probes) => {
  const firstFailingValidation = probes.find(
    (probe) => !validateProbe(val, probe.prober)
  );
  return firstFailingValidation?.validationObject;
};

const error = (message) => ({
  type: 'error',
  message,
});

const warn = (message) => ({
  type: 'warning',
  message,
});

const info = (message) => ({
  type: 'info',
  message,
});

const probe = (prober, validationObject) => ({
  prober,
  validationObject,
});

export const employeeCountValidator = selector({
  key: 'employeeCountValidator',
  get: ({ get }) => {
    const employees = get(employeeCountState);

    return validate(employees, [
      probe(ow.number.positive, error('Zahl muss positiv sein')),
      probe(
        ow.number.lessThan(1001),
        warn(
          'Der Rechner ist optimal für Firmen unter 1000 Mitarbeitern geeignet'
        )
      ),
    ]);
  },
});

export const homeOfficeDaysValidator = selector({
  key: 'homeOfficeDaysValidator',
  get: ({ get }) => {
    const homeOfficeDays = get(homeOfficeDaysState);

    return validate(homeOfficeDays, [
      probe(ow.number.positive, error('Zahl muss positiv sein')),
      probe(ow.number.lessThan(5), error('Die Zahl muss tiefer als 5 sein')),
      probe(
        ow.number.lessThan(3),
        info(
          'Wenn sie primär Remote arbeiten möchten, sollten Sie die Akzeptanz bei den Mitarbeitern abklären.'
        )
      ),
    ]);
  },
});
