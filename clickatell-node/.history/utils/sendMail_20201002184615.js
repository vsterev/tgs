const mailer = require('nodemailer-promise');

const sendEmail = mailer.config({
    host: 'smtp.solvex.bg',
    auth:{
      user: 'smssend@solvex.bg',
      pass: 'zcvxaDVr3ft**YUp'
    }
});
var message = {
    from: 'smssend@solvex.bg',
    to: 'vasil@solvex.bg',
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
};

sendEmail(message)
    .then(info=>console.log(info))   // if successful
    .catch(err=> {
        console.log('got error');
         console.log(err));   // if an error occurs