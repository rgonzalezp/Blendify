import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

class Home extends React.Component{

  constructor(props){
    super(props);
  }
  
  test(){
    Meteor.call('users.getTopTracks', (err, res) => {
      console.log('probando...');
      console.log(err);
      if(!err) console.log(res.items);
      
    });
  }

  test2() {
    Meteor.call('users.createPlaylist', 'mi playlist', 'mi descripción', () => {/*
      console.log('probando1');
      console.log(err);
      console.log(res);
      if(!err) {
        console.log('yessss');
        Meteor.call('rooms.create', 'mi playlist', Date.now(), 'mi descripción', (err, res) => {
          console.log('probando...');
          console.log(err);
          if(!err) {
            Meteor.call('users.getTopTracks', (err, res2) => {
              console.log(err);
              if(!err) {
                Meteor.call('rooms.addSongs', res, res2.items, (err, res) => {
                  console.log(err);
                  if(!err) {
                    console.log('victoria!!!');
                    console.log(res);
                  }
                });
              }
            });
          }
        });
      }*/
    });
  }

  test3() {
    Meteor.call('rooms.create', 'prueba', Date.now(), (err, res) => {
      console.log('probando...');
      console.log(err);
      if (!err) {
        Meteor.call('users.getTopTracks', (err, res2) => {
          console.log(err);
          if (!err) {
            Meteor.call('rooms.addSongs2', res, res2.items, (err, res) => {
              console.log(err);
              if (!err) {
                console.log('victoria!!!');
                console.log(res);
              }
            });
          }
        });
      }
    });
  }

  render(){
    return(
      <div>
        <button onClick={() => this.test2()}>Test method</button>
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object
};

export default withTracker(() => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  return {
    user: Meteor.user()
  };
})(Home);
