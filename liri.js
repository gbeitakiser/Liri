// Required
require("dotenv").config();

// Connects Spotify API with liri.js
// var spotify = new Spotify(keys.spotify);

// Add inputs to vars
var input1 = process.argv[2];

// Delegates which function to call depending on input using a Switch Case. Will make these functions later. 
switch (input1) {
    case "concert-this":
    // searchbandsInTown();
    console.log("Concert works")
      break;

    case "spotify-this-song":
    // searchSpotify();
    console.log("Spotify works")
      break;

    case "movie-this":
    // searchOMDB();
    console.log("OMDB works")
      break;

    case "do-what-it-says":
    // searchMySoul();
    console.log("Soul works")
      break;

    default:
      console.log("Enter a command");
  }