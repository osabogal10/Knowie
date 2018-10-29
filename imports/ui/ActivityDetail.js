import React, { Component } from 'react';
import Navbar from './Navbar.js';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';
import { Redirect} from 'react-router';

class ActivityDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentActivity: {},
      currentUser: {},
      showParticipants: false,
    };
  }

  componentDidMount(){
    const currentActivity = this.props.location.state.currentActivity;
    const currentUser = this.props.currentUser;

    this.setState({
      currentActivity: currentActivity,
      currentUser: currentUser,
    });
  }

  deleteThisActivity() {
    Meteor.call('activities.remove', this.state.currentActivity._id);
  }

  participateInActivity() {
    Meteor.call('activities.participate', this.state.currentActivity._id, (err, activity) => {
      this.setState({
        currentActivity: activity
      });
    });


  }

  showActivityParticipants() {
    let show = this.state.showParticipants;
    this.setState({
      showParticipants: !show,
    });
    
  }

  renderParticipantsList() {
    return this.state.currentActivity.participants.map((participant, i) => (
      <li key={i}>{participant}</li>
    ));
  }

  render() {
    let currentActivity = this.state.currentActivity;
    let currentUser = Meteor.user();
    let isParticipant = false;
    if(currentUser === null){
      return <Redirect to="/"/>;
    }
    
    if(currentActivity.participants !== undefined){
      if(currentActivity.participants.includes(currentUser.username) || currentActivity.capacity === 0){
        isParticipant = true;
      }
    }
    

    return (
      <div>
        <Navbar/>
        <br/>
        <div className="container">
          <h3>{currentActivity.title}</h3>
          <br/>
          <p>{'Lugar: ' + currentActivity.place}</p>
          <p>{'Fecha: ' + currentActivity.date}</p>
          <p>{'Hora: ' + currentActivity.initTime + ' - ' + currentActivity.finishTime}</p>
          <p>{'Capacidad: ' + currentActivity.capacity}</p>
          <p>{'Precio: ' + currentActivity.price}</p>
          <br/>
          {
            currentUser.username === currentActivity.username ? <button className="delete btn btn-danger" onClick={this.deleteThisActivity.bind(this)}>
              Borrar
            </button> : ''
          }
          {
            !isParticipant ? <button className="participate btn btn-primary" onClick={this.participateInActivity.bind(this)}>
              Participar
            </button> : ''
          }
          
          {
            currentUser.username === currentActivity.username ? <button className="userlist btn btn-success" onClick={this.showActivityParticipants.bind(this)}>
              Lista Participantes
            </button> : ''
          }

        </div>
        {
          this.state.showParticipants ? 
            <div className="participanListContainer">
              <h4>Lista Participantes: </h4>
              <ul>
                {this.renderParticipantsList()}
              </ul>
            </div> : ''
        }
        
        
      </div>
    );
  }
}


export default withTracker(() => {
  Meteor.subscribe('activities');

  return {
    currentUser: Meteor.user()
  };
})(ActivityDetail);