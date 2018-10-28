import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

class CreateBlend extends React.Component {

  sumbitBlend(){
    const name = this.nameInput.value;
    const desc = this.descInput.value;

    //Call corrected submit method
  }

  render() {
    return (
      <div>
        <h3>
          Create blend
        </h3>
        <form onSubmit={this.sumbitBlend}>
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
