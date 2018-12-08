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


function search_track() {
    spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //    var display = JSON.parse(data);
        //  console.log(display);
        //console.log(data.tracks.items[0]);


        // Go through the first page of results
        var firstPage = data.tracks.items;
        //console.log(firstPage);
        console.log(
            'The tracks in the first page are.. (popularity in parentheses)'
        );

        /*
         * 0: All of Me (97)
         * 1: My Love (91)
         * 2: I Love This Life (78)
         * ...
         */
        firstPage.forEach(function (track, index) {
            console.log("======" + index + "==========");
            console.log("Artist: " + track.artists[0].name);
            console.log("The song's Name: " + track.name);
            console.log("Preview Link: " + track.external_urls.spotify);
            console.log("Album: " + track.album.name);

            //console.log(index + ': ' + track.name + ' (' + track.popularity + ')' + ' ' + track.artists[0].name );
        });

    });

}