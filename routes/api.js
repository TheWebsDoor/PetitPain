'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('../lib/mysql');

router.get('/api', function(req,res,next){
	res.render('api', {vertical_center: false});
});

router.get('/api/random', function(req,res,next){
	var sql = 'SELECT * FROM petitpain ORDER BY RAND() LIMIT 1';
	mysql.query(sql, function(err, rows, fields) {
		if (rows.length === 1) {
			var petitpain = formatPetitPain(rows[0]);
			res.json(petitpain);
		}
		else {
			res.render('not_found', {vertical_center: true});
		}
	});
});

router.get('/api/list', function(req,res,next){
	var sql = 'SELECT * FROM petitpain ORDER BY id_petitpain ASC';
	mysql.query(sql, function(err, rows, fields) {
		if (rows.length > 0) {
			var arrayPetitsPains = [];
			rows.forEach(function (petitpain) {
				arrayPetitsPains.push(formatPetitPain(petitpain));
			});
			res.json(arrayPetitsPains);
		}
		else {
			res.render('not_found', {vertical_center: true});
		}
	});
});

router.get('/api/list_slugs', function(req,res,next){
	var sql = 'SELECT * FROM petitpain ORDER BY id_petitpain ASC';
	mysql.query(sql, function(err, rows, fields) {
		if (rows.length > 0) {
			var arraySlugs = [];
			rows.forEach(function (petitpain) {
				arraySlugs.push(petitpain.slug);
			});
			res.json(arraySlugs);
		}
		else {
			res.render('not_found', {vertical_center: true});
		}
	});
});

router.get('/api/petitpain/:slug', function(req,res,next){
	var sql = 'SELECT * FROM petitpain WHERE slug = "'+req.params.slug+'" LIMIT 1';
	mysql.query(sql, function(err, rows, fields) {
		if (rows.length === 1) {
			var petitpain = formatPetitPain(rows[0]);
			res.json(petitpain);
		}
		else {
			res.render('not_found', {vertical_center: true});
		}
	});
});

function formatPetitPain(petitpain) {
	delete petitpain.id_petitpain;
	delete petitpain.date_creation;
	var slug = petitpain.slug;
	petitpain.url = process.env.URL+'/petitpain/'+slug;
	delete petitpain.slug;
	petitpain.image_png = process.env.URL+'/medias/img/uploads/petitpain-'+slug+'.png';
	petitpain.image_svg = process.env.URL+'/medias/img/uploads/petitpain-'+slug+'.svg';
	return petitpain;
}

module.exports = router;