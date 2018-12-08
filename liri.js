require("dotenv").config();
var Spotify = require('node-spotify-api');

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
if (userSelection === "spotify-this-song") {

    var song_name = "";
    // concatenate user input
    for (i = 3; i < userInput.length; i++) {
        song_name = song_name + " " + userInput[i];
    }

    //console.log (song_name);

    //Search for the song
    if (song_name.length != 0) {
        search_track(song_name.trim());
    } else {
        search_track("The Sign Ace of Base");
    }
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
        //console.log(firstPage);

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