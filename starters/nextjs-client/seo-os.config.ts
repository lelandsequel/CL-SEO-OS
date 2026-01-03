import type { SEOOSConfig } from "@cl-seo-os/types";

/**
 * SEO OS Configuration
 * 
 * This file defines all inputs for the SEO OS build.
 * Once locked, these values should not change mid-build.
 */
export const seoOSConfig: SEOOSConfig = {

    // ═══════════════════════════════════════════════════════════════
    // CLIENT INFORMATION
    // ═══════════════════════════════════════════════════════════════

    client: {
        name: "{{CLIENT_NAME}}",
        domain: "https://{{DOMAIN}}",
        industry: "{{INDUSTRY}}", // e.g., "medical", "legal", "saas", "local-services"
        regulatoryLevel: "none", // "none" | "medium" | "YMYL"

        primaryLocation: {
            city: "{{CITY}}",
            country: "{{COUNTRY}}",
        },

        // Optional: Additional physical locations
        physicalLocations: [
            {
                name: "{{LOCATION_NAME}}",
                address: "{{ADDRESS}}",
                isPrimary: true,
            }
        ],
    },

    // ═══════════════════════════════════════════════════════════════
    // BUSINESS MODEL
    // ═══════════════════════════════════════════════════════════════

    businessModel: {
        // Core services offered
        services: [
            "{{SERVICE_1}}",
            "{{SERVICE_2}}",
            // Add more as needed
        ],

        // Optional: Conditions/use cases served (for medical, legal, etc.)
        conditions: [
            // "{{CONDITION_1}}",
            // "{{CONDITION_2}}",
        ],

        // Location settings
        hasMultipleLocations: false,

        // Funnel type
        referralBased: false, // true = B2B/physician referral, false = direct customer
    },

    // ═══════════════════════════════════════════════════════════════
    // SEO STRATEGY
    // ═══════════════════════════════════════════════════════════════

    seoStrategy: {
        enableServicesPSEO: true,      // Generate service pages
        enableConditionsPSEO: false,   // Generate condition/use-case pages
        enableLocationsPSEO: "auto",   // "auto" | true | false
        enableAEO: true,               // Answer Engine Optimization guides
        rolloutMode: "controlled",     // "controlled" | "aggressive"
    },

    // ═══════════════════════════════════════════════════════════════
    // PRESENTATION
    // ═══════════════════════════════════════════════════════════════

    presentation: {
        generateDeck: true,
        deckDepth: "standard",              // "light" | "standard" | "heavy"
        includePSEOExplanation: true,
        includeAEOExplanation: true,
        includeTradeoffJustifications: true,
    },

    // ═══════════════════════════════════════════════════════════════
    // CONSTRAINTS (Do not change without understanding implications)
    // ═══════════════════════════════════════════════════════════════

    constraints: {
        doNotInventLocations: true,        // Never create fake location pages
        doNotChangeURLsOnceSet: true,      // URLs are immutable after launch
        noSalesLanguageInGuides: true,     // AEO guides must be educational
    }
};

export default seoOSConfig;
