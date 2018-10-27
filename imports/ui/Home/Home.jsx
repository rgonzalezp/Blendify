import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

class Home extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        {JSON.stringify(this.props.user, null, 2)}
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
