const sendEmail = require('./sendMail');
const subject = 'Solvex Welcome System - No Reply message';
const addresses = [`vasil@solvex.bg`];
const content = 'Error hotel code is not mapped to representative guide';
sendEmail(subject, content, addresses);
