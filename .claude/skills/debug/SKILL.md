# Systematic Debugging

**ALWAYS find root cause before attempting fixes. Symptom fixes are failure.**

## Four-Phase Framework

### Phase 1: Root Cause Investigation
1. Read the full error message — don't skim
2. Reproduce the issue consistently
3. Review recent changes (git diff, git log)
4. Trace data flow from origin to failure point
5. Examine component/module boundaries

**Do not move to Phase 2 without a clear reproduction path.**

### Phase 2: Pattern Analysis
1. Find similar working code in the codebase
2. Compare working vs broken implementations line by line
3. Document every difference
4. Identify missing dependencies or configuration

### Phase 3: Hypothesis & Testing
1. Form ONE specific hypothesis
2. Make ONE change that tests it
3. Verify or disprove before trying anything else
4. **Stop after 3 failed attempts** — reassess the entire model

### Phase 4: Implementation
1. Write a failing test first (if testable)
2. Implement the single minimal fix
3. Verify fix resolves root cause (not just symptoms)
4. If still failing, return to Phase 1

## Red Flag Behaviors (avoid these)
- Rushing toward quick fixes before understanding the problem
- Trying multiple changes simultaneously
- Proposing solutions before completing Phase 1
- Making the same fix attempt repeatedly with minor variations
- Assuming it's the same bug as last time

## Key Insight

Systematic debugging is faster than guesswork. The investigation phase feels slow but prevents 10x more time spent on wrong fixes.

## Common Patterns

```
Error: Cannot read property 'X' of undefined
→ Trace: where is X supposed to come from?
→ Is it async data that hasn't loaded yet?
→ Is it a prop that isn't being passed?

Error: Module not found
→ Check: exact file path, case sensitivity, export name
→ Check: is the package installed? Is the import path correct?

Silent failure (function runs but produces wrong result)
→ Add console.logs at each step to find where value diverges
→ Compare expected vs actual at each transformation
```
