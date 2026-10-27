# AGENTS.md — Agent Operating Manual & Repository Guide

This document is the authoritative guide for AI coding assistants and agents working in this repository (`npm-starter`). All agents MUST read, understand, and adhere to the guidelines, constraints, and workflows detailed below.

---

## 1. Project Overview & Architecture

### 1.1 Purpose

`npm-starter` is a production-grade starter template designed for building, testing, bundling, and publishing modern TypeScript packages on NPM. It provides complete dual CommonJS (CJS) and ECMAScript Modules (ESM) support with automated verification, testing, and release workflows.

### 1.2 Directory Layout

```
npm-starter/
├── src/                      # Source code (TypeScript)
│   ├── index.ts              # Main entry point (re-exports all public APIs)
│   └── utils.ts              # Implementation module(s)
├── test/                     # Test suite (Vitest)
│   └── utils.test.ts         # Unit tests (mirrors src/ structure)
├── dist/                     # Bundled output (generated, gitignored)
│   ├── index.cjs             # CommonJS bundle
│   ├── index.js              # ESM bundle
│   └── index.d.ts            # TypeScript declarations + declaration maps
├── .changeset/               # Changeset configuration and change records
├── .github/                  # GitHub Actions CI/CD workflows
│   └── workflows/            # ci.yml, release.yml, docs.yml, security.yml
├── .husky/                   # Git lifecycle hooks (pre-commit, commit-msg)
├── .kiro/                    # Kiro assistant steering and configuration
│   └── steering/             # AI steering documentation and best practices
├── .vscode/                  # Recommended editor settings and launch configs
├── package.json              # Package manifest, scripts, and exports config
├── tsconfig.json             # TypeScript compiler configuration
├── tsdown.config.ts          # tsdown bundler configuration
├── vitest.config.ts          # Vitest testing and coverage configuration
├── eslint.config.js          # ESLint flat configuration (type-checked)
├── .prettierrc               # Prettier code formatting rules
├── .lintstagedrc.json        # lint-staged pre-commit configuration
├── commitlint.config.js      # Commitlint conventional commits configuration
├── knip.json                 # Knip unused exports and dependencies configuration
├── .size-limit.json          # Bundle size budget limits configuration
└── typedoc.json              # TypeDoc documentation generation configuration
```

### 1.3 Module Structure & Public Exports

- **Single Entry Point**: All public APIs must be re-exported through [src/index.ts](file:///d:/programming/templates/npm-starter/src/index.ts) using `export * from './module'`.
- **Conditional Exports**: Configured in [package.json](file:///d:/programming/templates/npm-starter/package.json):
  ```json
  "exports": {
    "./package.json": "./package.json",
    ".": {
      "import": "./dist/index.js",
      "default": "./dist/index.cjs"
    }
  }
  ```
- **Published Artifacts**: Only the `dist/` directory is published to NPM (`files: ["dist"]`). Never include source files or test files in the published package.

---

## 2. Technology Stack & Specifications

| Component               | Technology              | Specification / Configuration Details                                                                                                 |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Language**            | TypeScript 5.9+         | Target: `es2022`, Module: `Preserve`, Strict mode, `verbatimModuleSyntax: true`, `noUncheckedIndexedAccess: true`                     |
| **Bundler**             | `tsdown`                | Outputs dual CJS (`dist/index.cjs`) and ESM (`dist/index.js`), generates `.d.ts` and source maps, auto-cleans `dist/`                 |
| **Testing**             | Vitest 4+               | Node environment, `globals: true`, v8 coverage provider with **80% threshold** across lines, functions, branches, and statements      |
| **Linting**             | ESLint 9+ (Flat Config) | `@eslint/js`, `typescript-eslint` recommendedTypeChecked rules, `no-console: warn`                                                    |
| **Formatting**          | Prettier 3+             | Single quotes (`singleQuote: true`), no semicolons (`semi: false`), print width 100, 2 spaces, trailing commas `es5`, LF line endings |
| **Git Hooks**           | Husky + lint-staged     | Runs `prettier --write` and `eslint --fix` on staged files; validates commit message via `@commitlint`                                |
| **Commit Standard**     | Commitlint              | Conventional Commits (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`)                   |
| **Export Verification** | `@arethetypeswrong/cli` | Validates package type declarations across various module resolution environments                                                     |
| **Bundle Size**         | `size-limit`            | Maximum budget: **10 KB** for ESM and CJS bundles                                                                                     |
| **Documentation**       | TypeDoc                 | Auto-generates markdown/HTML API docs into `docs/` from JSDoc comments                                                                |
| **Dead Code Detection** | Knip                    | Analyzes unused exports, types, and dependencies                                                                                      |
| **Releases**            | Changesets              | Automated versioning, changelog generation, and NPM publishing                                                                        |
| **Package Manager**     | `pnpm` (Primary)        | Fully compatible with `npm`, `yarn`, and `bun`                                                                                        |

---

## 3. Scripts & Command Reference

Always use `pnpm` as the primary package manager.

### 3.1 Development & Build

```bash
pnpm run build          # Build CJS, ESM, and type declarations into dist/
pnpm run clean          # Remove dist/, coverage/, docs/, and build caches
pnpm run typecheck      # Type-check TypeScript without emitting output
pnpm run typecheck:watch# Run TypeScript compiler in watch mode
```

### 3.2 Testing & Coverage

```bash
pnpm run test           # Run all Vitest tests once (non-blocking)
pnpm run test:coverage  # Run tests and generate v8 coverage report
pnpm run dev            # Run tests in watch mode (interactive development)
pnpm run test:watch     # Run Vitest in watch mode
```

### 3.3 Code Quality, Formatting & Verification

```bash
pnpm run lint           # Run ESLint on src/
pnpm run lint:fix       # Run ESLint and auto-fix issues across workspace
pnpm run format:check   # Verify formatting without altering files
pnpm run format:write   # Reformat all files in src/ with Prettier
pnpm run check-exports  # Verify package exports and types with ATTW
pnpm knip               # Scan for unused exports, types, or dependencies
pnpm run size           # Check bundle sizes against size-limit budget
pnpm run size:why       # Inspect detailed breakdown of bundle size
pnpm run audit          # Audit dependencies for security vulnerabilities (moderate+)
pnpm run ci             # Run full CI pipeline (build + format:check + check-exports + lint + test)
```

### 3.4 Documentation & Publishing

```bash
pnpm run docs           # Generate API documentation with TypeDoc
pnpm run docs:watch     # Run TypeDoc in watch mode
npx changeset           # Interactively create a changeset file for versioning
pnpm run local-release  # Version and publish packages locally with Changesets
pnpm run release        # Publish packages to NPM (invoked by CI workflow)
```

---

## 4. Core Agent Operating Rules

Agents working in this codebase must strictly adhere to the following principles:

### 4.1 Minimal Code Principle

- **Write only necessary code**: Focus strictly on the exact requirement.
- **No speculative engineering**: Avoid extra utility functions, unnecessary abstractions, premature generalizations, or unrequested boilerplate.
- **Keep implementations minimal**: When scaffolding or creating skeleton code, provide only essential, working components.

### 4.2 Communication Style

- **Concise & Actionable**: Provide direct, high-signal information using bullet points.
- **No Verbose Duplication**: Do not repeat what was just said or dump execution logs into conversational responses.
- **No Unsolicited Summary Files**: Never create extra summary markdown files unless explicitly requested by the user.

### 4.3 Command Execution Rules (CRITICAL)

- **NEVER use `cd` in shell commands**: Always execute commands using the execution tool's `path` or `Cwd` parameter.
  - ❌ `run_command("cd packages/core && pnpm test")`
  - ✅ `run_command("pnpm test", Cwd="packages/core")`
- **NEVER run blocking/watch processes in non-interactive mode**:
  - Always run tests with single-execution mode (`pnpm run test` or `vitest run`).
  - Do not run `vitest`, `pnpm run dev`, or watcher scripts as one-off commands because they block indefinitely.
- **Background Processes**: Only use daemon/background tools for long-running servers or intended watchers, never for one-off checks.

### 4.4 File Editing Rules

- **Surgical Edits**: Use targeted string replacement for existing files. Do not rewrite entire files unnecessarily.
- **Context & Uniqueness**: Include 2 to 3 lines of surrounding context to ensure replacement targets are distinct and uniquely identified.
- **Parallel Execution**: When multiple independent edits or replacements are needed across files, invoke them in parallel.
- **Exact Whitespace Matching**: Match whitespace, indentation, and line endings exactly.

### 4.5 Testing Approach

- **Add tests when requested or adding features**: Do not invent test suites unless asked or implementing new functionality that requires test validation.
- **File Mirroring**: Place unit tests in `test/<module>.test.ts` mirroring `src/<module>.ts`.
- **Direct Source Imports**: Always import from `../src/<module>` in tests (never import from `dist/`).
- **Globals Enabled**: Vitest globals (`test`, `it`, `expect`, `describe`) are enabled, though explicit imports are also permitted.
- **Coverage Standard**: Maintain the repository requirement of ≥ 80% coverage across lines, statements, functions, and branches.

### 4.6 Diagnostics & Error Handling

- **Diagnostics First**: Inspect compiler and linter diagnostics before running heavy commands.
- **Validate Changes**: Check syntax, types (`pnpm run typecheck`), and lint (`pnpm run lint`) after modifying files.
- **Failure Pivot Rule**: If a proposed fix or implementation fails twice consecutively, stop and re-evaluate. Explain what failed and choose an alternate strategy rather than repeating the same action.

### 4.7 Security & Privacy Boundaries

- **PII Protection**: Substitute real personal data with placeholders (`[name]`, `[email]`, `[phone]`, `[address]`).
- **Reject Malicious Code**: Decline any requests to author malicious, exploitative, or unvetted destructive code.
- **Scope Discipline**: Stay strictly within the bounds of software engineering, library authoring, and repository management.

---

## 5. Standard Agent Workflows

### 5.1 Adding a New Feature or Utility Module

1. **Create the Implementation**:
   - Create `src/<feature>.ts`.
   - Write clean, type-safe functions or classes.
   - Include comprehensive JSDoc documentation:
     ````typescript
     /**
      * Description of what this function does.
      *
      * @param param - Parameter description
      * @returns Description of return value
      * @throws {ErrorType} Explanation of errors thrown
      * @example
      * ```typescript
      * const result = myFunction('value')
      * ```
      */
     export const myFunction = (param: string): string => {
       return param.trim()
     }
     ````
2. **Expose Public API**:
   - Update [src/index.ts](file:///d:/programming/templates/npm-starter/src/index.ts) to re-export the new module:
     ```typescript
     export * from './<feature>'
     ```
3. **Write Unit Tests**:
   - Create `test/<feature>.test.ts`:
     ```typescript
     import { myFunction } from '../src/<feature>'
     import { test, expect } from 'vitest'

     test('myFunction works as expected', () => {
       expect(myFunction('  hello  ')).toBe('hello')
     })
     ```
4. **Validate**:
   - Run type checking: `pnpm run typecheck`
   - Run linting: `pnpm run lint`
   - Run test suite: `pnpm run test:coverage` (ensure ≥ 80% coverage)
5. **Update Documentation**:
   - Update `README.md` if the feature is a core public offering or introduces new developer workflows.

### 5.2 Modifying Existing Code

1. Inspect the target file and any related tests.
2. Apply surgical changes with exact matching context.
3. Validate with `pnpm run typecheck` and `pnpm run lint`.
4. Run `pnpm run test` to verify existing tests continue to pass.

### 5.3 Pre-Release / Full CI Verification

Before pushing changes or proposing a pull request, run the full CI suite:

```bash
pnpm run ci
```

This runs:

1. `pnpm run build` — compiles CJS, ESM, and `.d.ts` bundles to `dist/`.
2. `pnpm run format:check` — verifies Prettier formatting.
3. `pnpm run check-exports` — verifies types and conditional exports with `@arethetypeswrong/cli`.
4. `pnpm run lint` — executes ESLint with type-aware rules.
5. `pnpm run test` — runs the entire Vitest test suite once.

### 5.4 Changeset & Versioning

When introducing changes that affect consumers of the package:

1. Run `npx changeset` to create a changeset record.
2. Select the change level (`patch`, `minor`, or `major`).
3. Provide a clear, conventional summary of the changes for the auto-generated changelog.
4. Format all git commits using Conventional Commits (e.g., `feat: ...`, `fix: ...`, `docs: ...`).

### 5.5 Export & Size Verification

- Validate package resolution: `pnpm run check-exports`
- Ensure the bundle stays within the 10 KB budget: `pnpm run size`

---

## 6. Steering & AI Integration Context

The repository includes steering rules and workflow configurations under `.kiro/steering/`:

- [product.md](file:///d:/programming/templates/npm-starter/.kiro/steering/product.md): Package vision, dual-module objectives, and characteristics.
- [structure.md](file:///d:/programming/templates/npm-starter/.kiro/steering/structure.md): Detailed directory organization, build artifacts, and package exports.
- [tech.md](file:///d:/programming/templates/npm-starter/.kiro/steering/tech.md): Complete tech stack, tooling versions, and essential commands.
- [kiro-best-practices.md](file:///d:/programming/templates/npm-starter/.kiro/steering/kiro-best-practices.md): AI interaction guidelines, file operation rules, and efficiency practices.
- [kiro-features.md](file:///d:/programming/templates/npm-starter/.kiro/steering/kiro-features.md): Kiro IDE capabilities, hooks, specs, and MCP server configuration.
- [kiro-workflows.md](file:///d:/programming/templates/npm-starter/.kiro/steering/kiro-workflows.md): Step-by-step development, testing, release, and git workflows.

### Steering Inclusion Modes

Steering files can specify YAML frontmatter for context inclusion:

- **Always Included** (default): Applied to all interactions.
- **Conditional (`fileMatch`)**: Applied when working on files matching specific glob patterns.
- **Manual**: Applied when explicitly referenced in context.
