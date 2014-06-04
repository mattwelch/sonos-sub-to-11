/*
* sonossubto11.js
* modify the gain of a sonos sub depending on the currently
* playing song
*
*/
'use strict'

var bassTags=['hip-hop','rap','dance','electronic','dubstep','house'];

var SonosDiscovery = require('sonos-discovery'),
    discovery = new SonosDiscovery(),
    LastFmNode = require('lastfm').LastFmNode;

var lastfm = new LastFmNode({
  api_key: 'LASTFM_API_KEY',
  secret: 'LASTFM_API_SECRET'
});

var player;

discovery.on('topology-change', function(zones) {
    if (!player)
        grabPlayer();
})


// Here we're going to look for messages from the various Sonos zones.....
discovery.on('sub-info', function(msg) {
   if (!player || !player.sub || msg.uuid != player.sub.uuid) return;
		console.log(msg);
});

discovery.on('transport-state', function(msg) {
  if (!player || !player.sub || msg.uuid != player.uuid) return;
  if (msg.state.zoneState != 'PLAYING') return;
  var request = lastfm.request("track.getInfo", {
    artist: msg.state.currentTrack.artist,
    track: msg.state.currentTrack.title,
    handlers: {
        success: function(data) {
            if (data.track.toptags.tag) {
              for (var i=0; i < data.track.toptags.tag.length; i++) {
                if (bassTags.indexOf(data.track.toptags.tag[i].name) > -1) {
                  player.sub.setGain(15);
                  return;
                }
              }
            }
            player.sub.setGain(0);
        },
        error: function(error) {
          player.sub.setGain(0);
        }
    }
  });
});


function grabPlayer() {
    player = discovery.getPlayer('family room');
}


