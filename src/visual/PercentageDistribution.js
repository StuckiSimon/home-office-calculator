import { Box, Distribution, Text } from 'grommet';
import React from 'react';

const PercentageDistribution = ({ values }) => {
  return (
    <Distribution values={values.sort(({ value: a }, { value: b }) => b - a)}>
      {(value) => (
        <Box pad="small" background={value.color} fill>
          <Text size="large">
            {value.value}% {value.label}
          </Text>
        </Box>
      )}
    </Distribution>
  );
};

export default PercentageDistribution;
