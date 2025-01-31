import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import logger from "../utils/logger";

const TurndownService = require("turndown");

import { URL } from "url";

const turndownService = new TurndownService();

/**
 * Fetches the HTML content of a given URL
 */
const fetchHtml = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    logger.error(`❌ Error loading ${url}: ${error.message}`);
    throw error;
  }
};

/**
 * Extracts the main content from an HTML page
 */
const extractContentFromHtml = (html: string): string => {
  const $ = cheerio.load(html);
  const content = $("main"); // Selects the main content element
  if (content.length === 0) {
    throw new Error("Failed to extract content.");
  }
  return content.html() || "";
};

/**
 * Converts HTML content to Markdown
 */
const convertHtmlToMarkdown = (htmlContent: string): string => {
  return turndownService.turndown(htmlContent);
};

/**
 * Extracts all internal links from the page
 */
const extractPageLinks = (html: string, baseUrl: string): string[] => {
  const $ = cheerio.load(html);
  const links = new Set<string>();

  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    if (href) {
      const fullUrl = new URL(href, baseUrl).href;
      if (new URL(fullUrl).origin === new URL(baseUrl).origin) {
        links.add(fullUrl);
      }
    }
  });

  return Array.from(links);
};

/**
 * Saves Markdown content to a file
 */
const saveMarkdownToFile = (
  markdownContent: string,
  outputFile: string
): void => {
  fs.writeFileSync(outputFile, markdownContent, "utf-8");
  logger.info(`✅ Content saved to '${outputFile}'`);
};

/**
 * Main function
 */
const scrapGitBook = async (
  gitbookUrl: string,
  outputFile: string
): Promise<void> => {
  logger.debug(`🚀 Fetching main content from ${gitbookUrl}...`);
  const mainPageHtml = await fetchHtml(gitbookUrl);
  if (!mainPageHtml) return;

  logger.debug("🔗 Extracting internal links...");
  const pageLinks = extractPageLinks(mainPageHtml, gitbookUrl);

  let markdownContent = "";
  for (const link of pageLinks) {
    logger.debug(`📄 Fetching ${link}...`);
    const pageHtml = await fetchHtml(link);
    if (!pageHtml) continue;

    try {
      logger.debug("✂ Extracting content...");
      const contentHtml = extractContentFromHtml(pageHtml);
      logger.debug("📝 Converting to Markdown...");
      markdownContent += convertHtmlToMarkdown(contentHtml) + "\n\n";
    } catch (error: any) {
      logger.warn(`⚠ Error on ${link}: ${error.message}`);
    }
  }

  logger.debug(`💾 Saving Markdown to '${outputFile}'...`);
  saveMarkdownToFile(markdownContent, outputFile);

  logger.info("✅ Done!");
};

export default scrapGitBook;