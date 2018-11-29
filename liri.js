//==============================
// Requirments and Requirement Variables
//==============================
require("dotenv").config();
var request = require("request");
// Unique Spotify Variable To Hide API Keys
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");



//==============================
// Input Variables
//==============================
var input1 = process.argv[2];
var input2 = process.argv.slice(3).join(" ");



//==============================
// Switch Case Function
//==============================
function switchCase(toUse, toCall) {
    switch (toUse) {
        case "concert-this":
        searchbandsInTown(toCall);
          break;
    
        case "spotify-this-song":
            if (toCall === "") {
                searchSpotify("The Sign Ace Of Base");
                break;
            }
            else {
                searchSpotify(toCall);
                break;
            }
        
        case "movie-this":
        if (toCall === "") {
            searchOMDB("Mr. Nobody");
            break;
        }
        else {
            searchOMDB(toCall);
            break;
        }
    
        case "do-what-it-says":
        searchMySoul();
          break;
    
        default:
          console.log("Please enter a proper command. Refer to User Guide if necessary");
    }
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
            console.log("---------")
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
        var shorten = data.tracks.items[0]
        console.log("---------")
        console.log("Artist(s) Name: " + shorten.artists[0].name);   // Artist(s) Name 
        console.log("Song Name: " + shorten.name) // Song Name
        console.log("Album Name: " + shorten.album.name);   // Album Name
        console.log("Spotify URL: " + shorten.external_urls.spotify) //Spotify URL


      });
}


//------------------------------
// Spotify Search
function searchOMDB(movieName) {
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    // console.log(JSON.parse(body));
    console.log("---------")
    console.log("This movie's title is: " + JSON.parse(body).Title);
    console.log("This movie came out in: " + JSON.parse(body).Year);
    console.log("IMDB rates this movie a: " + JSON.parse(body).Ratings[0].Value);
    console.log("Rotten Tomatoes rates this movie a: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country movie was produced in: " + JSON.parse(body).Country);
    console.log("This movie is available in: " + JSON.parse(body).Language);
    console.log("Movie plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
}

function searchMySoul() {
    console.log("Warning, you're about to search a random API for a random concert/song/movie...")
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataArr = data.split(",");
        console.log(dataArr);
        console.log("---------");
        switchCase(dataArr[0], dataArr[1]);
      });
}

switchCase(input1, input2);