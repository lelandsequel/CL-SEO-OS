# IV One Health — SEO Strategy Deck

**For**: Non-technical operators and stakeholders  
**Purpose**: Explain what was built and why

---

## Slide 1: Executive Summary

**What we built**: A complete website for IV One Health optimized for search engines and AI answer systems.

**Key numbers**:
- 4 service pages
- 4 condition pages  
- 8 educational guides
- 100% YMYL compliant

---

## Slide 2: What is pSEO?

### Programmatic SEO

**Simple explanation**: Instead of manually writing each page one by one, we use a template and data to automatically generate many pages.

**Example**:
```
Template: "{Service} in Riyadh | IV One Health"
Data: [IVIG, Biologics, Iron, Immunotherapy]
Result: 4 optimized pages
```

**Why this matters**: 
- Consistency across all pages
- Scales without extra effort
- Each page targets specific keywords

---

## Slide 3: What is AEO?

### Answer Engine Optimization

**The problem**: Google and AI assistants now answer questions directly. Users don't always click through to websites.

**The solution**: Write content that AI systems will quote as the source.

**How we do it**:
1. Put the answer in the first 40 words
2. Use neutral, educational language
3. Add FAQ schema (code that tells Google "this is a Q&A")

**Example**:
> "What is IVIG infusion therapy?"
> 
> **Answer-first**: "IVIG infusion therapy is a medical treatment that delivers concentrated antibodies directly into the bloodstream..."

---

## Slide 4: Site Structure

```
Homepage
├── Services (4 pages)
│   └── Each links to related conditions
├── Conditions (4 pages)
│   └── Each links to related services
├── Guides (8 pages)
│   └── Educational, answer-first content
├── About
├── Contact
└── Privacy Policy
```

**Internal linking**: Every page connects to related content, building a web of authority.

---

## Slide 5: Why No Location Pages?

**Decision**: Location pSEO was disabled.

**Reason**: IV One Health has only one location (Riyadh).

**What happens if we create fake location pages?**
- Google penalizes "thin content"
- YMYL sites get scrutinized more heavily
- Trust score drops
- Rankings suffer

**Better approach**: Anchor the single location in the footer and contact page.

---

## Slide 6: Why Referral-Only CTAs?

**Every page says "Contact Our Clinical Team" instead of "Book Now"**

**Reason**: IV One Health operates on physician referrals, not direct patient acquisition.

**Benefits**:
- Matches actual business model
- Builds physician trust
- Avoids regulatory issues with medical advertising
- More qualified leads

---

## Slide 7: Schema Markup Explained

**What is schema?** Hidden code that helps Google understand your content.

**What we added**:

| Page Type | Schema | What It Does |
|-----------|--------|--------------|
| Homepage | MedicalBusiness | Tells Google "this is a medical business" |
| Services | MedicalTherapy | Identifies each treatment type |
| Conditions | MedicalCondition | Links conditions to treatments |
| Guides | FAQPage | Tells Google "this answers a question" |

---

## Slide 8: How This Compounds

### Month 1-3
- Pages get indexed
- Initial rankings for low-competition keywords
- Schema starts appearing in search results

### Month 4-6
- Internal linking boosts authority
- Condition + service pages reinforce each other
- AEO guides start appearing in answer boxes

### Month 6-12
- Topical authority established
- Higher rankings for competitive keywords
- Brand recognition in search results
- AI systems cite IV One Health as source

---

## Slide 9: Rollout Plan

**Controlled rollout** (not aggressive)

| Week | Action |
|------|--------|
| 1 | Deploy core pages (home, about, contact, policy) |
| 2 | Deploy service pages (4) |
| 3 | Deploy condition pages (4) |
| 4+ | Deploy guides gradually (8) |

**Why slow?** 
- YMYL sites need to establish trust first
- Google evaluates authority over time
- Catch problems before they scale

---

## Slide 10: What We Did NOT Build

| Feature | Status | Why Not |
|---------|--------|---------|
| Multiple location pages | ❌ | Only one real location |
| Blog | ❌ | Guides serve same purpose better |
| Patient reviews | ❌ | Can't verify, YMYL risk |
| Direct booking | ❌ | Referral-based model |
| Chat widget | ❌ | Phone/email preferred for medical |

**Principle**: Don't build features that don't match the business model.

---

## Slide 11: Success Metrics

### What to Track

| Metric | Tool | Target |
|--------|------|--------|
| Pages indexed | Google Search Console | 20/20 |
| Impressions | GSC | +500% (Month 3) |
| Featured snippets | GSC / manual | 2+ guides |
| Referral inquiries | CRM | +20% |

### Warning Signs
- Pages not indexing → Check technical SEO
- High bounce rate → Review content quality
- No snippet appearances → Improve answer format

---

## Slide 12: Maintenance

### Monthly Tasks
1. Check Search Console for errors
2. Verify all pages are indexed
3. Update contact info if changed
4. Review keyword rankings

### Do NOT Change
- URL paths (ever)
- Schema types
- Disclaimer language
- Core page structure

---

## Slide 13: Summary

✅ **Built**: 20-page Next.js site optimized for search and AI  
✅ **pSEO**: Programmatic pages for services and conditions  
✅ **AEO**: Answer-first guides for AI retrieval  
✅ **YMYL compliant**: Medical disclaimers, physician CTAs  
✅ **Controlled rollout**: Authority before scale  

**Next step**: Deploy and submit to Google Search Console.

---

*IV One Health SEO Strategy | Built with SEO OS++ | January 2026*
