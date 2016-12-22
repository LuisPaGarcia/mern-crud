"use strict";

/**
 * https://zellwk.com/blog/crud-express-mongodb/
 * https://mlab.com/
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

// Use bodyParser for reading data from requests
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect('mongodb://techito:Zse4rfv@ds141098.mlab.com:41098/react-crud', (err, database) => {
	// start the server
	if (err) return console.log(err);
	let db = database;

	app.listen(3000, function() {
		console.log('- listening on 3000');
	});

	app.get('/quotes', (req, res) => {
		return db.collection('quotes').find().toString();
		// let cursor = db.collection('quotes').find().toArray((err, results) => {
		// 	return results;
		// });
	});

	app.post('/quotes', (req, res) => {
		db.collection('quotes').save(req.body, (err, result) => {
			if (err) return console.log(err);
			console.log('saved to database');

			res.redirect('/')
		});
	});

});


