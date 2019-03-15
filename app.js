'use strict';

require('dotenv').config();
require('./lib/mysql');
require('request');

var express    = require('express'),
  session      = require('express-session'),
  cookieParser = require('cookie-parser'),
  flash        = require('flash'),
	bodyParser   = require('body-parser'),
	path         = require('path'),
	assets       = require('connect-assets');

var app = express();
app.use(cookieParser('secret'));
app.use(session({ secret: 'le meilleur petit pain au monde', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(flash());

app.set('port', process.env.PORT || 2001)
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/medias/fonts',
    express.static(path.join(__dirname, 'assets', 'fonts'))
);

app.use('/medias/img',
    express.static(path.join(__dirname, 'assets', 'img'))
);

app.use(assets({
  paths: [
    'assets/css',
    'assets/js'
  ]
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static( path.join( __dirname, 'public' ) ) );
app.use(require('./routes/api'));
app.use(require('./routes/petitpain'));
app.use(require('./routes/suggest'));

app.get('*', function(req, res){
  res.render('petitpain', {vertical_center: true});
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
