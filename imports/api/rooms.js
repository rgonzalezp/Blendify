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
    return Rooms.find({contributors: user});
  });
}

Meteor.methods({
  'rooms.create'(name, ts, description) {
    if(!Meteor.userId()) return new Meteor.Error('Not authorized');
    let owner = Meteor.user().profile.id;
    let code = makecode();
    while(Rooms.findOne({code})) code = makecode();
    Rooms.insert({
      name,
      code,
      description,
      owner,
      contributors: [{name: owner}],
      songs: [],
      timestamp: ts,
    });
    return code;
  },
  'rooms.addSongs'(code, songslist) {
    let user = Meteor.user();
    if(!user) return new Meteor.Error('Not authorized');
    let songs = songslist.map(s => {
      return{song: s, user: user.profile.id};
    });
    let uris = songslist.map(s => {
      return s.uri;
    });
    const room = Rooms.findOne({code});
    if(!room) return new Meteor.Error('The room does not exist');
    Spotify.addTracks(user.services.spotify.accessToken, room.id, uris)
      .then(() => {
        Rooms.update({code}, {
          $push: {songs: {$each: songs}}
        });
      })
      .catch((err) => console.log('yaper prro'));
  },
  'rooms.addContributor'(code) {
    if(!Meteor.userId()) return new Meteor.Error('Not authorized');
    Rooms.update({code}, {
      $push: {contributors: Meteor.user().profile.id}
    });
  },
  'rooms.find'(code) {
    return Rooms.findOne({code});
  }
});
