const mailer = require('nodemailer-promise');
const sendEmail = (subject, content, addresses) => {
  const emailing = mailer.config({
    host: 'smtp.solvex.bg',
    port: 2525,
    secure: true,
    auth: {
      user: 'smssend@solvex.bg',
      pass: 'zcvxaDVr3ft**YUp',
    },
  });
  var message = {
    from: 'smssend@solvex.bg',
    to: addresses,
    subject: subject,
    // text: 'Plaintext version of the message',
    html: content,
  };

  emailing(message)
    .then((info) => console.log(info)) // if successful
    .catch((err) => {
      console.log('got error');
      console.log(err);
    }); // if an error occurs
};
module.exports = sendEmail;
