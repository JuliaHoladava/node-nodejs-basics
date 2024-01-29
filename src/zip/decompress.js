import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
    const sourseFilePath = join(__dirname, 'files', 'archive.gz');
    const destFilePath = join(__dirname, 'files', 'fileToCompress.txt');

    const sourceStream = createReadStream(sourseFilePath);
    const gzipStream = createGunzip();
    const destStream = createWriteStream(destFilePath);

    try {
        await pipeline(
            sourceStream,
            gzipStream,
            destStream
        )
        console.log('File has been decompressed');
    } catch (error) {
        console.error(error.message);
    }
};

await decompress();
