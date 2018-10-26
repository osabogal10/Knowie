import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

import { Activities } from '../api/activities.js';

import Navbar from './Navbar.js';

class NewActivity extends Component {

  constructor(props){
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.titleActivity).value.trim();
    const place = ReactDOM.findDOMNode(this.refs.placeActivity).value.trim();
    const date = ReactDOM.findDOMNode(this.refs.dateActivity).value.trim();
    const initTime = ReactDOM.findDOMNode(this.refs.initTimeActivity).value.trim();
    const finishTime= ReactDOM.findDOMNode(this.refs.finishTimeActivity).value.trim();
    const capacity = ReactDOM.findDOMNode(this.refs.capacityActivity).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.priceActivity).value.trim();


    console.log(title);
    console.log(place);
    console.log(date);
    console.log(initTime);
    console.log(finishTime);
    console.log(capacity);
    console.log(price);

    Activities.insert({
      title,
      place,
      date,
      initTime,
      finishTime,
      capacity,
      price,
      createdAt: new Date(),
    });

    ReactDOM.findDOMNode(this.refs.titleActivity).value = '';
    ReactDOM.findDOMNode(this.refs.placeActivity).value = '';
    ReactDOM.findDOMNode(this.refs.dateActivity).value = '';
    ReactDOM.findDOMNode(this.refs.initTimeActivity).value = '';
    ReactDOM.findDOMNode(this.refs.finishTimeActivity).value = '';
    ReactDOM.findDOMNode(this.refs.capacityActivity).value = '';
    ReactDOM.findDOMNode(this.refs.priceActivity).value = '';
  }

  render() {
    return (
      <div>
        <Navbar/>
        <br/>
        <br/>
        <div id="contenedorNuevaAct" className="container form-container">
          <div className="row">
            <div className="col-7">
              <div className="form-title">
                <h3 className="letraBonita">Crea una nueva actividad: </h3>
              </div>
              <form className="new-question" onSubmit={this.handleSubmit.bind(this)}>
                <label className="letraBonita">Titulo: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="text"
                  ref="titleActivity"
                  placeholder="Titulo de tu actividad"
                  size="70"
                />
                <br/>
                <label className="letraBonita">Lugar: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="text"
                  ref="placeActivity"
                  placeholder="Lugar de la actividad"
                  size="70"
                />
                <br/>
                <label className="letraBonita">Fecha: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="date"
                  ref="dateActivity"
                  size="70"
                />
                <br/>
                <label className="letraBonita">Hora Inicio: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="time"
                  ref="initTimeActivity"
                  size="70"
                />
                <br/>
                <label className="letraBonita">Hora Fin: </label>
                <br/>
                <input
                  className="letraBonita form-control"
                  type="time"
                  ref="finishTimeActivity"
                  size="70"
                />
                <br/>
                <label className="letraBonita">Capacidad: </label>
                <br/>
                <input
                  className="form-control"
                  type="number"
                  ref="capacityActivity"
                  placeholder="Capacidad de la actividad"
                  size="30"
                />
                <br/>
                <label className="letraBonita">Precio: </label>
                <br/>
                <input
                  className="form-control"
                  type="number"
                  ref="priceActivity"
                  placeholder="Precio de la actividad"
                  size="30"
                />
                <br/>
                <br/>
                <button type="submit" className="letraBonita btn btn-light btn-form">
                  Publicar
                </button>
              </form>
            </div>

          </div>
        </div>  

      </div>
    );
  }

}

export default withTracker(() => {
  return {
    activities: Activities.find({}).fetch(),
  };
})(NewActivity);