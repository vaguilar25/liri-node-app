require("dotenv").config();

var request = require("request");
var moment = require("moment");
var fs = require("fs");


var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});


// take the arguments from the user
var userSelection = process.argv[2];
var userInput = process.argv;



//concatenate user inpit
var userInputConcat = "";
var textSong = "";
concatenateUserInput(userInput);

//Run the program
run(userSelection);
var displayNobodyInfo = false;
//Run Function to handle all the inputs of the user
function run(userSelection) {

    switch (userSelection) {
        case "spotify-this-song":

            if (userInputConcat.length != 0) {
                search_track(userInputConcat.trim());
            } else if (textSong.length != 0) {
                search_track(textSong.trim());
            } else {
                search_track("The Sign Ace of Base");
            }
            break;
        case "concert-this":

            getConcertInfo(userInputConcat);

            break;

        case "movie-this":

            if (userInputConcat.length != 0) {
                getMovieInfo(userInputConcat.trim(), displayNobodyInfo);

            } else {
                displayNobodyInfo = true;
                getMovieInfo("Mr. Nobody", displayNobodyInfo);
            }
            break;
        case "do-what-it-says":
            readFile();
            break;
        default:
            break;

    }
}
//function to  concatenate User Info

function concatenateUserInput(userInput) {
    //concatenate what user is searching

    for (i = 3; i < userInput.length; i++) {
        userInputConcat = userInputConcat + " " + userInput[i];
    }
}
// function Get concert info
function getConcertInfo(artistName) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artistName.trim() + "/events?app_id=codingbootcamp";


    var concertInfo = "\n\n============Concerts Information =========";

    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var artist = JSON.parse(body);
            //console.log(artist.length);
            for (var i = 0; i < artist.length; i++) {


                concertInfo += "\n=======" + artistName + "=======";
                concertInfo += "\nName of the venue: " + artist[i].venue.name;
                concertInfo += "\nLocation: " + artist[i].venue.country + ", " + artist[i].venue.city

                var date = artist[i].datetime;
                var formatDate = moment(date).format('MM/DD/YYYY');

                concertInfo += "\nDate of the Event: " + formatDate;
                concertInfo += "\n=====================";

                console.log(concertInfo);
                writeToFile(concertInfo);
                concertInfo = "";
            }



        } else {
            console.log(error)
        }
    })

}




//function to search a song
function search_track(song) {
    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // Go through the result
        var songSelected = data.tracks.items;
        var songInfo = "\n\n============Song Information =========";
        songSelected.forEach(function (track, index) {

            songInfo += "\nArtist: " + track.artists[0].name;
            songInfo += "\nThe song's Name: " + track.name;
            songInfo += "\nPreview Link: " + track.external_urls.spotify;
            songInfo += "\nAlbum: " + track.album.name
            songInfo += "\n=====================";

            console.log(songInfo);
            writeToFile(songInfo);
            songInfo = "";

        });

    });

}


// Get movie Information
function getMovieInfo(movieName) {
    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // console.log(queryURL);
    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            // console.log(response);
            var movie = JSON.parse(body);

            var movieInfo = "\n\n============Movie Information =========";
            movieInfo += "\nTitle of the Movie: " + movie.Title;
            movieInfo += "\nYear the movie came out:" + movie.Year;
            movieInfo += "\nIMDB Rating of the movie: " + movie.imdbRating;


            if (typeof movie.Ratings[1] != 'undefined') {
                movieInfo += "\nRotten Tomatoes Rating of the movie.:" + movie.Ratings[1].Value

            } else {
                movieInfo += "\nRotten Tomatoes Rating of the movie.: N/A"

            }

            movieInfo += "\nCountry where the movie was produced: " + movie.Country;
            movieInfo += "\nLanguage of the movie: " + movie.Language;
            movieInfo += "\nPlot of the movie: " + movie.Plot;
            movieInfo += "\nActors in the movie: " + movie.Actors;



            if (displayNobodyInfo) {
                movieInfo += "\nIf you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/";
                movieInfo += "\nIt's on Netflix!";

            }

            console.log(movieInfo);
            writeToFile(movieInfo);
            movieInfo = "";
        } else {
            console.log(error)
        }
    })
}


//Read File
function readFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var splitCommand = data.split(",");
        var readFromFile = "\n\n============ Read From File =========";
        writeToFile(readFromFile);

        console.log(readFromFile);

        textSong = splitCommand[1];
        run(splitCommand[0], textSong);
    })

}

//Write to log 
function writeToFile(output) {

    var userSearchResult = output;
    fs.appendFile("log.txt", userSearchResult, function (err) {

        if (err) {
            return console.log(err);
        }
    });
}