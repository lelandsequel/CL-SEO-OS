#!/usr/bin/env npx ts-node
/**
 * SEO OS++ CLI
 *
 * Run with: npx ts-node scripts/run-audit.ts
 */

import { runSEOOS } from "../lib/seo-os-runner";

// Test configuration for American Portfolio
const config = {
    currentUrl: "https://www.americanportfolioshouston.com/",
    businessName: "American Portfolio Financial Advisors – Houston",
    description: "Houston-based financial advisory/wealth management team.",
    toggles: {
        includeAudit: true,
        generateDeck: true,
        generateProposal: true,
    },
};

// Run
runSEOOS(config)
    .then(() => {
        console.log("\nDone!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error:", err);
        process.exit(1);
    });
