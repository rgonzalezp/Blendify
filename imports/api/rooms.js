import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

const makecode = () => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < 2; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  let number = Math.random()%1000;
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
  'rooms.create'(title, ts) {
    if(!Meteor.userId()) return new Meteor.Error('Not authorized');
    let owner = Meteor.user().profile.id;
    let code = makecode();
    while(Rooms.findOne({code})) code = makecode();
    Rooms.insert({
      title,
      code,
      owner,
      contributors: [{name: owner}],
      songs: [],
      timestamp: ts,
    });
  },
  'rooms.addSongs'(code, songslist) {
    if(!Meteor.userId()) return new Meteor.Error('Not authorized');
    let user = Meteor.user().profile.id;
    let songs = songslist.map(s => {
      return{song: s, user};
    });
    Rooms.update({code}, {
      $push: {songs: {$each: songs}}
    });
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
