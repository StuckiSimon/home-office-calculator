import { Box, Heading } from 'grommet';
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
    </Box>
  );
}

export default Stats;
