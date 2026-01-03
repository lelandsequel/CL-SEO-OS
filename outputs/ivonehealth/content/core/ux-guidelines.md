# IV One Health — UX & Conversion Guidelines

## Phase 6 — UX / Conversion Polish

### CTA Hierarchy

| Priority | CTA | Placement | Audience |
|----------|-----|-----------|----------|
| **Primary** | "Contact Our Clinical Team" | Header, homepage hero, footer | Physicians |
| **Secondary** | "Learn More" links | Service/condition pages | All |
| **Tertiary** | Guide links | Throughout content | Patients/caregivers |

### CTA Button Styling
```css
.cta-primary {
  background: #0066CC;  /* Medical trust blue */
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
}

.cta-secondary {
  background: transparent;
  color: #0066CC;
  border: 2px solid #0066CC;
  padding: 10px 20px;
  border-radius: 6px;
}
```

---

## Visual Hierarchy

### Typography Scale
| Element | Size | Weight | Use |
|---------|------|--------|-----|
| H1 | 36px | 700 | Page title (one per page) |
| H2 | 28px | 600 | Major sections |
| H3 | 22px | 600 | Subsections |
| Body | 16px | 400 | Content |
| Caption | 14px | 400 | Disclaimers, notes |

### Color Palette
```
Primary:    #0066CC (Trust Blue)
Secondary:  #004D99 (Deep Blue)
Accent:     #00A86B (Medical Green)
Text:       #333333 (Dark Gray)
Background: #FFFFFF (White)
Light BG:   #F5F7FA (Light Gray)
```

---

## Mobile Responsiveness

### Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### Mobile Priorities
1. Contact button always visible (sticky header)
2. Phone number tap-to-call enabled
3. Forms full-width on mobile
4. Tables scroll horizontally on small screens
5. Service cards stack vertically

---

## Accessibility

### WCAG 2.1 AA Compliance
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Alt text on all images
- [ ] Keyboard navigation functional
- [ ] Focus states visible
- [ ] Form labels properly associated
- [ ] Skip-to-content link provided

### Medical Accessibility
- [ ] Large text option available
- [ ] Low-motion preference respected
- [ ] Clear, simple language
- [ ] Reading level appropriate

---

## Page Load Performance

### Targets
| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |

### Optimizations
- [ ] Images lazy-loaded
- [ ] CSS/JS minified
- [ ] Web fonts preloaded
- [ ] Critical CSS inlined
- [ ] No render-blocking resources

---

## Trust Signals

### Above the Fold
- MOH license badge
- "Physician Referral Required" indicator
- Professional imagery (no stock photos if possible)

### Footer
- Full address
- Phone number
- MOH license number
- "All treatments administered under physician supervision"

---

## Form Optimization

### Referral Form Fields (Physicians)
1. Physician name*
2. Practice name*
3. Phone*
4. Email*
5. Patient name
6. Prescribed treatment
7. Notes

### Patient Inquiry Fields
1. Name*
2. Phone*
3. Referring physician
4. Question

*Required fields marked with asterisk*

---

*Phase 6 checklist for implementation team*
