import { AuthType, Infobip } from '@infobip-api/sdk';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_, res) => {
	res.send('Hello World!');
});

app.post('/whatsapp', async (req, res) => {
	const { phone, message, sender } = req.body;

	const client = new Infobip({
		baseUrl: process.env.INFOBIP_BASE_URL!,
		apiKey: process.env.INFOBIP_API_KEY!,
		authType: AuthType.ApiKey
	});

	const messageConfig = {
		type: 'text',
		from: sender || process.env.INFOBIP_SENDER_PHONE!,
		to: phone,
		content: {
			text: message
		}
	};

	try {
		const result = await client.channels.whatsapp.send(messageConfig);

		res.json({ sucess: true, data: result.data });
	} catch (error) {
		console.error(error);

		res.status(500).json({ sucess: false, error });
	}
});

app.post('/wpp_template', async (req, res) => {
	const {
		phone,
		sender,
		template: { name, language, data }
	} = req.body;

	if (!phone) return res.status(400).json({ sucess: false, error: 'Missing phone number' });

	if (!name || !language || !data)
		return res.status(400).json({ sucess: false, error: 'Missing template data' });

	const client = new Infobip({
		baseUrl: process.env.INFOBIP_BASE_URL!,
		apiKey: process.env.INFOBIP_API_KEY!,
		authType: AuthType.ApiKey
	});

	const templateMessage = {
		type: 'template',
		messages: [
			{
				from: sender || process.env.INFOBIP_SENDER_PHONE!,
				to: phone,
				content: {
					templateName: name,
					language: language,
					templateData: {
						body: {
							placeholders: data
						}
					}
				}
			}
		]
	};

	try {
		const result = await client.channels.whatsapp.send(templateMessage);

		return res.json({ sucess: true, data: result.data });
	} catch (error) {
		console.error(error);

		return res.status(500).json({ sucess: false, error });
	}
});

app.listen(PORT, () => {
	console.log(`Example app running on http://localhost:${PORT} :D`);
});
