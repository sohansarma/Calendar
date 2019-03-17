import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

const CalendarMain = ({
  events,
  view,
  handleRange,
  handleSelect
}) => (
  <BigCalendar
    selectable
    localizer={localizer}
    events={events}
    defaultView={view}
    scrollToTime={new Date(1970, 1, 1, 6)}
    defaultDate={new Date()}
    onSelectEvent={event => alert(event.title)}
    onSelectSlot={handleSelect}
    onRangeChange={handleRange}
  />
);

export default CalendarMain;
