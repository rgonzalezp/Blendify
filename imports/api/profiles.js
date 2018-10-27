import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Profiles = new Mongo.Collection('profiles');

if(Meteor.isServer) {
  Meteor.publish('profiles', username => {
    return Profiles.findOne({username});
  });
}

Meteor.methods({
  'profiles.adduser'(username, displayname) {
    if(Profiles.findOne({username})) {
      throw new Meteor.Error('The user already exists');
    }
    Profiles.insert({username, displayname});
  },
});