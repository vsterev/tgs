const getRegions = require('./getRegions');

getRegions(4)
  .then((reg) => {
    reg.map((region) => console.log(region.Name[0], region.CountryID[0]));
  })
  .catch((err) => console.log(err));
