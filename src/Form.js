import { FormField, TextInput } from 'grommet';
import React from 'react';
import { useRecoilState } from 'recoil';
import { employeeCountState, homeOfficeDaysState } from './state';

function Form() {
  const [employees, setEmployees] = useRecoilState(employeeCountState);
  const [homeOfficeDays, setHomeOfficeDays] = useRecoilState(
    homeOfficeDaysState
  );

  return (
    <>
      <FormField label="# Employees">
        <TextInput
          placeholder="0"
          type="number"
          value={employees}
          onChange={(e) => {
            setEmployees(e.target.value);
          }}
        />
      </FormField>
      <FormField label="# Home Office Days">
        <TextInput
          placeholder="0-5"
          type="number"
          value={homeOfficeDays}
          onChange={(e) => {
            setHomeOfficeDays(e.target.value);
          }}
        />
      </FormField>
    </>
  );
}

export default Form;
