const get = require('./api/new');
const MOCK = require('./MOCK');
const output = JSON.parse(JSON.stringify(MOCK));
console.log(output);
// get('test message', ['359888340639']);
