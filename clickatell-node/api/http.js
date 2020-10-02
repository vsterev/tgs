const Request = require('request');

// Constructor
function Http(content, to, apiKey) {
  // always initialize all instance properties
    this.content = content; // message you are sending
    this.to = to; // phone number
    this.apiKey = apiKey;

}
// class methods
Http.prototype.sendMessage = function(content, to, apiKey) {
   
    // replace spaces in message with plus sign to work correctly with http call
    var contentReplaced = encodeURIComponent(content.split(' ').join('+'));

    var options = { 
      method: 'GET',
      url:'https://platform.clickatell.com/messages/http/send?apiKey='+ apiKey +'&to='+ to.join(",") +'&content='+ contentReplaced
    }

  Request(options, function (error, response, body) {

    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  
};

// export the class
module.exports = Http;