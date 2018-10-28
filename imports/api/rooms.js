import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Spotify from './Spotify';

export const Rooms = new Mongo.Collection('rooms');

const makecode = () => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < 2; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  let number = Math.floor(Math.random()*1000);
  if(number<10) number = '00'+number;
  else if(number<100) number = '0'+number;
  return text+number;
};

if(Meteor.isServer) {
  Meteor.publish('rooms', (user) => {
    return Rooms.find({'contributors.id': user});
  });
}

Meteor.methods({
  'rooms.create'(playlist) {
    if(!Meteor.userId()) return new Meteor.Error('Not authorized');
    let owner = Meteor.user().profile;
    if(owner.id !== playlist.owner.id) return new Meteor.Error('Not authorized');
    let code = makecode();
    while(Rooms.findOne({code})) code = makecode();
    Rooms.insert({
      name: playlist.name,
      code,
      description: playlist.description,
      id: playlist.id,
      owner,
      contributors: [owner],
      tracks: [],
      images: playlist.images,
      timestamp: Date.now(),
    });
    return code;
  },
  'rooms.addSongs'(code, songslist) {
    let user = Meteor.user();
    if(!user) return new Meteor.Error('Not authorized');
    let tracks = songslist.map(s => {
      return{track: s, user: user.profile};
    });
    let uris = songslist.map(s => {
      return s.uri;
    });
    const room = Rooms.findOne({code});
    if(!room) return new Meteor.Error('The room does not exist');
    Spotify.addTracks(user.services.spotify.accessToken, room.id, uris)
      .then(() => {
        Rooms.update({code}, {
          $push: {tracks: {$each: tracks}}
        });
      })
      .catch((err) => console.log(err));
  },
  'rooms.addSongs2'(code, songslist) {
    let user = Meteor.user();
    if(!user) return new Meteor.Error('Not authorized');
    let tracks = songslist.map(s => {
      return{track: s, user: user.profile};
    });
    Rooms.update({code}, {
      $push: {tracks: {$each: tracks}}
    });
  },
  'rooms.addContributor'(code) {
    if(!Meteor.userId()) return new Meteor.Error('Not authorized');
    Rooms.update({code}, {
      $push: {contributors: Meteor.user().profile}
    });
  },
  'rooms.find'(code) {
    return Rooms.findOne({code});
  }
});
