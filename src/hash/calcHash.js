import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { dirname, join } from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const fileStream = createReadStream(filePath);
    const hash = createHash('sha256');

    try {
        await pipeline(
            fileStream,
            hash
        );
        console.log(hash.digest('hex'));
    } catch (error) {
        console.error(error.message);
    }
};

await calculateHash();
