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
      deleted: false,
    };
  }

  componentDidMount(){
    // const currentActivity = this.props.location.state.currentActivity;
    // const currentUser = this.props.currentUser;

    // this.setState({
    //   currentActivity: currentActivity,
    //   currentUser: currentUser,
    // });

    console.log(window.location.href);

    let path = window.location.href;
    let splitPath = path.split('/');

    const activityId = splitPath[splitPath.length -1];
    console.log(activityId);

    Meteor.call('activities.findone', activityId, (err, activity) => {
      this.setState({
        currentActivity: activity,
        currentUser: Meteor.user(),
      });
    });

    
  }


  deleteThisActivity() {
    Meteor.call('activities.remove', this.state.currentActivity._id);

    this.setState({
      deleted: true,
    });
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

    if(currentActivity.participants !== undefined && currentUser !== undefined){
      if(currentActivity.participants.includes(currentUser.username) || currentActivity.capacity === 0){
        isParticipant = true;
      }
    }

    let deleted = this.state.deleted;
    if (deleted) {
      return (
        <div>
          <Navbar/>
          <br/>

          <div className="container detail-container">
            <h3>Actividad Eliminada Exitosamente</h3>
            <br/>
            <br/>
            <h5><a href="/">Regresar a la lista de actividades.</a></h5>
          </div>

        </div>
      );

    }
    

    return (
      <div>
        <Navbar/>
        <br/>
        <div className="container detailContainer col-md-6">
          <h3>{currentActivity.title}</h3>
          <br/>
          <p>{'Lugar: ' + currentActivity.place}</p>
          <p>{'Fecha: ' + currentActivity.date}</p>
          <p>{'Hora: ' + currentActivity.initTime + ' - ' + currentActivity.finishTime}</p>
          <p>{'Capacidad: ' + currentActivity.capacity}</p>
          <p>{'Precio: ' + currentActivity.price}</p>
          <br/>
          {
            currentUser !== undefined && currentUser.username === currentActivity.username ? <button id="btnBorrar" className="delete btn btn-danger" onClick={this.deleteThisActivity.bind(this)}>
              Borrar
            </button> : ''
            
          }
          {
            !isParticipant ? <button id="btnParticipar" className="participate btn btn-primary" onClick={this.participateInActivity.bind(this)}>
              Participar
            </button> : ''
          }
          
          {
            currentUser !== undefined && currentUser.username === currentActivity.username ? <button id="btnListaParticipantes" className="userlist btn btn-success" onClick={this.showActivityParticipants.bind(this)}>
              Lista Participantes
            </button> : ''
          }
          <br/>
          <br/>

          {
            this.state.showParticipants ? 
              <div>
                <h4>Lista Participantes: </h4>
                <ul>
                  {this.renderParticipantsList()}
                </ul>
              </div> : ''
          }

        </div>

        
        
        
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