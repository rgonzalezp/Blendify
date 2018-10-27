import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

if(Meteor.isServer) {
  Meteor.publish('rooms', (user) => {
    return Rooms.find({contributors: user});
  });
}

Meteor.methods({
  'rooms.create'(title, owner, ts) {
    Rooms.insert({
      title,
      owner,
      contributors: [{name: owner}],
      songs: [],
      timestamp: ts,
    });
  },
  'rooms.addSongs'(_id, songslist) {
    Rooms.update({_id}, {
      $push: {songs: {$each: songslist}}
    });
  },
  'rooms.addContributor'(_id, contributor) {
    Rooms.update({_id}, {
      $push: {contributors: contributor}
    });
  },
  'rooms.find'(_id) {
    return Rooms.findOne({_id});
  }
});