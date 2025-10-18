import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

const filename = fileURLToPath(import.meta.url);
const dirname = dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
});

export default [
  // Базовые правила Next.js + TypeScript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Подключаем конфиг Prettier (отключает конфликтующие ESLint-правила)
  prettierConfig,

  // Добавляем сам плагин Prettier
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Запускаем Prettier внутри ESLint
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 100,
          tabWidth: 2,
          endOfLine: 'auto',
        },
      ],
    },
  },

  // Исключаем служебные каталоги
  {
    ignores: ['node_modules/', '.next/', 'out/', 'build/', 'next-env.d.ts'],
  },
];
