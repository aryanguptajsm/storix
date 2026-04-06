import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import { ProductScraper, ProductScrapeResult } from "../lib/agents/product-scraper";

/**
 * Batch Scrape Script
 * CLI Tool for processing multiple product URLs via CSV
 */

async function main() {
  const inputPath = process.argv[2] || "input.csv";
  const outputPath = process.argv[3] || "results.csv";
  const errorPath = "errors.csv";
  const tag = process.env.STX_TAG || "YOUR_TAG";

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file ${inputPath} not found.`);
    console.log("Usage: npx tsx src/scripts/batch-scrape.ts <input_csv> [output_csv]");
    process.exit(1);
  }

  const fileContent = fs.readFileSync(inputPath, "utf-8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`\n🚀 ProductScrapeAgent: Starting batch process for ${records.length} items...`);
  console.log(`Mode: CSV Batch (Pro)`);
  console.log(`Affiliate Tag: ${tag}\n`);

  const scraper = new ProductScraper(tag);
  const results: ProductScrapeResult[] = [];
  const errors: any[] = [];

  let found = 0;
  let missing = 0;
  let errorCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const url = record.product_url || record.url;

    if (!url) {
      console.warn(`[SKIP] Record ${i + 1} has no URL.`);
      continue;
    }

    process.stdout.write(`[${i + 1}/${records.length}] Scraping: ${url.substring(0, 50)}... `);

    try {
      const result = await scraper.scrape(url);
      results.push(result);

      if (result.image_status === "ok") {
        found++;
        console.log(`✅ OK`);
      } else if (result.image_status === "not_found") {
        missing++;
        console.log(`⚠️ IMAGE NOT FOUND`);
        errors.push({
          product_url: url,
          product_title: result.product_title,
          http_status: result.http_code,
          failure_reason: result.error_reason,
          timestamp: result.scraped_at
        });
      } else {
        errorCount++;
        console.log(`❌ ERROR: ${result.error_reason}`);
        errors.push({
          product_url: url,
          product_title: result.product_title,
          http_status: result.http_code,
          failure_reason: result.error_reason,
          timestamp: result.scraped_at
        });
      }
    } catch (e: any) {
      errorCount++;
      console.log(`❌ FAILED: ${e.message}`);
      errors.push({
        product_url: url,
        product_title: "Error",
        http_status: 0,
        failure_reason: e.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  await scraper.close();

  // Save Outputs
  fs.writeFileSync(outputPath, stringify(results, { header: true }));
  if (errors.length > 0) {
    fs.writeFileSync(errorPath, stringify(errors, { header: true }));
    console.log(`\n📁 Errors logged to: ${errorPath}`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log("\n" + "=".repeat(30));
  console.log("📊 BATCH SUMMARY");
  console.log("=".repeat(30));
  console.log(`Total processed: ${records.length}`);
  console.log(`Images found:     ${found}`);
  console.log(`Images missing:   ${missing}`);
  console.log(`Errors:           ${errorCount}`);
  console.log(`Duration:         ${duration}s`);
  console.log("=".repeat(30));
  console.log(`📂 Results saved to: ${outputPath}\n`);
}

main().catch((err) => {
  console.error("Fatal error in batch process:", err);
  process.exit(1);
});
