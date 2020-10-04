const { resortModel } = require('../../models');
const resortSetter = (obj) => {
  return resortModel.create(obj);
};
module.exports = resortSetter;
