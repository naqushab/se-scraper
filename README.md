# se-scraper
 Search Engine Scraper

## How to install:
Run `npm install` in the cloned repo

## How to run:

Edit main.js with your data:

Configure these lines primarily in the script:
```
const filepath = path.join(__dirname, '/data/keywords_arpit.txt'); // file to pick keywords from (see data/ folder for more ex.)
const country_code = 'US'; // Country code to use for searching
const market_code = 'en-US'; // Market code for corresponding country code
const output_filepath = 'results/arpit_us.json' // Output path
const page_to_crawl = 30; // no. of pages to crawl
```

You'll get a json file:

Run json output in : python link_extract.py <json_file>
And you'll get the download links.

Download the files using any favourite downloader (mine is Jdownloader 2) :0

Contact neyazee@adobe.com for any issues.