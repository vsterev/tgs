const contactModel = require('../models/contacts');
const contacts = [];
contactModel
  .find()
  //   .then((data) => contacts.concat(data))
  .then((a) => console.log(a))
  .catch((err) => console.error(err));
console.log(contacts);
