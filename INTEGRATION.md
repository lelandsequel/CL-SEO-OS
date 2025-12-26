# SEO OS — Integration Guide (Existing Site)

SEO OS provides programmatic SEO and AEO modules that attach to an
existing website.

## Supported Environments
- Next.js (App Router preferred)
- Any framework with dynamic routing

## What SEO OS Adds
- Programmatic Service Pages
- Programmatic Location Pages
- AEO Guide Pages
- Centralized Schema (JSON-LD)
- Sitemap Integration

## What SEO OS Does NOT Do
- Redesign the site
- Change existing URLs
- Modify core marketing pages
- Add aggressive CTAs

## Required Inputs
The host site must provide:
- services.json
- locations.json
- base layout component
- routing support

## High-Level Integration Steps
1. Choose an adapter from /adapters
2. Copy dynamic routes into the host site
3. Replace hardcoded content with data-driven templates
4. Wire schema + sitemap utilities
5. Preserve all existing design and layout

## IMPORTANT RULE
SEO OS pages must be generated from data files.
Do NOT hardcode service or location content.
