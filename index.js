	const mongoose = require('mongoose');
	const express = require('express');
	const fs = require('fs');
	const csv = require('csvtojson');
	var app = express();
	
	var AssociateInfo = mongoose.model('Details', {    
		idsArray: Number,
		firstName: String,
		lastName: String,
		designation: String,
		associateId: String,
		location: String,
		phone: String
	});

	mongoose.connect('mongodb://localhost/Manoj');

	app.get('/post', function(req, res){

		var csvFilePath = __dirname + '/input.csv'
		
		csv().fromFile(csvFilePath)
		.on('json',(jsonObj)=>{
			var jsonArray = [];
			jsonArray.push(jsonObj);
			console.log(JSON.stringify(jsonArray));
			console.log(typeof(jsonArray))
			AssociateInfo.collection.insertMany(jsonArray, function(error, docs) {
				if (error)
					console.log('error occurred during insertion - ' + error);
				else {
					console.log('Insertion Successful');
					res.end('Insertion successful');
				}
			});
		})
		.on('done',(error)=>{
			console.log('end')
		})
		
	});

	app.get('/get', function(req, res){
		
		AssociateInfo.find({}, function(error, docs) {
			if (error)
				console.log('error occurred while retrieving - ' + error);
			else {
				console.log('retrieved Successfully');
				console.log(docs);
				res.end(JSON.stringify(docs));
			}
		});
	});

	app.listen(3000, function(){
		console.log("App listening on port 3000");
	});