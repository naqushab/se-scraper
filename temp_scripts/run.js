const se_scraper = require('se-scraper');

(async () => {
    const Cluster = {
        CONCURRENCY_PAGE: 1, // shares cookies, etc.
        CONCURRENCY_CONTEXT: 2, // no cookie sharing (uses contexts)
        CONCURRENCY_BROWSER: 3, // no cookie sharing and individual processes (uses contexts)
    };

    let browser_config = {
        debug_level: 1,
        puppeteer_cluster_config: {
            timeout: 10 * 60 * 1000, // max timeout set to 10 minutes
            monitor: false,
            concurrency: Cluster.CONCURRENCY_PAGE, // one scraper per tab
            maxConcurrency: 5, // scrape with 7 tabs
        }
    };

    let scrape_job = {
        search_engine: 'google',
        num_pages: 3,
        // add some cool google search settings
        google_settings: {
            gl: 'us', // The gl parameter determines the Google country to use for the query.
            hl: 'en', // The hl parameter determines the Google UI language to return results.
            start: 0, // Determines the results offset to use, defaults to 0.
            num: 10, // Determines the number of results to show, defaults to 10. Maximum is 100.
        },
        
        keywords: 'data',
        output_file: 'results/data.json',
    };

    var scraper = new se_scraper.ScrapeManager(browser_config);

    await scraper.start();

    var results = await scraper.scrape(scrape_job);

    console.dir(results, {depth: null, colors: true});

    await scraper.quit();
})();