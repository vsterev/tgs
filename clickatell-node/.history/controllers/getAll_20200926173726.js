const contactModel = require('../models/contacts');
const contacts = [];
contactModel.find().then((contactsBase) => console.log(contacts));
