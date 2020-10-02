# A simple NODEJS REST & HTTP interaction with Clickatell platform API

Inside the test.js file is an example implementation of the REST and HTTP API.

Simply require the clickatell-platform package and use one of the methods to send. 
Add the message you want to send, and add the cell number you're sending to, and the API key.

```
var clickatell = require("clickatell-platform");

//clickatell.sendMessageRest("Hello testing message", ["27XXXXX-NUMBER"], "APIKEY-HERE");

clickatell.sendMessageHttp("Hello testing message", ["27XXXXX-NUMBER"], "APIKEY-HERE");


```

### Run the code

Simply create a file called test.js and add the code above.
Then trigger the sending by running "node test.js" in your terminal.

Remember to add the number you are sending to and your API Key to be able to send successfully.

```
node test.js
```

### Handling API callbacks

Create a file called server.js and paste the code below into it and save it.

It has a express post method pointing to yourdomain.com/sms which you will use on your platform api to send the callback
posts to, to be able to read callback infromation.

Simply run the code by typing "node server.js" and it will start to run on port 80, make sure it works by just going to yourdomain.com

```
node server.js"
```

```
const express = require('express')
const bodyParser = require('body-parser')


const app = express()


const http = require('http')
const port = 80

const server = http.createServer(app)


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`);


    app.get('/', function (req, res) {
        res.send('It's working')
    })

    app.post('/sms', function (req, res) {
        const body = req.body
        console.log(body);


        res.set('Content-Type', 'text/plain')
        res.send(`You sent: ${body}`)
    })


})
```

Below is data that you will get back on the callback, once you send a sms.

DELIVERED_TO_GATEWAY : 
* integrationName
* messageId
* requestId
* clientMessageId
* to
* from
* statusCode
* status
* statusDescription
* timestamp

RECEIVED_BY_RECIPIENT :
* integrationName
* messageId
* requestId
* clientMessageId
* to
* from
* statusCode
* status
* statusDescription
* timestamp

