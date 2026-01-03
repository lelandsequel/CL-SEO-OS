/**
 * SEO OS++ Phase 0 Scorer
 * 
 * Calculates category scores and overall weighted score
 */

import {
    Finding,
    FindingCategory,
    AuditScores,
    CategoryScores,
    SEVERITY_PENALTIES,
    SCORE_WEIGHTS,
} from "./types";

// ═══════════════════════════════════════════════════════════════
// SCORING LOGIC
// ═══════════════════════════════════════════════════════════════

export function calculateScores(findings: Finding[]): AuditScores {
    // Group findings by category
    const byCategory: Record<FindingCategory, Finding[]> = {
        technical: [],
        onpage: [],
        local: [],
        aeo: [],
    };

    findings.forEach((f) => {
        byCategory[f.category].push(f);
    });

    // Calculate category scores (start at 100, subtract penalties)
    const categoryScores: CategoryScores = {
        technical: 100,
        onpage: 100,
        local: 100,
        aeo: 100,
    };

    for (const category of Object.keys(byCategory) as FindingCategory[]) {
        let penalty = 0;
        for (const finding of byCategory[category]) {
            penalty += SEVERITY_PENALTIES[finding.severity];
        }
        categoryScores[category] = Math.max(0, 100 - penalty);
    }

    // Calculate weighted overall score
    const overall = Math.round(
        categoryScores.technical * SCORE_WEIGHTS.technical +
        categoryScores.onpage * SCORE_WEIGHTS.onpage +
        categoryScores.local * SCORE_WEIGHTS.local +
        categoryScores.aeo * SCORE_WEIGHTS.aeo
    );

    return {
        categories: categoryScores,
        overall,
        weights: SCORE_WEIGHTS,
    };
}

// ═══════════════════════════════════════════════════════════════
// TOP FINDINGS
// ═══════════════════════════════════════════════════════════════

const SEVERITY_ORDER: Record<string, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
};

export function getTopBlockers(findings: Finding[], limit = 5): Finding[] {
    return [...findings]
        .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
        .slice(0, limit);
}

export function getTopFixes(findings: Finding[], limit = 5): Finding[] {
    // Top fixes: critical/high that are actionable
    return [...findings]
        .filter((f) => f.severity === "critical" || f.severity === "high")
        .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
        .slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════
// SCORE HELPERS
// ═══════════════════════════════════════════════════════════════

export function getScoreGrade(score: number): string {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}

export function getScoreColor(score: number): string {
    if (score >= 80) return "green";
    if (score >= 60) return "orange";
    return "red";
}
