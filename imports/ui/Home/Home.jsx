import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import RecentBlend from './RecentBlend/RecentBlend.jsx';
import { Rooms } from '../../api/rooms.js';
import './Home.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  test() {
    Meteor.call('users.getTopTracks', (err, res) => {
      console.log('probando...');
      console.log(err);
      if (!err) console.log(res.items);

    });
  }

  test2() {
    Meteor.call('users.createPlaylist', 'mi playlist 5', 'mi descripción 5', (err, res) => {
      console.log('a');
      console.log(err);
      console.log(res);

      if (!err) {
        console.log('yessss');
        Meteor.call('rooms.create', res, (err, res) => {
          console.log('probando...');
          console.log(err);
          if (!err) {
            Meteor.call('users.getTopTracks', (err, res2) => {
              console.log(err);
              if (!err) {
                Meteor.call('rooms.addSongs', res, res2.items, (err, res) => {
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

  test4() {
    Meteor.call('rooms.autoUpdateImageCover', 'MS659', () => {

    });
  }

  render() {
    return (
      <div className='home-container'>
        <h3>Home</h3>
        <hr />
        <h4>Recently joined</h4>
        <div>
          {this.props.recent && this.props.recent.map(el =>
            <RecentBlend key={el._id} blend={el} />
          )}
        </div>
        <button onClick={() => this.test4()}>Test method</button>
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object,
  recent: PropTypes.array
};

export default withTracker(() => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it
  const user = Meteor.user();
  if (user)
    Meteor.subscribe('rooms', user.profile.id);
  const a = Rooms.find({}, { sort: { timestamp: -1 }, limit: 5 }).fetch();
  console.log(a);
  return {
    user,
    recent: a,
  };
})(Home);
