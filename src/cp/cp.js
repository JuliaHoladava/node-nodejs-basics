import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
    const filePath = join(__dirname, 'files', 'script.js');

    const child = spawn('node', [filePath, ...args], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    child.on('error', (error) => {
        console.error(error);
    });

    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
