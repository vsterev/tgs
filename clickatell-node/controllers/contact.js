const { contactModel, repModel, userVoteModel } = require('../models');
const { bulkSend, bulkSmsCheck } = require('../utils/bulk-sms');
const { bulkSmsProfile } = require('../utils/bulk-sms/');
const { bulkSendMany } = require('../utils/bulk-sms');
const sendMes = require('../api/newServ');
const sendEmail = require('../utils/sendMail');
const { reject } = require('bluebird');
const hotel = require('../models/hotel');
const contact = require('../models/contact');
const { parseStringPromise } = require('xml2js');
var crypto = require('crypto');
module.exports = {
  get: {
    all: (req, res) => {
      //   const user = req.user;
      contactModel
        .find()
        .populate({
          path: 'hotelId',
          model: 'Hotel',
          populate: { path: 'resortId', model: 'Resort', select: 'name' },
        })
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    getRes: (req, res) => {
      const { resId } = req.params;
      // var mykey = crypto.createCipher('aes-128-cbc', 'tgs2014app');
      // var mystr = mykey.update('abc', 'utf8', 'hex');
      // mystr += mykey.final('hex');
      // console.log(mystr); //34feb914c099df25794bf9ccb85bea72

      // var mykey = crypto.createDecipher('aes-128-cbc', 'tgs2014app');
      // var mystr = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8');
      // mystr += mykey.final('utf8');

      // console.log(mystr); //abc
      contactModel
        .findOne({ resId })
        .populate({
          path: 'hotelId',
          model: 'Hotel',
          populate: { path: 'resortId', model: 'Resort', select: 'name' },
        })
        .then((contact) => {
          const userVoted = userVoteModel.findOne({ resId });
          // console.log(contact);
          return Promise.all([contact, userVoted]);
          // res.status(200).json({ status: true, contact });
        })
        .then(([contact, userVoted]) => {
          res.status(200).json({ status: true, contact, userVoted });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    checkOut: (req, res) => {
      const { date } = req.params;
      console.log(date);
      contactModel
        .find({ checkOut: date })
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
          //   contacts.map((user) =>
          //     sendMes(
          //       `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
          //     Your checkout date is ${user.checkOut}`,
          //       user.phone,
          //       'sms'
          //     )
          //   );
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    getAllWatingTransfer: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({ time: undefined, hasTransfer: true, checkOut: date })
        .populate({
          path: 'hotelId',
          model: 'Hotel',
          // options: { sort: { name: 1 } },
          select: 'name',
          populate: { path: 'resortId', model: 'Resort', select: 'name' },
        })
        .sort({ hotelId: 1 })
        .then((rs) => res.status(200).json(rs))
        .catch((err) => res.status(400).json(err));
    },
    checkInMessage: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({ checkIn: date, firstSendMessage: { $exists: false } })
        .then((contacts) => {
          contacts.map((contact) => {
            repModel
              .find({ hotels: { $in: contact.hotelId } })
              .then((rep) => {
                if (rep[0]) {
                  console.log(rep[0].familyName, contact.hotelId, contact.name);
                  sendMes(
                    `Welcome to Bulgaria ${contact.name}.Solvex is your DMC - please visit https://www.solvex.bg/${contact.resId} for more info.Travel with smile :-).
                    Your rep is ${rep[0].familyName} on phone ${rep[0].phone}`,
                    contact.phone,
                    'sms'
                  );
                } else {
                  console.log(contact.hotelId + ' has no rep attached');
                  sendEmail(
                    'Error sending message',
                    `please enter the rep to hotel ${contact.hotelId}. Tourists will not receive messages from travel guide system!`,
                    ['vasil@solvex.bg']
                  );
                }
              })
              .catch((err) => console.log(err));
          });
          res.status(200).json('Ok');
          // console.log(repInfo)
          // contacts.map((user) =>
          //   sendMes(
          //     `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
          //   Your checkout date is ${user.checkOut}`,
          //     user.phone,
          //     'sms'
          //   )
          // );
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    checkInMessageBulkSms: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({ checkIn: date, firstSendMessage: { $exists: false } })
        .then((contacts) => {
          contacts.map((contact, i) => {
            repModel
              .find({ hotels: { $in: contact.hotelId } })
              .then((rep) => {
                if (rep[0]) {
                  // console.log(rep[0].familyName, contact.hotelId, contact.name);
                  if (!contact.firstSendMessage & contact.phone) {
                    bulkSend(
                      // contact.phone,
                      // `Welcome to Bulgaria ${contact.name}.Solvex is your DMC - please visit https://www.solvex.bg/${contact.resId} for more info.Travel with smile :-).
                      // Your rep is ${rep[0].familyName} on phone ${rep[0].phone}`,
                      rep,
                      contact
                    );
                  }
                  // .then((rs) =>
                  //   contactModel.findOneAndUpdate({ resId: contact.resId }, { firstSendMessage: rs[0].id })
                  // )
                  // .then(console.log)
                  // .catch((err) => console.log(err));
                } else {
                  console.log(contact.hotelId + ' has no rep attached');
                  sendEmail(
                    'Travel guide system - error message',
                    `Please enter the representative for hotel ${contact.hotelId}. Tourists will not receive messages from travel guide system!`,
                    ['vasil@solvex.bg']
                  );
                }
              })
              .catch((err) => console.log(err));
          });
          res.status(200).json('Ok');
          // console.log(repInfo)
          // contacts.map((user) =>
          //   sendMes(
          //     `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
          //   Your checkout date is ${user.checkOut}`,
          //     user.phone,
          //     'sms'
          //   )
          // );
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    checkInMessageBulkSms2: (req, res) => {
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
          console.log(contacts);
          const contactHotels = contacts.map((contact) => {
            return contact.hotelId._id;
          });
          const contactsRepsHotels = repModel.find({ hotels: { $in: contactHotels } }).lean();
          return Promise.all([contacts, contactsRepsHotels]);
        })
        .then(([contacts, contactsRepsHotels]) => {
          const contM = contacts.map((contact) => {
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
              const body = `Dear ${contact.name} - Welcome to Bulgaria! You are accommodated in ${
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
              )}.
              Our excursions visit: https://b2b.solvex.bg/en/excursions?city_id=${
                contact.hotelId.resortId
              }&start_date=${contact.checkIn}&end_date=${contact.checkOut} 
              DMC Solvex wish you sunny and smiley holiday :-) `;
              const to = contact.phone;
              data.push({ to, body });
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
          console.log(data, noRepsAdded, noPhones);
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
          // console.log(data);
          // const bulkSender = bulkSendMany(data);
          const bulkSender = bulkSmsProfile('POST', 'messages', data).then((r) => r.json());
          return Promise.all([data, noRepsAdded, noPhones, contacts, bulkSender]);
        })
        .then(async ([data, noRepsAdded, noPhones, contacts, bulkSender]) => {
          console.log('bs', bulkSender);
          if (Array.isArray(bulkSender)) {
            await bulkSender.map(async (rs) => {
              // const insertF = async () => {
              await contactModel
                .findOneAndUpdate({ phone: rs.to, checkIn: date }, { firstSendMessage: 'b-' + rs.id }, { new: true })
                .then((a) => console.log('alooooo', a))
                .catch(console.log);
              // }
              // insertF();
            });
          }
          console.log('positive', bulkSender);
          res.status(200).json({ contactsToSend: contacts.length, noPhones, noRepsAdded, dataSended: data.length });
        })
        .catch((err) => console.log(err));
      // .catch((err) => console.log(err));
    },
    checkOutMessageBulkSms2: (req, res) => {
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
          console.log(contacts);
          const contactHotels = contacts.map((contact) => {
            return contact.hotelId._id.toString();
          });
          const contactsRepsHotels = repModel.find({ hotels: { $in: contactHotels } }).lean();
          return Promise.all([contacts, contactsRepsHotels]);
        })
        .then(([contacts, contactsRepsHotels]) => {
          const contM = contacts.map((contact) => {
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
              //da dobavia uslovie za comment tyabva da e tuk
              const body = `Dear ${contact.name} - your departure date is ${contact.checkOut} the transfer time is at ${contact.time} h - ${contact.comment}. Your DMC Solvex wishes you a safe trip!  `;
              const to = contact.phone;
              data.push({ to, body });
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
          // const bulkSender = bulkSendMany(data);
          const bulkSender = bulkSmsProfile('POST', 'messages', data).then((r) => r.json());
          return Promise.all([data, noPhones, noRepsAdded, contacts, bulkSender]);
        })
        .then(async ([data, noPhones, noRepsAdded, contacts, bulkSender]) => {
          if (Array.isArray(bulkSender)) {
            await bulkSender.map(async (rs) => {
              // async function updateContact() {
              await contactModel
                .findOneAndUpdate({ phone: rs.to, checkOut: date }, { lastSendMessage: 'b-' + rs.id }, { new: true })
                .then((a) => console.log('alooooo', a))
                .catch(console.log);
              // }
              // updateContact();
            });
          }
          //da find all contacts
          console.warn('tuk e posleden', bulkSender);
          res.status(200).json({ contactsToSend: contacts.length, noPhones, noRepsAdded, dataSended: data.length });
        })
        .catch((err) => console.log());
    },
    checkIn: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({ checkIn: date })
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    testIncludeArr: (req, res) => {
      contactModel
        .updateMany({ hotelId: { $in: ['1464', '1907'] } }, { hasTransfer: true })
        .then((rs) => res.status(200).json(rs))
        .catch((err) => res.status(400).json(err));
    },
    checkCheckInContacts: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({ checkIn: date }) //send only to contacts that firstSendMessage is not defined
        .populate('hotelId')
        .lean()
        .then((contacts) => {
          const contactMessageSended = [];
          const contactHotels = contacts.map((contact) => {
            if (!!contact.firstSendMessage) {
              contactMessageSended.push(contact.resId);
            }
            return contact.hotelId._id;
          });
          const contactsRepsHotels = repModel.find({ hotels: { $in: contactHotels } }).lean();
          return Promise.all([contacts, contactsRepsHotels, contactMessageSended]);
        })
        .then(([contacts, contactsRepsHotels, contactMessageSended]) => {
          const contM = contacts.map((contact) => {
            contact.reps = []; //add property reps to each contact
            contactsRepsHotels.filter((contactsRep) => {
              if (contactsRep.hotels.includes(contact.hotelId._id.toString())) {
                contact.reps = [...contact.reps, contactsRep];
              }
            });
          });
          const data = [];
          const noPhones = [];
          const noRepsAdded = {};
          contacts.map((contact) => {
            if ((contact.reps.length > 0) & !!contact.phone) {
              // const body = `Dear ${contact.name} - Welcome to Bulgaria! You are accommodated in ${
              //   contact.hotelId.name
              // } from ${contact.checkIn} to ${
              //   contact.checkOut
              // }. Reps that will support you durring your stay : ${contact.reps.map(
              //   (rep) =>
              //     rep.firstName +
              //     ' ' +
              //     rep.familyName +
              //     'speaking' +
              //     rep.languages.join(', ') +
              //     ' on phone ' +
              //     rep.phone
              // )}. More info about excursions - https://b2b.solvex.bg/en/excursions. Enjoy your holiday!`;
              // const to = contact.phone;
              // data.push({ to, body });
              // continue;
            } else if (contact.reps.length === 0) {
              // console.log(
              //   `Hotel  ${contact.hotelId.name} / ${contact.hotelId._id} - has no rep attached - no info send to sms bulk system for reservation - ${contact.resId}!`
              // );
              if (!noRepsAdded.hasOwnProperty(contact.hotelId._id)) {
                noRepsAdded[contact.hotelId._id] = contact.hotelId.name;
              } else {
                noRepsAdded[contact.hotelId._id] = contact.hotelId.name;
              }
            } else if (!contact.phone) {
              // console.log(
              //   `Reservation id - ${contact.resId} has no phone attached - no info send to sms bulk system !`
              // );
              noPhones.push(contact.resId);
            }
          });
          res.status(200).json({
            allContacts: contacts.length,
            contactMessageSended: contactMessageSended.length,
            noPhones,
            noRepsAdded,
          });
        });
    },
    checkCheckOutContacts: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({ checkOut: date }) //send only to contacts that firstSendMessage is not defined
        .populate('hotelId')
        .lean()
        .then((contacts) => {
          const contactMessageSended = [];
          const contactHotels = contacts.map((contact) => {
            if (!!contact.lastSendMessage) {
              contactMessageSended.push(contact.resId);
            }
            return contact.hotelId._id;
          });
          const contactsRepsHotels = repModel.find({ hotels: { $in: contactHotels } }).lean();
          return Promise.all([contacts, contactsRepsHotels, contactMessageSended]);
        })
        .then(([contacts, contactsRepsHotels, contactMessageSended]) => {
          const contM = contacts.map((contact) => {
            contact.reps = []; //add property reps to each contact
            contactsRepsHotels.filter((contactsRep) => {
              if (contactsRep.hotels.includes(contact.hotelId._id.toString())) {
                contact.reps = [...contact.reps, contactsRep];
              }
            });
          });
          const data = [];
          const noPhones = [];
          const noRepsAdded = {};
          contacts.map((contact) => {
            if ((contact.reps.length > 0) & !!contact.phone) {
              // const body = `Dear ${contact.name} - Welcome to Bulgaria! You are accommodated in ${
              //   contact.hotelId.name
              // } from ${contact.checkIn} to ${
              //   contact.checkOut
              // }. Reps that will support you durring your stay : ${contact.reps.map(
              //   (rep) =>
              //     rep.firstName +
              //     ' ' +
              //     rep.familyName +
              //     'speaking' +
              //     rep.languages.join(', ') +
              //     ' on phone ' +
              //     rep.phone
              // )}. More info about excursions - https://b2b.solvex.bg/en/excursions. Enjoy your holiday!`;
              // const to = contact.phone;
              // data.push({ to, body });
              // continue;
            } else if (contact.reps.length === 0) {
              // console.log(
              //   `Hotel  ${contact.hotelId.name} / ${contact.hotelId._id} - has no rep attached - no info send to sms bulk system for reservation - ${contact.resId}!`
              // );
              if (!noRepsAdded.hasOwnProperty(contact.hotelId._id)) {
                noRepsAdded[contact.hotelId._id] = contact.hotelId.name;
              } else {
                noRepsAdded[contact.hotelId._id] = contact.hotelId.name;
              }
            } else if (!contact.phone) {
              // console.log(
              //   `Reservation id - ${contact.resId} has no phone attached - no info send to sms bulk system !`
              // );
              noPhones.push(contact.resId);
            }
          });
          res.status(200).json({
            allContacts: contacts.length,
            contactMessageSended: contactMessageSended.length,
            noPhones,
            noRepsAdded,
          });
        });
    },
    // bulckMessageInfo: (req, res) => {
    //   const { messageId } = req.params;
    //   bulkSmsCheck(messageId)
    //     .then((r) => {
    //       res.status(200).json(r);
    //     })
    //     .catch((e) => res.status(400).json(e));
    // },
    // bulckProfile: (req, res) => {
    //   bulkSmsProfile()
    //     .then((r) => {
    //       res.status(200).json(r);
    //     })
    //     .catch((e) => res.status(400).json(e));
    // },
  },
  post: {
    addComment: (req, res) => {
      //   const user = req.user;
      //   const { reservationId, comment } = req.body;
      //   reservationModel
      //     .findByIdAndUpdate(
      //       reservationId,
      //       { $push: { comments: comment } },
      //       { new: true }
      //     )
      //     .then((updated) => {
      //       res.status(200).json({ status: true, msg: 'Comment are added' });
      //       console.log(updated);
      //     })
      //     .catch((err) => {
      //       res.status(404).json({ status: false, msg: err });
      //       console.error(err);
      //     });
    },
    update: (req, res) => {
      const user = req.user;
      const { reservations, time, comment } = req.body;
      updateObj = {};
      if (time) {
        updateObj.time = time;
      }
      if (comment) {
        updateObj.comment = comment;
      }
      console.log(reservations, updateObj);
      msgSuccess = '';
      msgError = '';
      reservations.forEach((reservationId, id) => {
        contactModel
          .findOneAndUpdate({ resId: reservationId }, updateObj, { new: true })
          .then((upd) => {
            res.json(upd);
          })
          .catch((err) => console.log(err));
      });
      // return new Promise((resolve, reject) => {
      //   if (msgError) {
      //     return reject(msgError);
      //   }
      //   resolve(msgSuccess);
      // })
      //   .then((success) => console.log(success))
      //   .catch((err) => console.log(err));
    },
    updateMany: (req, res) => {
      //mislq che ne se polzva zameneno e s dolnoto
      const { hotelId, flightDeparture, checkOut, resId, time, comment } = req.body;
      const updateObj = {};
      const searchContact = {};
      if (time) {
        updateObj.time = time;
      }
      if (comment) {
        updateObj.comment = comment;
      }
      if (hotelId) {
        searchContact.hotelId = hotelId;
      }
      if (flightDeparture) {
        searchContact.flightDeparture = flightDeparture;
      }
      if (checkOut) {
        searchContact.checkOut = checkOut;
      }
      if (resId) {
        searchContact.resId = resId;
      }
      contactModel
        .updateMany(searchContact, updateObj)
        .then((upd) => res.status(200).json(`updated ${upd.nModified} from ${upd.n} matches`))
        .catch((err) => res.status(400).json(err));
    },
    updataArrayContacts: (req, res) => {
      //tova se polzwa
      const { reservations, time, comment } = req.body;
      contactModel
        // .updateMany({ resId: { $in: reservations }, hasTransfer: true }, { time, comment })
        .updateMany({ resId: { $in: reservations } }, { time, comment })
        .then((upd) => res.status(200).json(`updated ${upd.nModified} from ${upd.n} matches`))
        .catch((err) => res.status(400).json(err));
    },
    checkOut: (req, res) => {
      const { date, flight, hasTransfer, hotelId } = req.body;
      let searchStr = {};
      if (date) {
        searchStr = { ...searchStr, checkOut: date };
      }
      if (flight) {
        searchStr = { ...searchStr, flightDeparture: flight };
      }
      if (hasTransfer !== 'all') {
        searchStr = { ...searchStr, hasTransfer: hasTransfer };
      }
      if (hotelId) {
        searchStr = { ...searchStr, hotelId };
      }
      // console.log(searchStr);
      contactModel
        .find(searchStr)
        .populate({
          path: 'hotelId',
          model: 'Hotel',
          populate: { path: 'resortId', model: 'Resort', select: 'name' },
        })
        .then((contacts) => {
          res.status(200).json(contacts);
          //   contacts.map((user) =>
          //     sendMes(
          //       `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
          //     Your checkout date is ${user.checkOut}`,
          //       user.phone,
          //       'sms'
          //     )
          //   );
        })
        .catch((err) => {
          res.status(404).json(err);
          console.error(err);
        });
    },
    checkIn: (req, res) => {
      const { date } = req.body;
      contactModel
        .find({ checkIn: date })
        .populate({
          path: 'hotelId',
          model: 'Hotel',
          populate: { path: 'resortId', model: 'Resort', select: 'name' },
        })
        .then((contacts) => res.status(200).json(contacts))
        .catch((e) => {
          console.log(e);
          res.status(404).json(e);
        });
    },
    // bulckManualSend: (req, res) => {
    //   const { user } = req;
    //   const { message, toArr } = req.body;
    //   console.log(message, toArr);
    //   bulkSendMany({ to: toArr, body: message })
    //     .then((rs) => {
    //       if (rs) {
    //         res.status(200).json({ rs });
    //         return;
    //       }
    //       return res.status(400).json({ err: 'Wrong fetching' });
    //     })
    //     .catch((err) => {
    //       res.status(401).json(err);
    //     });
    // },
  },
};
