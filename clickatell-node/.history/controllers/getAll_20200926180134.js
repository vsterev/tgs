const contactModel = require('../models/contact');
const contacts = [];
contactMode
  .find()
  //   .then((data) => contacts.concat(data))
  .then((a) => console.log(a))
  .catch((err) => console.error(err));
console.log(contacts);
