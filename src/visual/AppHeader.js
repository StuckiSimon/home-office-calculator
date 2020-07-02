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
        Der Homeoffice Rechner ermöglicht es Dienstleitungsbetrieben in der
        Schweiz den Nutzen von Homeoffice abzuschätzen. Der Rechner ist für KMUs
        welche primär am Computer arbeiten geeignet.
      </Text>
      <Text color="dark-6">
        Für den Einsatz bei Grossbetrieben oder handwerklichen Unternehmen ist
        er nicht geeignet.
      </Text>
    </Box>
  </Box>
);

export default AppHeader;
