import React, { Component } from 'react';

import { Activities } from '../api/activities.js';
 

export default class Activity extends Component {
  // render() {
  //   return (
  //     <li>{this.props.activity.title}</li>
  //   );
  // }

  deleteThisActivity() {
    Activities.remove(this.props.activity._id);
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
        <button className="delete" onClick={this.deleteThisActivity.bind(this)}>
          &times;
        </button>
      </div>
    );

  }



}