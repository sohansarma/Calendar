import React, { Component } from 'react';
import CalendarMain from './components/CalendarMain';
import './App.css';

const VIEW_CONSTANTS = ['month','week','work_week','day','agenda']

const decideDefaultView = (view) => {
  if (view && VIEW_CONSTANTS.includes(view)) {
    return view;
  }
  return VIEW_CONSTANTS[0];
}

const handleSearchQueries = (q, events) => events.filter(f => f.title.includes(q));

const urlSearializer = (view, q) => {
  if (!q && !view) return `/${VIEW_CONSTANTS[0]}`;
  if (!q && view) return `/${decideDefaultView(view)}`;
  return `/${decideDefaultView(view)}/?q=${q}`;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.defaultCopy = [];
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRange = this.handleRange.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    const {
      search,
    } = this.props.location;
    const q = new URLSearchParams(search).get("q");
    if (q) {
      this.updateStatus(q);
    }
  }

  updateStatus(q, update = true) {
    const {
      view,
    } = this.props.match.params;
    const newSt = handleSearchQueries(q, this.defaultCopy);
    this.setState({
      events: newSt,
    }, () => {
      if (update) {
        this.defaultCopy = newSt
      }
      this.props.history.push(urlSearializer(view, q));
    });
  }

  revert() {
    const {
      view,
    } = this.props.match.params;
    this.setState({
      events: this.defaultCopy.slice(),
    }, () => {
      this.props.history.push(urlSearializer(view, ""));
      if (this.input) {
        this.input.value = "";
      }
    });
  }

  handleSelect({ start, end }) {
    const title = window.prompt('New Event name');
    if (title) {
      const newSt = [
        ...this.state.events,
        {
          start,
          end,
          title,
        },
      ];
        this.setState({
          events: newSt
        }, () => this.defaultCopy = newSt);
    }
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
        <input ref={ref => this.input = ref} type="text" name="" onChange={e => this.updateStatus(e.target.value, false)} id=""/>
        <button onClick={() => this.revert()}>Cancel</button>
        <CalendarMain
          view={view && VIEW_CONSTANTS.includes(view) ? view : VIEW_CONSTANTS[0]}
          events={events}
          handleSelect={this.handleSelect}
          handleRange={this.handleRange}
        />
      </div>
    );
  }
}

export default App;
