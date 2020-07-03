import React from 'react';
import { Box } from 'grommet';
import ValidatedFormField from '../visual/ValidatedFormField';
import { useRecoilState, useRecoilValue } from 'recoil';
import { employeeCountState, homeOfficeDaysState } from '../state';
import { employeeCountValidator, homeOfficeDaysValidator } from '../validators';

const Enterprise = () => {
  const [employees, setEmployees] = useRecoilState(employeeCountState);
  const employeeCountValidation = useRecoilValue(employeeCountValidator);
  const [homeOfficeDays, setHomeOfficeDays] = useRecoilState(
    homeOfficeDaysState
  );
  const homeOfficeDaysValidation = useRecoilValue(homeOfficeDaysValidator);
  return (
    <Box direction="row">
      <Box pad="small" basis="medium">
        <ValidatedFormField
          placeholder="0"
          label="Anzahl Mitarbeiter"
          value={employees}
          onChange={(e) => {
            setEmployees(parseInt(e.target.value, 10) || 0);
          }}
          validationObject={employeeCountValidation}
        />
      </Box>
      <Box pad="small" basis="medium">
        <ValidatedFormField
          placeholder="1-4"
          label="Tage Homeoffice / Woche"
          min={1}
          max={4}
          type="number"
          value={homeOfficeDays}
          onChange={(e) => {
            const homeOfficeDays = parseInt(e.target.value, 10) || 0;
            setHomeOfficeDays(homeOfficeDays === 5 ? 4 : homeOfficeDays);
          }}
          validationObject={homeOfficeDaysValidation}
        />
      </Box>
    </Box>
  );
};

export default Enterprise;
