const mongoose = require('mongoose');

const { requireLogin, requireCredits } = require('../middlewares');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/response', (req, res) => {
		res.send('Thanks for your response!');
	});

	app.post('/api/surveys/webhook', (req, res) => {
		console.log(req.body);
		res.end();
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.map(email => ({ email })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			const response = await mailer.send();
			if (response.statusCode === 202) {
				await survey.save();
				req.user.credits -= 1;
				const user = await req.user.save();
				res.send(user);
			} else {
				res.status(422).send('Error: email failed to send');
			}
		} catch (error) {
			res.status(422).send(error);
		}
	});
};
