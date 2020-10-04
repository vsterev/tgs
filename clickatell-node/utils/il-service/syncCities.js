const getCities = require('./getCities');
const hotelgetter = require('./hotels-getter');
// const { resortModel, hotelModel } = require('../../models');
const syncCities = () => {
  return getCities()
    .then((cities) => {
      cities.map((city) => {
        const _id = city.ID[0];
        const name = city.Name[0];
        const regionId = city.RegionID[0];
        const countryId = city.CountryID[0];
        const code = city.Code[0];
        // console.log({ _id, name, regionId, countryId, code });
        // return resortModel
        //   .create({
        //     name: 'vasko',
        //     regionId: 'dd',
        //     countryId: 'ff',
        //     code: '12',
        //   })
        hotelgetter();
      });
    })
    .catch((err) => console.log(err));
};
module.exports = syncCities;
