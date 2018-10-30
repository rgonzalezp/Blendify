import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './RecentBlend.css';

class RecentBlend extends React.Component{

  getImageSrc(blend) {
    if (blend.images) {
      for (const image of blend.images) {
        return image.url;
      }
    }
    //If the playlist has not been assigned a list of images, get the album image of the first song
    return blend.tracks[0].track.album.images[1].url;
  }

  render() {
    return (
      <div tabIndex='0' aria-label='go to blend' title='go to blend' className='recent-blend-container' onClick={() => FlowRouter.go(`/blend/${this.props.blend.code}`)}>
        {(this.props.blend.images && this.props.blend.images.length > 0) ||
          (this.props.blend.tracks && this.props.blend.tracks.length > 0) ?
          <img src={this.getImageSrc(this.props.blend)} className='blend-title-image' alt="Playlist image" /> :
          <i className='material-icons blend-title-image'>photo</i>
        }
        <h4>{this.props.blend.name}</h4>
        <p>Created by <a href={`/profile/${this.props.blend.owner.id}`}>{this.props.blend.owner.display_name}</a></p>
        {this.props.blend.description && <p>{this.props.blend.description}</p>}
      </div>
    );
  }
}

RecentBlend.propTypes = {
  blend: PropTypes.object.isRequired
};

export default RecentBlend;
