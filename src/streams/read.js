import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const readStream = createReadStream(filePath);

    try {
        await pipeline(
            readStream,
            process.stdout
        );
    } catch (error) {
        console.error(error.message);
    }
};

await read();
