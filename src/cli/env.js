import { env } from 'node:process';

const parseEnv = () => {
    const envVars = process.env;

    const rssVars = Object.keys(envVars)
        .filter(key => key.startsWith('RSS_'))
        .map(key => `${key}=${envVars[key]}`)
        .join('; ');

    console.log(rssVars);

};

parseEnv();
