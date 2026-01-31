# CI/CD Setup Guide

## Quick Start

### 1. Push Workflow File to GitHub

The GitHub Actions workflow has been created at `.github/workflows/test.yml`

```bash
git add .github/workflows/test.yml
git commit -m "Add GitHub Actions CI/CD workflow for automated testing"
git push origin main
```

### 2. Monitor First Run

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Tests** workflow
4. Watch the workflow execute in real-time

### 3. View Test Results

Once complete, you'll see:
- ✅ Test results for Node.js 18.x
- ✅ Test results for Node.js 20.x
- ✅ Coverage reports
- ✅ Build verification

## Workflow Details

### What Happens on Push/PR

When you push code or create a PR:

1. **Automatic Checkout**: Repository code is cloned
2. **Node.js Setup**: Both Node 18 and 20 are set up
3. **Dependencies Installed**: `npm ci` runs (clean, reproducible install)
4. **Code Quality Checks**:
   - ESLint runs
   - TypeScript type checking
   - No errors block tests (warnings allowed)
5. **Tests Execute**: Jest runs all 69 tests with coverage
6. **Coverage Uploaded**: Reports sent to Codecov (optional)
7. **Build Verification**: Production build is tested

### Current Configuration

**Triggers**:
- `push` to `main` or `develop` branches
- `pull_request` targeting `main` or `develop`

**Node.js Versions**:
- 18.x (LTS)
- 20.x (Latest LTS)

**npm Scripts Used**:
- `npm run lint` - Code quality
- `npm test` - Run tests
- `npm run build` - Build verification

## Setting Up Branch Protection

### Require Tests to Pass Before Merge

1. Go to **Settings** → **Branches**
2. Click **Add rule** under Branch protection rules
3. Enter branch name: `main`
4. Check **Require status checks to pass before merging**
5. Search for and select **Tests** job
6. Check **Require branches to be up to date before merging**
7. Click **Create**

Now PRs cannot be merged until tests pass!

## Codecov Integration (Optional)

### Setup Coverage Tracking

1. Go to [codecov.io](https://codecov.io)
2. Sign in with GitHub
3. Select your repository
4. Coverage reports automatically upload

### View Coverage Badges

Add to README.md:
```markdown
[![codecov](https://codecov.io/gh/nnaveensankar617-tech/spark2026/branch/main/graph/badge.svg)](https://codecov.io/gh/nnaveensankar617-tech/spark2026)
```

## Local Testing Before Push

### Run Same Tests Locally

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test:watch

# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build
npm run build
```

## Troubleshooting

### Workflow not appearing in Actions tab

**Solution**: 
- Ensure file is at `.github/workflows/test.yml`
- Commit and push to GitHub
- Refresh GitHub page (Ctrl+Shift+R)

### Tests fail in GitHub but pass locally

**Possible causes**:
- Node version difference (use 18.x or 20.x locally)
- Missing environment variables
- Path separators (CI uses Linux, not Windows)
- Cache issues

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -r node_modules package-lock.json
npm install

# Run tests exactly as CI does
npm test -- --coverage --watchAll=false
```

### Build fails in CI

**Check**:
- All files are committed (including types, configs)
- No environment-specific files are needed
- Production build works locally: `npm run build`

## Viewing Logs

### Real-time Logs

1. Go to **Actions** tab
2. Click on workflow run
3. Click on **test** job
4. View step-by-step logs

### Download Logs

1. Click **Download logs** button
2. Extract ZIP file
3. View individual step logs

## Customization

### Add More Checks

Example: Add Prettier formatting check:

```yaml
- name: Check formatting
  run: npx prettier --check src/
  continue-on-error: true
```

### Deploy on Success

Example: Deploy to production after tests pass:

```yaml
- name: Deploy
  if: success() && github.ref == 'refs/heads/main'
  run: npm run deploy
```

### Add Slack Notifications

Install GitHub App: Slack GitHub App

Tests will post results to Slack automatically.

## Status Badge

Add workflow status to README:

```markdown
![Tests](https://github.com/nnaveensankar617-tech/spark2026/workflows/Tests/badge.svg?branch=main)
```

## Performance Tips

### Speed Up Workflows

1. **npm cache**: Currently enabled automatically
2. **Parallel jobs**: Extend matrix for more parallel runs
3. **Skip CI**: Add `[skip ci]` to commit message to skip workflow

Example:
```bash
git commit -m "Update docs [skip ci]"
git push
```

## Next Steps

1. ✅ Workflow file created
2. ⬜ Push to GitHub
3. ⬜ Monitor first run in Actions tab
4. ⬜ (Optional) Setup branch protection
5. ⬜ (Optional) Setup Codecov integration
6. ⬜ (Optional) Add badges to README

## Support

For issues with the workflow:
1. Check logs in Actions tab
2. Review `.github/workflows/test.yml` syntax
3. Verify all npm scripts exist in `package.json`
4. Check GitHub Actions documentation: https://docs.github.com/en/actions
