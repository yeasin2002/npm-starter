# Release Workflow Setup Guide

This document explains how to set up automated releases for this package.

## Prerequisites

1. **NPM Account**: You need an npm account with publish permissions
2. **GitHub Repository**: Repository must be on GitHub
3. **Repository Secrets**: Configure the following secrets in your GitHub repository

## Setup Steps

### 1. Create NPM Access Token

1. Go to [npmjs.com](https://www.npmjs.com/) and log in
2. Click on your profile → "Access Tokens"
3. Click "Generate New Token" → "Classic Token"
4. Select "Automation" type (for CI/CD)
5. Copy the generated token

### 2. Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

### 3. How It Works

The release workflow (`.github/workflows/release.yml`) automatically:

1. **On every push to `main` branch**:
   - Checks for changesets
   - If changesets exist, creates a "Release" PR
   - The PR includes version bumps and CHANGELOG updates

2. **When you merge the Release PR**:
   - Automatically publishes to npm
   - Creates GitHub releases
   - Updates version tags

### 4. Creating a Release

```bash
# 1. Make your changes and commit them
git add .
git commit -m "feat: add new feature"

# 2. Create a changeset
npx changeset
# Follow the prompts:
# - Select the type of change (major/minor/patch)
# - Describe the changes for the changelog

# 3. Commit the changeset
git add .
git commit -m "chore: add changeset"

# 4. Push to main (or create a PR)
git push origin main

# 5. The workflow will create a Release PR automatically
# 6. Review and merge the Release PR to publish
```

## Changeset Types

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Patch** (1.0.0 → 1.0.1): Bug fixes

## Manual Release (Alternative)

If you prefer manual releases:

```bash
# 1. Create and commit changesets as above
npx changeset

# 2. Version the package
pnpm run local-release

# 3. Push changes
git push --follow-tags

# The package will be published via prepublishOnly hook
```

## Troubleshooting

### Release workflow fails with "401 Unauthorized"

- Check that `NPM_TOKEN` secret is set correctly
- Verify the token has publish permissions
- Ensure the token hasn't expired

### No Release PR is created

- Verify there are changesets in `.changeset/` directory
- Check the workflow logs in GitHub Actions
- Ensure you're pushing to the `main` branch

### Package name already exists on npm

- Update the `name` field in `package.json`
- Ensure you have permissions to publish to that package name

## Best Practices

1. **Always create changesets** for user-facing changes
2. **Write clear changeset descriptions** - they become your changelog
3. **Review Release PRs carefully** before merging
4. **Use semantic versioning** appropriately
5. **Test locally** with `pnpm run ci` before pushing

## Additional Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
