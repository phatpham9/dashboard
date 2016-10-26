'use strict';

module.exports = {
	admin: process.env.ADMIN_EMAIL || 'ADMIN_EMAIL',	// replace ADMIN_EMAIL
    emailFrom: process.env.EMAIL_FROM || require('../../app.json').title + ' <EMAIL_FROM>',	// replace EMAIL_FROM
    mailer: {
        service: process.env.MAIL_SERVICE || 'Mailgun',
        auth: {
            user: process.env.MAIL_USER || 'USER',		// replace USER
            pass: process.env.MAIL_PASS || 'PASSWORD'	// replace PASSWORD
        }
    }
}