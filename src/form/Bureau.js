import React from 'react';
import { Box, FormField, TextInput } from 'grommet';
import TooltipLabel from '../visual/TooltipLabel';
import SelectFormField from '../visual/SelectFormField';
import { useRecoilState } from 'recoil';
import {
  employeeAreaState,
  officeEnergyStandardState,
  officeHeatingSourceState,
} from '../state';
import buildingEnergyStandards from '../reference/buildingEnergyStandards.json';
import heatingSources from '../reference/heatingSources.json';

const Bureau = () => {
  const [employeeArea, setEmployeeArea] = useRecoilState(employeeAreaState);
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
    <Box direction="row">
      <Box pad="small" basis="medium">
        <FormField
          label={
            <TooltipLabel
              label={
                <>
                  Arbeitsfläche pro Mitarbeiter (in m<sup>2</sup>)
                </>
              }
              tooltip="Quelle Standardwert: https://www.seco.admin.ch/dam/seco/de/dokumente/Arbeit/Arbeitsbedingungen/Arbeitsgesetz%20und%20Verordnungen/Wegleitungen/Wegleitungen%203/ArGV3_art24.pdf.download.pdf/ArGV3_art24_de.pdf"
            />
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
            <TooltipLabel
              label="Heizung"
              tooltip={
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
            />
          }
          value={selectedHeatingSource}
          onChange={onHeatingSourceSelect}
          options={heatingSourcesFormatted}
        />
      </Box>
      <Box pad="small" basis="medium">
        <SelectFormField
          label={
            <TooltipLabel
              label="Energiestandard"
              tooltip="Quelle: https://energie.ch/heizenergieverbrauch/"
            />
          }
          value={selectedEnergyStandard}
          onChange={onEnergyStandardSelect}
          options={energyStandardsFormatted}
        />
      </Box>
    </Box>
  );
};

export default Bureau;
