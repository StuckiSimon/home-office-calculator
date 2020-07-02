import { Grommet } from 'grommet';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Form from './Form';
import Stats from './Stats';
import MainContainer from './visual/MainContainer';
import AppHeader from './visual/AppHeader';

function App() {
  return (
    <RecoilRoot>
      <Grommet>
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
