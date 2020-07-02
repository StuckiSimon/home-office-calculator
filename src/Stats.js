import { Box, Heading } from 'grommet';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { workSpaceState } from './selector';
import StatMeter from './StatMeter';

function Stats() {
  const { normal, optimal, diff } = useRecoilValue(workSpaceState);

  return (
    <>
      <Box pad="small">
        <Heading size="small">Arbeitsplätze</Heading>
        <StatMeter
          max={normal.workplaces}
          current={optimal.workplaces}
          diff={diff.workplaces}
        />
      </Box>
    </>
  );
}

export default Stats;
