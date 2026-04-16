import type { UserConfig } from 'tsdown';

const pkgName = 'react-querybuilder_chakra2';

export default (async options => {
  const entryPoint = `src/index.tsx`;

  const commonOptions = {
    sourcemap: true,
    platform: 'neutral',
    dts: { oxc: true },
    ...options,
  } satisfies UserConfig;

  const productionOptions = {
    minify: true,
    define: { NODE_ENV: 'production' },
  } satisfies UserConfig;

  const opts: UserConfig[] = [
    // ESM, standard bundler dev, embedded `process` references
    {
      ...commonOptions,
      entry: { [pkgName]: entryPoint },
      format: 'esm',
      clean: true,
    },
    // ESM, Webpack 4 support. Target ES2017 syntax to compile away optional chaining and spreads
    {
      ...commonOptions,
      entry: { [`${pkgName}.legacy-esm`]: entryPoint },
      // ESBuild outputs `'.mjs'` by default for the 'esm' format. Force '.js'
      outExtensions: () => ({ js: '.js' }),
      target: 'es2017',
      format: 'esm',
    },
    // ESM for use in browsers. Minified, with `process` compiled away
    {
      ...commonOptions,
      ...productionOptions,
      entry: { [`${pkgName}.production`]: entryPoint },
      format: 'esm',
      outExtensions: () => ({ js: '.mjs' }),
    },
    // CJS development
    {
      ...commonOptions,
      entry: { [`${pkgName}.cjs.development`]: entryPoint },
      format: 'cjs',
      outDir: './dist/cjs/',
    },
    // CJS production
    {
      ...commonOptions,
      ...productionOptions,
      entry: { [`${pkgName}.cjs.production`]: entryPoint },
      format: 'cjs',
      outDir: './dist/cjs/',
      onSuccess: async () => {
        const prodfilename = `${pkgName}.cjs.production.js`;
        const devfilename = `${pkgName}.cjs.development.js`;

        await Promise.all([
          Bun.write(
            `dist/cjs/index.js`,
            `'use strict';
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${prodfilename}');
} else {
  module.exports = require('./${devfilename}');
}
`
          ),
          Bun.write(`dist/cjs/index.d.ts`, `export * from './${devfilename}';`),
        ]);
      },
    },
  ];

  return opts;
}) as (options: UserConfig) => Promise<UserConfig[]>;
