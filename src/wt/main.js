import { Worker } from 'worker_threads';
import os from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
    const workerPath = join(__dirname, 'worker.js');
    const numCPUs = os.cpus().length;
    let workers = [];
    let results = [];

    for (let i = 0; i < numCPUs; i++) {
        workers.push(new Promise((resolve) => {
            const worker = new Worker(workerPath, { workerData: 10 + i });
            worker.on('message', (result) => resolve({ status: 'resolved', data: result }));
            worker.on('error', (error) => resolve({ status: 'error', data: null }));
            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker stopped with exit code ${code}`);
                    resolve({ status: 'error', data: null });
                }
            })
        }));
    };

    results = await Promise.all(workers);
    console.log(results);
};

await performCalculations();
