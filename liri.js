//==============================
// Requirments and Requirement Variables
//==============================
require("dotenv").config();
var request = require("request");
// Unique Spotify Variable To Hide API Keys
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



//==============================
// Input Variables
//==============================
var input1 = process.argv[2];
var input2 = process.argv.slice(3).join(" ");



//==============================
// Switch Case
//==============================
switch (input1) {
    case "concert-this":
    searchbandsInTown(input2);
      break;

    case "spotify-this-song":
    searchSpotify(input2);
      break;

    case "movie-this":
    // searchOMDB();
      break;

    case "do-what-it-says":
    // searchMySoul();
      break;

    default:
      console.log("Please enter a proper command. Refer to User Guide if necessary");
}



//==============================
// Functions
//==============================


//------------------------------
// Bands In Town Search
function searchbandsInTown(artist) {
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response) {
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


//------------------------------
// Spotify Search
function searchSpotify(songName) {
    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log("")
      console.log("======")
      console.log(data);
      console.log("======")
      console.log("")
    //   console.log(data.tracks.items[0].artists[0].name);   // Artist(s) Name 
      });
}