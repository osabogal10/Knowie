import React, {Component} from 'react';
import Navbar from './Navbar.js';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

class ActivityDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentActivity: {},
      currentUser: {},
      showParticipants: false,
      deleted: false,
    };
  }

  componentDidMount() {

    let path = window.location.href;
    let splitPath = path.split('/');

    const activityId = splitPath[splitPath.length - 1];
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

  renderTwits(){

  }

  render() {
    let currentActivity = this.state.currentActivity;
    let currentUser = Meteor.user();
    let participate = false;
    let isParticipant = false;
    if (currentUser === null) {
      return <Redirect to="/"/>;
    }


    if(currentActivity.participants !== undefined && currentUser !== undefined){
      if(currentActivity.participants.includes(currentUser.username) || currentActivity.capacity === 0){
        participate = true;
      }
    }

    if(currentActivity.participants !== undefined && currentUser !== undefined){
      if(currentActivity.participants.includes(currentUser.username)){
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
        <div className="container col-md-6" id="detailContainer">
          <div id="titulo-detail">
            <h3 id="titulo">{currentActivity.title}</h3>
          </div>
          <div className="row" id="ambas-partes">
            <div id="detail-descripcion" className="col-6">
              <div className="row">
                <p className="label-info">Lugar:</p>
                <p className="texto-info">{currentActivity.place}</p>
              </div>
              <div className="row">
                <p className="label-info">Fecha:</p>
                <p className="texto-info">{currentActivity.date}</p>
              </div>
              <div className="row">
                <p className="label-info">Hora:</p>
                <p className="texto-info">{currentActivity.initTime + ' - ' + currentActivity.finishTime}</p>
              </div>
              <div className="row">
                <p className="label-info">Capacidad:</p>
                <p className="texto-info">{currentActivity.capacity}</p>
              </div>
              <div className="row">
                <p className="label-info">Precio:</p>
                <p className="texto-info">{currentActivity.price}</p>
              </div>
              <br/>
              {
                currentUser !== undefined && currentUser.username === currentActivity.username ?
                  <button id="btnBorrar" className="delete btn btn-danger" onClick={this.deleteThisActivity.bind(this)}>
                    Borrar
                  </button> : ''

              }
              {
                !isParticipant ? <button id="btnParticipar" className="participate btn btn-primary"
                                         onClick={this.participateInActivity.bind(this)}>
                  Participar
                </button> : ''
              }

              {
                currentUser !== undefined && currentUser.username === currentActivity.username ?
                  <button id="btnListaParticipantes" className="userlist btn btn-success"
                          onClick={this.showActivityParticipants.bind(this)}>
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
            <div className="col-6">
              <p className="label-info" id="twits">Twits</p>
              <div id="container-twits">
                {this.renderTwits()}
              </div>
            </div>
          </div>
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