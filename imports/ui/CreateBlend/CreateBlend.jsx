import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

class CreateBlend extends React.Component {

  sumbitBlend(event){
    event.preventDefault();
    const name = this.nameInput.value;
    const desc = this.descInput.value;

    //Call corrected submit method
    Meteor.call('users.createPlaylist', name, desc, (err, res) => {
      if(err) {
        alert(err);
        return;
      }
      Meteor.call('rooms.create', res, (err, res) => {
        if(err) {
          alert(err);
          return;
        }
        console.log(res);
        FlowRouter.go(`/blend/${res}`);
      });
    });
  }

  render() {
    return (
      <div>
        <h3>
          Create blend
        </h3>
        <form onSubmit={(e) => this.sumbitBlend(e)}>
          <label>
            Nombre
            <input type="text" maxLength="100" ref={ref => this.nameInput = ref} />
          </label>

          <label>
            Description
            <textarea cols="40" rows="5" maxLength="300" ref={ref => this.descInput = ref} />
          </label>
          <div>
            <button onClick={() => FlowRouter.go('home')}>Cancel</button>
            <button type="submit">Create</button>            
          </div>
        </form>
      </div>
    );
  }
}

CreateBlend.propTypes = {

};

export default CreateBlend;
