import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


//Pueden hacer su propio formulario de registro e inicio de sesion utlizando los metodos de Accounts
//https://docs.meteor.com/api/passwords.html y https://docs.meteor.com/api/accounts.html
//de esta forma se puede hacer el registro de un usuario Administrador y agregar todos los campos que quieran
//en un campo 'profile'
export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}
