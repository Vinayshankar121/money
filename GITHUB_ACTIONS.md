# GitHub Actions Workflow Documentation

## Workflow: Tests

**File**: `.github/workflows/test.yml`

### Overview
Automated CI/CD pipeline that runs on every push and pull request to ensure code quality and test coverage.

### Triggers
- **Push**: On any push to `main` or `develop` branches
- **Pull Request**: On any PR targeting `main` or `develop` branches

### Jobs

#### Test Job
Runs on `ubuntu-latest` with Node.js versions: 18.x and 20.x

**Steps**:

1. **Checkout code** (v4)
   - Clones the repository code
   - Uses latest GitHub Actions checkout action

2. **Setup Node.js**
   - Installs specified Node.js version
   - Caches npm dependencies for faster builds
   - Uses `npm ci` for clean installs

3. **Install dependencies**
   - `npm ci` - Clean install ensures reproducible builds
   - Reads from `package-lock.json`

4. **Run linter**
   - `npm run lint`
   - Checks code style and quality
   - `continue-on-error: true` - Won't block further steps if it fails

5. **Run type check**
   - `npx tsc --noEmit`
   - Validates TypeScript compilation
   - No output files generated
   - `continue-on-error: true` - Won't block tests

6. **Run tests**
   - `npm test -- --coverage --watchAll=false`
   - Runs Jest test suite
   - Generates coverage reports
   - Doesn't watch for file changes (CI mode)

7. **Upload coverage to Codecov** (v3)
   - Uploads coverage data to Codecov
   - Useful for tracking coverage trends
   - `continue-on-error: true` - Optional, won't block deployment

8. **Build project**
   - `npm run build`
   - Verifies production build succeeds
   - Uses Vite for building

### Environment Variables
- GitHub automatically provides secrets like `GITHUB_TOKEN`
- Node.js version is injected via matrix strategy

### Caching
- npm dependencies are cached between runs
- Cache key based on `package-lock.json`
- Significantly speeds up workflow execution

### Expected Output

Successful workflow shows:
```
✓ Code checkout
✓ Node.js setup (18.x and 20.x)
✓ Dependencies installed
✓ Linting completed
✓ TypeScript type checking
✓ 68+ tests passed
✓ Coverage reports generated
✓ Production build successful
```

### Workflow Badge

Add this to your README.md to show workflow status:

```markdown
![Tests](https://github.com/nnaveensankar617-tech/spark2026/workflows/Tests/badge.svg)
```

### Configuration Options

#### Matrix Strategy
Currently tests on Node.js 18.x and 20.x. To modify:

```yaml
matrix:
  node-version: [16.x, 18.x, 20.x]  # Add or remove versions
```

#### Branches
Modify which branches trigger the workflow:

```yaml
on:
  push:
    branches: [ main, develop, staging ]
  pull_request:
    branches: [ main, develop ]
```

#### Fail on Warnings
Remove `continue-on-error: true` to fail if linter warnings occur:

```yaml
- name: Run linter
  run: npm run lint
```

### Manual Workflow Runs

Trigger workflow manually from Actions tab in GitHub:
1. Go to **Actions** tab
2. Select **Tests** workflow
3. Click **Run workflow**
4. Select branch and run

### Troubleshooting

#### Workflow fails during installation
- Check `package-lock.json` is committed
- Ensure `package.json` has correct dependencies
- Try clearing cache in Actions settings

#### Tests fail in CI but pass locally
- Check Node.js version mismatch
- Ensure all environment files are committed
- Verify test setup matches CI environment

#### Coverage upload fails
- Codecov setup is optional (`continue-on-error: true`)
- Verify Codecov integration is enabled
- Check Codecov token is valid

### Next Steps

1. **Commit workflow file**:
   ```bash
   git add .github/workflows/test.yml
   git commit -m "Add GitHub Actions CI/CD workflow"
   git push
   ```

2. **Enable branch protection rules**:
   - Go to Settings > Branches
   - Add rule for main branch
   - Require status checks to pass

3. **Setup code coverage tracking**:
   - Sign up at codecov.io
   - Link your GitHub repository
   - Coverage reports will auto-upload

4. **Monitor workflow runs**:
   - Go to Actions tab in GitHub
   - View real-time job logs
   - Check test results and coverage

### Customization Examples

**Run only on main branch**:
```yaml
on:
  push:
    branches: [ main ]
```

**Run on all pull requests regardless of branch**:
```yaml
on:
  pull_request: {}
```

**Add deployment after tests**:
```yaml
- name: Deploy to production
  if: success()
  run: npm run deploy
```

**Send Slack notification on failure**:
```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
```
