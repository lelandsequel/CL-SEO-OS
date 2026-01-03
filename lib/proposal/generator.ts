/**
 * SEO OS++ Proposal Generator
 * 
 * Generates PROPOSAL.md from audit results
 */

import { AuditResult, Finding } from "../audit/types";
import { getScoreGrade } from "../audit/scorer";

// ═══════════════════════════════════════════════════════════════
// PROPOSAL GENERATOR
// ═══════════════════════════════════════════════════════════════

export function generateProposal(
    result: AuditResult,
    clientSlug: string
): string {
    const { metadata, scores, findings, topBlockers } = result;
    const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Group findings by module
    const moduleMap = new Map<string, Finding[]>();
    findings.forEach((f) => {
        if (!moduleMap.has(f.seoOsModule)) {
            moduleMap.set(f.seoOsModule, []);
        }
        moduleMap.get(f.seoOsModule)!.push(f);
    });

    let md = `# SEO Strategy Proposal\n\n`;
    md += `**Prepared for**: ${metadata.businessName}\n`;
    md += `**Date**: ${date}\n`;
    md += `**Prepared by**: SEO OS++ Automated Assessment\n\n`;

    md += `---\n\n`;

    // ═══════════════════════════════════════════════════════════════
    // INTRODUCTION
    // ═══════════════════════════════════════════════════════════════

    md += `## Introduction\n\n`;
    md += `This proposal outlines a comprehensive SEO strategy for **${metadata.businessName}** `;
    md += `based on an automated audit of **${metadata.targetUrl}**.\n\n`;
    md += `${metadata.description}\n\n`;
    md += `Our analysis identified ${findings.length} opportunities for improvement across `;
    md += `technical SEO, on-page optimization, local search, and AI answer eligibility.\n\n`;

    // ═══════════════════════════════════════════════════════════════
    // CURRENT STATE
    // ═══════════════════════════════════════════════════════════════

    md += `## Current State\n\n`;
    md += `### Audit Scores\n\n`;
    md += `| Category | Score | Grade | Status |\n`;
    md += `|----------|-------|-------|--------|\n`;

    const getStatus = (score: number) => {
        if (score >= 80) return "✅ Good";
        if (score >= 60) return "⚠️ Needs Work";
        return "🔴 Critical";
    };

    md += `| Technical | ${scores.categories.technical}/100 | ${getScoreGrade(scores.categories.technical)} | ${getStatus(scores.categories.technical)} |\n`;
    md += `| On-Page | ${scores.categories.onpage}/100 | ${getScoreGrade(scores.categories.onpage)} | ${getStatus(scores.categories.onpage)} |\n`;
    md += `| Local | ${scores.categories.local}/100 | ${getScoreGrade(scores.categories.local)} | ${getStatus(scores.categories.local)} |\n`;
    md += `| AEO | ${scores.categories.aeo}/100 | ${getScoreGrade(scores.categories.aeo)} | ${getStatus(scores.categories.aeo)} |\n`;
    md += `| **Overall** | **${scores.overall}/100** | **${getScoreGrade(scores.overall)}** | ${getStatus(scores.overall)} |\n\n`;

    md += `### Critical Issues Identified\n\n`;
    topBlockers.slice(0, 5).forEach((f, i) => {
        const emoji = f.severity === "critical" ? "🔴" : f.severity === "high" ? "🟠" : "🟡";
        md += `${i + 1}. ${emoji} **${f.title}** — ${f.description.split(".")[0]}.\n`;
    });
    md += `\n`;

    // ═══════════════════════════════════════════════════════════════
    // SCOPE OF WORK
    // ═══════════════════════════════════════════════════════════════

    md += `## Scope of Work\n\n`;
    md += `Based on the audit findings, we propose the following engagement:\n\n`;

    moduleMap.forEach((moduleFindings, module) => {
        const criticalCount = moduleFindings.filter((f) => f.severity === "critical").length;
        const highCount = moduleFindings.filter((f) => f.severity === "high").length;

        md += `### ${module}\n\n`;
        md += `*${moduleFindings.length} issue${moduleFindings.length > 1 ? "s" : ""} identified*`;
        if (criticalCount > 0 || highCount > 0) {
            md += ` (${criticalCount} critical, ${highCount} high priority)`;
        }
        md += `\n\n`;

        moduleFindings.slice(0, 3).forEach((f) => {
            md += `- ${f.title}: ${f.recommendation}\n`;
        });
        if (moduleFindings.length > 3) {
            md += `- *...and ${moduleFindings.length - 3} more*\n`;
        }
        md += `\n`;
    });

    // ═══════════════════════════════════════════════════════════════
    // DELIVERABLES
    // ═══════════════════════════════════════════════════════════════

    md += `## Deliverables\n\n`;
    md += `### Core Site Build\n`;
    md += `- Optimized homepage with proper meta tags, schema, and structure\n`;
    md += `- Enhanced about/team pages with E-E-A-T signals\n`;
    md += `- Contact page with LocalBusiness schema\n`;
    md += `- Policy/disclosure pages for trust signals\n\n`;

    md += `### pSEO Program\n`;
    md += `- Service pages with optimized templates\n`;
    md += `- Internal linking hub structure\n`;
    md += `- Schema markup for each service type\n\n`;

    md += `### AEO Optimization\n`;
    md += `- Answer-first guide pages for AI visibility\n`;
    md += `- FAQ sections with FAQPage schema\n`;
    md += `- Speakable markup for voice search\n\n`;

    md += `### Local SEO\n`;
    md += `- LocalBusiness schema implementation\n`;
    md += `- NAP consistency optimization\n`;
    md += `- Service area definition\n\n`;

    // ═══════════════════════════════════════════════════════════════
    // TIMELINE
    // ═══════════════════════════════════════════════════════════════

    md += `## Timeline\n\n`;
    md += `### 30-Day Sprint\n`;
    md += `- Technical fixes (missing titles, meta descriptions, canonicals)\n`;
    md += `- Core page optimization\n`;
    md += `- LocalBusiness schema deployment\n\n`;

    md += `### 60-Day Milestone\n`;
    md += `- pSEO service pages live\n`;
    md += `- Internal linking structure complete\n`;
    md += `- E-E-A-T signals enhanced\n\n`;

    md += `### 90-Day Milestone\n`;
    md += `- AEO guides published\n`;
    md += `- FAQ schema on key pages\n`;
    md += `- Performance monitoring baseline established\n\n`;

    // ═══════════════════════════════════════════════════════════════
    // REPORTING
    // ═══════════════════════════════════════════════════════════════

    md += `## Reporting Cadence\n\n`;
    md += `| Cadence | Deliverable |\n`;
    md += `|---------|-------------|\n`;
    md += `| Weekly | Progress update (Slack/email) |\n`;
    md += `| Bi-weekly | Live call for review and questions |\n`;
    md += `| Monthly | Performance report with ranking changes |\n`;
    md += `| Quarterly | Strategy review and roadmap update |\n\n`;

    // ═══════════════════════════════════════════════════════════════
    // INVESTMENT
    // ═══════════════════════════════════════════════════════════════

    md += `## Investment\n\n`;
    md += `| Item | Investment |\n`;
    md += `|------|------------|\n`;
    md += `| SEO Audit (complete) | $1,250 |\n`;
    md += `| Implementation (monthly) | $2,500/mo |\n`;
    md += `| Optional: AEO Package | +$1,000/mo |\n\n`;

    md += `*Minimum engagement: 3 months*\n\n`;

    // ═══════════════════════════════════════════════════════════════
    // NEXT STEPS
    // ═══════════════════════════════════════════════════════════════

    md += `## Next Steps\n\n`;
    md += `1. Review this proposal and audit findings\n`;
    md += `2. Schedule a 30-minute call to discuss priorities\n`;
    md += `3. Sign engagement letter to begin 30-day sprint\n\n`;

    md += `---\n\n`;
    md += `*Proposal generated by SEO OS++ | ${date}*\n`;

    return md;
}
