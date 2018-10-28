import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

class JoinBlend extends React.Component{

  getImageSrc(blend){
    if(blend.image)
      for(const image of blend.images){
        if(image.width === 300){
          return image.url;
        }
      }
  }

  render(){
    return(
      <div>
        <img src={this.getImageSrc(this.props.blend)} alt="Playlist image"/>
        <h4>{this.props.blend.name}</h4>
        <p>Created by <a href="#">{this.props.blend.owner.display_name}</a></p>
        {this.props.blend.description && <p>{this.props.blend.description}</p>}
      </div>
    );
  }
}

JoinBlend.propTypes = {
  blend: PropTypes.object.isRequired
};

export default JoinBlend;
