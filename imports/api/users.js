import { Meteor } from 'meteor/meteor';
import Spotify from './Spotify';

if (Meteor.isServer) {
  Meteor.publish('users', username => {
    return Meteor.users.find({ 'profile.id': username }, { profile: 1 });
  });
}

Meteor.methods({
  'users.removeUser'(username) {
    if (!Meteor.users.findOne({ 'profile.id': username })) {
      return new Meteor.Error('The user does not exists');
    }
    Meteor.users.update({ 'profile.id': username }, { profiles: undefined });
  },
  'users.getTopTracks'() {
    console.log('entro');
    if (!Meteor.userId()) return new Meteor.Error('Unauthorized');
    if (!Meteor.isServer) return new Meteor.Error('Unauthorized');

    return Spotify.getTopTracks(Meteor.user().services.spotify.accessToken);
  }
});
