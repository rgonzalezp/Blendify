import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

if(Meteor.isServer) {
  Meteor.publish('rooms', (user) => {
    return Rooms.find({contributors: user});
  });
}

Meteor.methods({
  'rooms.create'(title, ts) {
    if(!Meteor.userId()) throw new Meteor.Error('Not authorized');
    let owner = Meteor.user().profile.id;
    Rooms.insert({
      title,
      owner,
      contributors: [{name: owner}],
      songs: [],
      timestamp: ts,
    });
  },
  'rooms.addSongs'(_id, songslist) {
    if(!Meteor.userId()) throw new Meteor.Error('Not authorized');
    let user = Meteor.user().profile.id;
    let songs = songslist.map(s => {
      return{song: s, user};
    });
    Rooms.update({_id}, {
      $push: {songs: {$each: songs}}
    });
  },
  'rooms.addContributor'(_id) {
    if(!Meteor.userId()) throw new Meteor.Error('Not authorized');
    Rooms.update({_id}, {
      $push: {contributors: Meteor.user().profile.id}
    });
  },
  'rooms.find'(_id) {
    return Rooms.findOne({_id});
  }
});