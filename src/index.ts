import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_, res) => {
	res.send('Hello World!');
});

app.get('/numero/:numero', (req, res) => {
	const { numero } = req.params;

	res.json({ numero });
});

app.post('/hola', (req, res) => {
	const { name } = req.body;

	res.send(`Hello ${name}!`);
});

app.listen(PORT, () => {
	console.log(`Example app running on http://localhost:${PORT} :D`);
});
