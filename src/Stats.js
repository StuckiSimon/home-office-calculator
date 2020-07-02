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
  commuteTimeSelector,
  officeHeatingEmissionsSelector,
  officeHeatingPriceSelector,
  officeRentSelector,
  parkingPriceSelector,
  workSpaceSelector,
} from './selector';
import StatMeter from './visual/StatMeter';
import PercentageDistribution from './visual/PercentageDistribution';

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

const Fact = ({ label, value }) => {
  return (
    <Box direction="row" align="end">
      <Heading margin="none">{value}</Heading>
      <Heading
        margin={{
          vertical: 'xsmall',
          horizontal: 'small',
        }}
        color="dark-4"
        level={3}
      >
        {label}
      </Heading>
    </Box>
  );
};

function Stats() {
  const workSpaces = useRecoilValue(workSpaceSelector);
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

  const commuteTime = useRecoilValue(commuteTimeSelector);

  return (
    <Box direction="column" pad="medium">
      <Box direction="row" align="end">
        <Heading size="small">
          Auswertung
          <Text color="dark-4" margin="small">
            Alle Zahlen pro Monat
          </Text>
        </Heading>
      </Box>
      <Box direction="row">
        <Box pad="xsmall">
          <Fact
            label="Arbeitsplätze weniger"
            value={workSpaces.diff.toLocaleString('de-CH')}
          />
        </Box>
        <Box pad="xsmall">
          <Fact
            label={
              <>
                kg CO<sub>2</sub> weniger
              </>
            }
            value={Math.round(totalDiffEmissions / 1000).toLocaleString(
              'de-CH'
            )}
          />
        </Box>
        <Box pad="xsmall">
          <Fact
            label="h mehr Freizeit"
            value={Math.round(commuteTime.diff / 60).toLocaleString('de-CH')}
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
                max={totalPricePercentage.normal}
                current={totalPricePercentage.optimal}
                diff={<>-{totalPricePercentage.diff}%</>}
              />
            </Box>
          </Box>
          <DataTable
            margin={{ vertical: 'medium' }}
            columns={[
              {
                property: 'name',
                header: <Text>Name</Text>,
                primary: true,
              },
              {
                property: 'diff',
                header: 'Gespart',
                footer: '' + diffTotalPrice.toLocaleString('de-CH'),
                render: (data) => data.diff.toLocaleString('de-CH') + ' CHF',
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
                max={totalEmissionPercentage.normal}
                current={totalEmissionPercentage.optimal}
                diff={
                  <>
                    -
                    {Math.round(totalDiffEmissions / 1000).toLocaleString(
                      'de-CH'
                    )}{' '}
                    kg&nbsp;CO
                    <sub>2</sub>
                  </>
                }
              />
            </Box>
          </Box>
          <DataTable
            margin={{ vertical: 'medium' }}
            columns={[
              {
                property: 'name',
                header: <Text>Name</Text>,
                primary: true,
              },
              {
                property: 'diff',
                header: 'Gespart',
                footer:
                  '' +
                  Math.round(totalDiffEmissions / 1000).toLocaleString('de-CH'),
                render: (data) => (
                  <>
                    {data.diff.toLocaleString('de-CH')} kg CO<sub>2</sub>
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
        <AccordionPanel label="Sozial">
          <Box direction="row">
            <Box pad="small">
              <Heading level="6" margin="none">
                Zeitersparnis
              </Heading>
              <StatMeter
                max={commuteTime.normal}
                current={commuteTime.optimal}
                diff={
                  <>
                    -{Math.round(commuteTime.diff / 60).toLocaleString('de-CH')}
                    h
                  </>
                }
              />
            </Box>
            <Box pad="small" justify="end">
              <Fact
                label="Kuchen backen"
                value={Math.round(commuteTime.diff / 60).toLocaleString(
                  'de-CH'
                )}
              />
              <Fact
                label="Fussballspiele"
                value={Math.round(commuteTime.diff / 90).toLocaleString(
                  'de-CH'
                )}
              />
              <Fact
                label="Marathons"
                value={Math.round(commuteTime.diff / 120).toLocaleString(
                  'de-CH'
                )}
              />
            </Box>
          </Box>
        </AccordionPanel>
      </Accordion>
    </Box>
  );
}

export default Stats;
