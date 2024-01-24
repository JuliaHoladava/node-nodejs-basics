import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed - file to read does not exist')
        } else {
            console.error(error.message);
        }
    }
};

await read();
