# IV One Health — SEO OS++ Build Walkthrough

## What Was Built

A complete Next.js App Router site for IV One Health with:

| Component | Count | Purpose |
|-----------|-------|---------|
| Core Pages | 4 | Homepage, About, Contact, Policy |
| Service Pages | 4 | pSEO for each infusion service |
| Condition Pages | 4 | pSEO for each condition treated |
| AEO Guides | 8 | Answer-first educational content |
| Components | 4 | Header, Footer, Disclaimer, Breadcrumbs |

**Total: 20 pages + reusable components**

---

## Site Structure (Locked)

```
ivonehealth.com/
├── /                           # Homepage
├── /about                      # About page
├── /contact                    # Contact + referral info
├── /policy                     # Privacy policy
├── /services/
│   ├── ivig-infusion
│   ├── biologic-infusions
│   ├── iron-infusion
│   └── immunotherapy
├── /conditions-we-treat/
│   ├── multiple-sclerosis
│   ├── crohns-disease
│   ├── rheumatoid-arthritis
│   └── oncology
└── /guides/
    ├── what-is-ivig-infusion-therapy
    ├── how-long-does-biologic-infusion-take
    ├── benefits-of-iv-iron-infusion
    ├── how-does-immunotherapy-work
    ├── how-is-ms-treated-with-infusion-therapy
    ├── can-crohns-be-managed-with-biologics
    ├── infusion-options-for-rheumatoid-arthritis
    └── infusion-therapy-for-oncology-patients
```

---

## Why pSEO Was Used

**Problem**: IV One Health needs to rank for specific search queries like "IVIG infusion Riyadh" and "MS treatment Saudi Arabia."

**Solution**: Programmatic SEO generates dedicated pages for each service and condition, each optimized for specific keywords while sharing a consistent template.

**Compounding Effect**: 
- 4 services × 4 conditions = internal linking matrix
- Each page reinforces topical authority
- Schema markup on every page improves entity recognition

---

## Why AEO Was Used

**Problem**: Search is shifting to AI-generated answers. Medical queries increasingly show AI summaries.

**Solution**: AEO guides provide direct-answer content optimized for:
- Featured snippets
- AI Overviews (Google SGE)
- Voice search
- "People Also Ask" boxes

**Format**: Answer within first 40 words, educational tone, no sales CTAs.

---

## What Was Omitted (and Why)

| Feature | Status | Justification |
|---------|--------|---------------|
| **Locations pSEO** | Disabled | Only one location; creating fake location pages would violate YMYL trust signals |
| **Blog** | Not built | Referral-based model doesn't require content marketing; AEO guides serve educational purpose |
| **Patient booking** | Not built | `referralBased: true` means physician referrals only |
| **Reviews/testimonials** | Not built | YMYL compliance—cannot verify patient claims |

---

## Schema Implementation

| Page Type | Schema Types |
|-----------|--------------|
| Homepage | MedicalBusiness |
| Services | MedicalTherapy |
| Conditions | MedicalCondition with possibleTreatment |
| Guides | FAQPage, SpeakableSpecification |
| Contact | MedicalBusiness with OpeningHours |

---

## Rollout Strategy

**Controlled rollout per config:**

1. **Week 1**: Deploy core pages (homepage, about, contact, policy)
2. **Week 2**: Deploy service pages (4)
3. **Week 3**: Deploy condition pages (4)
4. **Week 4+**: Deploy AEO guides gradually

**Why controlled?** YMYL sites are scrutinized more heavily. Establishing authority with core pages before scaling reduces risk.

---

## Technical Implementation

- **Framework**: Next.js 14 App Router
- **Rendering**: Static generation (SSG) via `generateStaticParams`
- **Data**: JSON files (`services.json`, `conditions.json`, `guides.json`)
- **Styling**: CSS custom properties, mobile-first
- **Accessibility**: Skip links, ARIA labels, focus states

---

## Files Created

```
site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── policy/page.tsx
│   ├── services/[slug]/page.tsx
│   ├── conditions-we-treat/[slug]/page.tsx
│   └── guides/[slug]/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Disclaimer.tsx
│   └── Breadcrumbs.tsx
├── data/
│   ├── services.json
│   ├── conditions.json
│   └── guides.json
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## Next Steps

1. Run `npm install` in `outputs/ivonehealth/site/`
2. Run `npm run dev` to preview
3. Add real contact information
4. Deploy to production
5. Submit sitemap to Google Search Console
6. Follow controlled rollout schedule
