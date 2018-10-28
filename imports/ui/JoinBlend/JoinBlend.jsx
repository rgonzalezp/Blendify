import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

class JoinBlend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  checkCode(){
    const re = /([A-Z])([A-Z])([1-9])+\w/gi;
    return !re.test(this.state.code);
  }
  
  submitJoin(){
    
  }

  render() {
    return (
      <div>
        <h3>
          Join blend
        </h3>
        <form onSubmit={this.submitJoin}>
          <input
            type="text"
            placeholder="TS443"
            onChange={event => this.setState({ code: event.target.value })} 
            value={this.state.code} 
          />
          <button type="submit" disabled={this.checkCode()}>Entrar a la sala</button>
        </form>
      </div>
    );
  }
}

JoinBlend.propTypes = {

};

export default JoinBlend;
