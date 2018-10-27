import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

class NotFound extends React.Component{
  render(){
    return(
      <h3>We couldn&#39;t find the page you were looking for :(</h3>
    );
  }
}

NotFound.propTypes = {

};

export default NotFound;
