var fs = require('fs');
var path = require('path');
var os = require("os");

const se_scraper = require('se-scraper');

const filepath = path.join(__dirname, '/data/keywords_jp.txt');
const country_code = 'JP';
const market_code = 'ja-JP';
const output_filepath = 'results/data_jp.json'
const page_to_crawl = 50;
let keywords = read_keywords_from_file(filepath);

function read_keywords_from_file(fpath) {
    let kws =  fs.readFileSync(fpath).toString().split(os.EOL);
    // clean keywords
    kws = kws.filter((kw) => {
        return kw.trim().length > 0;
    });
    return kws;
}


const Cluster = {
    CONCURRENCY_PAGE: 1, // shares cookies, etc.
    CONCURRENCY_CONTEXT: 2, // no cookie sharing (uses contexts)
    CONCURRENCY_BROWSER: 3, // no cookie sharing and individual processes (uses contexts)
};

let config = {
    search_engine: 'bing',
    debug_level: 1,
    verbose: true,
    keywords: keywords,
    num_pages: page_to_crawl, // how many pages per keyword
    output_file: output_filepath,
    log_ip_address: false,
    log_http_headers: false,
    headless: true,
    is_local: false,
    throw_on_detection: false,
    // OPTIONAL PARAMS BELOW:
    // https://docs.microsoft.com/en-us/rest/api/cognitiveservices-bingsearch/bing-web-api-v5-reference#query-parameters
    bing_settings: {
        cc: country_code, // The cc parameter determines the country to use for the query.
        mkt: market_code, // The mkt parameter determines the UI language to return results.
        offset: 0, // Determines the results offset to use, defaults to 0.
        count: 10, // Determines the number of results to show, defaults to 10. Maximum is 100.
    },
    block_assets: true,
    test_evasion: false,
    apply_evasion_techniques: true,
    sleep_range: [1,2],
    puppeteer_cluster_config: {
        headless: true,
        timeout: 30 * 60 * 1000 * 10, // max timeout set to 10 minutes
        monitor: false,
        concurrency: Cluster.CONCURRENCY_PAGE, // one scraper per tab
        maxConcurrency: 5, // scrape with 7 tabs
    }
};

function callback(err, response) {
    if (err) {
        console.error(err)
    }
    console.dir(response, {depth: null, colors: true});
}

se_scraper.scrape(config, config, callback);