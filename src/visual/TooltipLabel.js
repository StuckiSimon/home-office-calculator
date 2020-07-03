import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Box } from 'grommet';
import { StatusInfo } from 'grommet-icons';
import React from 'react';

const TooltipLabel = ({ tooltip, label }) => {
  return (
    <Box direction="row" align="center">
      {label}
      <Tippy content={tooltip} interactive>
        <Box margin={{ horizontal: 'xsmall' }}>
          <StatusInfo size="small" color="brand" />
        </Box>
      </Tippy>
    </Box>
  );
};

export default TooltipLabel;
