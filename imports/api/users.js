import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Users = new Mongo.Collection('users');

if(Meteor.isServer) {
  Meteor.publish('users', username => {
    return Users.find({'profile.id': username}, {profile: 1});
  });
}

Meteor.methods({
  'users.removeuser'(username) {
    if(!Users.findOne({'profile.id':username})) {
      throw new Meteor.Error('The user does not exists');
    }
    Users.update({'profile.id':username}, {profiles: undefined});
  },
});