import {
  Accordion,
  AccordionPanel,
  Box,
  DataTable,
  Heading,
  Text,
} from 'grommet';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  commuteEmissionsSelector,
  officeHeatingEmissionsSelector,
  officeHeatingPriceSelector,
  officeRentSelector,
  parkingPriceSelector,
  workSpaceState,
} from './selector';
import StatMeter from './StatMeter';
import PercentageDistribution from './PercentageDistribution';

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
  const diffTotalPrice =
    officeRent.diff + heatingPrice.diff + parkingPrice.diff;

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
  ];

  const officeHeatingEmissions = useRecoilValue(officeHeatingEmissionsSelector);
  const commuteEmissions = useRecoilValue(commuteEmissionsSelector);
  const totalOptimalEmissions =
    officeHeatingEmissions.optimal + commuteEmissions.optimal;
  const totalDiffEmissions =
    officeHeatingEmissions.diff + commuteEmissions.diff;
  const emissionDistribution = [
    {
      value: getAsPercentage(totalOptimalEmissions, commuteEmissions.optimal),
      color: 'graph-0',
      label: 'Mobilität',
    },
    {
      value: getAsPercentage(
        totalOptimalEmissions,
        officeHeatingEmissions.optimal
      ),
      color: 'brand',
      label: 'Wärmeenergie',
    },
  ];
  const totalEmissionPercentage = getCalcAsPercentage(
    officeHeatingEmissions.normal + commuteEmissions.normal,
    officeHeatingEmissions.optimal + commuteEmissions.optimal,
    officeHeatingEmissions.diff + commuteEmissions.diff
  );

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
              <PercentageDistribution values={pricingDistribution} />
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
                footer: '' + diffTotalPrice,
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
        <AccordionPanel label="Ökologie">
          <Box direction="row">
            <Box pad="small" basis="full">
              <Heading level="6" margin="none">
                Anteil an Emissionen
              </Heading>
              <PercentageDistribution values={emissionDistribution} />
            </Box>
            <Box pad="small">
              <Heading level="6" margin="none">
                Emissionsreduktion
              </Heading>
              <StatMeter
                size="medium"
                max={totalEmissionPercentage.normal}
                current={totalEmissionPercentage.optimal}
                diff={
                  <>
                    -{Math.round(totalDiffEmissions / 1000)} kg CO<sub>2</sub>
                  </>
                }
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
                footer: '' + Math.round(totalDiffEmissions / 1000),
                render: (data) => (
                  <>
                    {data.diff} kg CO<sub>2</sub>
                  </>
                ),
              },
            ]}
            data={[
              {
                name: 'Mobilität',
                diff: Math.round(commuteEmissions.diff / 1000),
              },
              {
                name: 'Wärmeenergie',
                diff: Math.round(officeHeatingEmissions.diff / 1000),
              },
            ]}
          />
        </AccordionPanel>
        <AccordionPanel label="Sozial" />
      </Accordion>
    </Box>
  );
}

export default Stats;
