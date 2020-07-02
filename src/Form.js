import { Box, FormField, Tab, Tabs, TextInput } from 'grommet';
import { StatusInfo } from 'grommet-icons';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Tippy from '@tippyjs/react';
import {
  employeeAreaState,
  employeeCountState,
  homeOfficeDaysState,
  locationParkingPriceState,
  locationSqmPriceState,
  locationState,
  officeEnergyStandardState,
  officeHeatingSourceState,
} from './state';
import cities from './reference/cities.json';
import parkingPrices from './reference/parkingPrices.json';
import officeSpaceRentPrices from './reference/officeSpaceRentPrices.json';
import buildingEnergyStandards from './reference/buildingEnergyStandards.json';
import heatingSources from './reference/heatingSources.json';
import { employeeCountValidator, homeOfficeDaysValidator } from './validators';
import ValidatedFormField from './visual/ValidatedFormField';
import SelectFormField from './visual/SelectFormField';

function Form() {
  const [employees, setEmployees] = useRecoilState(employeeCountState);
  const employeeCountValidation = useRecoilValue(employeeCountValidator);
  const [homeOfficeDays, setHomeOfficeDays] = useRecoilState(
    homeOfficeDaysState
  );
  const homeOfficeDaysValidation = useRecoilValue(homeOfficeDaysValidator);
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

  const [officeEnergyStandard, setOfficeEnergyStandard] = useRecoilState(
    officeEnergyStandardState
  );
  const energyStandardsFormatted = Object.entries(
    buildingEnergyStandards
  ).map(([key, { label }]) => ({ value: key, label }));
  const selectedEnergyStandard = energyStandardsFormatted.find(
    (energyStandard) => energyStandard.value === officeEnergyStandard
  );
  const onEnergyStandardSelect = ({ value }) => {
    setOfficeEnergyStandard(value);
  };

  const [officeHeatingSource, setOfficeHeatingSource] = useRecoilState(
    officeHeatingSourceState
  );
  const heatingSourcesFormatted = Object.entries(
    heatingSources
  ).map(([key, { label }]) => ({ value: key, label }));
  const selectedHeatingSource = heatingSourcesFormatted.find(
    (heatingSource) => heatingSource.value === officeHeatingSource
  );
  const onHeatingSourceSelect = ({ value }) => {
    setOfficeHeatingSource(value);
  };

  return (
    <Box direction="row" pad="medium">
      <Tabs alignControls="start" flex>
        <Tab title="Unternehmen">
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
        </Tab>
        <Tab title="Mietpreise">
          <Box direction="row">
            <Box pad="small" basis="medium">
              <SelectFormField
                label={
                  <Box direction="row" align="center">
                    Ortschaft
                    <Tippy
                      content="Ortschaft wird verwendet um Mietpreis Bürofläche und Parkplatz zu wählen."
                      interactive
                    >
                      <Box margin={{ horizontal: 'xsmall' }}>
                        <StatusInfo size="small" color="brand" />
                      </Box>
                    </Tippy>
                  </Box>
                }
                value={selectedCity}
                onChange={onLocationSelect}
                options={citiesFormatted}
              />
            </Box>
            <Box pad="small" basis="medium">
              <FormField
                label={
                  <Box direction="row" align="center">
                    Mietpreis pro m<sup>2</sup>&nbsp;Bürofläche
                    <Tippy
                      content={
                        <>
                          Quelle:
                          https://de.statista.com/statistik/daten/studie/505317/umfrage/durchschnittsmieten-fuer-bueroflaechen-in-den-20-groessten-schweizer-agglomerationen/
                          "Andere" Daten: Durchschnitt
                        </>
                      }
                      interactive
                    >
                      <Box margin={{ horizontal: 'xsmall' }}>
                        <StatusInfo size="small" color="brand" />
                      </Box>
                    </Tippy>
                  </Box>
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
              <FormField
                label={
                  <Box direction="row" align="center">
                    Mietpreis pro Parkplatz
                    <Tippy
                      content={
                        <>
                          Quelle:
                          https://www.handelszeitung.ch/unternehmen/parkieren-das-kosten-einstellplatze-den-schweizer-stadten
                          "Andere" Daten: Durchschnitt
                        </>
                      }
                      interactive
                    >
                      <Box margin={{ horizontal: 'xsmall' }}>
                        <StatusInfo size="small" color="brand" />
                      </Box>
                    </Tippy>
                  </Box>
                }
              >
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
        </Tab>
        <Tab title="Büro">
          <Box direction="row">
            <Box pad="small" basis="medium">
              <FormField
                label={
                  <Box direction="row" align="center">
                    Arbeitsfläche pro Mitarbeiter (in m<sup>2</sup>)
                    <Tippy
                      content="Quelle Standardwert: https://www.seco.admin.ch/dam/seco/de/dokumente/Arbeit/Arbeitsbedingungen/Arbeitsgesetz%20und%20Verordnungen/Wegleitungen/Wegleitungen%203/ArGV3_art24.pdf.download.pdf/ArGV3_art24_de.pdf"
                      interactive
                    >
                      <Box margin={{ horizontal: 'xsmall' }}>
                        <StatusInfo size="small" color="brand" />
                      </Box>
                    </Tippy>
                  </Box>
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
            <Box pad="small" basis="medium">
              <SelectFormField
                label={
                  <Box direction="row" align="center">
                    Heizung
                    <Tippy
                      content={
                        <>
                          Quellen Öl, Gas:
                          https://www.klimaneutral-handeln.de/php/kompens-berechnen.php
                          <br />
                          Quelle Gas:
                          https://heizung.de/heizung/tipps/umrechnung-m3-in-kwh-kubikmeter-in-kilowattstunden/
                          <br />
                          Quelle Wärmepumpe:
                          https://www.bafu.admin.ch/bafu/de/home/themen/klima/klimawandel--fragen-und-antworten.html
                        </>
                      }
                      interactive
                    >
                      <Box margin={{ horizontal: 'xsmall' }}>
                        <StatusInfo size="small" color="brand" />
                      </Box>
                    </Tippy>
                  </Box>
                }
                value={selectedHeatingSource}
                onChange={onHeatingSourceSelect}
                options={heatingSourcesFormatted}
              />
            </Box>
            <Box pad="small" basis="medium">
              <SelectFormField
                label={
                  <Box direction="row" align="center">
                    Energiestandard
                    <Tippy
                      content="Quelle: https://energie.ch/heizenergieverbrauch/"
                      interactive
                    >
                      <Box margin={{ horizontal: 'xsmall' }}>
                        <StatusInfo size="small" color="brand" />
                      </Box>
                    </Tippy>
                  </Box>
                }
                value={selectedEnergyStandard}
                onChange={onEnergyStandardSelect}
                options={energyStandardsFormatted}
              />
            </Box>
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
}

export default Form;
