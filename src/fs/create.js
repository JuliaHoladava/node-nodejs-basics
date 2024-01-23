import fs from 'fs/promises';
import path  from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const create = async () => {
    const directoryPath = path.join(__dirname, 'files');
    const filePath = path.join(directoryPath, 'fresh.txt');

    try {
        try {
            await fs.access(filePath);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        await fs.mkdir(directoryPath, { recursive: true });

        await fs.writeFile(filePath, 'I am fresh and young');
    } catch (error) {
        console.error(error.message);
    }
};

await create();
