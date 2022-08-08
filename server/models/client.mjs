import { createClient } from 'redis';
import {Client} from 'redis-om';

//const url = process.env.REDIS_URL || 'redis://redis:6379';

const redis = createClient({socket: {host: 'redis'}}, { return_buffers : true });
await redis.connect();
const client = await new Client().use(redis); 

//const client = new Client();
//await client.open(url);

export default client;