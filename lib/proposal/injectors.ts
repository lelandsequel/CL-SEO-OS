/**
 * SEO OS++ Injectors
 * 
 * Injects audit results into deck and walkthrough
 */

import { AuditResult, Finding } from "../audit/types";
import { getScoreGrade } from "../audit/scorer";

// ═══════════════════════════════════════════════════════════════
// DECK INJECTION SLIDES
// ═══════════════════════════════════════════════════════════════

export function generateAuditDeckSlides(result: AuditResult): string {
    const { metadata, scores, findings, topBlockers } = result;

    let md = `\n---\n\n## Slide 2: What's Broken Today\n\n`;
    md += `Before we built anything, we audited **${metadata.targetUrl}**.\n\n`;
    md += `### Audit Score: ${scores.overall}/100 (${getScoreGrade(scores.overall)})\n\n`;

    md += `| Category | Score | Issue Count |\n`;
    md += `|----------|-------|-------------|\n`;
    md += `| Technical | ${scores.categories.technical} | ${findings.filter(f => f.category === "technical").length} |\n`;
    md += `| On-Page | ${scores.categories.onpage} | ${findings.filter(f => f.category === "onpage").length} |\n`;
    md += `| Local | ${scores.categories.local} | ${findings.filter(f => f.category === "local").length} |\n`;
    md += `| AEO | ${scores.categories.aeo} | ${findings.filter(f => f.category === "aeo").length} |\n\n`;

    md += `### Top Issues Found\n\n`;
    topBlockers.slice(0, 5).forEach((f, i) => {
        const emoji = f.severity === "critical" ? "🔴" : f.severity === "high" ? "🟠" : "🟡";
        md += `${i + 1}. ${emoji} **${f.title}**\n`;
    });

    md += `\n---\n\n## Slide 3: What We Built to Fix It\n\n`;
    md += `Every issue maps to an SEO OS++ module:\n\n`;

    // Group by module
    const moduleMap = new Map<string, Finding[]>();
    findings.forEach(f => {
        if (!moduleMap.has(f.seoOsModule)) {
            moduleMap.set(f.seoOsModule, []);
        }
        moduleMap.get(f.seoOsModule)!.push(f);
    });

    md += `| Module | Issues Fixed | Key Improvements |\n`;
    md += `|--------|--------------|------------------|\n`;
    moduleMap.forEach((moduleFindings, module) => {
        const topIssue = moduleFindings[0]?.title || "General optimization";
        md += `| ${module} | ${moduleFindings.length} | ${topIssue.substring(0, 40)}... |\n`;
    });

    return md;
}

export function generateRoadmapSlide(result: AuditResult): string {
    const { findings } = result;

    // Categorize by severity for roadmap
    const critical = findings.filter(f => f.severity === "critical");
    const high = findings.filter(f => f.severity === "high");
    const medium = findings.filter(f => f.severity === "medium");
    const low = findings.filter(f => f.severity === "low");

    let md = `\n---\n\n## Slide: 30/60/90 Day Roadmap\n\n`;

    md += `### Day 0-30: Critical Foundation\n`;
    if (critical.length > 0) {
        critical.slice(0, 3).forEach(f => {
            md += `- Fix: ${f.title}\n`;
        });
    } else if (high.length > 0) {
        high.slice(0, 3).forEach(f => {
            md += `- Fix: ${f.title}\n`;
        });
    }
    md += `- Deploy core pages with optimized structure\n`;
    md += `- Implement LocalBusiness schema\n\n`;

    md += `### Day 31-60: Content Expansion\n`;
    md += `- Launch pSEO service pages\n`;
    md += `- Build internal linking hub\n`;
    medium.slice(0, 2).forEach(f => {
        md += `- Address: ${f.title}\n`;
    });
    md += `\n`;

    md += `### Day 61-90: Authority Building\n`;
    md += `- Publish AEO guides\n`;
    md += `- Add FAQ schema to key pages\n`;
    low.slice(0, 2).forEach(f => {
        md += `- Polish: ${f.title}\n`;
    });
    md += `- Begin monitoring and optimization cycle\n`;

    return md;
}

// ═══════════════════════════════════════════════════════════════
// PSEO/AEO SLIDE ENHANCEMENT
// ═══════════════════════════════════════════════════════════════

export function getPSEOAuditContext(result: AuditResult): string {
    const missingPages = result.findings.filter(
        f => f.title.includes("Thin Content") ||
            f.title.includes("Missing H1") ||
            f.title.includes("Generic Titles")
    );

    if (missingPages.length === 0) {
        return "The existing pages lacked dedicated, optimized landing pages for key services.";
    }

    return `Previously: ${missingPages.map(f => f.title.toLowerCase()).join(", ")}. Now: dedicated pSEO pages with optimized structure.`;
}

export function getAEOAuditContext(result: AuditResult): string {
    const aeoIssues = result.findings.filter(f => f.category === "aeo");

    if (aeoIssues.length === 0) {
        return "Added answer-first guides to capture AI answer visibility.";
    }

    return `Previously: ${aeoIssues.map(f => f.title.toLowerCase()).join(", ")}. Now: ${aeoIssues.length} AEO-optimized pages added.`;
}

// ═══════════════════════════════════════════════════════════════
// WALKTHROUGH INJECTION
// ═══════════════════════════════════════════════════════════════

export function generateWalkthroughAuditSection(result: AuditResult): string {
    const { metadata, scores, findings, topBlockers } = result;

    let md = `## Audit Summary (Phase 0)\n\n`;
    md += `Before building, we ran a comprehensive audit of **${metadata.targetUrl}**.\n\n`;

    md += `### Scores\n\n`;
    md += `| Category | Before |\n`;
    md += `|----------|--------|\n`;
    md += `| Technical | ${scores.categories.technical}/100 |\n`;
    md += `| On-Page | ${scores.categories.onpage}/100 |\n`;
    md += `| Local | ${scores.categories.local}/100 |\n`;
    md += `| AEO | ${scores.categories.aeo}/100 |\n`;
    md += `| **Overall** | **${scores.overall}/100** |\n\n`;

    md += `### Evidence Links\n\n`;
    md += `Full audit report: \`audit/audit.md\`\n\n`;

    md += `### Why These Fixes Were Prioritized\n\n`;
    topBlockers.slice(0, 3).forEach((f, i) => {
        md += `${i + 1}. **${f.title}** (${f.severity}) — ${f.recommendation}\n`;
    });
    md += `\n`;

    return md;
}
