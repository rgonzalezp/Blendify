import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './NotFound.css';

class NotFound extends React.Component{
  render(){
    return(
      <div className='not-found-container'>
        <p>We couldn&#39;t find the page you were looking for :(</p>
        <a href="/">Return to safety</a>
      </div>
    );
  }
}

NotFound.propTypes = {

};

export default NotFound;
