import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onChange: props.onChange
    };
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <a className="letraBonita navbar-brand nav-link hvr-icon-grow" href="/">
          Uniandes Ask
        </a>
        <div className="row" id="">
          <div className="col nav-item navbar-tab">
            <Link className="nav-link hvr-underline-from-center" to="/new">Crear Actividad</Link>
          </div>
          <div className="col nav-item navbar-tab">
            <p>Usuarios</p>
          </div>
        </div>
      </nav>
    );
  }
}