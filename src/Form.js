import { Box, Tab, Tabs } from 'grommet';
import React from 'react';
import Enterprise from './form/Enterprise';
import Rent from './form/Rent';
import Bureau from './form/Bureau';
import Mobility from './form/Mobility';

function Form() {
  return (
    <Box direction="row" pad="medium">
      <Tabs alignControls="start" flex>
        <Tab title="Unternehmen">
          <Enterprise />
        </Tab>
        <Tab title="Mietpreise">
          <Rent />
        </Tab>
        <Tab title="Büro">
          <Bureau />
        </Tab>
        <Tab title="Mobilität">
          <Mobility />
        </Tab>
      </Tabs>
    </Box>
  );
}

export default Form;
