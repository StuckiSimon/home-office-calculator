import { Heading, Meter } from 'grommet';
import styled from 'styled-components';
import React from 'react';

const FactContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

function StatMeter({ max, current, diff }) {
  return (
    <div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Meter
          type="circle"
          background="status-ok"
          round
          max={max}
          size="small"
          values={[
            {
              color: 'accent-4',
              value: current,
            },
          ]}
        />
        <FactContainer>
          <Heading>-{diff}</Heading>
        </FactContainer>
      </div>
    </div>
  );
}

export default StatMeter;
