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
        res.send('This is an example route.')
    })

    app.post('/sms', function (req, res) {
        const body = req.body
        console.log(body);


        res.set('Content-Type', 'text/plain')
        res.send(`You sent: ${body}`)
    })


})