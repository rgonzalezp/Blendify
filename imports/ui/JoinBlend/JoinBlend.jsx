import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './JoinBlend.css';

class JoinBlend extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  invalidCode() {
    const re = /([A-Z])([A-Z])([0-9])([0-9])([0-9])/gi;
    return !re.test(this.state.code);
  }

  submitJoin(event) {
    event.preventDefault();

    Meteor.call('rooms.addContributor', this.state.code, (err, res) => {
      if (err) {
        alert(err);
        return;
      }
      console.log(res);
      FlowRouter.go(`/blend/${this.state.code}`);
    });
  }

  render() {
    return (
      <div className='join-container'>
        <h3>
          Join blend
        </h3>
        <hr />
        <form onSubmit={(e) => this.submitJoin(e)}>
          <input
            type="text"
            placeholder="TS443"
            maxLength={5}
            onChange={event => this.setState({ code: event.target.value })}
            value={this.state.code}
          />
          {this.invalidCode() && <p>The code must have the format: XX999</p>}
          <div>
            <button className='btn' type="submit" disabled={this.invalidCode()}>Join blend</button>
            <button className='btn black' onClick={() => FlowRouter.go('home')}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

JoinBlend.propTypes = {

};

export default JoinBlend;
