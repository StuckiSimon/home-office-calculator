import {
  Accordion,
  AccordionPanel,
  Box,
  DataTable,
  Distribution,
  Heading,
  Text,
} from 'grommet';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  officeHeatingPriceSelector,
  officeRentSelector,
  parkingPriceSelector,
  workSpaceState,
} from './selector';
import StatMeter from './StatMeter';

const getCalcAsPercentage = (normal, optimal, diff) => {
  return {
    normal: 100,
    optimal: getAsPercentage(normal, optimal),
    diff: getAsPercentage(normal, diff),
  };
};

const getAsPercentage = (hundred, asked) => {
  return Math.round((100 / hundred) * asked);
};

function Stats() {
  const { normal, optimal, diff } = useRecoilValue(workSpaceState);
  const officeRent = useRecoilValue(officeRentSelector);
  const heatingPrice = useRecoilValue(officeHeatingPriceSelector);
  const parkingPrice = useRecoilValue(parkingPriceSelector);

  const totalPricePercentage = getCalcAsPercentage(
    officeRent.normal + heatingPrice.normal + parkingPrice.normal,
    officeRent.optimal + heatingPrice.optimal + parkingPrice.optimal,
    officeRent.diff + heatingPrice.diff + parkingPrice.diff
  );
  const optimalTotalPrice =
    officeRent.optimal + heatingPrice.optimal + parkingPrice.optimal;

  const pricingDistribution = [
    {
      value: getAsPercentage(optimalTotalPrice, officeRent.optimal),
      color: 'accent-3',
      label: 'Immobilien',
    },
    {
      value: getAsPercentage(optimalTotalPrice, parkingPrice.optimal),
      color: 'graph-0',
      label: 'Parkplätze',
    },
    {
      value: getAsPercentage(optimalTotalPrice, heatingPrice.optimal),
      color: 'brand',
      label: 'Wärmeenergie',
    },
  ].sort(({ value: a }, { value: b }) => b - a);

  return (
    <Box direction="column" pad="medium">
      <Heading size="small">Auswertung</Heading>
      <Box direction="row">
        <Box pad="xsmall">
          <Heading level={4}>Arbeitsplätze</Heading>
          <StatMeter
            max={normal.workplaces}
            current={optimal.workplaces}
            diff={-diff.workplaces}
          />
        </Box>
        <Box pad="xsmall">
          <Heading level={4}>Bürofläche</Heading>
          <StatMeter
            max={normal.area}
            current={optimal.area}
            diff={
              <>
                -{diff.area}m<sup>2</sup>
              </>
            }
          />
        </Box>
      </Box>
      <Accordion multiple basis="full">
        <AccordionPanel label="Ökonomie">
          <Box direction="row">
            <Box pad="small" basis="full">
              <Heading level="6" margin="none">
                Kostenverteilung
              </Heading>
              <Distribution values={pricingDistribution}>
                {(value) => (
                  <Box pad="small" background={value.color} fill>
                    <Text size="large">
                      {value.value}% {value.label}
                    </Text>
                  </Box>
                )}
              </Distribution>
            </Box>
            <Box pad="small">
              <Heading level="6" margin="none">
                Kostenreduktion
              </Heading>
              <StatMeter
                size="medium"
                max={totalPricePercentage.normal}
                current={totalPricePercentage.optimal}
                diff={<>-{totalPricePercentage.diff}%</>}
              />
            </Box>
          </Box>
          <DataTable
            columns={[
              {
                property: 'name',
                header: <Text>Name</Text>,
                primary: true,
              },
              {
                property: 'diff',
                header: 'Gespart',
                render: (data) => data.diff + ' CHF',
              },
            ]}
            data={[
              { name: 'Immobilien', diff: officeRent.diff },
              { name: 'Wärmeenergie', diff: heatingPrice.diff },
              { name: 'Parkplätze', diff: parkingPrice.diff },
            ]}
          />
        </AccordionPanel>
        <AccordionPanel label="Ökologie" />
        <AccordionPanel label="Sozial" />
      </Accordion>
    </Box>
  );
}

export default Stats;
