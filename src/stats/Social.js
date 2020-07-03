import React from 'react';
import { Box, Heading } from 'grommet';
import { useRecoilValue } from 'recoil';
import StatMeter from '../visual/StatMeter';
import Fact from './Fact';
import { commuteTimeSelector } from '../selector';

const Social = () => {
  const commuteTime = useRecoilValue(commuteTimeSelector);
  return (
    <Box direction="row">
      <Box pad="small">
        <Heading level="6" margin="none">
          Zeitersparnis
        </Heading>
        <StatMeter
          max={commuteTime.normal}
          current={commuteTime.optimal}
          diff={
            <>{Math.round(commuteTime.diff / 60).toLocaleString('de-CH')} h</>
          }
        />
      </Box>
      <Box pad="small" justify="end">
        <Fact label="Kuchen backen" value={Math.round(commuteTime.diff / 60)} />
        <Fact
          label="Marathons laufen"
          value={Math.round(commuteTime.diff / 120)}
        />
        <Fact
          label="TGV-Fahrten Zurich - Paris"
          value={Math.round(commuteTime.diff / (60 * 4))}
        />
      </Box>
    </Box>
  );
};

export default Social;
