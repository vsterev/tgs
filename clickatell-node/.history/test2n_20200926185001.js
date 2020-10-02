const get = require('./api/newServ');
const contactModel = require('./models/contact');
const MOCK = require('./MOCK');
const result = (req, res, next) => {
  const users = async () => {
    await contactModel.find();
    try {
      users.map((user) =>
        get(
          `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
        Your checkout date is ${user.checkOut}`,
          user.phone,
          'whatsapp'
        )
      );
    } catch (err) {
      return console.error(err);
    }
  };
};
.module.exports=result;
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
