# NPM Starter

A production-ready starter template for creating modern NPM packages with TypeScript, featuring comprehensive tooling for testing, formatting, type-checking, and automated releases.

[![CI](https://github.com/yeasin2002/npm-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/yeasin2002/npm-starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **📦 TypeScript First** - Full TypeScript support with strict configuration
- **⚡ Modern Build System** - Uses [tsdown](https://github.com/egoist/tsdown) for fast builds with dual CJS/ESM output
- **🧪 Testing Ready** - Configured with [Vitest](https://vitest.dev/) for fast unit testing
- **🎨 Code Formatting** - Pre-configured [Prettier](https://prettier.io/) with sensible defaults
- **🔍 Type Safety** - Automatic type checking and export validation with [@arethetypeswrong/cli](https://github.com/arethetypeswrong/arethetypeswrong.github.io)
- **📝 Changesets** - Version management and changelog generation with [Changesets](https://github.com/changesets/changesets)
- **🪝 Git Hooks** - Pre-commit hooks with [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged)
- **✅ Commit Linting** - Enforce conventional commits with [Commitlint](https://commitlint.js.org/)
- **🤖 CI/CD** - GitHub Actions workflows for automated testing and releases
- **🔄 Automated Updates** - Dependabot configuration for dependencies and GitHub Actions
- **🔒 Security Audits** - Automated security scanning with scheduled workflows
- **📏 Bundle Size Monitoring** - Track package size with size-limit
- **🐛 VS Code Integration** - Debug configurations and extension recommendations
- **📚 Dual Format** - Supports both CommonJS and ESM modules

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
├── .changeset/          # Changeset configuration
├── .github/
│   ├── workflows/
│   │   └── ci.yml      # CI/CD pipeline
│   └── dependabot.yml  # Dependency updates
├── .husky/             # Git hooks
├── src/
│   ├── index.ts        # Main entry point
│   └── utils.ts        # Example utilities
├── test/
│   └── utils.test.ts   # Test files
├── dist/               # Build output (generated)
├── package.json
├── tsconfig.json       # TypeScript configuration
├── tsdown.config.ts    # Build configuration
├── .prettierrc         # Prettier configuration
├── .lintstagedrc.json  # Lint-staged configuration
└── README.md
```

## ⚙️ Configuration

### TypeScript Configuration

The project uses a strict TypeScript configuration optimized for library development:

- **Target**: ES2022
- **Module System**: Preserve (supports both CJS and ESM)
- **Strict Mode**: Enabled with additional strictness checks
- **Declaration Files**: Generated for type definitions
- **Source Maps**: Included for debugging

### Build Configuration (tsdown)

```typescript
{
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],  // Dual format output
  dts: true,                // Generate .d.ts files
  outDir: 'dist',
  clean: true               // Clean dist before build
}
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
export const myFunction = () => {
  // Your code here
}

// src/index.ts
export * from './myFeature'
```

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

Before each commit, the following runs automatically:

- **Commitlint** validates commit message format
- **Prettier** formats TypeScript, JavaScript, JSON, and Markdown files
- **ESLint** checks and fixes code quality issues
- Only staged files are processed for faster commits

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

1. **Update package.json**
   - Change `name`, `description`, `keywords`
   - Update `author`, `repository`, and `homepage`
   - Modify `version` as needed

2. **Customize the build**
   - Edit `tsdown.config.ts` to adjust build settings
   - Modify `tsconfig.json` for TypeScript options

3. **Add dependencies**
   - Production: `pnpm add package-name`
   - Development: `pnpm add -D package-name`
   - Peer dependencies: Add to `peerDependencies` in package.json

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Md Kawsar Islam Yeasin**

- Email: mdkawsarislam2002@gmail.com
- Website: [yeasin2002.vercel.app](https://yeasin2002.vercel.app/)
- GitHub: [@yeasin2002](https://github.com/yeasin2002)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/yeasin2002/npm-starter/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Note**: This starter template follows best practices from [Total TypeScript's guide on creating NPM packages](https://www.totaltypescript.com/how-to-create-an-npm-package).
