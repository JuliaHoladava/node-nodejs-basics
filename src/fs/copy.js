import fs from 'fs/promises';
import path  from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files_copy');

    try {
        try {
            await fs.access(sourceDir);
        } catch (error) {
            throw new Error('FS operation failed - source folder does not exist');
        }

        try {
            await fs.access(targetDir);
            throw new Error('FS operation failed - target folder already exists');
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        const files = await fs.readdir(sourceDir);

        await fs.mkdir(targetDir);

        for (const file of files) {
            const scrFile = path.join(sourceDir, file);
            const destFile = path.join(targetDir, file);
            await fs.copyFile(scrFile, destFile);
        }
    } catch (error) {
        console.error(error.message);
    }
};

await copy();
