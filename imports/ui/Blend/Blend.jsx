import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/rooms.js';

class Blend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingContributors: false
    };
  }

  getImageSrc(blend) {
    if (blend.images) {
      for (const image of blend.images) {
        return image.url;
      }
    }
    //If the playlist has not been assigned a list of images, get the album image of the first song
    return blend.tracks[0].track.album.images[1].url;
  }

  parseDuration(durationMs) {
    const mins = Math.floor(durationMs / 1000 / 60);
    const secs = Math.ceil((durationMs / 1000 / 60 - mins) * 60);
    return `${mins}:${secs}`;
  }

  render() {
    return (this.props.room ?
      <div className="blend">
        <div className='blend-title-container'>
          {(this.props.room.images && this.props.room.images.length > 0) ||
            (this.props.room.tracks && this.props.room.tracks.length > 0) ?
            <img src={this.getImageSrc(this.props.room)} className='blend-title-image' alt="Playlist image" /> :
            <i className='material-icons blend-title-image'>photo</i>
          }
          <div className='blent-title-text'>
            <h3 className="blend-name">{this.props.room.name} ({this.props.room.code})</h3>
            <span>Created by <a href={`/profile/${this.props.room.owner}`}>{this.props.room.owner}</a></span>
            {this.props.room.contributors.length > 1 ?
              <span onClick={() => this.setState({ showingContributors: !this.state.showingContributors })}>
                {this.state.showingContributors ? 'Hide contributors' : 'Show contributors'}
              </span> :
              <span>No contributors yet</span>}
            {this.state.showingContributors &&
              <span>
                {this.renderContributors()}
              </span>
            }
          </div>
        </div>
        {this.props.room.tracks ? this.props.room.tracks.map(track =>
          <div key={track.track.id}>
            <div>
              <p>{track.track.name}</p>
              {this.renderArtists(track.track)}
            </div>
            <p>{this.parseDuration(track.track.duration_ms)}</p>
          </div>
        ) :
          <p>There are not songs in the list yet.</p>
        }
      </div> : null
    );
  }


  renderContributors() {
    return (
      <div>
        {this.props.room.contributors.map((contr, i) => {
          if (i === this.props.room.contributors.length - 1) { /*Render the last one without ','*/
            return (
              <div key={contr.display_name}><a href={`profile/${contr.display_name}`}>{contr.display_name}</a>.</div>
            );
          }
          if (i !== 0) { /*Do not render first contributor (owner)*/
            return (
              <div key={contr.display_name}><a href={`profile/${contr.display_name}`}>{contr.display_name}</a>, </div>
            );
          }
        })}
      </div>
    );
  }

  renderArtists(track) {
    return (
      <div>
        {track.artists.map((artist, i) => {
          if (i === track.artists.length - 1) {
            return (
              <div key={artist.id}>
                <a href={`https://open.spotify.com/artist/${artist.id}`}>{artist.name}</a>
              </div>
            );
          }

          return (
            <div key={artist.id}>
              <a href={`https://open.spotify.com/artist/${artist.id}`}>{artist.name}</a>, </div>
          );
        })}
      </div>
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
