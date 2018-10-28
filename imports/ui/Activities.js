import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// App component - represents the whole app
class Activities extends Component {

  renderActivities() {
    return this.props.activities.map((activity) => (
      <Activity key={activity._id} activity={activity} />
    ));
  }

  render() {
    return (
      <div>
          <div className="container">
            <header>
              <h1>Actividades Uniandes</h1>
            </header>

            <ul>
              {this.renderActivities()}
            </ul>
          </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('activities');

  return {
    activities: Activities.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(Activities);