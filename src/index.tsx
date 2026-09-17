import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  CopyIcon,
  LockIcon,
  UnlockIcon,
  UpDownIcon,
} from '@chakra-ui/icons';
import * as React from 'react';
import type {
  ControlElementsProp,
  FullField,
  QueryBuilderContextProvider,
  Translations,
} from 'react-querybuilder';
import { getCompatContextProvider } from 'react-querybuilder';
import { ChakraActionElement } from './ChakraActionElement';
import { ChakraDragHandle } from './ChakraDragHandle';
import { ChakraNotToggle } from './ChakraNotToggle';
import { ChakraShiftActions } from './ChakraShiftActions';
import { ChakraValueEditor } from './ChakraValueEditor';
import { ChakraValueSelector } from './ChakraValueSelector';

export * from './ChakraActionElement';
export * from './ChakraDragHandle';
export * from './ChakraNotToggle';
export * from './ChakraShiftActions';
export * from './ChakraValueEditor';
export * from './ChakraValueSelector';

export const chakraControlElements: ControlElementsProp<FullField, string> = {
  actionElement: ChakraActionElement,
  valueSelector: ChakraValueSelector,
  dragHandle: ChakraDragHandle,
  notToggle: ChakraNotToggle,
  shiftActions: ChakraShiftActions,
  valueEditor: ChakraValueEditor,
};

export const chakraTranslations: Partial<Translations> = {
  removeGroup: { label: <CloseIcon /> },
  removeRule: { label: <CloseIcon /> },
  cloneRuleGroup: { label: <CopyIcon /> },
  cloneRule: { label: <CopyIcon /> },
  ungroupRuleGroup: { label: <UpDownIcon /> },
  lockGroup: { label: <UnlockIcon /> },
  lockRule: { label: <UnlockIcon /> },
  lockGroupDisabled: { label: <LockIcon /> },
  lockRuleDisabled: { label: <LockIcon /> },
  shiftActionDown: { label: <ChevronDownIcon /> },
  shiftActionUp: { label: <ChevronUpIcon /> },
};

export const QueryBuilderChakra: QueryBuilderContextProvider = getCompatContextProvider({
  controlElements: chakraControlElements,
  translations: chakraTranslations,
});
