import { parentPort } from 'node:worker_threads';
import execBot from './bot';

parentPort.on('message', async (args) => {
    try {
        await execBot(args);
        parentPort.postMessage('success');
    } catch (e) {
        parentPort.postMessage(e);
    }
});