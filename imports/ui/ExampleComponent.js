import React from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';

export default class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events:[
        {
          title: 'All Day Event',
          start: '2018-10-30'
        },
        {
          title: 'Long Event',
          start: '2017-05-07',
          end: '2018-11-31'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-05-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-05-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2017-05-11',
          end: '2017-05-13'
        },
        {
          title: 'Meeting',
          start: '2018-10-30T10:30:00',
          end: '2018-10-30T12:30:00'
        },
        {
          title: 'Birthday Party',
          start: '2017-05-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-10-28'
        }
      ],
    }
  }

  render() {
    return (
      <div id="example-component">
        <FullCalendar
          id = "1111111"
          header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          }}
          defaultDate={Date().toString()}
          navLinks= {true} // can click day/week names to navigate views
          editable= {true}
          eventLimit= {true} // allow "more" link when too many events
          events = {this.state.events}
        />
      </div>
    );
  }
}