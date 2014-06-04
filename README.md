## Overview
Monitor your **Sonos** system, and change the Sub gain according to the genre of the currently playing song.
## Setup
Clone the repo, go into the cloned directory, and type `npm install` to bring in the dependencies.

Get a [Last.fm developer account](http://www.last.fm/api) and make a new app. Note the api key and secret. We use Lastfm to find the genre of the currently playing song.

Edit the `sonossubto11.js` file, look for the string "Family Room", and replace it with the name of the Sonos zone that has a Sub that you want to control. Replace "LASTFM_API_KEY" with your api key, and "LASTFM_API_SECRET" with your secret.
## Use
This is the easy part. You don't have to do anything. The app will watch your Sonos currently playing, and adjust the gain.
## Notes
See this [blog post](http://mattwel.ch/this-sonos-goes-to-eleven "This Sonos Goes to Eleven") for more thorough information.
