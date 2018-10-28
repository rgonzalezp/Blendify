import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './App.css';
import './Landing.css';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  signIn() {
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email', 'user-top-read', 'playlist-modify-private', 'playlist-modify-public'], // TODO define Spotify access scopes
    };
    Meteor.loginWithSpotify(options, function (err) {
      console.log(err || 'No error');
    });
  }

  render() {
    return (
      <div className='app-container'>
        {FlowRouter.getRouteName() === 'not-found' && this.props.main}
        {FlowRouter.getRouteName() !== 'not-found' && (this.props.user ?
          <span>
            <nav className='app-nav'>
              <div className='title-logo-container'>
                <a href='/'><img src="/assets/logo.png" alt="Logo" /></a>
                <div>
                  <h1>Blendify</h1>
                  <h2>Fast and customizable shared Spotify playlists</h2>
                </div>
              </div>
              {this.props.user ?
                <button onClick={() => Meteor.logout()}>Cerrar sesión</button> :
                FlowRouter.getRouteName() === 'access' ?
                  <button onClick={() => FlowRouter.go('home')}>Volver al inicio</button> :
                  <button onClick={() => this.signIn()}>Iniciar sesión</button>}
            </nav>
            {this.props.main}
          </span>
          :
          <div className='landing-container'>
            <div className='landing-title-container'>
              <a href='/'><img src="/assets/logo.png" alt="Logo" /></a>
              <div className='landing-title-text-container'>
                <h1>Blendify</h1>
                <h2>Fast and customizable shared Spotify playlists</h2>
                <button className='btn' onClick={() => this.signIn()}>Get started</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  main: PropTypes.object,
  user: PropTypes.object
};

export default withTracker(() => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    user: Meteor.user(),
  };
})(App);
