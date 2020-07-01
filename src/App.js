import { Grommet, Heading } from 'grommet';
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
            <Heading margin="none">Home Office Calculator</Heading>
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
