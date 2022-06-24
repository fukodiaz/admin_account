import {Router} from 'express';
import {newsRepository} from '../models/news.mjs';
import client from '../models/client.mjs';

import busboy from 'connect-busboy';

export const router = Router();


router.post('/', busboy({immediate: true}), async (req, res, next) => {
	//if (!req.busboy) throw new Error('file binary data cannot be null');

	let newsData = newsRepository.createEntity();

	let theme = null;
	let text = null;
	let image = null;
	let urlImage = null;
	let imageType = null;
	let nameFileImage = null;
	let date = new Date().toLocaleDateString();

	req.busboy.on('file', (fieldName, file, info) => {
		const {filename, mimeType} = info;
		imageType = mimeType;
		nameFileImage = filename;

		file.on('data', (data) => {
			if (image === null) {
				image = data;
			} else {
				image = Buffer.concat([image, data]);
			}
		});
	});

	req.busboy.on('field', (fieldName, value) => {
		switch(fieldName) {
			case 'theme':
				theme = value;
			case 'text':
				text = value;
			case 'url':
				urlImage = value;
		}
	});

	req.busboy.on('finish', async () => {
		//if (!photoData) next(new Error('file binary data cannot be null'));

		newsData.theme = theme;
		newsData.text = text;
		newsData.image = image.toString('base64');
		newsData.imageType = imageType;
		newsData.nameFileImage = nameFileImage;
		newsData.urlImage = urlImage;
		newsData.date = date;

		let id = await newsRepository.save(newsData);
		//const result = await newsRepository.fetch(id);
		let result = await client.execute(['JSON.GET', `News:${id}`]);
		result = { 
			entityId: id,
			...JSON.parse(result)};
		
		const prevNewsList = await client.execute(['JSON.GET', 'newsList']);
		const novelNewsList = [result, ...JSON.parse(prevNewsList)];
		
		await client.execute(['JSON.SET', 'newsList', '$', JSON.stringify(novelNewsList)]);
		const novelDataNewsList = await client.execute(['JSON.GET', 'newsList']);

		res.send(novelDataNewsList);
	});

});

router.get('/', async (req, res) => {
	//await client.del('ggg');
	const result = await client.execute(['JSON.GET', 'newsList']);
	//await client.quit();
	res.send(result);
});