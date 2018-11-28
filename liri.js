// Required
require("dotenv").config();
var request = require("request");


// Connects Spotify API with liri.js
// var spotify = new Spotify(keys.spotify);

// Add inputs to vars
var input1 = process.argv[2];
    // Modify below code to take in values with spaces in them
var input2 = process.argv[3];

// Delegates which function to call depending on input using a Switch Case. Will make these functions later. 
switch (input1) {
    case "concert-this":
    searchbandsInTown(input2);
    // console.log("Concert works");
      break;

    case "spotify-this-song":
    // searchSpotify();
    console.log("Spotify works");
      break;

    case "movie-this":
    // searchOMDB();
    console.log("OMDB works");
      break;

    case "do-what-it-says":
    // searchMySoul();
    console.log("Soul works");
      break;

    default:
      console.log("Please enter a command");
  }

  function searchbandsInTown(artist) {
      request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(response.body));
            var respond = JSON.parse(response.body)[0]
            var venueRespond = JSON.parse(response.body)[0].venue;
            console.log("Venue Name: " + venueRespond.name)
            console.log("Venue Location: " + venueRespond.city + ", " + venueRespond.country)
            // Fix Date/Time to look better
            console.log("Venue Date/Time: " + respond.datetime)
        }
      })
  };