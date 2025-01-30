# GitBook Scraper

A scraper designed to extract and convert content from GitBook pages into Markdown format.

The project uses [axios](https://github.com/axios/axios) for making HTTP requests, [cheerio](https://cheerio.js.org/) for parsing and extracting HTML elements, and [Turndown](https://github.com/domchristie/turndown) for converting HTML to Markdown.


## Usage with npm module

### 1. Install Dependencies

Ensure that you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies:

```bash

npm install scrap-gitbook
```

### 2. Import function

Create a file js or typescript and add this:

```bash
import scrapGitBook from "scrap-gitbook/src/scrapGitBook";
```

### 3. Call function

```bash

const gitbookUrl = "https://docs.dodoex.io/en/home/what-is-dodo";
const outputFile = "result.md";

scrapGitBook(gitbookUrl, outputFile);
```


## Usage with github

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
