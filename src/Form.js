import {
  Accordion,
  AccordionPanel,
  Box,
  FormField,
  TextInput,
  ThemeContext,
} from 'grommet';
import { StatusInfo } from 'grommet-icons';
import React from 'react';
import Select from 'react-select';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  employeeAreaState,
  employeeCountState,
  homeOfficeDaysState,
  locationParkingPriceState,
  locationSqmPriceState,
  locationState,
} from './state';
import cities from './reference/cities.json';
import parkingPrices from './reference/parkingPrices.json';
import officeSpaceRentPrices from './reference/officeSpaceRentPrices.json';
import { employeeCountValidator } from './validators';
import ValidatedFormField from './ValidatedFormField';
import SelectFormField from './SelectFormField';

function Form() {
  const [employees, setEmployees] = useRecoilState(employeeCountState);
  const employeeCountValidation = useRecoilValue(employeeCountValidator);
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
  const [locationSqmPrice, setLocationSqmPrice] = useRecoilState(
    locationSqmPriceState
  );
  const [locationParkingPrice, setLocationParkingPrice] = useRecoilState(
    locationParkingPriceState
  );

  const onLocationSelect = ({ value }) => {
    setLocation(value);
    setLocationParkingPrice(parkingPrices[value]);
    setLocationSqmPrice(officeSpaceRentPrices[value]);
  };
  return (
    <Box direction="column" pad="medium">
      <Accordion multiple basis="full">
        <AccordionPanel label="Unternehmen">
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
              <SelectFormField
                label={
                  <Box direction="row" align="center">
                    Ortschaft
                    <Box margin={{ horizontal: 'xsmall' }}>
                      <StatusInfo size="small" color="brand" />
                    </Box>
                  </Box>
                }
                value={selectedCity}
                onChange={onLocationSelect}
                options={citiesFormatted}
              />
            </Box>
            <Box pad="small">
              <FormField
                label={
                  <>
                    Mietpreis pro m<sup>2</sup> Bürofläche
                  </>
                }
              >
                <TextInput
                  min={0}
                  max={500}
                  type="number"
                  value={locationSqmPrice}
                  onChange={(e) => {
                    setLocationSqmPrice(e.target.value);
                  }}
                />
              </FormField>
            </Box>
            <Box pad="small">
              <FormField label={<>Mietpreis pro Parkplatz</>}>
                <TextInput
                  min={0}
                  max={500}
                  type="number"
                  value={locationParkingPrice}
                  onChange={(e) => {
                    setLocationParkingPrice(e.target.value);
                  }}
                />
              </FormField>
            </Box>
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Büro Ausstattung">
          <Box direction="row">
            <Box pad="small" basis="medium">
              <FormField
                label={
                  <>
                    Arbeitsfläche pro Mitarbeiter (in m<sup>2</sup>)
                  </>
                }
              >
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
