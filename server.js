var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

var Users = [
	{
		login: 'user1',
		password: 'password1'
	},
	{ 
		login: 'user2',
		password: 'password2'
	},
	{
		login: 'user3',
		password: 'password3'
	}
];

app.get('/', function(req, res) {
	res.render('main');
});

app.get('/auth/google', function(req, res) {
	res.render('signin');
});

app.post('/auth/google', function(req, res) {
	if (!req.body.login || !req.body.password) {
		res.status(400).send('Login error. Invalid data. Try again!');
	} else {
		Users.filter(function(user) {
			if (user.login === req.body.login  && user.password === req.body.password) {
				req.session.user = user;
				res.redirect('/logged');
			}
		});
	res.render('Invalid data!');
	}
});

app.get('/logged', function(req, res) {
	res.render('logged');
});

    
app.listen(3000);
app.use(function(req, res, next) {
	res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});


function checkAuth(req,res,next) {
 if(req.url === '/auth/google' && (!req.session || !req.session.authenticated)) {
  res.send('unauthorised');
  return res.status(403).end();
 }
 next();
}