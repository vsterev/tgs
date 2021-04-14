const { sender, check } = require('../utils/linkMobility');
const { contactModel, repModel } = require('../models');
const sendEmail = require('../utils/sendMail');

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
  get: {
    checkInMessage: (req, res) => {
      const { date } = req.params;
      contactModel
        // .find({ checkIn: date, firstSendMessage: { $exists: false } }) //send only to contacts that firstSendMessage is not defined
        .find({
          checkIn: date,
          $or: [
            { firstSendMessage: { $exists: false } },
            { firstSendMessage: null },
            { firstSendMessage: '' },
            { firstSendMessage: undefined },
          ],
        }) //send only to contacts that firstSendMessage is not defined
        .populate('hotelId')
        .lean()
        .then((contacts) => {
          // console.log(contacts);
          const contactHotels = contacts.map((contact) => {
            return contact.hotelId._id;
          });
          const contactsRepsHotels = repModel.find({ hotels: { $in: contactHotels } }).lean();
          return Promise.all([contacts, contactsRepsHotels]);
        })
        .then(([contacts, contactsRepsHotels]) => {
          contacts.map((contact) => {
            contact.reps = []; //addes property reps to each contact
            contactsRepsHotels.filter((contactsRep) => {
              if (contactsRep.hotels.includes(contact.hotelId._id.toString())) {
                contact.reps = [...contact.reps, contactsRep];
              }
            });
          });
          const data = [];
          const noPhones = [];
          const noRepsAdded = [];
          contacts.map((contact) => {
            if ((contact.reps.length > 0) & !!contact.phone) {
              const message = `Dear ${contact.name} - Welcome to Bulgaria! You are accommodated in ${
                contact.hotelId.name
              } from ${contact.checkIn} to ${contact.checkOut}. Reps that will support you: ${contact.reps.map(
                (rep) =>
                  rep.firstName +
                  ' ' +
                  rep.familyName +
                  ' on phone ' +
                  rep.phone +
                  ' with ' +
                  rep.languages.join(', ') +
                  ' languages'
              )}. Our excursions visit: https://b2b.solvex.bg/en/excursions?city_id=${
                contact.hotelId.resortId
              }&start_date=${contact.checkIn}&end_date=${
                contact.checkOut
              }. DMC Solvex wish you sunny and smiley holiday :-) `;
              const to = contact.phone;
              data.push({ to, message });
            }
            if (contact.reps.length === 0) {
              console.log(
                `Hotel  ${contact.hotelId.name} / ${contact.hotelId._id} - has no rep attached - no info send to sms bulk system for reservation - ${contact.resId}!`
              );
              noRepsAdded.push(contact.hotelId._id + ' - ' + contact.hotelId.name);
            }
            if (!contact.phone) {
              console.log(
                `Reservation id - ${contact.resId} has no phone attached - no info send to sms bulk system !`
              );
              noPhones.push(contact.resId);
            }
          });
          return Promise.all([data, noRepsAdded, noPhones, contacts]);
        })
        .then(([data, noRepsAdded, noPhones, contacts]) => {
          // console.log(data, noRepsAdded, noPhones);
          if (noRepsAdded.length + noPhones.length > 0) {
            sendEmail(
              'TGS - Error sending SMS via Bulk',
              ` Dear admin, <br>
              You receive this message, because there are any reservations that have not receive SMS welcome noifications.<br>
              ${noRepsAdded.length > 0 ? `Hotel/s: ${noRepsAdded.join(', ')} do not have any rep attached. \<br>` : ''}
              ${
                noPhones.length > 0
                  ? `Reservation/s: ${noPhones.join(', ')} do not have any phone attached. \<br> `
                  : ''
              }
              Tourists will not receive any SMS messages from Travel Guide System! \<br>
              Please correct the missing information and resend the welcome message again.\<br>
              `,
              ['vasil@solvex.bg']
            );
          }
          const linkMobilitySender = sender(data).then((r) => r.json());
          return Promise.all([data, noRepsAdded, noPhones, contacts, linkMobilitySender]);
        })
        .then(([data, noRepsAdded, noPhones, contacts, linkMobilitySender]) => {
          console.log(noRepsAdded);
          if (linkMobilitySender.data.sms_id) {
            const phones = Object.keys(linkMobilitySender.data.sms_id);
            if (phones.length > 0) {
              phones.map((phone) => {
                contactModel
                  .findOneAndUpdate(
                    { phone, checkIn: date },
                    { firstSendMessage: 'l-' + linkMobilitySender.data.sms_id[phone] },
                    { new: true }
                  )
                  .catch(console.log);
              });
            }
          }
          res.status(200).json({ contactsToSend: contacts.length, noPhones, noRepsAdded, dataSended: data.length });
        })
        .catch((err) => console.log(err));
    },
    checkOutMessage: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({
          checkOut: date,
          hasTransfer: true,
          $and: [{ time: { $exists: true } }, { time: { $nin: [undefined, null, ''] } }],
          $or: [
            { lastSendMessage: { $exists: false } },
            { lastSendMessage: null },
            { lastSendMessage: '' },
            { lastSendMessage: undefined },
          ],
        }) //send only to contacts that firstSendMessage is not defined
        .populate('hotelId')
        .lean()
        .then((contacts) => {
          const contactHotels = contacts.map((contact) => {
            return contact.hotelId._id.toString();
          });
          console.log(contactHotels);
          const contactsRepsHotels = repModel.find({ hotels: { $in: contactHotels } }).lean();
          return Promise.all([contacts, contactsRepsHotels]);
        })
        .then(([contacts, contactsRepsHotels]) => {
          contacts.map((contact) => {
            contact.reps = []; //addes property reps to each contact
            contactsRepsHotels.filter((contactsRep) => {
              if (contactsRep.hotels.includes(contact.hotelId._id.toString())) {
                contact.reps = [...contact.reps, contactsRep];
              }
            });
          });
          const data = [];
          const noPhones = [];
          const noRepsAdded = [];
          contacts.map((contact) => {
            console.log(contact);
            if ((contact.reps.length > 0) & !!contact.phone) {
              //da dobavia uslovie za comment tyabva da e tuk
              const message = `Dear ${contact.name} - your departure date is ${contact.checkOut} the transfer time is at ${contact.time} h - ${contact.comment}. Your DMC Solvex wishes you a safe trip!  `;
              const to = contact.phone;
              data.push({ to, message });
            }
            if (contact.reps.length === 0) {
              console.log(
                `Hotel  ${contact.hotelId.name} / ${contact.hotelId._id} - has no rep attached - no info send to sms bulk system for reservation - ${contact.resId}!`
              );
              noRepsAdded.push(contact.hotelId._id + ' - ' + contact.hotelId.name);
            }
            if (!contact.phone) {
              console.log(
                `Reservation id - ${contact.resId} has no phone attached - no info send to sms bulk system !`
              );
              noPhones.push(contact.resId);
            }
          });
          return Promise.all([data, noPhones, noRepsAdded, contacts]);
        })
        .then(async ([data, noPhones, noRepsAdded, contacts]) => {
          if (noRepsAdded.length + noPhones.length > 0) {
            sendEmail(
              'TGS - Error sending SMS via Bulk',
              ` Dear admin, <br>
              You receive this message, because there are any reservations that have not receive SMS checkout noifications.<br>
              ${noRepsAdded.length > 0 ? `Hotel/s: ${noRepsAdded.join(', ')} do not have any rep attached. \<br>` : ''}
              ${
                noPhones.length > 0
                  ? `Reservation/s: ${noPhones.join(', ')} do not have any phone attached. \<br> `
                  : ''
              }
              Tourists will not receive checkout SMS messages from Travel Guide System! \<br>
              Please correct the missing information and resend the welcome message again.\<br>
              `,
              ['vasil@solvex.bg']
            );
          }
          const linkMobilitySender = sender(data).then((r) => r.json());
          return Promise.all([data, noPhones, noRepsAdded, contacts, linkMobilitySender]);
        })
        .then(async ([data, noPhones, noRepsAdded, contacts, linkMobilitySender]) => {
          // console.log(linkMobilitySender);
          if (linkMobilitySender.data.sms_id) {
            const phones = Object.keys(linkMobilitySender.data.sms_id);
            if (phones.length > 0) {
              phones.map(async (phone) => {
                await contactModel
                  .findOneAndUpdate(
                    { phone, checkOut: date },
                    { lastSendMessage: 'l-' + linkMobilitySender.data.sms_id[phone] },
                    { new: true }
                  )
                  .catch(console.log);
              });
            }
          }
          res.status(200).json({ contactsToSend: contacts.length, noPhones, noRepsAdded, dataSended: data.length });
        })
        .catch((err) => console.log());
    },
  },
};
