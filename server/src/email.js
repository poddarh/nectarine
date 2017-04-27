const nodemailer = require('nodemailer');
const credentials = require('./credentials.json');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: credentials.email
});

function sendEmail(from, to, subject, body, callback) {
	let mailOptions = {
		from: credentials.email.user, // sender address
		replyTo: from,
		sender: from,
		to: to, // list of receivers
		subject: subject, // Subject line
		// html: '<b>Hello world ?</b>', // html body
		text: body // plain text body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error) => {
		if (error) {
			console.log(error);
			callback({success: false});
		} else {
			callback({success: true});
		}
	});
}
module.exports.sendEmail = sendEmail