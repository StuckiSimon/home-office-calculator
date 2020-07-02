import { Box, Heading, Text } from 'grommet';
import React from 'react';

const AppHeader = () => (
  <Box
    pad={{
      horizontal: 'medium',
    }}
  >
    <Box
      pad={{
        horizontal: 'small',
      }}
    >
      <Heading
        margin={{
          vertical: 'small',
        }}
      >
        Homeoffice Rechner
      </Heading>
      <Text>
        Der Homeoffice Rechner ermöglicht Schweizer Dienstleistungsbetrieben den
        Nutzen von Homeoffice abzuschätzen. Der Rechner ist für KMUs, welche
        primär am Computer arbeiten, geeignet.
      </Text>
    </Box>
  </Box>
);

export default AppHeader;
