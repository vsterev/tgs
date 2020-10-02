const get = require('./api/newServ');
const MOCK = require('./MOCK');
const date = new Date().getDate;
const month = new Date().getMonth + 1;
const year = new Date().getFullYear;
const currentDate = `${date}-${month}-${year}`;
console.log(currentDate);
// MOCK.map((user) => {
//   get(
//     `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
//     Your checkout date is ${user.checkOut}`,
//     user.phone,
//     'whatsapp'
//   );
// });
// get(
//   'Welcome to Bulgaria. Solvex is your DMC - please visit https://www.solvex.bg for more info. Travel with smile :-)',
//   '359888340639',
//   'whatsapp'
// );
