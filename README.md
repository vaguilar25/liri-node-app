# liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

# How to Use It - run the following commands: 
## 1. Get the concert information about an artis or a band: 

#### This use Bands in Town Artist Events API  for an artist and render the following information about each event to the terminal:


```
 
   * node liri.js concert-this <artist/band name here>   
    
```

#### Result: 

```
    -  Name of the venue
    -  Venue location
    -  Date of the Event (use moment to format this as "MM/DD/YYYY")
```

#### Use Case:

```
> node liri.js concert-this pink

 ============Concerts Information =========
======= pink=======
Name of the venue: P!NK: BEAUTIFUL TRAUMA WORLD TOUR
Location: United States, Sunrise
Date of the Event: 03/01/2019
=====================
```


## 2. Show information about a song: 

#### This utilize the node-spotify-api package in order to retrieve song information from the Spotify API. 

#### Do the following in order to be able to run the program:
Make a JavaScript file named keys.js.

Inside keys.js your file will look like this:

```
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```
Next, create a file named .env, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```

This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github — keeping our API key information private.


```
 
   * node liri.js spotify-this-song <name_of_the_song>   
    
```

#### Result: 

```
  - Artist(s)
  - The song's name
  - A preview link of the song from Spotify
  - The album that the song is from
```

#### Use Case:

```
> node liri.js spotify-this-song one

============Song Information =========
Artist: XXXTENTACION
The song's Name: One Minute (feat. Kanye West)
Preview Link: https://open.spotify.com/track/0T6RSXxFhW8dRTWHI604ld
Album: SKINS
=====================
```


```
> node liri.js spotify-this-song one metallica

============Song Information =========
Artist: Metallica
The song's Name: One (Remastered)
Preview Link: https://open.spotify.com/track/0LAcM6I7ijW4VVW0aytl1t
Album: ...And Justice for All (Remastered Deluxe Box Set)
=====================

```

```
> node liri.js spotify-this-song 

============Song Information =========
Artist: Ace of Base
The song's Name: The Sign
Preview Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE
Album: The Sign (US Album) [Remastered]
=====================

```

## 3. Get information about a movie: 

#### This use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key.

```
 
   * node liri.js movie-this <movie name here>   
    
```

#### Result: 

```
   - Title of the movie.
   - Year the movie came out.
   - IMDB Rating of the movie.
   - Rotten Tomatoes Rating of the movie.
   - Country where the movie was produced.
   - Language of the movie.
   - Plot of the movie.
   - Actors in the movie.

```

#### Use Case:

```
> node liri.js movie-this lord of the rings

============Movie Information =========
Title of the Movie: The Lord of the Rings: The Fellowship of the Ring
Year the movie came out:2001
IMDB Rating of the movie: 8.8
Rotten Tomatoes Rating of the movie.:91%
Country where the movie was produced: New Zealand, USA
Language of the movie: English, Sindarin
Plot of the movie: A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.
Actors in the movie: Alan Howard, Noel Appleby, Sean Astin, Sala Baker

```


```
> node liri.js movie-this 
============Movie Information =========
Title of the Movie: Mr. Nobody
Year the movie came out:2009
IMDB Rating of the movie: 7.9
Rotten Tomatoes Rating of the movie.:67%
Country where the movie was produced: Belgium, Germany, Canada, France, USA, UK
Language of the movie: English, Mohawk
Plot of the movie: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.
Actors in the movie: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham
```

## 4. Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands: 

```
 
   * node liri.js do-what-it-says 
    
```

#### Result: 

```
   It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

```

#### Use Case:

```
> node liri.js do-what-it-says

============ Read From File =========


============Song Information =========
Artist: Backstreet Boys
The song's Name: I Want It That Way
Preview Link: https://open.spotify.com/track/6e40mgJiCid5HRAGrbpGA6
Album: The Hits--Chapter One
=====================

```


## 5. Bonus

#### output the data (all the commands results) to a .txt file called log.txt


# 6. Topics that we have covered
* Use of Git: Creating a repository
```
    * clone 
    * add 
    * commit 
    * push
```

* Use of NodeJs

```

    * Node-Spotify-API
    * Request
    * Moment
    * DOtEnv
    * FS

    * Javascript
        * Iterations
        * Functions
        * callback functions
       
```

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - The editor used
* [GitHub](https://github.com/) - Version Control


## Versioning

I use [GitHub](https://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/vaguilar25/liri-node-app). 

## Authors

* **Vivian Aguilar** 

## Acknowledgments

* Jerome Chenette
* Sasha Pastel
* Jimmy Tu
