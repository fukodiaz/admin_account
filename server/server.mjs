import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import createPath from './helpers/create-path.mjs';

import {router as personalDataRouter} from './routers/personal-data-router.mjs';
import {router as personalPhotoRouter} from './routers/personal-photo-router.mjs';
import {router as newsImageRouter} from './routers/news-image-router.mjs';
import {router as newsRouter} from './routers/news-router.mjs';
import {router as directoriesRouter} from './routers/directories-router.mjs';

const app = express();
const PORT = 3000;
const corsOptions = {
	origin: 'http://localhost:8080',
	//credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('dist'));

app.use('/personalData', personalDataRouter);
app.use('/personalPhoto', personalPhotoRouter);
app.use('/newsImage', newsImageRouter);
app.use('/newsData', newsRouter);
app.use('/directories', directoriesRouter);

app.listen(PORT);

app.get('/', (req, res) => {
	res.sendFile(createPath('index'));
});

app.use((req, res) => {
	res
		.status(404)
		.send('<h1>Error</h1>')
});