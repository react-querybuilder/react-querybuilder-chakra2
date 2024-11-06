import type { BaseOption, Field, RuleGroupType, RuleGroupTypeIC } from 'react-querybuilder';
import { convertToIC, defaultOperators, generateID } from 'react-querybuilder';
import { musicalInstruments } from './musicalInstruments';

const dos = defaultOperators as BaseOption[];

export const fields: Field[] = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
    defaultOperator: 'beginsWith',
  },
  { name: 'age', label: 'Age', inputType: 'number' },
  {
    name: 'isMusician',
    label: 'Is a musician',
    valueEditorType: 'checkbox',
    operators: dos.filter(op => op.name === '='),
    defaultValue: false,
  },
  {
    name: 'instrument',
    label: 'Primary instrument',
    valueEditorType: 'select',
    values: musicalInstruments,
    defaultValue: 'Cowbell',
    operators: dos.filter(op => op.name === '=' || op.name === 'in'),
  },
  {
    name: 'alsoPlays',
    label: 'Also plays',
    valueEditorType: 'multiselect',
    values: musicalInstruments,
    defaultValue: 'More cowbell',
    operators: dos.filter(op => op.name === 'in'),
  },
  {
    name: 'gender',
    label: 'Gender',
    operators: dos.filter(op => op.name === '='),
    valueEditorType: 'radio',
    values: [
      { name: 'M', label: 'Male' },
      { name: 'F', label: 'Female' },
      { name: 'O', label: 'Other' },
    ],
  },
  { name: 'height', label: 'Height', inputType: 'number' },
  { name: 'job', label: 'Job' },
  { name: 'email', label: 'Email', inputType: 'email' },
  { name: 'description', label: 'Description', valueEditorType: 'textarea' },
  { name: 'birthdate', label: 'Birth Date', inputType: 'date' },
  { name: 'datetime', label: 'Show Time', inputType: 'datetime-local' },
  { name: 'alarm', label: 'Daily Alarm', inputType: 'time' },
  {
    name: 'groupedField1',
    label: 'Grouped Field 1',
    comparator: 'groupNumber',
    groupNumber: 'group1',
    valueSources: ['field', 'value'],
  },
  {
    name: 'groupedField2',
    label: 'Grouped Field 2',
    comparator: 'groupNumber',
    groupNumber: 'group1',
    valueSources: ['field', 'value'],
  },
  {
    name: 'groupedField3',
    label: 'Grouped Field 3',
    comparator: 'groupNumber',
    groupNumber: 'group1',
    valueSources: ['field', 'value'],
  },
  {
    name: 'groupedField4',
    label: 'Grouped Field 4',
    comparator: 'groupNumber',
    groupNumber: 'group1',
    valueSources: ['field', 'value'],
  },
];

export const emptyQuery: RuleGroupType = { combinator: 'and', rules: [] };
export const emptyQueryIC: RuleGroupTypeIC = convertToIC(emptyQuery);

export const initialQuery: RuleGroupType = {
  id: generateID(),
  combinator: 'and',
  not: false,
  rules: [
    {
      id: generateID(),
      field: 'firstName',
      value: 'Stev',
      operator: 'beginsWith',
    },
    {
      id: generateID(),
      field: 'lastName',
      value: 'Vai, Vaughan',
      operator: 'in',
    },
    {
      id: generateID(),
      field: 'age',
      operator: '>',
      value: '28',
    },
    {
      id: generateID(),
      combinator: 'or',
      rules: [
        {
          id: generateID(),
          field: 'isMusician',
          operator: '=',
          value: true,
        },
        {
          id: generateID(),
          field: 'instrument',
          operator: '=',
          value: 'Guitar',
        },
      ],
    },
    {
      id: generateID(),
      field: 'groupedField1',
      operator: '=',
      value: 'groupedField4',
      valueSource: 'field',
    },
    {
      id: generateID(),
      field: 'birthdate',
      operator: 'between',
      value: '1954-10-03,1960-06-06',
    },
  ],
};

export const initialQueryIC: RuleGroupTypeIC = convertToIC(initialQuery);
