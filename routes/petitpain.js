'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('../lib/mysql');

router.get('/', function(req,res,next){
	var sql = 'SELECT * FROM petitpain ORDER BY RAND() LIMIT 1';
	mysql.query(sql, function(err, rows, fields) {
		if (rows.length === 1) {
			var petitpain = rows[0];
			res.render('petitpain', {vertical_center: true, petitpain: petitpain});
		}
	});
});

router.get('/petitpain/:slug', function(req,res,next){
	var sql = 'SELECT * FROM petitpain WHERE slug = "'+req.params.slug+'" LIMIT 1';
	mysql.query(sql, function(err, rows, fields) {
		if (rows.length === 1) {
			var petitpain = rows[0];
			res.render('petitpain', {vertical_center: true, petitpain: petitpain});
		}
	});
});

module.exports = router;