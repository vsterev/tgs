const get = require('./api/newServ');
const contactModel = require('./models/contact');
const MOCK = require('./MOCK');
setTimeout(() => {
  contactModel
    .find()
    .then((users) =>
      // users.map((user) =>
      //   get(
      //     `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
      //   Your checkout date is ${user.checkOut}`,
      //     user.phone,
      //     'whatsapp'
      //   )
      // )
      console.log(users)
    )
    .catch((err) => console.error(err));

  console.log('done');
}, 5000);

// const currentDate = new Date().toLocaleDateString('bg-BG', {
//   year: 'numeric',
//   month: 'numeric',
//   day: 'numeric',
// });
// console.log(currentDate);
// console.log(process.argv[2]);
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
