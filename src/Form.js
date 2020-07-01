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
        <AccordionPanel label="Büro Ausstattung" />
        <AccordionPanel label="Mobilität" />
      </Accordion>
    </Box>
  );
}

export default Form;
