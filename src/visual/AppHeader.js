import { Box, Button, Header, Heading, Menu, Text } from 'grommet';
import React from 'react';
import { ReactComponent as LogoIcon } from './assets/logo.svg';

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
      <Header>
        <Box direction="row" pad="small" align="center">
          <LogoIcon style={{ height: 56, width: 56 }} />
          <Heading
            margin={{
              horizontal: 'small',
              vertical: 'none',
            }}
          >
            Homeoffice Rechner
          </Heading>
        </Box>
      </Header>
      <Text>
        Der Homeoffice Rechner ermöglicht Schweizer Dienstleistungsbetrieben den
        Nutzen von Homeoffice abzuschätzen. Der Rechner ist für KMUs, welche
        primär am Computer arbeiten, geeignet.
      </Text>
    </Box>
  </Box>
);

export default AppHeader;
