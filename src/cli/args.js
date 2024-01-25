import { argv } from 'node:process';

const parseArgs = () => {
    const args = process.argv.slice(2);
    const parsedArgs = {};

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        parsedArgs[key] = args[i + 1];
    }

    for (const [key, value] of Object.entries(parsedArgs)) {
        console.log(`${key} is ${value}`);
    }
};

parseArgs();
