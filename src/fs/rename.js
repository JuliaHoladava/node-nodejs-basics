import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rename = async () => {
    const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');

    try {
        try {
            await fs.access(oldPath);
        } catch (error) {
            throw new Error('FS operation failed - wrong file does not exist');
        }

        try {
            await fs.access(newPath);
            throw new Error('FS operation failed - proper file already exists')
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        await fs.rename(oldPath, newPath);
    } catch (error) {
        console.error(error.message);
    }
};

await rename();
