import {
  Accordion,
  AccordionPanel,
  Box,
  DataTable,
  Distribution,
  Heading,
  Meter,
  Text,
} from 'grommet';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { workSpaceState } from './selector';
import StatMeter from './StatMeter';

function Stats() {
  const { normal, optimal, diff } = useRecoilValue(workSpaceState);

  return (
    <Box direction="column" pad="medium">
      <Heading size="small">Auswertung</Heading>
      <Box direction="row">
        <Box pad="xsmall">
          <Heading level={4}>Arbeitsplätze</Heading>
          <StatMeter
            max={normal.workplaces}
            current={optimal.workplaces}
            diff={diff.workplaces}
          />
        </Box>
        <Box pad="xsmall">
          <Heading level={4}>Bürofläche</Heading>
          <StatMeter
            max={normal.area}
            current={optimal.area}
            diff={
              <>
                {diff.area}m<sup>2</sup>
              </>
            }
          />
        </Box>
      </Box>
      <Accordion multiple basis="full">
        <AccordionPanel label="Ökonomie">
          <Box direction="row">
            <Distribution
              values={[
                { value: 50, color: 'light-3', label: 'Immobilien' },
                { value: 35, color: 'brand', label: 'Wärmeenergie' },
                { value: 15, color: 'graph-0', label: 'Parkplätze' },
              ]}
            >
              {(value) => (
                <Box pad="small" background={value.color} fill>
                  <Text size="large">
                    {value.value}% {value.label}
                  </Text>
                </Box>
              )}
            </Distribution>
            <StatMeter max={100} current={60} diff={<>40%</>} />
          </Box>
          <DataTable
            columns={[
              {
                property: 'name',
                header: <Text>Name</Text>,
                primary: true,
              },
              {
                property: 'percent',
                header: 'Gespart',
                render: (datum) => (
                  <Box pad={{ vertical: 'xsmall' }}>
                    <Meter
                      values={[{ value: datum.percent }]}
                      thickness="small"
                      size="small"
                    />
                  </Box>
                ),
              },
            ]}
            data={[
              { name: 'Immobilien', percent: 20 },
              { name: 'Wärmeenergie', percent: 30 },
              { name: 'Parkplätze', percent: 40 },
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
