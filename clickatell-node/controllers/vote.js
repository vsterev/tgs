const { userVoteModel, hotelRatingModel, contactModel } = require('../models');
module.exports = {
  post: {
    vote: (req, res) => {
      //   const user = req.user;
      const rating = req.body;
      contactModel
        .findOne({ resId: rating.resId })
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
    checkIsVoted: (req, res) => {},
    hotelsRating: (req, res) => {
      const data = req.body;
      console.log;
    },
  },
};
