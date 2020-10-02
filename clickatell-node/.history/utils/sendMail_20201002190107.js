const mailer = require('nodemailer-promise');
const sendEmail = (mails) => {
  const emailing = mailer.config({
    host: 'smtp.solvex.bg',
    port: 2525,
    secure: false,
    auth: {
      user: 'smssend@solvex.bg',
      pass: 'zcvxaDVr3ft**YUp',
    },
  });
  var message = {
    from: 'smssend@solvex.bg',
    to: mails,
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>',
  };

  emailing(message)
    .then((info) => console.log(info)) // if successful
    .catch((err) => {
      console.log('got error');
      console.log(err);
    }); // if an error occurs
};
module.exports = sendEmail;
