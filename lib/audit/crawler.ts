/**
 * SEO OS++ Phase 0 Crawler
 * 
 * Breadth-first internal crawler using Playwright headless
 * - Max depth: 2
 * - Max pages: 40
 */

import * as cheerio from "cheerio";
import { PageSnapshot } from "./types";
import { fetchRenderedHtml } from "./fetch";

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const MAX_DEPTH = 2;
const MAX_PAGES = 40;
const TIMEOUT_MS = 30_000;

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function normalizeUrl(raw: string, origin: string): string | null {
    try {
        const u = new URL(raw, origin);
        // strip hash
        u.hash = "";
        // normalize trailing slash
        const s = u.toString();
        return s.endsWith("/") ? s.slice(0, -1) : s;
    } catch {
        return null;
    }
}

function isInternal(candidate: string, origin: string): boolean {
    try {
        const u = new URL(candidate);
        return u.origin === origin;
    } catch {
        return false;
    }
}

function extractText($: cheerio.CheerioAPI): string {
    const text = $("body").text().replace(/\s+/g, " ").trim();
    return text;
}

function wc(text: string): number {
    if (!text) return 0;
    return text.split(" ").filter(Boolean).length;
}

const PHONE_RE = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const ADDRESS_RE = /\d{1,6}\s+[A-Za-z0-9.\-]+\s+(St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Dr|Drive|Ln|Lane|Way|Pkwy|Parkway)\b/i;
const CITY_STATE_RE = /\b(Houston|TX|Texas)\b/i;

// ═══════════════════════════════════════════════════════════════
// CRAWL
// ═══════════════════════════════════════════════════════════════

export interface CrawlResult {
    pages: PageSnapshot[];
    crawlStatus: "complete" | "partial" | "failed";
    pagesAttempted: number;
    pagesCrawled: number;
}

export async function crawlSite(startUrl: string): Promise<CrawlResult> {
    const start = new URL(startUrl);
    const origin = start.origin;

    const queue: Array<{ url: string; depth: number }> = [{ url: startUrl, depth: 0 }];
    const seen = new Set<string>();
    const pages: PageSnapshot[] = [];
    let pagesAttempted = 0;

    while (queue.length && pages.length < MAX_PAGES) {
        const { url, depth } = queue.shift()!;
        const normalized = normalizeUrl(url, origin);
        if (!normalized) continue;
        if (seen.has(normalized)) continue;
        seen.add(normalized);
        pagesAttempted++;

        console.log(`[Crawl] ${pages.length + 1}/${MAX_PAGES}: ${normalized}`);

        try {
            const { finalUrl, status, html } = await fetchRenderedHtml(normalized, TIMEOUT_MS);
            const $ = cheerio.load(html);

            const title = ($("title").first().text() || "").trim() || null;
            const metaDescription = ($('meta[name="description"]').attr("content") || "").trim() || null;
            const h1 = ($("h1").first().text() || "").trim() || null;
            const h2s = $("h2").toArray().map(el => $(el).text().trim()).filter(Boolean);

            const canonical = ($('link[rel="canonical"]').attr("href") || "").trim() || null;
            const robotsMeta = ($('meta[name="robots"]').attr("content") || "").trim() || null;

            const ogTags: Record<string, string> = {};
            $('meta[property^="og:"]').each((_, el) => {
                const k = $(el).attr("property");
                const v = $(el).attr("content");
                if (k && v) ogTags[k] = v;
            });

            const jsonldSnippets: object[] = [];
            $('script[type="application/ld+json"]').each((_, el) => {
                const t = $(el).text().trim();
                if (t) {
                    try {
                        jsonldSnippets.push(JSON.parse(t));
                    } catch {
                        // Invalid JSON, skip
                    }
                }
            });

            const bodyText = extractText($);
            const wordCount = wc(bodyText);

            let internalLinksCount = 0;
            let externalLinksCount = 0;
            const links = new Set<string>();

            $("a[href]").each((_, el) => {
                const href = $(el).attr("href");
                if (!href) return;
                const abs = normalizeUrl(href, origin);
                if (!abs) return;

                if (isInternal(abs, origin)) {
                    internalLinksCount++;
                    if (depth < MAX_DEPTH) links.add(abs);
                } else {
                    externalLinksCount++;
                }
            });

            let imagesMissingAltCount = 0;
            $("img").each((_, el) => {
                const alt = ($(el).attr("alt") || "").trim();
                if (!alt) imagesMissingAltCount++;
            });

            const hasPhone = PHONE_RE.test(bodyText);
            const hasAddress = ADDRESS_RE.test(bodyText);
            const hasCityState = CITY_STATE_RE.test(bodyText);

            const hasFAQSignals =
                /faq/i.test(bodyText) ||
                $("h2, h3").toArray().some(el => /\?$/.test($(el).text().trim())) ||
                jsonldSnippets.some(j => JSON.stringify(j).includes("FAQPage"));

            const hasAuthorSignals =
                /team|about|advisor|leadership|our people/i.test(bodyText) ||
                $('a[href*="about"], a[href*="team"], a[href*="advis"]').length > 0;

            const hasDisclosureSignals =
                /disclosure|privacy|terms|regulatory|form adv|sec/i.test(bodyText) ||
                $('a[href*="privacy"], a[href*="terms"], a[href*="disclosure"], a[href*="adv"]').length > 0;

            pages.push({
                url: normalized,
                finalUrl,
                status,
                title,
                metaDescription,
                h1,
                h2s,
                canonical,
                robotsMeta,
                ogTags,
                jsonldSnippets,
                wordCount,
                internalLinksCount,
                externalLinksCount,
                imagesMissingAltCount,
                hasPhone,
                hasAddress,
                hasCityState,
                hasFAQSignals,
                hasAuthorSignals,
                hasDisclosureSignals,
                crawledAt: new Date().toISOString(),
            });

            // enqueue next internal links
            for (const next of links) {
                if (!seen.has(next)) queue.push({ url: next, depth: depth + 1 });
            }
        } catch (err) {
            // Failed to fetch - add error page
            pages.push({
                url: normalized,
                finalUrl: normalized,
                status: 0,
                title: null,
                metaDescription: null,
                h1: null,
                h2s: [],
                canonical: null,
                robotsMeta: null,
                ogTags: {},
                jsonldSnippets: [],
                wordCount: 0,
                internalLinksCount: 0,
                externalLinksCount: 0,
                imagesMissingAltCount: 0,
                hasPhone: false,
                hasAddress: false,
                hasCityState: false,
                hasFAQSignals: false,
                hasAuthorSignals: false,
                hasDisclosureSignals: false,
                crawledAt: new Date().toISOString(),
                error: err instanceof Error ? err.message : "Failed to fetch",
            });
        }

        // Small delay to be polite
        await new Promise(r => setTimeout(r, 200));
    }

    return {
        pages,
        crawlStatus: pages.length > 0 ? (pages.length >= MAX_PAGES ? "complete" : "partial") : "failed",
        pagesAttempted,
        pagesCrawled: pages.filter(p => p.status !== 0).length,
    };
}
