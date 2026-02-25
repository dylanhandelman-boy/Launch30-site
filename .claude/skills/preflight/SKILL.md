---
name: preflight
description: Run pre-deployment checks — build, tests, security, and common issue detection
user-invocable: true
allowed-tools: Bash(npm *), Bash(npx *), Read, Grep, Glob
argument-hint: "[--skip-tests] [--quick]"
---

# Pre-Flight Checks

Run the full pre-deployment verification. This catches TypeScript errors, broken imports, and common issues before they hit production.

## Steps

### 1. TypeScript Build Check
Run `npm run build` and capture output. This is the most important check — it catches:
- Type mismatches and missing fields
- Bad imports and broken references
- Configuration errors

If the build fails, analyze the error and suggest a fix. Common patterns:
- `Property 'X' does not exist` → missing field in a type or select clause
- `Module not found` → bad import path or missing dependency
- `Type 'X' is not assignable` → type mismatch

### 2. Run Tests
Unless `$ARGUMENTS` contains `--skip-tests`:
```bash
npm test
```

If tests fail, show which tests failed and suggest fixes.

### 3. Quick Scan (unless `--quick` is in arguments)

Scan for common issues:
- **Hardcoded secrets**: Search for API keys, passwords, tokens in source files
- **Missing error handling**: API routes without try/catch
- **Console.log left in**: Production code with debug logs
- **TODO comments**: Unresolved TODOs in recently changed files
- **Missing env vars**: References to `process.env.X` not in `.env.example`

### 4. Report

Summarize results:
- Build: PASS/FAIL
- Tests: X passed, Y failed (or skipped)
- Scan: Issues found (if any)

If everything passes, say "All clear — ready to deploy."
