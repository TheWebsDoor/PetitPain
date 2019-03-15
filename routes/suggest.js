'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('../lib/mysql');

router.post('/suggest', function(req,res,next){
	var request = require('request');
	req.headers.cookie = null;
	req.session.flash = [];
	request('https://www.google.com/recaptcha/api/siteverify?secret='+process.env.SECRET_GOOGLE+'&response='+req.body['g-recaptcha-response'], function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var responseJSON = JSON.parse(body);
			if (responseJSON.success === true) {
				var new_suggestion = [req.body.message, req.body.punchline, new Date()];
				mysql.query('INSERT INTO suggestions (message, punchline, date_creation) VALUES (?, ?, ?)', new_suggestion, function(err, result) {
                    req.flash('success', 'Ton message a bien été envoyé !');
                    res.render('suggest', {vertical_center: true});
                });
			}
			else {
				req.flash('danger', 'La vérification anti-robot a échoué. Essaye encore !');
				res.render('suggest', {vertical_center: true});
			}
		}
		else {
			res.redirect('/');
		}
	});
});

router.get('/suggest', function(req,res,next){
	res.render('suggest', {vertical_center: true});
});

module.exports = router;