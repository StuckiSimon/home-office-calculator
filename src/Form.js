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
  locationParkingPriceState,
  locationSqmPriceState,
  locationState,
} from './state';
import cities from './reference/cities.json';
import parkingPrices from './reference/parkingPrices.json';
import officeSpaceRentPrices from './reference/officeSpaceRentPrices.json';

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
                    onChange={onLocationSelect}
                    options={citiesFormatted}
                  />
                </FormField>
              </ThemeContext.Extend>
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
