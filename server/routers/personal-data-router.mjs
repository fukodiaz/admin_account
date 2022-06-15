import {Router} from 'express';
import {personalDataRepository} from '../om/personal-data.mjs';

//import multer from 'multer';
//import busboy from 'busboy';
import busboy from 'connect-busboy';

export const router = Router();


router.post('/', busboy({immediate: true}), async (req, res, next) => { //multer().none()
	//if (!req.busboy) throw new Error('file binary data cannot be null');

	let personalData = personalDataRepository.createEntity();

	let photoData = null;
	let fio = null;
	let email = null;
	let imagePhotoType = null;

	req.busboy.on('file', (fieldName, file, info) => {

		const {filename, encoding, mimeType} = info;

		imagePhotoType = mimeType;
		console.log(`${filename},,,${encoding},,,${mimeType}`);

		file.on('data', (data) => {
			if (photoData === null) {
				photoData = data.toString('base64');
			} else {
				photoData = Buffer.concat([photoData, data]).toString('base64');
			}
		});
	});

	req.busboy.on('field', (fieldName, value) => {
		if (fieldName === 'fio') {
			fio = value;
		}

		if (fieldName === 'email') {
			email = value;
		}
	});

	req.busboy.on('finish', async () => {
		//if (!photoData) next(new Error('file binary data cannot be null'));

		personalData.fio = fio;
		personalData.email = email;
		personalData.photo = photoData;
		personalData.imagePhotoType = imagePhotoType;

		let id = await personalDataRepository.save(personalData);

		res.send(await personalDataRepository.fetch(id));
	});






	//const instancePersonalData = await personalDataRepository.fetch(personalData.entityId);
	// let photoData = await Object.entries(instancePersonalData)
	// 										.filter(item => item[0] === 'photo')
	// 										.map(item => item[0][1]);
	//personalData.photo = req.body.photo || null;

	// const bb = busboy({headers: req.headers});

	// bb.on('file', (fieldname, file) => {
	// 	file.on('data', (data) => {

	// 		if (!photoData) {
	// 				photoData = data;
	// 		} else {
	// 			photoData.concat([data]);
	// 		}
	// 	});

	// 	//stream is done
	// 	file.on('end', () => {
	// 		client.set(
	// 			`PersonalData:${personalData.entityId}`,
	// 			`{photo: ${photoData}}`,
	// 			(err, res) => {
	// 				if (err) {next(err);} else {
	// 					res.end();
	// 				}
	// 			}
	// 		);
	// 	});
	// });

	// req.pipe(bb);

	// const object = {};
	// req.body.forEach((value, key) => object[key] = value);
	// const json = JSON.stringify(object);

	/////personalData.fio = req.body.fio || null;
	////personalData.email = req.body.email || null;

	// personalData.fio = Object.entries(req.body).filter(item => item[0] === 'fio')[0][1] || null;
	// personalData.email = Object.entries(req.body).filter(item => item[0] === 'email')[0][1] || null;

	// let id = await personalDataRepository.save(personalData);

	// res.send(await personalDataRepository.fetch(id));

});