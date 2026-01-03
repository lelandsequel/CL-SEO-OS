import { chromium, type Browser } from "playwright";

export type FetchHtmlResult = {
  url: string;
  finalUrl: string;
  status: number;
  html: string;
};

const DEFAULT_TIMEOUT_MS = 30_000;

export async function fetchRenderedHtml(url: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<FetchHtmlResult> {
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
      viewport: { width: 390, height: 844 }, // mobile-ish
    });

    const page = await context.newPage();
    page.setDefaultTimeout(timeoutMs);

    const resp = await page.goto(url, { waitUntil: "domcontentloaded" });

    const status = resp?.status() ?? 0;
    const finalUrl = page.url();
    const html = await page.content();

    await context.close();
    await browser.close();
    browser = null;

    return { url, finalUrl, status, html };
  } catch (err) {
    // graceful fallback: basic fetch (no JS rendering)
    try {
      const res = await fetch(url, {
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml",
        },
      });

      const html = await res.text();
      return { url, finalUrl: res.url, status: res.status, html };
    } catch (err2) {
      throw new Error(`Failed to fetch HTML for ${url}. Playwright+fetch both failed.`);
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

