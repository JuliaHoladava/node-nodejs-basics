import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const list = async () => {
    const directoryPath = path.join(__dirname, 'files');

    try {
        await fs.access(directoryPath);

        const files = await fs.readdir(directoryPath);
        console.log('Files in the directory:', files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed - files folder does not exist');
        } else {
            console.error(error.message);
        }
    }
};

await list();
