import { Box, Heading } from 'grommet';
import React from 'react';

const Fact = ({ label, value }) => {
  return (
    <Box direction="row" align="end">
      <Heading margin="none">{value}</Heading>
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
