import { Meter } from 'grommet';
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
      <Meter
        type="circle"
        round
        max={areaRequiredPerWeekPerEmployee}
        size="small"
        values={[
          {
            value: areaRequiredPerWeekPerEmployeeWithHomeOffice,
            label: 'with home office',
            onClick: () => {},
          },
        ]}
      />
    </>
  );
}

export default Stats;
