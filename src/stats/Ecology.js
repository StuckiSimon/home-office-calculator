import React from 'react';
import { useRecoilValue } from 'recoil';
import { Box, DataTable, Heading, Text } from 'grommet';
import PercentageDistribution from '../visual/PercentageDistribution';
import StatMeter from '../visual/StatMeter';
import {
  commuteEmissionsSelector,
  officeHeatingEmissionsSelector,
} from '../selector';
import { getAsPercentage, getCalcAsPercentage } from './helper';

const Ecology = () => {
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
    <>
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
                {Math.round(totalDiffEmissions / 1000).toLocaleString('de-CH')}{' '}
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
            align: 'end',
            property: 'normal',
            header: 'aktuelle Emissionen',
            render: (data) =>
              data?.normal ? (
                <>
                  {data.normal.toLocaleString('de-CH')} kg CO<sub>2</sub>
                </>
              ) : null,
          },
          {
            align: 'end',
            property: 'optimal',
            header: 'optimierte Emissionen',
            render: (data) =>
              data?.optimal ? (
                <>
                  {data.optimal.toLocaleString('de-CH')} kg CO<sub>2</sub>
                </>
              ) : null,
          },
          {
            align: 'end',
            property: 'diff',
            header: 'Sparpotenzial',
            footer:
              '' +
              Math.round(totalDiffEmissions / 1000).toLocaleString('de-CH'),
            render: (data) => (
              <Text weight="bold">
                {data.diff.toLocaleString('de-CH')} kg CO<sub>2</sub>
              </Text>
            ),
          },
        ]}
        data={[
          {
            name: 'Mobilität',
            optimal: Math.round(commuteEmissions.optimal / 1000),
            normal: Math.round(commuteEmissions.normal / 1000),
            diff: Math.round(commuteEmissions.diff / 1000),
          },
          {
            name: 'Wärmeenergie',
            optimal: Math.round(officeHeatingEmissions.optimal / 1000),
            normal: Math.round(officeHeatingEmissions.normal / 1000),
            diff: Math.round(officeHeatingEmissions.diff / 1000),
          },
        ]}
      />
    </>
  );
};

export default Ecology;
