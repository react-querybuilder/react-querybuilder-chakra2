import { Select } from '@chakra-ui/react';
import type { ComponentPropsWithoutRef } from 'react';
import * as React from 'react';
import type { VersatileSelectorProps } from 'react-querybuilder';
import { toOptions, useSelectElementChangeHandler, useValueSelector } from 'react-querybuilder';

export type ChakraValueSelectorProps = VersatileSelectorProps &
  ComponentPropsWithoutRef<typeof Select>;

export const ChakraValueSelector = (props: ChakraValueSelectorProps): React.JSX.Element => {
  const {
    className,
    options,
    title,
    disabled,
    multiple,
    testID,
    // Props that should not be in extraProps
    rule: _rule,
    rules: _rules,
    level: _level,
    path: _path,
    context: _context,
    validation: _validation,
    operator: _operator,
    field: _field,
    fieldData: _fieldData,
    listsAsArrays: _listsAsArrays,
    schema: _schema,
    ...extraProps
  } = props;
  const { onChange, val } = useValueSelector(props);
  const selectElementChangeHandler = useSelectElementChangeHandler({ multiple, onChange });
  return (
    <Select
      data-testid={testID}
      className={className}
      title={title}
      value={val}
      isDisabled={disabled}
      // Chakra v2 doesn't support multiselect
      // multiple={!!multiple}
      onChange={selectElementChangeHandler}
      {...extraProps}>
      {toOptions(options)}
    </Select>
  );
};
