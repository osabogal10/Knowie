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

    Activities.insert({
      title,
      createdAt: new Date(),
    });

    ReactDOM.findDOMNode(this.refs.titleActivity).value = '';
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

  // render() {

  //   return (
  //     <div>
  //       <Navbar/>
  //       <br/>
  //       <br/>
  //       <div id="contenedorNuevaAct" className="container form-container">
  //         <div className="row">
  //           <div className="col-7">
  //             <div className="form-title">
  //               <h3 className="letraBonita">Crea una nueva actividad: </h3>
  //             </div>
  //             <form className="new-question" onSubmit={this.handleSubmit.bind(this)}>
  //               <label className="letraBonita">Titulo: </label>
  //               <br/>
  //               <input
  //                 className="letraBonita form-control"
  //                 type="text"
  //                 ref="titleActivity"
  //                 placeholder="Titulo de tu actividad"
  //                 size="70"
  //               />
  //               <br/>
  //               <label className="letraBonita">Lugar: </label>
  //               <br/>
  //               <input
  //                 className="letraBonita form-control"
  //                 type="text"
  //                 ref="placeActivity"
  //                 placeholder="Lugar de la actividad"
  //                 size="70"
  //               />
  //               <br/>
  //               <label className="letraBonita">Capacidad: </label>
  //               <br/>
  //               <input
  //                 className="form-control"
  //                 type="number"
  //                 ref="capacityActivity"
  //                 placeholder="Capacidad de la actividad"
  //                 size="30"
  //               />
  //               <br/>
  //               <label className="letraBonita">Precio: </label>
  //               <br/>
  //               <input
  //                 className="form-control"
  //                 type="number"
  //                 ref="priceActivity"
  //                 placeholder="Precio de la actividad"
  //                 size="30"
  //               />
  //               <br/>
  //               <br/>
  //               <button type="submit" className="letraBonita btn btn-light btn-form">
  //                 Publicar
  //               </button>
  //             </form>
  //           </div>

  //         </div>
  //       </div>      
  //     </div>
  //   );
  //}
}

export default withTracker(() => {
  return {
    activities: Activities.find({}).fetch(),
  };
})(NewActivity);