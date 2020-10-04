const syncCities = require('./getCities');
const { resortModel } = require('../../models');
const resortSetter = require('./hotels-getter');
syncCities()
  .then((cities) => {
    cities.forEach(async (city) => {
      const _id = +city.ID[0];
      const name = city.Name[0];
      const regionId = city.RegionID[0];
      const countryId = city.CountryID[0];
      const code = city.Code[0];
      console.log({ _id, name, regionId, countryId, code });
      await resortModel.create({ _id, name, regionId, countryId, code });
      //     .then((a) => console.log(a))
      //     .catch((e) => console.log(e));
    });
  })
  .then((b) => console.log(b))
  .catch((err) => console.log(err));
