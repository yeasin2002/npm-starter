# Technology Stack

## Build System

- **tsdown**: Fast TypeScript bundler for dual CJS/ESM output
- **TypeScript 5.9+**: Strict mode enabled with modern ES2022 target
- **Module System**: Preserve mode supporting both CommonJS and ESM

## Testing

- **Vitest**: Fast unit testing framework with globals enabled
- **Coverage**: v8 provider with 80% threshold for lines, functions, branches, and statements
- **Environment**: Node.js

## Code Quality

- **ESLint**: TypeScript ESLint with recommended type-checked rules
- **Prettier**: Code formatting with single quotes, no semicolons, 100 char line width
- **Husky + lint-staged**: Pre-commit hooks for automatic formatting and linting

## Package Management

- **pnpm**: Primary package manager (also supports npm, yarn, bun)
- **Changesets**: Version management and changelog generation

## Common Commands

### Development

```bash
pnpm run dev          # Run tests in watch mode
pnpm run build        # Build the package (CJS + ESM + types)
pnpm run lint         # Run ESLint and TypeScript type checking
pnpm run lint:fix     # Auto-fix linting issues
```

### Testing

```bash
pnpm run test              # Run all tests once
pnpm run test:coverage     # Run tests with coverage report
```

### Formatting

```bash
pnpm run format:write      # Format all files with Prettier
pnpm run format:check      # Check formatting without changes
```

### Quality Checks

```bash
pnpm run check-exports     # Validate package exports with ATTW
pnpm run ci                # Run full CI pipeline (build + format + lint + test)
```

### Publishing

```bash
npx changeset              # Create a changeset for version bump
pnpm run local-release     # Version and publish with Changesets
```

## Build Configuration

- **Entry**: `src/index.ts`
- **Output**: `dist/` directory with CJS, ESM, and TypeScript declarations
- **Formats**: Both `.cjs` and `.js` (ESM) files generated
- **Type Definitions**: `.d.ts` files with source maps
