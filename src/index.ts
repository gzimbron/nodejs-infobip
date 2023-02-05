import express from 'express';

const app = express();

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

app.listen(3000, () => {
	console.log('Example app running on http://localhost:3000 ');
});
