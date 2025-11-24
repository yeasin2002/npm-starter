// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules with type checking
  ...tseslint.configs.recommendedTypeChecked,

  // Global configuration
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Custom rules
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.config.ts', '*.config.js'],
  }
)
