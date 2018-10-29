import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

class RecentBlend extends React.Component{

  getImageSrc(blend){
    if(blend.images)
      for(const image of blend.images){
        return image.url;
      }
  }

  render(){
    return(
      <div>
        <img src={this.getImageSrc(this.props.blend)} width="300" alt="Playlist image"/>
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
