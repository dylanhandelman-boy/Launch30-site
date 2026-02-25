---
name: full-audit
description: Run all audit agents in parallel — timezone, theme, security, pricing, accessibility, performance — and synthesize results into one report
user-invocable: true
allowed-tools: Read, Grep, Glob, Bash, Edit, Write, Task
argument-hint: "[file-or-scope]"
---

# Full Audit — Orchestrator

Run the complete audit suite in parallel and synthesize results into a single actionable report.

**Scope:** $ARGUMENTS (default: full codebase)

## Strategy

Launch audit agents in parallel using the Task tool, then combine their findings into a unified report ranked by severity.

## Step 1: Launch Parallel Audits

Spawn ALL of these as parallel Task agents (subagent_type: Explore). Each gets its own forked context so they don't interfere.

### Wave 1 — Launch simultaneously:

1. **Security Audit**
   - Prompt: "Run the security-audit skill. Check for: hardcoded secrets, API routes missing auth checks, payment amount tampering risks, injection vulnerabilities (XSS, SQL), data exposure in API responses, missing rate limiting. Report findings with severity, file:line, problem, and fix."

2. **Accessibility Audit**
   - Prompt: "Run the a11y-audit skill. Focus on the primary conversion flow. Check: semantic HTML, ARIA labels on interactive elements, keyboard navigation (focus-visible, escape key), color contrast ratios, form accessibility (labels, error messages), touch target sizes (44px minimum). Report findings with severity, file:line, problem, and fix."

3. **Performance Audit**
   - Prompt: "Run the perf-audit skill. Check: unnecessary 'use client' directives, large client components that could be split, missing next/image usage, missing Suspense boundaries, client-side fetching that could be server-side, heavy dependencies not dynamically imported. Report findings with severity, file:line, problem, and fix."

## Step 2: Collect Results

Wait for all agents to complete. Extract findings from each.

## Step 3: Synthesize Report

Combine all findings into a single report, deduplicated and ranked:

```
# Full Audit Report

## Summary
| Audit | Critical | High | Medium | Low |
|-------|----------|------|--------|-----|
| Security | X | X | X | X |
| Accessibility | X | X | X | X |
| Performance | X | X | X | X |
| **Total** | **X** | **X** | **X** | **X** |

## Critical Issues (fix immediately)
1. [SECURITY] file:line — Description → Fix
2. [A11Y] file:line — Description → Fix
...

## High Issues (fix before next deploy)
...

## Medium Issues (fix soon)
...

## Low Issues (nice to have)
...

## Passed Checks
- [list of categories that came back clean]

## Recommended Fix Order
1. [highest impact, easiest fix first]
```

## Step 4: Offer to Fix

After presenting the report, ask:
"Want me to fix the critical and high issues now?"

If yes, create a todo list and work through fixes systematically, running `/preflight` at the end.
