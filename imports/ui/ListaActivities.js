import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Activities} from '../api/activities.js';
import Activity from './Activity.js';
import Calendar from './ExampleComponent.js';


// App component - represents the whole app
class ListaActivities extends Component {

  constructor(props) {
    super(props);

    this.state = {
      organizadores: ["Deportes","sebas","Decanatura","ANDAR","CTP"],
      filterTags: "Deportes"
    };
  }

  renderActivities() {
    let filteredActivities = this.props.activities;
    let currentTags = this.state.filterTags;
    filteredActivities = filteredActivities.filter((a) => a.username===currentTags);
    return filteredActivities.map((activity) => (
      <Activity key={activity._id} activity={activity}/>
    ));
  }


  organizadorFilter(organizador) {
    this.setState({
      filterTags: organizador
    });

  }

  renderOrganizadores() {
    return this.state.organizadores.map((a,i) => <div>
    {a===this.state.filterTags?<button key={"s"+i} id="organizador-selected" onClick={this.organizadorFilter.bind(this, a)}>
        <p>{a}</p>
      </button>:<button key={"n"+i} className="container-organizadores" onClick={this.organizadorFilter.bind(this, a)}>
      <p>{a}</p>
    </button>}
    </div>
    );
  }

  render() {
    return (
      <div className="row" id="fila-actividades">
        <div className="col-3" id="sinEspacio">
          <div id="container-organizador">
            <p>Organizadores</p>
          </div>
          {this.renderOrganizadores()}
        </div>
        <div className="col-9">
          <h1 id="nombre-institucion">Actividades Uniandes</h1>
          <Calendar/>
          {/*<ul>*/}
            {/*{this.renderActivities()}*/}
          {/*</ul>*/}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('activities');

  return {
    activities: Activities.find({}, {sort: {date: 1}}).fetch(),
    currentUser: Meteor.user(),
  };
})(ListaActivities);