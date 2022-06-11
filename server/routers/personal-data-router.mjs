import {Router} from 'express';
import {personalDataRepository} from '../om/personal-data.mjs';

export const router = Router();

// router.put('/', async (req, res) => {
// 	const personalData = await personalDataRepository.createAndSave(JSON.stringify(req.body));

// 	res.send(personalData);
// });

// router.post('/', async (req, res) => {
// 	await personalDataRepository.save(JSON.stringify(req.body));

// 	res.send(personalDataRepository);
// });

// router.post('/', async (req, res) => {
// 	const personalData = await personalDataRepository.createAndSave(JSON.stringify(req.body));
// 	res.send(personalData);
// });

// router.post('/', async (req, res) => {
// 	await personalDataRepository.save(req.body);
// 	const personalData = await personalDataRepository.fetch(personalDataRepository
// 																		.json().entityId);

// 	res.send(personalData);
// });

// router.post('/', async (req, res) => {
// 	let personalData = personalDataRepository.createEntity();

// 	personalData.photo = req.body.photo || null;
// 	personalData.fio = req.body.fio || null;
// 	personalData.email = req.body.email || null;

// 	let id = await personalDataRepository.save(personalData);

// 	res.set('Access-Control-Allow-Origin', req.headers.origin);

// 	res.send({ id });

// });




// router.post('/', (req, res) => {
// 	res.send(req.body);
// });



router.post('/', async (req, res) => {
	let personalData = personalDataRepository.createEntity();

	//personalData.photo = req.body.photo || null;
	personalData.fio = req.body.fio || null;
	personalData.email = req.body.email || null;

	let id = await personalDataRepository.save(personalData);

	res.send(await personalDataRepository.fetch(id));

});