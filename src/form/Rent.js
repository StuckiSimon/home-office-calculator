import React from 'react';
import { Box, FormField, TextInput } from 'grommet';
import SelectFormField from '../visual/SelectFormField';
import TooltipLabel from '../visual/TooltipLabel';
import { useRecoilState } from 'recoil';
import {
  locationParkingPriceState,
  locationSqmPriceState,
  locationState,
} from '../state';
import cities from '../reference/cities.json';
import parkingPrices from '../reference/parkingPrices.json';
import officeSpaceRentPrices from '../reference/officeSpaceRentPrices.json';

const Rent = () => {
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
    <Box direction="row">
      <Box pad="small" basis="medium">
        <SelectFormField
          label={
            <TooltipLabel
              label="Ortschaft"
              tooltip="Ortschaft wird verwendet um Mietpreis Bürofläche und Parkplatz zu wählen."
            />
          }
          value={selectedCity}
          onChange={onLocationSelect}
          options={citiesFormatted}
        />
      </Box>
      <Box pad="small" basis="medium">
        <FormField
          label={
            <TooltipLabel
              label={
                <>
                  Mietpreis pro m<sup>2</sup>&nbsp;Bürofläche
                </>
              }
              tooltip={
                <>
                  Quelle:
                  https://de.statista.com/statistik/daten/studie/505317/umfrage/durchschnittsmieten-fuer-bueroflaechen-in-den-20-groessten-schweizer-agglomerationen/
                  <br />
                  "Andere" Daten: Durchschnitt
                </>
              }
            />
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
            <TooltipLabel
              label="Mietpreis pro Parkplatz"
              tooltip={
                <>
                  Quelle:
                  https://www.handelszeitung.ch/unternehmen/parkieren-das-kosten-einstellplatze-den-schweizer-stadten
                  <br />
                  "Andere" Daten: Durchschnitt
                </>
              }
            />
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
  );
};

export default Rent;
