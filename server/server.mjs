import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';

import {router as personalDataRouter} from './routers/personal-data-router.mjs';

const app = express();
const PORT = 3000;
const corsOptions = {
	origin: 'http://localhost:8080',
	//credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));

const createPath = (page) => path.resolve(__dirname,'dist',`${page}.html`);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('dist'));

app.use('/personalData', personalDataRouter);

app.listen(PORT);

app.get('/', (req, res) => {
	res.sendFile(createPath('index'));
});

app.use((req, res) => {
	res
		.status(404)
		.send('<h1>Error</h1>')
});