const { json } = require('body-parser');
const { userVoteModel, hotelRatingModel, contactModel } = require('../models');
module.exports = {
  post: {
    vote: (req, res) => {
      //   const user = req.user;
      const rating = req.body;
      //str.split('').map(v=>String.fromCharCode(v.charCodeAt(0)*2-50)).join('')
      contactModel
        .findOne({ _id: rating.resId })
        .then((reservation) => {
          if (!reservation) {
            res.status(401).json({ err: 'no reservation with this number' });
            return;
          }
          return userVoteModel.create(rating).then((userVote) => {
            const hotelVote = hotelRatingModel.find({ hotelId: rating.hotelId }).then((hotel) => {
              if (hotel.length === 0) {
                return hotelRatingModel.create({
                  hotelId: rating.hotelId,
                  staff: +rating.staff,
                  cleanliness: +rating.cleanliness,
                  comfort: +rating.comfort,
                  location: +rating.location,
                  food: +rating.food,
                  value: +rating.value,
                  votes: 1,
                  comments: [{ comment: rating.hotelComment, resId: rating.resId }],
                });
              }
              return hotelRatingModel.findOneAndUpdate(
                { hotelId: rating.hotelId },
                {
                  $inc: {
                    staff: +rating.staff,
                    cleanliness: +rating.cleanliness,
                    comfort: +rating.comfort,
                    location: +rating.location,
                    food: +rating.food,
                    value: +rating.value,
                    votes: +1,
                  },
                  $push: {
                    comments: { comment: rating.hotelComment, resId: rating.resId },
                  },
                }
              );
            });
            return Promise.all([userVote, hotelVote]);
          });
        })
        .then(([userVote, hotelVote]) => {
          console.log('userVote', userVote, 'hotelVote', hotelVote);
          res.status(200).json({ userVote, hotelVote });
        })
        .catch((b) => {
          if (b.code === 11000) {
            return res.status(401).json({ err: 'duplicated vote' });
          }
          res.status(400).json(b);
        });
    },
    usersVotes: (req, res) => {
      userVoteModel
        .find()
        .populate([
          { path: 'hotelId', model: 'Hotel', select: 'name' },
          { path: 'resId', model: 'Contact', select: ['name', '_id', 'checkIn', 'phone'] },
        ])
        .then((vots) => res.status(200).json(vots))
        .catch(console.log);
    },
  },
};
