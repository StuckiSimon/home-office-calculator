import { Heading, Meter } from 'grommet';
import styled from 'styled-components';
import React from 'react';

const FactContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

function StatMeter({ max, current, diff, size = 'small' }) {
  return (
    <div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Meter
          type="circle"
          background="status-ok"
          round
          max={max}
          size={size}
          values={[
            {
              color: 'accent-4',
              value: current,
            },
          ]}
        />
        <FactContainer>
          <Heading level={3}>{diff}</Heading>
        </FactContainer>
      </div>
    </div>
  );
}

export default StatMeter;
