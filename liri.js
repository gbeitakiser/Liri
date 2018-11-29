//==============================
// Requirments and Requirement Variables
//==============================
require("dotenv").config();
var request = require("request");
var moment = require('moment');
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

        case "user-guide":
            console.log("---------" + "\n");
            console.log("To search a concert, type 'node liri.js concert-this <Insert Artist/Band Name Here>'.");
            console.log("To search a song, type 'node liri.js spotify-this-song <Insert Song Name Here>'.");
            console.log("To search a movie, type 'node liri.js movie-this <Insert Movie Name Here>'.");
            console.log("To make a random search, type 'node liri.js do-what-it-says' and hold on for dear life." + "\n");
            console.log("---------");
            break;
        default:
          console.log("Please enter a proper command. Type 'node liri.js user-guide' for help.");
    }
}



//==============================
// API Call and Write Functions
//==============================


//------------------------------
// Bands In Town Search
function searchbandsInTown(artist) {
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response) {
        if (!error && response.statusCode === 200) {
            var respond = JSON.parse(response.body)[0];
            var venueRespond = JSON.parse(response.body)[0].venue;
            console.log("---------" + "\n");
            console.log("Venue Name: " + venueRespond.name); // Venue Name
            console.log("Venue Location: " + venueRespond.city + ", " + venueRespond.country); // Venue Location
            var dateAndTime = moment(respond.datetime).format('L');
            console.log("Venue Date: " + dateAndTime + "\n"); // Venue Date and Time
            console.log("---------");
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
        else {
            var shorten = data.tracks.items[0];
            console.log("---------" + "\n");
            console.log("Artist(s) Name: " + shorten.artists[0].name); // Artist(s) Name 
            console.log("Song Name: " + shorten.name); // Song Name
            console.log("Album Name: " + shorten.album.name); // Album Name
            console.log("Spotify URL: " + shorten.external_urls.spotify + "\n"); //Spotify URL
            console.log("---------")
        }
    })
};


//------------------------------
// OMDB Search
function searchOMDB(movieName) {
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
        console.log("---------" + "\n");
        console.log("This movie's title is: " + JSON.parse(body).Title); // Movie Title
        console.log("—")
        console.log("This movie came out in: " + JSON.parse(body).Year); // Release Year
        console.log("—")
        console.log("IMDB rates this movie a: " + JSON.parse(body).Ratings[0].Value); // IMDB Rating
        console.log("—")
        console.log("Rotten Tomatoes rates this movie a: " + JSON.parse(body).Ratings[1].Value); // Rotten Tomatoes Rating
        console.log("—")
        console.log("Country movie was produced in: " + JSON.parse(body).Country); // Movie Production Country
        console.log("—")
        console.log("This movie is available in: " + JSON.parse(body).Language); // Movie Language(s)
        console.log("—")
        console.log("Movie plot: " + JSON.parse(body).Plot); // Movie Plot
        console.log("—")
        console.log("Actors: " + JSON.parse(body).Actors+ "\n"); // Movie Actors
        console.log("---------");
    }
})
};

//------------------------------
// Random Search
function searchMySoul() {
    console.log("Warning, you're about to search a random API for a random concert/song/movie...");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        else {
            var dataArr = data.split(",");
            console.log(dataArr); // What you're about to search and where
            switchCase(dataArr[0], dataArr[1]); // Sends items in 'random/txt' through switchCase function for searching/writing to console
        }
    })
};

// Calls searches using user inputs
switchCase(input1, input2);