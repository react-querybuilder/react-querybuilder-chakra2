## @react-querybuilder/chakra2

Official [react-querybuilder](https://npmjs.com/package/react-querybuilder) compatibility package for [Chakra UI version 2](https://chakra-ui.com/).

> [!WARNING]
>
> This package is only compatible with Chakra UI **version 2**.
>
> For Chakra UI version 3 compatibility, use [`@react-querybuilder/chakra`](https://npmjs.com/package/@react-querybuilder/chakra) >= 8.

- [Demo (using latest Chakra UI)](https://react-querybuilder.js.org/demo/chakra)
- [Full documentation](https://react-querybuilder.js.org/)
- [CodeSandbox](https://react-querybuilder.js.org/sandbox?t=chakra2) / [StackBlitz](https://react-querybuilder.js.org/sandbox?p=stackblitz&t=chakra2) example projects

![Screenshot](./screenshot.png)

## Installation

```bash
npm i react-querybuilder @react-querybuilder/chakra @chakra-ui/icons @chakra-ui/react @chakra-ui/system @emotion/react @emotion/styled framer-motion
# OR yarn add / pnpm add / bun add
```

## Usage

To configure the query builder to use Chakra-compatible components, place `QueryBuilderChakra` above `QueryBuilder` and beneath `ChakraProvider` in the component hierarchy.

```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryBuilderChakra } from '@react-querybuilder/chakra';
import { useState } from 'react';
import { type Field, QueryBuilder, type RuleGroupType } from 'react-querybuilder';

const chakraTheme = extendTheme();

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

export function App() {
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: 'and',
    rules: [],
  });

  return (
    <ChakraProvider theme={chakraTheme}>
      <QueryBuilderChakra>
        <QueryBuilder fields={fields} defaultQuery={query} onQueryChange={setQuery} />
      </QueryBuilderChakra>
    </ChakraProvider>
  );
}
```

> [!NOTE]
>
> Some additional styling may be necessary. We recommend the following:
>
> ```css
> .queryBuilder .chakra-select__wrapper {
>   width: fit-content;
>   display: inline-block;
> }
>
> .queryBuilder .chakra-input {
>   width: auto;
>   display: inline-block;
> }
>
> .queryBuilder .chakra-radio-group {
>   display: inline-block;
> }
> ```

`QueryBuilderChakra` is a React context provider that assigns the following props to all descendant `QueryBuilder` elements. The props can be overridden on the `QueryBuilder` or used directly without the context provider.

| Export                  | `QueryBuilder` prop             |
| ----------------------- | ------------------------------- |
| `chakraControlElements` | `controlElements`               |
| `chakraTranslations`    | `translations`                  |
| `ChakraActionElement`   | `controlElements.actionElement` |
| `ChakraDragHandle`      | `controlElements.dragHandle`    |
| `ChakraNotToggle`       | `controlElements.notToggle`     |
| `ChakraValueEditor`     | `controlElements.valueEditor`   |
| `ChakraValueSelector`   | `controlElements.valueSelector` |

> [!TIP]
>
> By default, this package uses icons from `@chakra-ui/icons` for button labels. To reset button labels to their default strings, use `defaultTranslations` from `react-querybuilder`.
>
> ```tsx
> <QueryBuilderChakra translations={defaultTranslations}>
> ```
