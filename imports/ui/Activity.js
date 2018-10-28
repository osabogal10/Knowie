import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {Link} from 'react-router-dom';

import { Activities } from '../api/activities.js';
 

export default class Activity extends Component {

  deleteThisActivity() {
    Meteor.call('activities.remove', this.props.activity._id);
  }

  participateInActivity() {
    Meteor.call('activities.participate', this.props.activity._id);
  }

  render() {
    return (
      <div className="activityContainer container">
        <Link to={{
          pathname: `activity/${this.props.activity._id}`,
          state: {
            currentActivity: this.props.activity,
            currentUser: Meteor.user(),
          }
        }}>
          <h5>{this.props.activity.title}</h5>
        </Link>
        <br/>
        <p>{'Hora: ' + this.props.activity.initTime + ' - ' + this.props.activity.finishTime}</p>
        <br/>
      </div>
    );

  }



}