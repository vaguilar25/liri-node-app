require("dotenv").config();
var Spotify = require("node-spotify-api");
var request = require("request");
var moment = require("moment");
//var spotify = new Spotify(keys.spotify);
//var spotify = new Spotify({
//  id: 'cc12f274c15340fe8072c90f855dab40',
//secret: 'f44c5fc75faf429f9c1a4e59a3f394ee'
//});
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});



// take the arguments from the user
var userSelection = process.argv[2];
var userInput = process.argv;

//If the command is to search a song in spotify
var userInputConcat = ""
concatenateUserSelection();

switch (userSelection) {
    case "spotify-this-song":

        if (userInputConcat.length != 0) {
            search_track(userInputConcat.trim());
        } else {
            search_track("The Sign Ace of Base");
        }
        break;
    case "concert-this":


        getConcertInfo(userInputConcat);
        break;

    case "movie-this":
        if (userInputConcat.length != 0) {
            var displayNobodyInfo = false;
            getMovieInfo(userInputConcat.trim(),displayNobodyInfo );

        } else {
            var displayNobodyInfo = true;
            getMovieInfo("Mr. Nobody", displayNobodyInfo);
        }
        break;
    default:
        break;

}

//function to  concatenate User Info

function concatenateUserSelection() {
    //concatenate what user is searching
    for (i = 3; i < userInput.length; i++) {
        userInputConcat = userInputConcat + " " + userInput[i];
    }
}
// function Get concert info
function getConcertInfo(artistName) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artistName.trim() + "/events?app_id=codingbootcamp";

    console.log(queryURL);
    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            // console.log(response);
            var artist = JSON.parse(body);



            for (var i = 0; i < artist.length; i++) {
                console.log("=======" + artistName + "=======");
                console.log("Name of the venue: " + artist[i].venue.name);
                console.log("Location: " + artist[i].venue.country + ", " + artist[i].venue.city);
                //console.log(artist[i].venue.city);
                //console.log(artist[i].venue.region);
                var date = artist[i].datetime;
                var formatDate = moment(date).format('MM/DD/YYYY');;
                console.log("Date of the Event: " + formatDate);
                console.log("=====================");
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

        //    var display = JSON.parse(data);
        //  console.log(display);
        //console.log(data.tracks.items[0]);


        // Go through the first page of results
        var songSelected = data.tracks.items;
        //console.log(data);

        songSelected.forEach(function (track, index) {
            console.log("====== Song Information ==========");
            console.log("Artist: " + track.artists[0].name);
            console.log("The song's Name: " + track.name);
            console.log("Preview Link: " + track.external_urls.spotify);
            console.log("Album: " + track.album.name);

            //console.log(index + ': ' + track.name + ' (' + track.popularity + ')' + ' ' + track.artists[0].name );
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


            //console.log(movie);
            console.log("Title of the Movie: " + movie.Title);
            console.log("Year the movie came out:" + movie.Year);
            console.log("IMDB Rating of the movie: " + movie.imdbRating);

            if (typeof movie.Ratings[1] != 'undefined') {
                console.log("Rotten Tomatoes Rating of the movie.:" + movie.Ratings[1].Value);
            } else {
                console.log("Rotten Tomatoes Rating of the movie.: N/A");
            }

            console.log("Country where the movie was produced: " + movie.Country);
            console.log("Language of the movie: " + movie.Language);
            console.log("Plot of the movie: " + movie.Plot);
            console.log("Actors in the movie: " + movie.Actors);

            if (displayNobodyInfo) {
                
                console.log("If you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/");

                console.log("It's on Netflix!");
            }

        } else {
            console.log(error)
        }
    })
}