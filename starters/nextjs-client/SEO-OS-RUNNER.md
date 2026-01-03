# SEO OS Runner Prompt

> Paste this prompt into your AI builder (Claude, GPT, etc.) along with your `seo-os.config.ts` to execute a full SEO OS build.

---

## Instructions

1. Open your AI builder
2. Paste the SEO OS++ core prompt (from `/core/seo-os++.md`)
3. Paste this runner prompt
4. Paste your `seo-os.config.ts` contents
5. Execute

---

## Runner Prompt

```
YOU ARE RUNNING SEO OS++ FOR A NEW CLIENT.

PHASE SEQUENCE:
0. Discovery (read-only) — Read and acknowledge all config values
1. Structure Lock — Define URL taxonomy, create data files
2. Core Site Build — Homepage, About, Contact, Navigation
3. pSEO Generation — Service and condition pages
4. AEO Generation — Informational guide pages
5. Trust & Compliance — Disclaimers, schema, E-E-A-T
6. UX / Conversion Polish — CTAs, accessibility, performance
7. Explanation Layer — Presentation deck, maintenance guide

RULES:
- Never invent locations not in config
- Never change URLs once defined
- No sales language in AEO guides
- Apply YMYL rules if regulatoryLevel is "YMYL"
- Referral-based clients get physician CTAs, not patient-direct

CONFIG:
[Paste seo-os.config.ts contents here]

BEGIN PHASE 0 — DISCOVERY.
Acknowledge all config values and confirm understanding before proceeding.
```

---

## Expected Outputs

After execution, your `/outputs/{client-slug}/` directory should contain:

```
outputs/{client-slug}/
├── config.json           # Locked config snapshot
├── data/
│   ├── services.json
│   └── conditions.json   # If enableConditionsPSEO = true
├── content/
│   ├── core/             # homepage, about, contact, navigation
│   ├── services/         # pSEO service pages
│   ├── conditions/       # pSEO condition pages (if enabled)
│   └── guides/           # AEO informational guides
├── schema/               # JSON-LD structured data
└── presentation/
    ├── seo-strategy-deck.md
    └── maintenance-guide.md
```

---

## Phase-by-Phase Checkpoints

Use these to verify each phase completed correctly:

### Phase 0 — Discovery
✓ All config values acknowledged
✓ YMYL status confirmed if applicable
✓ Location count confirmed

### Phase 1 — Structure Lock
✓ URL taxonomy defined
✓ `services.json` created
✓ `conditions.json` created (if applicable)
✓ Internal link map established

### Phase 2 — Core Site Build
✓ Homepage with service overview
✓ About page with E-E-A-T signals
✓ Contact page with proper CTAs
✓ Navigation structure spec

### Phase 3 — pSEO Generation
✓ All service pages created
✓ All condition pages created (if applicable)
✓ Cross-links between services ↔ conditions

### Phase 4 — AEO Generation
✓ Service-focused guides (1 per service)
✓ Condition-focused guides (1 per condition if applicable)
✓ Direct-answer format applied
✓ No sales language

### Phase 5 — Trust & Compliance
✓ Disclaimers on all pages (especially YMYL)
✓ Schema templates created
✓ CTA language matches business model

### Phase 6 — UX / Conversion Polish
✓ CTA hierarchy defined
✓ Accessibility checklist provided
✓ Performance targets set

### Phase 7 — Explanation Layer
✓ Strategy deck created at requested depth
✓ Maintenance guide created
✓ Rollout roadmap included

---

## Troubleshooting

**Problem**: AI skips phases
**Solution**: Explicitly ask for phase-by-phase execution

**Problem**: Locations invented
**Solution**: Confirm `doNotInventLocations: true` is set

**Problem**: Sales language in guides
**Solution**: Re-run Phase 4 with explicit reminder

**Problem**: Missing schema
**Solution**: Re-run Phase 5 specifically

---

*SEO OS++ Runner | v1.0*
