import {Router} from 'express';
import client from '../models/client.mjs';

export const router = Router();

router.get('/', async (req, res) => {
	const result = await client.execute(['JSON.GET', 'directoriesList']);
	res.send(result);
});