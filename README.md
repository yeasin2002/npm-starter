# NPM Starter

A production-ready starter template for creating modern NPM packages with TypeScript, featuring comprehensive tooling for testing, formatting, type-checking, and automated releases.

[![CI](https://github.com/yeasin2002/npm-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/yeasin2002/npm-starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### Build & Type System

- **📦 TypeScript 5.9+** - Strict mode with modern ES2022 target and comprehensive type safety
- **⚡ tsdown** - Lightning-fast builds with dual CJS/ESM output and automatic type declarations
- **🔍 Export Validation** - Ensure package exports work correctly with [@arethetypeswrong/cli](https://github.com/arethetypeswrong/arethetypeswrong.github.io)
- **📚 Dual Module Format** - Full CommonJS and ESM support for maximum compatibility

### Testing & Quality

- **🧪 Vitest** - Fast unit testing with globals, coverage reporting, and 80% thresholds
- **🎨 Prettier** - Consistent code formatting (single quotes, no semicolons, 100 char width)
- **🔧 ESLint** - TypeScript-aware linting with type-checked rules
- **📏 size-limit** - Monitor and control bundle size

### Automation & Workflow

- **🪝 Husky + lint-staged** - Pre-commit hooks for automatic formatting and linting
- **✅ Commitlint** - Enforce conventional commits for better changelogs
- **📝 Changesets** - Automated version management and changelog generation
- **🤖 GitHub Actions** - Complete CI/CD pipeline for testing and releases
- **🔄 Dependabot** - Weekly automated dependency updates with proper grouping

### Documentation & Developer Experience

- **📖 TypeDoc** - Auto-generated API documentation from JSDoc comments
- **🐛 VS Code Integration** - Debug configurations and recommended extensions
- **🔒 Security Audits** - Automated dependency scanning
- **🎯 Multiple Package Managers** - Works with npm, yarn, pnpm, or bun

## 🚀 Quick Start

### Installation

```bash
# Clone this repository
git clone https://github.com/yeasin2002/npm-starter.git my-package

# Navigate to the directory
cd my-package

# Install dependencies (supports npm, yarn, pnpm, or bun)
pnpm install
```

### Development

```bash
# Run tests in watch mode
pnpm run dev

# Build the package
pnpm run build

# Run type checking
pnpm run lint

# Run tests
pnpm run test
```

## 📋 Available Scripts

### Development

| Script                     | Description                           |
| -------------------------- | ------------------------------------- |
| `pnpm run dev`             | Run tests in watch mode               |
| `pnpm run build`           | Build the package (CJS + ESM + types) |
| `pnpm run clean`           | Remove build artifacts and caches     |
| `pnpm run typecheck`       | Run TypeScript type checking          |
| `pnpm run typecheck:watch` | Run type checking in watch mode       |

### Testing

| Script                   | Description                    |
| ------------------------ | ------------------------------ |
| `pnpm run test`          | Run all tests once             |
| `pnpm run test:watch`    | Run tests in watch mode        |
| `pnpm run test:coverage` | Run tests with coverage report |

### Code Quality

| Script                  | Description                      |
| ----------------------- | -------------------------------- |
| `pnpm run lint`         | Run ESLint and TypeScript checks |
| `pnpm run lint:fix`     | Auto-fix linting issues          |
| `pnpm run format:write` | Format code with Prettier        |
| `pnpm run format:check` | Check code formatting            |
| `pnpm knip`             | Declutter unused dependencies    |

### Documentation

| Script                | Description                 |
| --------------------- | --------------------------- |
| `pnpm run docs`       | Generate API documentation  |
| `pnpm run docs:watch` | Generate docs in watch mode |

### Security & Size

| Script              | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm run audit`    | Run security audit on dependencies |
| `pnpm run size`     | Check bundle size                  |
| `pnpm run size:why` | Analyze bundle size with details   |

### Release & CI

| Script                   | Description                 |
| ------------------------ | --------------------------- |
| `pnpm run check-exports` | Validate package exports    |
| `pnpm run ci`            | Run full CI pipeline        |
| `pnpm run local-release` | Version and publish locally |
| `pnpm run release`       | Publish to npm (used by CI) |

## 📁 Project Structure

```
npm-starter/
├── .changeset/              # Changeset configuration and pending changes
├── .github/
│   ├── workflows/
│   │   ├── ci.yml          # CI/CD pipeline
│   │   ├── release.yml     # Automated releases
│   │   └── security.yml    # Security audits
│   └── dependabot.yml      # Dependency update configuration
├── .husky/                  # Git hooks (pre-commit, commit-msg)
├── .kiro/                   # Kiro AI assistant configuration
│   └── steering/           # Project-specific AI guidance
├── .vscode/                 # VS Code settings and debug configs
├── src/
│   ├── index.ts            # Main entry point (re-exports all public APIs)
│   └── utils.ts            # Example utilities
├── test/
│   └── utils.test.ts       # Vitest test files
├── dist/                    # Build output (generated, gitignored)
│   ├── index.cjs           # CommonJS bundle
│   ├── index.js            # ESM bundle
│   └── index.d.ts          # TypeScript declarations
├── docs/                    # Generated API documentation (gitignored)
├── coverage/                # Test coverage reports (gitignored)
├── package.json             # Package metadata and scripts
├── tsconfig.json            # TypeScript compiler options
├── tsdown.config.ts         # Build configuration
├── vitest.config.ts         # Test configuration
├── eslint.config.js         # Linting rules
├── .prettierrc              # Code formatting rules
├── .lintstagedrc.json       # Pre-commit hook configuration
├── commitlint.config.js     # Commit message linting
└── README.md
```

## ⚙️ Configuration

### TypeScript Configuration

Strict configuration optimized for library development:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "Preserve", // Supports both CJS and ESM
    "strict": true, // All strict checks enabled
    "noUncheckedIndexedAccess": true, // Extra safety for array/object access
    "noImplicitOverride": true, // Explicit override keyword required
    "declaration": true, // Generate .d.ts files
    "declarationMap": true, // Source maps for declarations
    "sourceMap": true, // Source maps for debugging
    "isolatedModules": true, // Ensure each file can be transpiled independently
    "verbatimModuleSyntax": true // Explicit import/export syntax
  }
}
```

### Build Configuration (tsdown)

```typescript
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // Dual format output
  dts: true, // Generate TypeScript declarations
  outDir: 'dist',
  clean: true, // Clean dist before each build
})
```

### Test Configuration (Vitest)

```typescript
export default defineConfig({
  test: {
    globals: true, // No need to import describe, it, expect
    environment: 'node',
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 80, // 80% coverage required
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
```

### Package Exports

The package is configured to support both modern ESM and legacy CJS:

```json
{
  "exports": {
    "./package.json": "./package.json",
    ".": {
      "import": "./dist/index.js",
      "default": "./dist/index.cjs"
    }
  }
}
```

## 🔧 Development Workflow

### 1. **Adding New Features**

Create new files in the `src/` directory and export them through `src/index.ts`:

```typescript
// src/myFeature.ts
/**
 * Description of your function
 * @param param - Parameter description
 * @returns Return value description
 */
export const myFunction = (param: string) => {
  // Your code here
}

// src/index.ts
export * from './myFeature'
```

Add JSDoc comments to your code for automatic API documentation generation.

### 2. **Writing Tests**

Add test files in the `test/` directory:

```typescript
import { myFunction } from '../src/myFeature'
import { test, expect } from 'vitest'

test('myFunction works', () => {
  expect(myFunction()).toBe(expectedValue)
})
```

### 3. **Commit Conventions**

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in utils"
git commit -m "docs: update README"
```

Commitlint will automatically validate your commit messages.

### 4. **Pre-commit Hooks**

Husky and lint-staged automatically run before each commit:

```json
{
  "*.{ts,tsx,js,jsx}": ["prettier --write", "eslint --fix"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
}
```

- **Commitlint** validates commit message format
- **Prettier** formats all staged files
- **ESLint** checks and auto-fixes TypeScript/JavaScript issues
- Only staged files are processed for speed

### 5. **Continuous Integration & Deployment**

**CI Workflow** - On every push and pull request:

1. ✅ Install dependencies
2. ✅ Build the package
3. ✅ Check code formatting
4. ✅ Validate package exports
5. ✅ Run type checking
6. ✅ Execute all tests

**Release Workflow** - On push to main branch:

1. 🚀 Automatically creates release PRs via Changesets
2. 📦 Publishes to npm when release PR is merged
3. 📝 Updates CHANGELOG.md automatically

**Dependabot** - Automated dependency updates:

- Weekly updates for npm dependencies (grouped by type)
- Weekly updates for GitHub Actions
- Automatic PR creation with proper labels

## 📦 Publishing

### Using Changesets (Recommended)

```bash
# 1. Create a changeset
npx changeset

# 2. Version packages
pnpm run local-release

# The package will be automatically published when you push
```

### Manual Publishing

```bash
# Build and verify
pnpm run ci

# Publish to npm
pnpm publish
```

> **Note**: The `prepublishOnly` script ensures all checks pass before publishing.

## 🛠️ Customization

### 1. Update Package Metadata

Edit `package.json`:

```json
{
  "name": "your-package-name",
  "version": "0.0.1",
  "description": "Your package description",
  "keywords": ["keyword1", "keyword2"],
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/username/repo.git"
  },
  "homepage": "https://github.com/username/repo"
}
```

### 2. Customize Build & TypeScript

**Build settings** (`tsdown.config.ts`):

- Add/remove output formats
- Configure external dependencies
- Adjust bundling options

**TypeScript options** (`tsconfig.json`):

- Change target/lib versions
- Adjust strictness levels
- Modify path mappings

### 3. Configure Code Quality

**ESLint** (`eslint.config.js`):

- Add custom rules
- Configure type-checking behavior
- Adjust ignore patterns

**Prettier** (`.prettierrc`):

- Change formatting preferences
- Adjust line width, quotes, semicolons

### 4. Add Dependencies

```bash
# Production dependencies (bundled with your package)
pnpm add package-name

# Development dependencies (build tools, testing)
pnpm add -D package-name

# Peer dependencies (required by consumers)
# Add to peerDependencies in package.json
```

### 5. Adjust Coverage Thresholds

Edit `vitest.config.ts` to change coverage requirements:

```typescript
coverage: {
  thresholds: {
    lines: 80,      // Adjust as needed
    functions: 80,
    branches: 80,
    statements: 80
  }
}
```

## 🔧 Troubleshooting

### Build Issues

```bash
# Clean all build artifacts and caches
pnpm run clean

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Type Errors

```bash
# Run type checking with detailed output
pnpm run typecheck

# Check for export issues
pnpm run check-exports
```

### Test Failures

```bash
# Run tests with verbose output
pnpm run test -- --reporter=verbose

# Run specific test file
pnpm run test test/utils.test.ts
```

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [tsdown Documentation](https://github.com/egoist/tsdown)
- [Changesets Guide](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Total TypeScript - NPM Package Guide](https://www.totaltypescript.com/how-to-create-an-npm-package)

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Md Kawsar Islam Yeasin**

- Email: [mdkawsarislam2002@gmail.com](mailto:mdkawsarislam2002@gmail.com)
- Website: [yeasin2002.vercel.app](https://yeasin2002.vercel.app/)
- GitHub: [@yeasin2002](https://github.com/yeasin2002)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

See the [issues page](https://github.com/yeasin2002/npm-starter/issues) for known issues and feature requests.

## ⭐ Show Your Support

Give a ⭐️ if this project helped you build better NPM packages!
