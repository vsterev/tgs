const getCities = require('../utils/il-service/getCities');
const getHotels = require('../utils/il-service/getHotels');
const { resortModel, hotelModel } = require('../models');
const resort = require('../models/resort');

module.exports = {
  get: {
    getCities: (req, res) => {
      getCities()
        .then((cities) => {
          let citiesObj = [];
          cities.forEach((city) => {
            const _id = +city.ID[0];
            const name = city.Name[0];
            const regionId = city.RegionID[0];
            const countryId = city.CountryID[0];
            const code = city.Code[0];
            const cityObj = { _id, name, regionId, countryId, code };
            citiesObj = [...citiesObj, cityObj];
            // resortModel.create(cityObj);
          });
          resortModel.collection.drop();
          return resortModel.insertMany(citiesObj, { ordered: false });
        })
        .then((rs) => {
          // console.log(rs);
          res.status(200).json(rs.length);
        })
        .catch((err) => {
          // res.status(200).json(err.insertedDocs);
          console.log(err);
        });
    },
    getHotels: (req, res) => {
      getHotels()
        .then((hotels) => {
          let hotelsObj = [];
          hotels.forEach((hotel) => {
            const _id = +hotel.ID[0];
            const name = hotel.Name[0];
            const code = hotel.Code[0];
            const category = hotel.HotelCategoryID[0];
            const regionId = hotel.RegionID[0];
            const resortId = hotel.CityID[0];
            const hotelObj = { _id, name, code, resortId, category, regionId };
            hotelsObj = [...hotelsObj, hotelObj];
          });
          hotelModel.collection.drop();
          return hotelModel.insertMany(hotelsObj);
          // return hotelModel.insertMany(hotelsObj, { ordered: false });
        })
        .then((rs) => res.status(200).json(rs.length))
        .catch((err) => console.log(err));
    },
  },
};
