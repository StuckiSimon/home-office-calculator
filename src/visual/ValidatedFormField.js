import { Box, FormField, Text, TextInput } from 'grommet';
import styled from 'styled-components';
import React from 'react';
import { Alert, StatusCritical, StatusInfo } from 'grommet-icons';

const ValidationPlaceholder = styled.div`
  min-height: 40px;
`;

const ValidationIcon = ({ children }) => {
  switch (children) {
    case 'info':
      return <StatusInfo color="brand" />;
    case 'warning':
      return <Alert color="status-warning" />;
    case 'error':
      return <StatusCritical color="status-critical" />;
    default:
      console.warn('unknown validation type', children);
      return null;
  }
};

const Validation = ({ type, message }) => {
  return (
    <ValidationPlaceholder>
      <Box direction="row" align="center">
        <ValidationIcon>{type}</ValidationIcon>
        <Text size="small" margin={{ horizontal: 'xsmall' }}>
          {message}
        </Text>
      </Box>
    </ValidationPlaceholder>
  );
};

function ValidatedFormField({
  value,
  onChange,
  label,
  type = 'number',
  min = 0,
  validationObject = undefined,
  ...rest
}) {
  return (
    <>
      <FormField label={label}>
        <TextInput
          min={min}
          type={type}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </FormField>
      {validationObject === undefined ? (
        <ValidationPlaceholder />
      ) : (
        <Validation {...validationObject} />
      )}
    </>
  );
}

export default ValidatedFormField;
