import { DragHandleIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import type { ComponentPropsWithRef } from 'react';
import * as React from 'react';
import { forwardRef } from 'react';
import type { DragHandleProps } from 'react-querybuilder';

type IconButtonProps = ComponentPropsWithRef<typeof IconButton>;

export type ChakraDragHandleProps = DragHandleProps &
  Omit<IconButtonProps, 'aria-label'> &
  Partial<Pick<IconButtonProps, 'aria-label'>>;

export const ChakraDragHandle: React.ForwardRefExoticComponent<
  Omit<ChakraDragHandleProps, 'ref'> & React.RefAttributes<HTMLSpanElement>
> = forwardRef<HTMLSpanElement, ChakraDragHandleProps>(
  (
    {
      className,
      title,
      disabled,
      testID,
      // Props that should not be in extraProps
      level: _level,
      path: _path,
      label: _label,
      context: _context,
      validation: _validation,
      schema: _schema,
      ruleOrGroup: _ruleOrGroup,
      ...extraProps
    },
    dragRef
  ) => (
    <span data-testid={testID} ref={dragRef} className={className} title={title}>
      <IconButton
        isDisabled={disabled}
        icon={<DragHandleIcon />}
        aria-label={title ?? ''}
        {...extraProps}
      />
    </span>
  )
);
