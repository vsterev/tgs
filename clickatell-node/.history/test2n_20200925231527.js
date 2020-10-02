const get = require('./api/newServ');
const MOCK = require('./MOCK');
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'numeric',
  date: 'numeric',
});
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
