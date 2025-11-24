# Tooling Guide

This document provides an overview of all the automated tooling configured in this project.

## 🔍 Code Quality Tools

### ESLint

- **Purpose**: Static code analysis and linting
- **Config**: `eslint.config.js` (ESLint v9 flat config)
- **Run**: `pnpm run lint` or `pnpm run lint:fix`
- **Features**:
  - TypeScript ESLint with type checking
  - Recommended rules enabled
  - Auto-fix on pre-commit

### Prettier

- **Purpose**: Code formatting
- **Config**: `.prettierrc`
- **Run**: `pnpm run format:write` or `pnpm run format:check`
- **Settings**:
  - Single quotes
  - No semicolons
  - 100 character line width
  - 2 space indentation

### TypeScript

- **Purpose**: Type checking and compilation
- **Config**: `tsconfig.json`
- **Run**: `tsc` (included in `pnpm run lint`)
- **Features**:
  - Strict mode enabled
  - ES2022 target
  - Declaration files generated

## ✅ Commit Quality

### Commitlint

- **Purpose**: Enforce conventional commit messages
- **Config**: `commitlint.config.js`
- **Hook**: `.husky/commit-msg`
- **Format**: `type: subject` (e.g., `feat: add new feature`)
- **Allowed types**:
  - `feat`, `fix`, `docs`, `style`, `refactor`
  - `perf`, `test`, `build`, `ci`, `chore`, `revert`

### Husky

- **Purpose**: Git hooks management
- **Config**: `.husky/` directory
- **Hooks**:
  - `pre-commit`: Runs lint-staged
  - `commit-msg`: Runs commitlint

### Lint-staged

- **Purpose**: Run linters on staged files only
- **Config**: `.lintstagedrc.json`
- **Actions**:
  - Format with Prettier
  - Fix with ESLint
  - Only processes staged files for speed

## 🧪 Testing

### Vitest

- **Purpose**: Fast unit testing
- **Config**: `vitest.config.ts`
- **Run**: `pnpm run test` or `pnpm run dev` (watch mode)
- **Features**:
  - Node.js environment
  - Globals enabled
  - Coverage with v8 provider
  - 80% coverage thresholds

## 📦 Build & Package

### tsdown

- **Purpose**: Fast TypeScript bundler
- **Config**: `tsdown.config.ts`
- **Run**: `pnpm run build`
- **Output**:
  - `dist/index.cjs` (CommonJS)
  - `dist/index.js` (ESM)
  - `dist/index.d.ts` (TypeScript declarations)

### Are The Types Wrong (ATTW)

- **Purpose**: Validate package exports
- **Run**: `pnpm run check-exports`
- **Checks**: Ensures CJS/ESM compatibility

## 📝 Version Management

### Changesets

- **Purpose**: Version management and changelog generation
- **Config**: `.changeset/config.json`
- **Usage**:
  ```bash
  npx changeset              # Create a changeset
  pnpm run local-release     # Version and publish locally
  ```
- **Features**:
  - Semantic versioning
  - Automatic CHANGELOG.md generation
  - Multi-package support ready

## 🤖 CI/CD

### GitHub Actions - CI Workflow

- **File**: `.github/workflows/ci.yml`
- **Trigger**: Push and Pull Requests
- **Steps**:
  1. Install dependencies with pnpm
  2. Run full CI pipeline (`pnpm run ci`)
  3. Build, format check, export validation, lint, test

### GitHub Actions - Release Workflow

- **File**: `.github/workflows/release.yml`
- **Trigger**: Push to `main` branch
- **Steps**:
  1. Check for changesets
  2. Create Release PR (if changesets exist)
  3. Publish to npm (when Release PR is merged)
- **Setup**: See `.github/RELEASE_SETUP.md`

### Dependabot

- **File**: `.github/dependabot.yml`
- **Purpose**: Automated dependency updates
- **Schedule**: Weekly on Mondays at 9:00 AM
- **Features**:
  - Groups minor/patch updates
  - Separate groups for dev and prod dependencies
  - Updates GitHub Actions
  - Auto-assigns to maintainer
  - Proper commit message format

## 🔄 Workflow Summary

### Development Workflow

```bash
# 1. Make changes
git checkout -b feature/my-feature

# 2. Write code and tests
# (ESLint and TypeScript provide real-time feedback)

# 3. Commit (commitlint validates, lint-staged runs)
git commit -m "feat: add new feature"

# 4. Push and create PR
git push origin feature/my-feature

# 5. CI runs automatically on PR
# 6. Merge when CI passes
```

### Release Workflow

```bash
# 1. Create changeset
npx changeset

# 2. Commit changeset
git commit -m "chore: add changeset"

# 3. Push to main
git push origin main

# 4. Release workflow creates Release PR
# 5. Review and merge Release PR
# 6. Package automatically publishes to npm
```

## 📊 Quality Gates

All PRs must pass:

- ✅ Build succeeds
- ✅ All tests pass
- ✅ Code is formatted (Prettier)
- ✅ No linting errors (ESLint)
- ✅ Type checking passes (TypeScript)
- ✅ Package exports are valid (ATTW)
- ✅ Coverage thresholds met (80%)
- ✅ Commit messages follow convention

## 🛠️ Maintenance

### Updating Dependencies

- Dependabot creates PRs weekly
- Review and merge dependency update PRs
- Or manually: `pnpm update`

### Updating Tooling

- ESLint: Update rules in `eslint.config.js`
- Prettier: Update settings in `.prettierrc`
- Commitlint: Update rules in `commitlint.config.js`
- Vitest: Update config in `vitest.config.ts`

## 📚 Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Changesets](https://github.com/changesets/changesets)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Commitlint](https://commitlint.js.org/)
- [Husky](https://typicode.github.io/husky/)
