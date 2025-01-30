import { scrapGitBook } from "./src/scrapGitBook";

// Run the script with your GitBook URL
const gitbookUrl = "https://docs.dodoex.io/en/home/what-is-dodo";
const outputFile = "documentation2.md";

scrapGitBook(gitbookUrl, outputFile);