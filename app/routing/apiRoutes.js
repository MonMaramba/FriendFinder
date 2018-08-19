var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//path to friends array
var friendsArray = require("../data/friends.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//routing to handle get and post
module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendsArray);
    })
};

app.post("/api/friends", function(req, res){
    var user = req.body;
    console.log(user);
    //to parseInt user scores
    for(var i = 0; i < user.scores.length; i++){
        user.scores[i] = parseInt(user.scores[i]);
    }
    var buddyAtIndex = 0; //default buddy will be first in array
    var lowestDiff = 80;

    //loop through friendsArray to find difference between user and friends in array
    for(var j = 0; j < friendsArray[j].scores.length; j++) {
      var diffBetFriends = 0;
      for(var k = 0; k < friendsArray[j]; k++){
          var difference = Math.abs(user.scores[i] - friendsArray[j].scores[k]);
          diffBetFriends += difference;
      }  
      //to set new buddy index if a lower difference is found
      if(diffBetFriends < lowestDiff) {
          buddyAtIndex = j;
          lowestDiff = diffBetFriends; //to update lowest match
      }
    }
    
    friendsArray.push(user);

    res.json(friendsArray[buddyAtIndex]);
    console.log(res);

})
