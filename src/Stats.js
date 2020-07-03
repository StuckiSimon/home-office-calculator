import { Accordion, AccordionPanel, Box, Heading, Text } from 'grommet';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  commuteEmissionsSelector,
  commuteTimeSelector,
  officeHeatingEmissionsSelector,
  workSpaceSelector,
} from './selector';
import Fact from './stats/Fact';
import Economy from './stats/Economy';
import Ecology from './stats/Ecology';
import Social from './stats/Social';

function Stats() {
  const workSpaces = useRecoilValue(workSpaceSelector);

  const officeHeatingEmissions = useRecoilValue(officeHeatingEmissionsSelector);
  const commuteEmissions = useRecoilValue(commuteEmissionsSelector);
  const totalDiffEmissions =
    officeHeatingEmissions.diff + commuteEmissions.diff;

  const commuteTime = useRecoilValue(commuteTimeSelector);

  return (
    <Box direction="column" pad="medium">
      <Box direction="row" align="end">
        <Heading size="small">
          Auswertung
          <Text color="dark-4" margin="small">
            Alle Zahlen pro Monat
          </Text>
        </Heading>
      </Box>
      <Box direction="row">
        <Box pad="xsmall">
          <Fact label="Arbeitsplätze weniger" value={workSpaces.diff} />
        </Box>
        <Box pad="xsmall">
          <Fact
            label={
              <>
                kg CO<sub>2</sub> weniger
              </>
            }
            value={Math.round(totalDiffEmissions / 1000)}
          />
        </Box>
        <Box pad="xsmall">
          <Fact
            label="h mehr Freizeit"
            value={Math.round(commuteTime.diff / 60)}
          />
        </Box>
      </Box>
      <Accordion multiple basis="full">
        <AccordionPanel label="Ökonomie">
          <Economy />
        </AccordionPanel>
        <AccordionPanel label="Ökologie">
          <Ecology />
        </AccordionPanel>
        <AccordionPanel label="Sozial">
          <Social />
        </AccordionPanel>
      </Accordion>
    </Box>
  );
}

export default Stats;
