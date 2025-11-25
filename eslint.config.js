import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
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
    rules: { 'no-console': 'warn' },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'docs/**', '*.config.ts', '*.config.js'],
  }
)
