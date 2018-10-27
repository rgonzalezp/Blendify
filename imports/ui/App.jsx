/*global AccountsTemplates*/
import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  signIn() {
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: ['user-read-email'], // TODO define Spotify access scopes
    };
    Meteor.loginWithSpotify(options, function (err) {
      console.log(err || 'No error');
    });
  }

  render() {
    return (
      <div className='app-container'>
        <nav className='app-topbar'>
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
