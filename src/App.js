import React from 'react';
import { Grommet, FormField, TextInput, Meter } from 'grommet';

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
    <Grommet theme={theme}>
      <div className="App">
        <header className="App-header">
          <p>Home Office Calculator</p>
          <FormField label="# Employees">
            <TextInput placeholder="0" />
          </FormField>
        </header>
      </div>
      <div>
        <Meter
          type="circle"
          round
          max={120}
          size="small"
          values={[
            {
              value: 80,
              label: 'sixty',
              onClick: () => {},
            },
          ]}
        />
      </div>
    </Grommet>
  );
}

export default App;
