var Http = require('./api/http');
var Rest = require('./api/rest');
const New = require('./new');

module.exports = {
  sendMessageHttp: function (content, to, apiKey) {
    var http = new Http();
    var sendMessageHttp = http.sendMessage(content, to, apiKey);
    return sendMessageHttp;
  },
  sendMessageRest: function (content, to, apiKey) {
    var rest = new Rest();
    var sendMessageRest = rest.sendMessage(content, to, apiKey);
    return sendMessageRest;
  },
  sendMessageNew: function (content, to, apiKey) {
    var rest = new New();
    var sendMessageRest = rest.sendMessage(content, to, apiKey);
    return sendMessageRest;
  },
  // more methods coming
};
