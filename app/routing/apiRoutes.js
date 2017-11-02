var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };  

        // Take the result from the survey POSt and parse it.
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // this variable calculates the user's score and the scores of each user in the database.
        var totalDifference = 0;

        // loop through all the friend posibilities in the database
        for (var i = 0; i<friends.length; i++){
            console.log(friends[i]);
            totalDifference = 0;

            // then loop through each friends score
            for (var j = 0; j<friends[i].scores[i]; j++){

                // calculate the difference between the scores and sum them into the totalDifference variable
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // if the sume of differences is less then the difference of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // reset the best match to be the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // Save the user's data to the database
        friends.push(userData);

        //  Return JSON with the user's bestMatch. Used in the html.
        res.json(bestMatch);
    })
}