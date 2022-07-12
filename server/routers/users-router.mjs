import {Router} from 'express';
import {userRepository} from '../models/user.mjs';
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

router.post('/', async(req, res) => {
	let userData = userRepository.createEntity();
	userData.fio = req.body.fio_user;
	userData.position = req.body.position_user;
	userData.email = req.body.email_user;
	userData.phone = req.body.phone_user;
	userData.department = req.body.department_user;
	userData.password = req.body.password_user;

	let id = await userRepository.save(userData);
	let result = await client.execute(['JSON.GET', `User:${id}`]);
	result = {entityId: id, ...JSON.parse(result)};

	const prevUsersList = await client.execute(['JSON.GET', 'usersList']);
	const novelUsersList = [result, ...JSON.parse(prevUsersList)];
	
	await client.execute(['JSON.SET', 'usersList', '$', JSON.stringify(novelUsersList)]);
	const novelDataUsersList = await client.execute(['JSON.GET', 'usersList']);
	console.log(novelDataUsersList, 777);

	res.send(novelDataUsersList);
});