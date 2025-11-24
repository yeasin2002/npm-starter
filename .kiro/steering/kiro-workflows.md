# Kiro Development Workflows

## Adding New Features

### 1. Create Source Files

```typescript
// src/newFeature.ts
/**
 * Feature description with JSDoc
 * @param param - Parameter description
 * @returns Return value description
 */
export const newFunction = (param: string) => {
  // Implementation
}
```

### 2. Export Through Index

```typescript
// src/index.ts
export * from './newFeature'
```

### 3. Add Tests (if requested)

```typescript
// test/newFeature.test.ts
import { newFunction } from '../src/newFeature'
import { test, expect } from 'vitest'

test('newFunction works correctly', () => {
  expect(newFunction('input')).toBe('expected')
})
```

### 4. Validate Changes

- Run `getDiagnostics` on modified files
- Execute `pnpm run lint` to check code quality
- Run `pnpm run test` if tests were added

## Code Modification Workflow

### For Small Changes

Use `strReplace` with sufficient context:

```typescript
// Include 2-3 lines before and after for uniqueness
oldStr: `  const oldValue = 'old'
  return oldValue
}`

newStr: `  const newValue = 'new'
  return newValue
}`
```

### For Multiple Independent Changes

Invoke `strReplace` simultaneously for all changes:

```typescript
// Change 1 in file1.ts
// Change 2 in file2.ts
// Change 3 in file1.ts (different location)
// All invoked in parallel
```

### For New Files

Use `fsWrite` for initial content, then `fsAppend` if needed:

```typescript
// Create file with core structure
fsWrite('src/feature.ts', coreContent)

// Add additional functions
fsAppend('src/feature.ts', additionalFunctions)
```

## Testing Workflow

### Run Tests

```bash
pnpm run test              # Single run
pnpm run test:coverage     # With coverage
pnpm run dev               # Watch mode (manual)
```

### Check Coverage

Coverage thresholds: 80% for lines, functions, branches, statements

### Validate Types

```bash
pnpm run typecheck         # One-time check
pnpm run typecheck:watch   # Watch mode (manual)
```

## Build & Release Workflow

### Pre-Release Checks

```bash
pnpm run ci                # Full CI pipeline
```

This runs:

1. Build (`pnpm run build`)
2. Format check (`pnpm run format:check`)
3. Export validation (`pnpm run check-exports`)
4. Linting (`pnpm run lint`)
5. Tests (`pnpm run test`)

### Create Changeset

```bash
npx changeset
```

Follow prompts to:

- Select change type (major/minor/patch)
- Describe changes for changelog

### Version & Publish

```bash
pnpm run local-release     # Local testing
# Or push to trigger CI/CD
```

## Documentation Workflow

### Generate API Docs

```bash
pnpm run docs              # One-time generation
pnpm run docs:watch        # Watch mode (manual)
```

### Update README

When adding features:

1. Update feature list
2. Add usage examples
3. Update API documentation section
4. Add to table of contents if needed

### JSDoc Comments

Always include for public APIs:

````typescript
/**
 * Brief description of function
 *
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter
 * @returns Description of return value
 * @throws {ErrorType} When error occurs
 * @example
 * ```typescript
 * const result = myFunction('value')
 * ```
 */
````

## Git Workflow

### Commit Messages

Follow Conventional Commits:

```bash
feat: add new feature
fix: resolve bug in utils
docs: update README
chore: update dependencies
test: add tests for feature
refactor: improve code structure
perf: optimize performance
style: format code
ci: update workflow
```

### Pre-Commit Hooks

Automatic on commit:

- Commitlint validates message format
- Prettier formats staged files
- ESLint checks and fixes issues

### Branch Strategy

- `main` - Production-ready code
- Feature branches - New development
- Release PRs - Created by Changesets

## Debugging Workflow

### Check Diagnostics

```typescript
getDiagnostics(['src/file.ts'])
```

### Review Build Output

```bash
pnpm run build
# Check dist/ directory
```

### Validate Exports

```bash
pnpm run check-exports
```

### Analyze Bundle Size

```bash
pnpm run size              # Check size
pnpm run size:why          # Detailed analysis
```

## Security Workflow

### Audit Dependencies

```bash
pnpm run audit
```

### Review Dependabot PRs

- Check weekly dependency updates
- Review security patches
- Test before merging

## Cleanup Workflow

### Remove Build Artifacts

```bash
pnpm run clean
```

Removes:

- `dist/` - Build output
- `coverage/` - Test coverage
- `docs/` - Generated documentation
- `.turbo/` - Turbo cache
- `node_modules/.cache/` - Package manager cache
