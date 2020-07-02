import { Box, Heading, Meter } from 'grommet';
import styled from 'styled-components';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { workSpaceState } from './selector';

const FactContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

function Stats() {
  const { normal, optimal, diff } = useRecoilValue(workSpaceState);

  return (
    <>
      <Box pad="small">
        <Heading size="small">Arbeitsplätze</Heading>
        <div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Meter
              type="circle"
              background="status-ok"
              round
              max={normal.workplaces}
              size="small"
              values={[
                {
                  color: 'accent-4',
                  value: optimal.workplaces,
                },
              ]}
            />
            <FactContainer>
              <Heading>-{diff.workplaces}</Heading>
            </FactContainer>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Stats;
