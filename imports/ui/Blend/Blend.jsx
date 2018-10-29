import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/rooms.js';

class Blend extends Component {
  renderContributors() {
    return (
      <div className="blend-contributors">
        <ul>
          {this.props.room.contributors.map((c, i) => 
            <li key={i}>{c.display_name}</li>
          )}
        </ul>
      </div>
    );
  }

  renderTracks() {
    <div className="blend-tracks">
      {this.props.tracks.map(t => 
        <div>
          
        </div>
      )}
    </div>
  }

  render() {
    return (this.props.room ?
      <div className="blend">
        <h2 className="blend-name">{this.props.room.name} ({this.props.room.code})</h2>
        {this.renderContributors()}

      </div> : null
    );
  }
}

Blend.propTypes = {
  user: PropTypes.object,
  code: PropTypes.string.isRequired,
  room: PropTypes.object,
};

export default withTracker((props) => {
  Meteor.subscribe('singleRoom', props.code);
  return {
    user: Meteor.user(),
    room: Rooms.findOne({}),
  };
})(Blend);
