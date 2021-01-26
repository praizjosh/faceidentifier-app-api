const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',  
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin', //Try to add password: "admin"
    database : 'smart-brain'
  }
});

const app = express();

// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'Barry',
// 			email: 'barry@mail.com',
// 			password: 'pass',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'Earl',
// 			email: 'earl@mail.com',
// 			password: 'code',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login: [
// 		{
// 			id: '',
// 			hash: ''
// 		}
// 	]
// }

app.use(cors());
app.use(bodyParser.json());

// const allUsers = database.users;

app.get('/', (req, res) => {res.send('It is working!')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3001, () => {
	console.log('App is running on port 3001');
})

/*
Create;
- Root (/) route with res = this is working
- /signin = POST = success/fail
- /register = POST = user
- /profile/:userid GET = user
- /image PUT = user

*/