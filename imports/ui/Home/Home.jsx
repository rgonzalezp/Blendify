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
    Meteor.call('users.removeuser', 'colmanro', cbk => {
      console.log(cbk);
      
    });
  }

  render(){
    return(
      <div>
        <button onClick={() => this.test()}>Test method</button>
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
