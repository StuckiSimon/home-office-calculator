import { Box, Heading } from 'grommet';
import React from 'react';
import { useSpring, animated } from 'react-spring';

const Fact = ({ label, value }) => {
  const props = useSpring({ number: parseInt(value, 10), from: { number: 0 } });

  return (
    <Box direction="row" align="end">
      <Heading margin="none">
        <animated.span>
          {props.number.interpolate((val) =>
            Math.floor(val).toLocaleString('de-CH')
          )}
        </animated.span>
      </Heading>
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

export default Fact;
