import {
  Accordion,
  AccordionPanel,
  Box,
  FormField,
  TextInput,
  ThemeContext,
} from 'grommet';
import React from 'react';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import {
  employeeAreaState,
  employeeCountState,
  homeOfficeDaysState,
  locationState,
} from './state';
import cities from './reference/cities.json';

function Form() {
  const [employees, setEmployees] = useRecoilState(employeeCountState);
  const [homeOfficeDays, setHomeOfficeDays] = useRecoilState(
    homeOfficeDaysState
  );
  const [employeeArea, setEmployeeArea] = useRecoilState(employeeAreaState);
  const [location, setLocation] = useRecoilState(locationState);
  const citiesFormatted = Object.entries(cities).map(([key, label]) => ({
    value: key,
    label,
  }));
  const selectedCity = citiesFormatted.find((city) => city.value === location);

  return (
    <Box direction="column" pad="medium">
      <Accordion multiple basis="full">
        <AccordionPanel label="Unternehmen">
          <Box direction="row">
            <Box pad="small">
              <FormField label="# Employees">
                <TextInput
                  placeholder="0"
                  min={0}
                  max={1000}
                  type="number"
                  value={employees}
                  onChange={(e) => {
                    setEmployees(e.target.value);
                  }}
                />
              </FormField>
            </Box>
            <Box pad="small">
              <FormField label="# Home Office Days">
                <TextInput
                  placeholder="0-5"
                  min={0}
                  max={5}
                  type="number"
                  value={homeOfficeDays}
                  onChange={(e) => {
                    setHomeOfficeDays(e.target.value);
                  }}
                />
              </FormField>
            </Box>
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Mietpreise">
          <Box direction="row">
            <Box pad="small" basis="medium">
              <ThemeContext.Extend
                value={{ formField: { border: { color: 'transparent' } } }}
              >
                <FormField label="Location">
                  <Select
                    menuPortalTarget={document.body}
                    value={selectedCity}
                    onChange={({ value }) => setLocation(value)}
                    options={citiesFormatted}
                  />
                </FormField>
              </ThemeContext.Extend>
            </Box>
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Büro Ausstattung">
          <Box direction="row">
            <Box pad="small" basis="medium">
              <FormField label="Arbeitsfläche pro Mitarbeiter (in m^2)">
                <TextInput
                  placeholder="0"
                  min={5}
                  max={40}
                  type="number"
                  value={employeeArea}
                  onChange={(e) => {
                    setEmployeeArea(e.target.value);
                  }}
                />
              </FormField>
            </Box>
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Mobilität" />
      </Accordion>
    </Box>
  );
}

export default Form;
