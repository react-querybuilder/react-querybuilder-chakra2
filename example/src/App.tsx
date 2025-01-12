import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryBuilderChakra } from '@react-querybuilder/chakra2';
import { useState } from 'react';
import type { Field, RuleGroupType } from 'react-querybuilder';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import './styles.scss';

const chakraTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

const initialQuery: RuleGroupType = {
  combinator: 'and',
  rules: [
    { field: 'firstName', operator: 'beginsWith', value: 'Stev' },
    { field: 'lastName', operator: 'in', value: 'Vai,Vaughan' },
  ],
};

export const App = () => {
  const [query, setQuery] = useState(initialQuery);

  return (
    <div>
      <ChakraProvider theme={chakraTheme}>
        <QueryBuilderChakra>
          <QueryBuilder
            fields={fields}
            query={query}
            onQueryChange={setQuery}
          />
        </QueryBuilderChakra>
      </ChakraProvider>
      <h4>Query</h4>
      <pre>
        <code>{formatQuery(query, 'json')}</code>
      </pre>
    </div>
  );
};
