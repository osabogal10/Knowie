import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

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
        <h5>{this.props.activity.title}</h5>
        <br/>
        <p>{'Lugar: ' + this.props.activity.place}</p>

        <p>{'Fecha: ' + this.props.activity.date}</p>

        <p>{'Hora: ' + this.props.activity.initTime + ' - ' + this.props.activity.finishTime}</p>

        <p>{'Capacidad: ' + this.props.activity.capacity}</p>
      
        <p>{'Precio: ' + this.props.activity.price}</p>

        <br/>
        <button className="delete btn btn-danger" onClick={this.deleteThisActivity.bind(this)}>
          Borrar
        </button>
        <button className="participate btn btn-primary" onClick={this.participateInActivity.bind(this)}>
          Participar
        </button>
      </div>
    );

  }



}