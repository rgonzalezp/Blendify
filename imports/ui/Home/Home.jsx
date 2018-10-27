import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

class Home extends React.Component{
  render(){
    return(
      <div>Body</div>
    );
  }
}

Home.propTypes = {

};

export default Home;