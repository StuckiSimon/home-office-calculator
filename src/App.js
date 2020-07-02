import { Grommet } from 'grommet';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Form from './Form';
import Stats from './Stats';
import MainContainer from './visual/MainContainer';
import AppHeader from './visual/AppHeader';

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
        <MainContainer>
          <AppHeader />
          <Form />
          <Stats />
        </MainContainer>
      </Grommet>
    </RecoilRoot>
  );
}

export default App;
