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
        {this.props.room.contributors.slice(1).map((c, i) => 
          <p key={i}>{c.display_name}</p>
        )}
      </div>
    );
  }

  renderTracks() {
    return (
      <div className="blend-tracks">
        {this.props.room.tracks.map((t, i) => 
          <div className="single-track" key={i}>
            <p>{t.track.name}</p>
            <p className="track-artists">
              {t.track.artists.map((a, i) => 
                <span key={i}> {i!==0 && ' -'} {a.name}</span>
              )}
            </p>
            <p>added by {t.user.display_name}</p>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (this.props.room ? (
      <div className="blend">
        <h2 className="blend-name">{this.props.room.name} ({this.props.room.code})</h2>
        <h3>Owner</h3>
        <p>{this.props.room.owner.display_name}</p>
        <h3>Contributors</h3>
        {this.renderContributors()}
        <h3>Tracks</h3>
        {this.renderTracks()}
      </div>
    ) : null
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
