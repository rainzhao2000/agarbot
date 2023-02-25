import { WorkerPool } from './worker-pool.js';
import * as os from 'os';

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
        let finished = 0;
        for (let i = 1; i <= args.concurrency; ++i) {
            pool.runTask({ botName: `M${i}`, partyCode: args.partyCode }, (err, res) => {
                if (err) console.error(err);
                else console.log(res);
                if (++finished === args.concurrency) pool.close();
            });
        }
    }
})();