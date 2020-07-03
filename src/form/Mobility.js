import React from 'react';
import ValidatedFormField from '../visual/ValidatedFormField';
import TooltipLabel from '../visual/TooltipLabel';
import { Box } from 'grommet';
import { useRecoilState } from 'recoil';
import { commuteTimeState } from '../state';

const Mobility = () => {
  const [commuteTime, setCommuteTime] = useRecoilState(commuteTimeState);
  return (
    <Box pad="small">
      <ValidatedFormField
        placeholder="in min"
        label={
          <TooltipLabel
            label="Tägliche Pendelzeit in Minuten"
            tooltip="Quelle: https://www.bfs.admin.ch/bfs/de/home/statistiken/mobilitaet-verkehr/personenverkehr/pendlermobilitaet.html"
          />
        }
        max={160}
        type="number"
        value={commuteTime}
        onChange={(e) => {
          setCommuteTime(parseInt(e.target.value, 10) || 0);
        }}
      />
    </Box>
  );
};

export default Mobility;
