import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

const transform = async () => {
    console.log('Please enter some text:');

    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const data = chunk.toString().split('').reverse().join('');
            this.push(data);
            callback();
            process.exit();
        }
    });

    try {
        await pipeline(
            process.stdin,
            reverseTransform,
            process.stdout
        )
    } catch (error) {
        console.error(error.message);
    };
};

await transform();
