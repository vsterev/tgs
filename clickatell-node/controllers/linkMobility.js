const { sender, check } = require('../utils/linkMobility');
module.exports = {
  post: {
    manualSend: (req, res) => {
      const { user } = req;
      const { message, toArr } = req.body;
      let temp = [];
      toArr.map((it) => temp.push({ to: it, message }));
      sender(temp)
        // bulkSmsProfile('POST', 'messages', { to: toArr, body: message }) //tuk e razlichen format i zatova preformatiram za linkMobility
        .then((fr) => fr.json())
        .then((rs) => {
          if (rs.meta.code === 200) {
            const n = Object.entries(rs.data.sms_id);
            res.status(200).json({ rs: n });
            return;
          }
          console.log(rs);
          return res.status(400).json(rs.meta);
        })
        .catch((err) => {
          res.status(401).json(err);
        });
    },
    multiSend: (req, res) => {
      const { user } = req;
      const { message, toArr } = req.body;
      let temp = [];
      toArr.map((it) => temp.push({ to: it, message }));
      sender(temp)
        // bulkSmsProfile('POST', 'messages', { to: toArr, body: message }) //tuk e razlichen format i zatova preformatiram za linkMobility
        .then((fr) => fr.json())
        .then((rs) => {
          if (rs.meta.code === 200) {
            const n = Object.entries(rs.data.sms_id);
            res.status(200).json({ rs: n });
            return;
          }
          console.log(rs);
          return res.status(400).json(rs.meta);
        })
        .catch((err) => {
          res.status(401).json(err);
        });
    },
    check: (req, res) => {
      const { sms_id } = req.body;
      check(sms_id)
        .then((fr) => fr.json())
        .then((rs) => {
          if (rs) {
            res.status(200).json({ rs });
            return;
          }
          return res.status(400).json();
        })
        .catch((err) => console.log(err));
    },
  },
};
