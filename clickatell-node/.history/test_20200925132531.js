var clickatell = require("./index.js");

//clickatell.sendMessageRest("Hello testing message", ["27XXXXX-NUMBER",27XXXXX-NUMBER], "APIKEY-HERE");
clickatell.sendMessageHttp("Hello testing message", ["27XXXXX-NUMBER"], "APIKEY-HERE");
