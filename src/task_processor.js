import { parentPort } from 'node:worker_threads';
import execBot from './bot.js';

parentPort.on('message', async (args) => {
    await execBot(args);
    parentPort.postMessage('success');
});