import WorkerPool from './worker_pool.js';
import * as os from 'os';
import puppeteer from 'puppeteer';

const args = {
    concurrency: "",
    partyCode: ""
};

(async () => {
    if (process.argv.length != Object.keys(args).length + 2) {
        console.error(`Usage: node ${process.argv[1]} <concurrency> <partyCode>`)
    } else {
        args.concurrency = process.argv[2];
        args.partyCode = process.argv[3];
        const pool = new WorkerPool(os.cpus().length);
        const browser = await puppeteer.launch();
        let finished = 0;
        for (let i = 1; i <= args.concurrency; ++i) {
            pool.runTask({
                browserWSEndpoint: browser.wsEndpoint(),
                botName: `Diver ${i}`,
                partyCode: args.partyCode
            }, async (err, res) => {
                console.log(i, err, res);
                if (++finished === args.concurrency) {
                    await browser.close();
                    pool.close();
                }
            });
        }
    }
})();