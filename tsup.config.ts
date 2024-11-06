import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { isolatedDeclaration } from 'oxc-transform';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

const generateDTS = async (projDir: string): Promise<void> => {
  const g = new Bun.Glob('**/*.{ts,tsx}');

  const files = g.scan(path.join(projDir, '/src/'));

  let fileCount = 0;

  for await (const filePath of files) {
    // Skip test and test utility files
    if (
      /(_internal|\.test|(t|T)estUtils)\.tsx?$/.test(filePath) ||
      filePath.startsWith('internal/')
    ) {
      continue;
    }

    const originalSource = await Bun.file(path.join(projDir, '/src/', filePath)).text();
    const { code } = isolatedDeclaration(filePath, originalSource);

    // Write the CJS DTS file
    await Bun.write(path.join(projDir, '/dist/types/', filePath.replace(/\.tsx?$/, '.d.ts')), code);

    // Convert DTS file to ESM-in-CJS-context
    const lines = code.split('\n');

    for (const line in lines) {
      const eximLine = lines[line].match(/^(ex|im)port .* from "(\..*)";$/);
      if (eximLine) {
        const resolvedExImPath = path.join(projDir, '/src/', path.parse(filePath).dir, eximLine[2]);
        if (
          (await Bun.file(`${resolvedExImPath}.ts`).exists()) ||
          (await Bun.file(`${resolvedExImPath}.tsx`).exists())
        ) {
          lines[line] = lines[line].replace(/";$/, `.mjs";`);
        } else if (
          (await Bun.file(`${resolvedExImPath}/index.ts`).exists()) ||
          (await Bun.file(`${resolvedExImPath}/index.tsx`).exists())
        ) {
          lines[line] = lines[line].replace(/";$/, `/index.mjs";`);
        }
      }
    }
    await Bun.write(
      path.join(projDir, '/dist/types-esm/', filePath.replace(/\.tsx?$/, '.d.mts')),
      lines.join('\n')
    );

    fileCount++;
  }
  console.log(`${fileCount} DTS files generated.`);
};

const getCjsIndexWriter = (pkgName: string, debug?: boolean) => async (): Promise<void> => {
  await writeFile(
    `dist/cjs/${debug ? 'debug' : 'index'}.js`,
    `'use strict';
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${pkgName}.cjs.production${debug ? '.debug' : ''}.js');
} else {
  module.exports = require('./${pkgName}.cjs.development${debug ? '.debug' : ''}.js');
}
`
  );
};

const tsupCommonConfig = (sourceDir: string) =>
  (async options => {
    const pkgName = `react-querybuilder${sourceDir.endsWith('react-querybuilder') ? '' : `_${sourceDir.split('/').pop()}`}`;
    const x = (await Bun.file(path.join(sourceDir + '/src/index.tsx')).exists()) ? 'x' : '';
    const entryPoint = `src/index.ts${x}`;

    const commonOptions = {
      entry: { [pkgName]: entryPoint },
      sourcemap: true,
      esbuildPlugins: [],
      ...options,
    } satisfies Options;

    const productionOptions = {
      minify: true,
      replaceNodeEnv: true,
    } satisfies Options;

    const opts: Options[] = [
      // ESM, standard bundler dev, embedded `process` references
      {
        ...commonOptions,
        format: 'esm',
        clean: true,
        onSuccess: () => generateDTS(sourceDir),
      },
      // ESM, Webpack 4 support. Target ES2017 syntax to compile away optional chaining and spreads
      {
        ...commonOptions,
        entry: { [`${pkgName}.legacy-esm`]: entryPoint },
        // ESBuild outputs `'.mjs'` by default for the 'esm' format. Force '.js'
        outExtension: () => ({ js: '.js' }),
        target: 'es2017',
        format: 'esm',
      },
      // ESM for use in browsers. Minified, with `process` compiled away
      {
        ...commonOptions,
        ...productionOptions,
        entry: { [`${pkgName}.production`]: entryPoint },
        format: 'esm',
        outExtension: () => ({ js: '.mjs' }),
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
        onSuccess: getCjsIndexWriter(pkgName, false),
      },
    ];

    return opts;
  }) as (options: Options) => Promise<Options[]>;

export default defineConfig(tsupCommonConfig(import.meta.dir));
