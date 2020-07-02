import { selector } from 'recoil';
import ow from 'ow';
import { employeeCountState } from './state';

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
          'Der Rechner ist optimal für Firmen unter 1000 Mitarbeitern geeignet.'
        )
      ),
    ]);
  },
});
