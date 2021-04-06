const { bulkSend, bulkSmsCheck } = require('../utils/bulk-sms');
const { bulkSendMany } = require('../utils/bulk-sms');
const { bulkSmsProfile } = require('../utils/bulk-sms');
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
      //   bulkSmsCheck(messageId)
      bulkSmsProfile('GET', `messages/${messageId}`)
        .then((fr) => fr.json())
        .then((r) => {
          res.status(200).json(r);
        })
        .catch((e) => res.status(400).json(e));
    },
  },
  post: {
    manualSend: (req, res) => {
      const { user } = req;
      const { message, toArr } = req.body;
      console.log(message, toArr);
      //   bulkSendMany({ to: toArr, body: message })
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
