# Changelog

## [1.0.0] - 2026-01-03

### Added

#### Phase 0: Headless Audit
- **Playwright headless crawler** (`lib/audit/fetch.ts`)
  - Runs chromium in headless mode (no browser UI)
  - Graceful fallback to basic fetch if Playwright fails
  - 30-second timeout per page
  - No "Open in Browser" or agent browser actions

- **Cheerio-based parser** (`lib/audit/crawler.ts`)
  - Replaced regex parsing with robust HTML parsing
  - Improved URL normalization (handles trailing slashes)
  - Better link extraction and signal detection

#### Phase 1: Site Generation
- **Site generator** (`lib/site/generator.ts`)
  - Generates complete Next.js App Router site structure
  - Creates pSEO service pages from business description
  - Generates AEO guide pages
  - Creates location pages (if local business)
  - Generates data files (services.json, guides.json, locations.json)
  - Includes components (Header, Footer)
  - Full TypeScript configuration

#### Orchestrator
- **Main entrypoint** (`lib/seo-os-runner.ts`)
  - `runSeoOsBuild()` - single entrypoint for entire flow
  - Orchestrates: Audit → Site Build → Deck → Proposal
  - Respects toggles (includeAudit, generateDeck, generateProposal)
  - Generates BUILD-SUMMARY.json with all metrics

#### Deck Generation (Enhanced)
- **10 mandatory sections**:
  1. Executive Summary (Before/After)
  2. Audit "Before" (category scores + top issues)
  3. What We Built (counts, structure)
  4. What is SEO (plain language)
  5. What is pSEO + business-specific plan
  6. What is AEO + implementation details
  7. Technical fixes summary
  8. Site structure tree
  9. 30/60/90 roadmap
  10. Next steps / CTA

#### CLI
- **Command-line interface** (`scripts/seoos-cli.ts`)
  ```bash
  pnpm seoos:run -- --url <url> --name "<name>" --desc "<desc>" 
    [--audit true|false] [--deck true|false] [--proposal true|false]
  ```

#### Web UI
- **Next.js web interface** (`web/`)
  - Form-based UI for running builds
  - API route (`/api/run`) for server-side execution
  - Shows results with scores and page counts

### Changed

- **Deck generation** now includes all mandatory sections
- **Proposal generation** includes business-specific pSEO plan
- **BUILD-SUMMARY.json** includes page counts and audit scores

### Fixed

- Removed duplicate roadmap slides in deck
- Fixed module resolution for TypeScript
- Improved error handling in site generator

### Technical Details

- **Dependencies**: playwright, cheerio, next, react
- **TypeScript**: Full type safety throughout
- **Output Structure**:
  ```
  outputs/<slug>/
  ├── audit/
  │   ├── audit.json
  │   ├── audit.md
  │   └── audit-summary.md
  ├── site/          # Next.js site
  ├── data/          # JSON data files
  ├── SEO-STRATEGY-DECK.md
  ├── PROPOSAL.md
  ├── WALKTHROUGH.md
  └── BUILD-SUMMARY.json
  ```

### Guardrails

- No hallucinated claims — uses actual audit data
- Metrics only shown if measured
- Proposal includes top technical remediation items
- pSEO plan is business-specific with actual counts

---

## Migration Notes

### Breaking Changes
None — this is the initial v1.0 release.

### Upgrade Path
If upgrading from pre-v1.0:
1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install chromium`
3. Update scripts to use `runSeoOsBuild()` instead of `runSEOOS()`

