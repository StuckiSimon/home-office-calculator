import { Box, Heading, Text } from 'grommet';
import React from 'react';

const AppHeader = () => (
  <Box
    pad={{
      vertical: 'none',
      horizontal: 'medium',
    }}
  >
    <Box
      pad={{
        vertical: 'none',
        horizontal: 'small',
      }}
    >
      <Heading margin="none">Homeoffice Rechner</Heading>
      <Text>
        Der Homeoffice Rechner ermöglicht es Dienstleitungsbetrieben den Nutzen
        von Homeoffice abzuschätzen. Der Rechner ist für KMUs, welche primär
        Computerbasiert arbeiten, geeignet. Für den Einsatz bei Grossbetrieben
        oder handwerklichen Unternehmen ist er wenig hilfreich.
      </Text>
    </Box>
  </Box>
);

export default AppHeader;
