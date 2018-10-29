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
  Meteor.publish('singleRoom', code => {
    return Rooms.find({code});
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
      .then((res) => {
        console.log(res);
        Rooms.update({code}, {
          $push: {tracks: {$each: tracks}}
        });
      })
      .catch((err) => console.log(err));
  },
  'rooms.addSongs2'(code, songslist) {
    let user = Meteor.user();
    if(!user) return new Meteor.Error('Not authorized');
    if(!Rooms.findOne({code, 'contributors.id': user.profile.id})) {
      return new Meteor.Error('Not authorized');
    }
    let tracks = songslist.map(s => {
      return{track: s, user: user.profile};
    });
    Rooms.update({code}, {
      $push: {tracks: {$each: tracks}}
    });
  },
  'rooms.addContributor'(code) {
    if(!Meteor.userId()) return new Meteor.Error('Not authorized');
    const user = Meteor.user();
    if(!Rooms.findOne({code, 'contributors.id': user.profile.id})) {
      Rooms.update({code}, {
        $push: {contributors: user.profile}
      });
    }
  },
  'rooms.autoUpdateImageCover'(code) {
    if(!Meteor.userId()) return new Meteor.Error('Not authorized');
    const user = Meteor.user();
    const room = Rooms.findOne({code, 'contributors.id': user.profile.id});
    if(!room) return new Meteor.Error('Not authorized');
    Spotify.getPlaylist(user.services.spotify.accessToken, room.id)
      .then(res => {
        Rooms.update({code}, {$set: {images: res.images}});
      })
      .catch(err => {
        console.log('wat');
        console.log(err);
      });
  }
});
