import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Spotify from './Spotify';

export const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
  Meteor.publish('users', username => {
    return Users.find({ 'profile.id': username }, { profile: 1 });
  });
}

Meteor.methods({
  'users.removeuser'(username) {
    if (!Users.findOne({ 'profile.id': username })) {
      return new Meteor.Error('The user does not exists');
    }
    Users.update({ 'profile.id': username }, { profiles: undefined });
  },
  'users.getTopTracks'(callback) {
    console.log('entro');
    
    if (!Meteor.user()) return new Meteor.Error('Unauthorized');
    if (!Meteor.isServer) return new Meteor.Error('Unauthorized');

    Spotify.getTopTracks(Meteor.user().services.spotify.access_token)
      .then(tracks => callback(null /*No error*/, tracks))
      .catch(err => callback(err));
  }
});
