import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
    console.log('Please enter the data you want to write to the file:');
    console.log('Then type "exit" on a new line and press Enter to finish.');

    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const writeStream = createWriteStream(filePath);

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const data = chunk.toString();
            if (data.trim() === 'exit') {
                this.push(null);
                callback(null, null);
                process.exit();
            }
            callback(null, chunk);
        }
    });

    try {
        await pipeline(
            process.stdin,
            transformStream,
            writeStream
        );
    } catch (error) {
        console.error(error.message);
    };
};

await write();
