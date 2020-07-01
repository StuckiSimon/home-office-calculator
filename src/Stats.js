import { Box, Meter } from 'grommet';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { workSpaceState } from './selector';

function Stats() {
  const {
    areaRequiredPerWeekPerEmployeeWithHomeOffice,
    areaRequiredPerWeekPerEmployee,
  } = useRecoilValue(workSpaceState);

  return (
    <>
      <Box pad="small">
        <Meter
          type="circle"
          background="status-ok"
          round
          max={areaRequiredPerWeekPerEmployee}
          size="small"
          values={[
            {
              color: 'accent-4',
              value: areaRequiredPerWeekPerEmployeeWithHomeOffice,
              label: 'with home office',
              onClick: () => {},
            },
          ]}
        />
      </Box>
    </>
  );
}

export default Stats;
