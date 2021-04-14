const { bulkSend, bulkSmsCheck } = require('../utils/bulk-sms');
const { bulkSendMany } = require('../utils/bulk-sms');
const { bulkSmsProfile } = require('../utils/bulk-sms');
const { check } = require('../utils/linkMobility');

module.exports = {
  get: {
    profile: (req, res) => {
      bulkSmsProfile('GET', 'profile')
        .then((fr) => fr.json())
        .then((r) => {
          if (r) {
            res.status(200).json(r);
            return;
          }
          return res.status(503).json();
          //   if (!r) {
          //     return res.status(503).json();
          //   }
          //   res.status(200).json(r);
        })
        .catch((e) => {
          console.error('retrieve error handling', e);
          return res.status(505).json(e);
        });
    },
    bulckMessageInfo: (req, res) => {
      const { messageId } = req.params;
      if (messageId.substr(0, 2) === 'b-') {
        //   bulkSmsCheck(messageId)
        bulkSmsProfile('GET', `messages/${messageId.substr(2)}`)
          .then((fr) => fr.json())
          .then((r) => {
            res.status(200).json(r);
          })
          .catch((e) => res.status(400).json(e));
      }
      if (messageId.substr(0, 2) === 'l-') {
        check(messageId.substr(2))
          .then((fr) => fr.json())
          .then((rs) => {
            if (rs) {
              const modifiedR = {};
              modifiedR.body = ' ';
              modifiedR.submission = { date: rs.data.sent_timestamp };
              modifiedR.status = { type: rs.data.status_msg };
              res.status(200).json(modifiedR);
              return;
            }
            return res.status(400).json();
          })
          .catch((err) => console.log(err));
      }
    },
  },
  post: {
    manualSend: (req, res) => {
      const { user } = req;
      const { message, toArr } = req.body;
      bulkSmsProfile('POST', 'messages', { to: toArr, body: message })
        .then((fr) => fr.json())
        .then((rs) => {
          if (rs) {
            res.status(200).json({ rs });
            return;
          }
          return res.status(400).json();
        })
        .catch((err) => {
          res.status(401).json(err);
        });
    },
  },
};
