import { createClient } from 'redis';
import {Client} from 'redis-om';

const url = process.env.REDIS_URL;

const redis = createClient(url, { return_buffers : true });
await redis.connect();
const client = await new Client().use(redis); 

//const client = new Client();
// //await client.option({ return_buffers : true });
//await client.open(url);

export default client;