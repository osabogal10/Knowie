import React, { Component } from 'react';
 

export default class Activity extends Component {
  render() {
    return (
      <li>{this.props.activity.title}</li>
    );
  }
}