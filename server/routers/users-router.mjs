import {Router} from 'express';
import client from '../models/client.mjs';

export const router = Router();

router.get('/', async (req, res) => {
	let result = JSON.parse(await client.execute(['JSON.GET', 'usersList']));
	result = result.map(user => {
		if (user.password) {
			user.password = 'Получен';
		} else {
			user.password = 'Отсутствует';
		}
		return user;
	});
	
	res.send(JSON.stringify(result));
});