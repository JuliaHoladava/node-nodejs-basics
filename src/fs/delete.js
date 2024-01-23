import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const remove = async () => {
    const removePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await fs.access(removePath);

        await fs.rm(removePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed - file to remove does not exist');
        } else {
            console.error(error.message);
        }
    }
};

await remove();
