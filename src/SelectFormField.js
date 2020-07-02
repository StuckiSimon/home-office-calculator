import { FormField, ThemeContext } from 'grommet';
import React from 'react';
import Select from 'react-select';

function SelectFormField({ label, value, onChange, options, ...rest }) {
  return (
    <ThemeContext.Extend
      value={{ formField: { border: { color: 'transparent' } } }}
    >
      <FormField label={label}>
        <Select
          menuPortalTarget={document.body}
          value={value}
          onChange={onChange}
          options={options}
          {...rest}
        />
      </FormField>
    </ThemeContext.Extend>
  );
}

export default SelectFormField;
