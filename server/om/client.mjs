import {Client} from 'redis-om';

const url = process.env.REDIS_URL;

const client = new Client();
await client.open(url);

export default client;