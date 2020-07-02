import { Box, Grommet, Heading, Text } from 'grommet';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Form from './Form';
import Stats from './Stats';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

function App() {
  return (
    <RecoilRoot>
      <Grommet theme={theme}>
        <div className="App">
          <header className="App-header">
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
                  Der Homeoffice Rechner ermöglicht es Dienstleitungsbetrieben
                  den Nutzen von Homeoffice abzuschätzen. Der Rechner ist für
                  KMUs, welche primär Computerbasiert arbeiten, geeignet. Für
                  den Einsatz bei Grossbetrieben oder handwerklichen Unternehmen
                  ist er wenig hilfreich.
                </Text>
              </Box>
            </Box>
            <Form />
          </header>
        </div>
        <div>
          <Stats />
        </div>
      </Grommet>
    </RecoilRoot>
  );
}

export default App;
