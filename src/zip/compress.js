import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compress = async () => {
    const sourseFilePath = join(__dirname, 'files', 'fileToCompress.txt');
    const destFilePath = join(__dirname, 'files', 'archive.gz');

    const sourceStream = createReadStream(sourseFilePath);
    const gzipStream = createGzip();
    const destStream = createWriteStream(destFilePath);

    try {
        await pipeline(
            sourceStream,
            gzipStream,
            destStream
        )
        console.log('File has been compressed');
    } catch (error) {
        console.error(error.message);
    }
};

await compress();
