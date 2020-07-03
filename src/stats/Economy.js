import React from 'react';
import { Box, DataTable, Heading, Text } from 'grommet';
import { useRecoilValue } from 'recoil';
import PercentageDistribution from '../visual/PercentageDistribution';
import StatMeter from '../visual/StatMeter';
import {
  officeHeatingPriceSelector,
  officeRentSelector,
  parkingPriceSelector,
} from '../selector';
import { getAsPercentage, getCalcAsPercentage } from './helper';

const Economy = () => {
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
  return (
    <>
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
            diff={<>{totalPricePercentage.diff}%</>}
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
            header: 'aktuelle Kosten',
            render: (data) =>
              data?.normal
                ? data.normal.toLocaleString('de-CH') + ' CHF'
                : null,
          },
          {
            align: 'end',
            property: 'optimal',
            header: 'optimierte Kosten',
            render: (data) =>
              data?.optimal
                ? data.optimal.toLocaleString('de-CH') + ' CHF'
                : null,
          },
          {
            align: 'end',
            property: 'diff',
            header: 'Sparpotenzial',
            footer: '' + diffTotalPrice.toLocaleString('de-CH'),
            render: (data) => (
              <Text weight="bold">{data.diff.toLocaleString('de-CH')} CHF</Text>
            ),
          },
        ]}
        data={[
          {
            name: 'Immobilien',
            diff: officeRent.diff,
            optimal: officeRent.optimal,
            normal: officeRent.normal,
          },
          {
            name: 'Wärmeenergie',
            diff: heatingPrice.diff,
            optimal: heatingPrice.optimal,
            normal: heatingPrice.normal,
          },
          {
            name: 'Parkplätze',
            diff: parkingPrice.diff,
            optimal: parkingPrice.optimal,
            normal: parkingPrice.normal,
          },
        ]}
      />
    </>
  );
};

export default Economy;
