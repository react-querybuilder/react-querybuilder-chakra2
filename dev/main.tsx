import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryBuilder } from 'react-querybuilder';
import { QueryBuilderChakra } from '../src';
import './styles.scss';
import { fields, initialQuery } from './constants';

const chakraTheme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        color: 'rebeccapurple',
        fontWeight: 'bold', // Normally "semibold"
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const App = () => {
  return (
    <div id="app">
      <ChakraProvider theme={chakraTheme}>
        <QueryBuilderChakra>
          <QueryBuilder fields={fields} defaultQuery={initialQuery} />
        </QueryBuilderChakra>
      </ChakraProvider>
    </div>
  );
};

createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
