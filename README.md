# GitBook Scraper

A scraper designed to extract and convert content from GitBook pages into Markdown format.

The project uses [axios](https://github.com/axios/axios) for making HTTP requests, [cheerio](https://cheerio.js.org/) for parsing and extracting HTML elements, and [Turndown](https://github.com/domchristie/turndown) for converting HTML to Markdown.

## Usage

### 1. Install Dependencies

Ensure that you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies:

```bash
git clone https://github.com/jecombe/scrap-gitbook.git

cd scrap-gitbook.git/

npm i
```

### 2. Add a gitbook

Open file `index.ts` and change `const gitbookUrl` with a GitBook link, and run:

```bash
npm run build-run
```
