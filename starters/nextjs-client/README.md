# New Client Starter — Next.js + SEO OS

## Quick Start

1. Copy this folder to your new client repo
2. Fill in `seo-os.config.ts` with client details
3. Run SEO OS using `SEO-OS-RUNNER.md`
4. Outputs will be generated in `/outputs/{client-slug}/`

---

## Folder Structure

```
your-client-repo/
│
├── seo-os.config.ts      # Client configuration (fill this first)
├── SEO-OS-RUNNER.md      # Prompt to execute SEO OS
│
├── /app                  # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx          # Homepage
│   ├── /services
│   │   └── /[slug]
│   │       └── page.tsx  # Dynamic service pages
│   ├── /conditions       # If enableConditionsPSEO
│   │   └── /[slug]
│   │       └── page.tsx
│   ├── /guides
│   │   └── /[slug]
│   │       └── page.tsx  # AEO guide pages
│   ├── /about
│   │   └── page.tsx
│   └── /contact
│       └── page.tsx
│
├── /data                 # SEO OS generated data
│   ├── services.json
│   ├── conditions.json
│   └── guides.json
│
├── /content              # SEO OS generated content
│   ├── /core
│   ├── /services
│   ├── /conditions
│   └── /guides
│
└── /outputs              # Full SEO OS build outputs
    └── /{client-slug}
```

---

## Configuration

Edit `seo-os.config.ts`:

### Required Fields
- `client.name` — Business name
- `client.domain` — Production URL
- `client.industry` — Industry vertical
- `businessModel.services` — List of services

### Optional Fields
- `conditions` — For medical/legal verticals
- `physicalLocations` — For multi-location businesses
- `presentation.deckDepth` — "light" | "standard" | "heavy"

---

## After SEO OS Runs

1. Copy generated content from `/outputs/` into `/content/`
2. Copy generated data from `/outputs/` into `/data/`
3. Implement Next.js pages that read from `/data/` and render `/content/`
4. Apply schema from `/outputs/schema/` to pages
5. Deploy and submit sitemap

---

## Templates Included

- `seo-os.config.ts` — Configuration template
- `SEO-OS-RUNNER.md` — Execution prompt
- `/app/` — Next.js App Router structure
- `/data/` — Data file placeholders
- `/content/` — Content file placeholders

---

*SEO OS Client Starter | v1.0*
