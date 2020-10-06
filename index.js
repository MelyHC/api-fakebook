const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { pingTimeout: 0, pingInterval: 500 });
const config ={secret} = require('./config');
const pack = require('./package.json');

const cors = require('cors');
const { port, allowedOrigins } = require('./config.js');

const { urlencoded, json } = require('body-parser');

const corsOptions = {
  origin: allowedOrigins
}

const issuesoption = {
  origin: true,
  methods: ['POST'],
  credentials: false,
};

const errorSend = require('./middleware/error');
const auth = require('./middleware/auth')

app.use(express.static(__dirname));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('config', config);
app.set('pack', pack);

app.use(cors(corsOptions));
app.options('*', cors(issuesoption));

server.listen(port, (err) => {
  if (err) {
    throw err;
  }

  const port = server.address().port;
  console.log(`Fakebook server v1.0.0 2020 port ${port}`)
});

app.use(auth(secret));

console.log(secret)

app.get('/', (req, res) => res.json({ name: pack.name, version: pack.version }));
app.all('*', (req, resp, callback) => callback(404));

app.use(errorSend);

app.post('/auth');

app.post('/post');
app.get('/post');
app.get('/post/:userId');
app.put('/post');
app.delete('post');