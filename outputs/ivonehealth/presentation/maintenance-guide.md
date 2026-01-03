# IV One Health — SEO & Content Maintenance Guide

## Leave-Behind Documentation for Client

---

## What Was Built

| Component | Count | Purpose |
|-----------|-------|---------|
| **Service Pages** | 4 | Target service-specific search queries |
| **Condition Pages** | 4 | Target condition-specific search queries |
| **AEO Guides** | 8 | Capture AI/featured snippet answers |
| **Core Pages** | 3 | Homepage, About, Contact |
| **Schema Templates** | 5 | Structured data for search engines |

---

## URL Structure (Do Not Change)

> ⚠️ **Critical**: URLs must never change once pages are indexed. Changing URLs breaks links and loses search equity.

```
/services/ivig-infusion
/services/biologic-infusions
/services/iron-infusion
/services/immunotherapy

/conditions/multiple-sclerosis
/conditions/crohns-disease
/conditions/rheumatoid-arthritis
/conditions/oncology

/guides/what-is-ivig-infusion-therapy
/guides/how-long-does-biologic-infusion-take
/guides/benefits-of-iv-iron-infusion
/guides/how-does-immunotherapy-work
/guides/how-is-ms-treated-with-infusion-therapy
/guides/can-crohns-be-managed-with-biologics
/guides/infusion-options-for-rheumatoid-arthritis
/guides/infusion-therapy-for-oncology-patients
```

---

## Adding New Content

### Adding a New Service

1. Add entry to `data/services.json`
2. Create content file in `content/services/[slug].md`
3. Add schema using `service-template.jsonld`
4. Link from homepage and related conditions
5. Submit URL to Google Search Console

### Adding a New Condition

1. Add entry to `data/conditions.json`
2. Create content file in `content/conditions/[slug].md`
3. Add schema using `condition-template.jsonld`
4. Link from related services
5. Consider adding an AEO guide

### Adding a New Guide

1. Create content file in `content/guides/[slug].md`
2. Follow AEO format: direct answer within first 40 words
3. Add FAQ schema
4. Link from related service/condition pages

---

## Content Update Guidelines

### What to Update
- Service details if protocols change
- Contact information
- Hours of operation
- Staff credentials (About page)

### What NOT to Change
- URL slugs (ever)
- H1 structure
- Medical disclaimer blocks
- Schema @type values

---

## Monthly Maintenance Checklist

- [ ] Review Google Search Console for errors
- [ ] Check for broken links
- [ ] Update "last reviewed" dates on guides
- [ ] Verify contact information is current
- [ ] Review keyword rankings
- [ ] Check page load performance

---

## Key Contacts

| Role | Responsibility |
|------|----------------|
| **SEO Lead** | Rankings, Search Console, content strategy |
| **Content Owner** | Medical accuracy, updates |
| **Web Developer** | Technical implementation, schema |
| **Marketing** | Physician outreach, conversion tracking |

---

## Important Rules

1. **No location pages** — Single location; don't create city-specific pages
2. **No sales language in guides** — Educational content only
3. **Physician referral CTAs only** — Never "Book Now" or patient-direct
4. **Medical disclaimers required** — Every page must include disclaimer
5. **No medical claims** — Don't promise outcomes or guarantee results

---

## Emergency Procedures

### If Rankings Drop
1. Check Google Search Console for manual actions
2. Review recent content changes
3. Verify technical SEO (sitemap, robots.txt)
4. Contact SEO lead

### If Page Goes Down
1. Check hosting status
2. Review recent deployments
3. Restore from backup if needed
4. Resubmit to Search Console after fix

---

*IV One Health SEO Maintenance Guide — Version 1.0 — January 2026*
