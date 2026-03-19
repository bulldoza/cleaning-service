# AI Practices for Web Design and Development (2026)

## 1. Overall Principles
- Use AI as an accelerator, not an authority; humans own architecture, security, and product decisions.[web:87][web:91]
- Start with clear intent: describe the goal, constraints, and context before asking AI for code or designs.[web:92]
- Prefer many small, well-scoped AI calls (components, functions, tests) over single “build the whole app” prompts.[web:91][web:93]
- Default to human review of any AI output that affects production systems.[web:67][web:90]

## 2. Prompting and Workflow
- Always give AI the surrounding context: file snippets, data models, requirements, and constraints.[web:92]
- Ask for both high-level reasoning and concrete output (e.g., “explain your approach, then give the code”).[web:92]
- Request variants when stakes are high, then choose or merge the best parts manually.[web:92]
- Capture effective prompts as reusable snippets in your project docs or CLAUDE.md.[web:91]

## 3. AI for Coding
- Use AI to generate boilerplate, repetitive patterns, and glue code (CRUD handlers, simple forms, mapping layers).[web:88][web:93]
- Let AI draft functions in isolation; you decide component boundaries, rendering strategy, and state management.[web:87]
- Ask AI to refactor for readability, naming consistency, and modularization once logic is correct.[web:88]
- Use cheaper/faster models for autocomplete and boilerplate; reserve more capable models for complex reasoning.[web:93]

## 4. AI Code Review
- Combine AI review with human review; treat “AI + human” as the gold standard.[web:92][web:97]
- Automate an initial AI review step in the IDE or PR that checks style, basic bugs, and common security issues.[web:90][web:97]
- Require “prompt & intent disclosure” in PRs so reviewers know what AI was asked to do.[web:90][web:97]
- Ask specialized AI agents (or separate prompts) for:
  - Security-focused review (injection, auth, secrets handling).[web:94]
  - Performance review (hot paths, N+1 queries, algorithmic complexity).[web:94]
  - Requirements alignment (does code actually meet the ticket/acceptance criteria?).[web:94]
- Prioritize findings by severity; configure which categories can block merges vs. which are advisory.[web:94]

## 5. AI for Testing and QA
- Use AI to generate tests before the feature exists: unit tests, integration cases, and edge scenarios.[web:86]
- Ask AI to propose test matrices (browsers, devices, roles, states) for critical user flows.[web:88]
- Let AI draft E2E test scripts, then harden selectors and flows manually.[web:47][web:49]
- Use AI-based tools to:
  - Do visual regression checks on key pages.[web:88]
  - Suggest edge cases from logs and past incidents.[web:53]
  - Self-heal brittle locators where possible, while still reviewing changes.[web:47]

## 6. AI for Performance and Optimization
- Ask AI to analyze bundle reports, flame charts, or performance logs and suggest focused optimizations.[web:87][web:88]
- Use AI to propose alternative implementations (e.g., memoization, virtualization, caching) but benchmark before adopting.[web:87]
- Keep performance decisions human-owned: SSR vs SSG vs CSR, server vs client components, and caching strategies.[web:87]
- Use AI to scan for obvious anti-patterns: heavy libraries for trivial tasks, unnecessary re-renders, chatty APIs.[web:91]

## 7. AI for UX, Content, and Personalization
- Use AI to draft copy, microcopy, and UX text, then refine for voice, clarity, and ethics.[web:89]
- Ask AI to propose layout or component variations, but validate against accessibility and design system rules.[web:89][web:91]
- For personalization:
  - Start with small, explainable changes (ordering, highlighting, simple content swaps).[web:91]
  - Avoid opaque “black box” behaviors that confuse users or break consistency.[web:91]
  - Respect privacy and consent; only personalize using data the user has agreed to share.[web:67]

## 8. Human–AI Collaboration Patterns
- Establish explicit division of labor:
  - AI: boilerplate, suggestions, first drafts, pattern detection.
  - Humans: architecture, trade-offs, security boundaries, product decisions.[web:87][web:91]
- Build a culture of open experimentation plus skepticism: “AI is helpful, but must be verified.”[web:49][web:95]
- Train team members on both tool usage and AI limitations; upskilling is part of adoption.[web:49][web:46]
- Use continuous feedback loops: review AI output, correct it, and feed that back into future prompts.[web:46][web:95]

## 9. Governance, Risk, and Compliance
- Treat AI output as untrusted code or content until it has:
  - Passed automated checks (lint, tests, security scanners).
  - Been manually reviewed for correctness and context.[web:67][web:90]
- Log where AI was used (files, PRs, flows) for auditability and incident analysis.[web:97][web:94]
- Set clear policies on:
  - What data can be sent to AI tools.
  - Which tools are approved for which tasks.
  - When human sign-off is mandatory.[web:95][web:91]
- Avoid single-vendor lock-in; keep prompts, practices, and abstractions portable across tools.[web:46][web:93]

## 10. When Not to Use AI
- Do not rely on AI alone for:
  - Security-sensitive logic (auth, payments, encryption).
  - Complex domain rules with regulatory impact.
  - Final product decisions, estimates, or legal/privacy wording.[web:67][web:95]
- Avoid AI “full-app generation” for production; use it only for prototypes you will heavily review and rewrite.[web:87][web:91]
- If AI output is harder to understand than writing it yourself, discard it and simplify your request or solution.[web:93]

## 11. Secure AI-Generated Code (Latest Practices)

- Assume all AI-generated code is untrusted by default and subject it to the same or stricter controls as human-written code.[web:98][web:99]

### 11.1 Pre‑Generation Security
- Use security-focused prompts (e.g., “follow OWASP Top 10 and avoid hardcoded secrets”) to increase the chance of secure output.[web:98][web:111]
- Prefer AI suggestions that reuse existing, hardened libraries and utilities instead of inventing new helpers.[web:99]
- Disallow AI from writing certain categories of code directly (auth, payments, crypto, key management); require human ownership there.[web:98][web:101]

### 11.2 Static and Supply Chain Scanning
- Enforce SAST on every AI-generated change in CI/CD (e.g., via OWASP-aligned tools); block merges on high/critical issues.[web:98][web:101]
- Run SCA on any new dependencies introduced by AI to catch components with known vulnerabilities and license risks.[web:101][web:103]
- Maintain an SBOM (e.g., CycloneDX) so you can track and patch vulnerable libraries and AI-suggested components quickly.[web:101][web:111]

### 11.3 Dynamic and Runtime Validation
- Use DAST against test/staging environments to find injection, auth, and access-control flaws that static tools miss.[web:98][web:101]
- Add API security scanning and fuzzing for AI-generated endpoints and handlers.[web:98][web:106]
- Enforce security headers, strong TLS (TLS 1.2+), and HSTS; verify no hardcoded secrets or keys are present in AI code paths.[web:101][web:106]

### 11.4 Governance and Traceability
- Tag AI-generated files/lines or PRs so you can audit where AI code runs and prioritize review accordingly.[web:98][web:100]
- Define allowed AI use cases and risk tiers: e.g., “prototype only,” “production with mandatory review,” “forbidden in safety‑critical modules.”[web:98][web:107]
- Keep an inventory of AI tools in use (including “shadow AI”) and control what data (source, secrets, PII) may be sent to each.[web:104][web:107]

### 11.5 Developer Training and OWASP Alignment
- Train developers on OWASP Top 10 (2021) and secure coding so they can recognize when AI proposes insecure patterns.[web:103][web:106]
- Require reviewers to check AI code specifically for:
  - Broken access control and injection issues.
  - Cryptographic misuse, insecure design, and supply‑chain risks.[web:106][web:111]
- Regularly red‑team AI-assisted workflows to discover new failure modes and feed findings back into prompts, linters, and policies.[web:101][web:110]
