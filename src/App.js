import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const VIEW_CONSTANTS = ['month','week','work_week','day','agenda']

const localizer = BigCalendar.momentLocalizer(moment);


const decideDefaultView = (view) => {
  if (view && VIEW_CONSTANTS.includes(view)) {
    return {status: true, view};
  }
  return {status: false, view: VIEW_CONSTANTS[0]};
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRange = this.handleRange.bind(this);
  }

  componentDidMount() {
    this.viewObj = decideDefaultView(this.props.match.params.view);
    if (!this.viewObj.status) {
      this.props.history.push(`/${this.viewObj.view}`);
    }
  }

  handleSelect({ start, end }) {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  handleRange(_, view) {
    if (view) {
      this.props.history.push(`/${view}`);
    }
  }

  render() {

    const {
      events,
    } = this.state;
    const {
      view
    } = this.props.match.params;

    return (
      <div className="App">
        <BigCalendar
          selectable
          localizer={localizer}
          events={events}
          defaultView={view && VIEW_CONSTANTS.includes(view) ? view : VIEW_CONSTANTS[0]}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          onRangeChange={this.handleRange}
        />
      </div>
    );
  }
}

export default App;
