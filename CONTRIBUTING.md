# Contributing to npm-starter

Thank you for your interest in contributing to npm-starter! 🎉

We welcome contributions from everyone. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Development Setup

1. **Fork and Clone**

   ```bash
   git clone https://github.com/your-username/npm-starter.git
   cd npm-starter
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Create a Branch**

   ```bash
   git checkout -b feature/my-feature-name
   ```

4. **Make Your Changes**
   - Write code
   - Add tests
   - Update documentation

5. **Run Tests**

   ```bash
   pnpm test
   pnpm run test:coverage
   ```

6. **Lint Your Code**
   ```bash
   pnpm run lint
   pnpm run format:check
   ```

## Development Workflow

### Project Structure

```
src/          # Source code
test/         # Test files
dist/         # Build output (generated)
examples/     # Usage examples
```

### Adding New Features

1. Create your feature in the `src/` directory
2. Export it from `src/index.ts`
3. Add tests in the `test/` directory
4. Update documentation if needed

### Writing Tests

We use [Vitest](https://vitest.dev/) for testing:

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '../src/myFeature'

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction()).toBe(expected)
  })
})
```

Run tests with:

```bash
pnpm run dev       # Watch mode
pnpm test          # Single run
pnpm run test:coverage  # With coverage report
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) enforced by [Commitlint](https://commitlint.js.org/):

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Code style changes (formatting, semicolons, etc.)
- `refactor:` Code changes that neither fix bugs nor add features
- `perf:` Performance improvements
- `test:` Adding or correcting tests
- `build:` Changes to build system or dependencies
- `ci:` Changes to CI configuration
- `chore:` Other changes that don't modify src or test files
- `revert:` Reverts a previous commit

**Examples:**

```bash
git commit -m "feat: add support for custom options"
git commit -m "fix: handle edge case in add function"
git commit -m "docs: update README with new examples"
```

**Note:** Commitlint will automatically validate your commit messages. Invalid commits will be rejected.

## Pull Request Process

1. **Update Documentation**
   - Update README.md if you add new features
   - Add JSDoc comments to your code

2. **Add Tests**
   - Ensure your changes are covered by tests
   - Maintain or improve code coverage (80%+ is required)

3. **Run Full CI Locally**

   ```bash
   pnpm run ci
   ```

4. **Create a Changeset**

   ```bash
   npx changeset
   ```

   This will prompt you to describe your changes for the changelog.

5. **Push and Create PR**

   ```bash
   git push origin feature/my-feature-name
   ```

   Then create a pull request on GitHub.

6. **Address Review Feedback**
   - Make requested changes
   - Push additional commits to your branch
   - Re-request review when ready

## Code Style

- We use **Prettier** for formatting (runs automatically on commit)
- We use **ESLint** for code quality
- Follow TypeScript best practices
- Write clear, self-documenting code
- Add comments for complex logic

## Testing Guidelines

- Write tests for all new features
- Update tests when fixing bugs
- Aim for high code coverage (80%+)
- Test edge cases and error conditions
- Keep tests simple and focused

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public APIs
- Include code examples where helpful
- Update CHANGELOG.md via changesets

## Reporting Bugs

Found a bug? Please [create an issue](https://github.com/yeasin2002/npm-starter/issues/new?template=bug_report.yml) with:

- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node.js version, OS, etc.)

## Suggesting Features

Have an idea? Please [create a feature request](https://github.com/yeasin2002/npm-starter/issues/new?template=feature_request.yml) with:

- Problem you're trying to solve
- Proposed solution
- Alternative approaches considered

## Questions?

- Open an [issue](https://github.com/yeasin2002/npm-starter/issues)
- Reach out to [@yeasin2002](https://github.com/yeasin2002)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🙏
