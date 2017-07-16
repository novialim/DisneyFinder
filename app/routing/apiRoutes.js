// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

'use strict';

var princessData = require ('../data/princesses');

module.exports = function (app) {

	app.get('/api/friends', function (req, res){
		res.json(princessData);
	});

	app.post('/api/friends', function (req, res){

		var smallestScore = 0;
		var bestMatch;

		for (var i=0; i<princessData.length; i++){
			var compArray = [];

			for (var j=0; j< princessData[i].scores.length; j++){
				compArray.push(Math.abs(princessData[i].scores[j] - req.body.scores[j]));
			}

			var matchScore = compArray.reduce((a,b) => a+b, 0);

			if(smallestScore == 0){
				smallestScore = matchScore;
			}

			if (matchScore < smallestScore){
				smallestScore = matchScore;

				bestMatch = princessData[i];
				console.log(princessData[i].name);
			}
		}

		res.json(bestMatch);

		princessData.push(req.body);
	});
}