import React, { Component, JSX } from 'react';
import "./css/Global.css";
import "./css/EventsPage.css";

export type Event = {
  title: string;
  month: string; // Month of the event, e.g. "Nov"
  day: string; // Day of the month, e.g. "7"
  year: string; // Year of the event, e.g. "2024"
  time?: string; // optional, e.g. "10:00 AM - 11:30 AM"
  location?: string;
  description?: string;
};

type EventsProps = {
  renderTopBar: () => JSX.Element;
  renderBottomMenu: () => JSX.Element;
};

type EventsState = {
  events: Event[];
  currentMonth: Date; // Track which month to display
  selectedEvent: Event | null; // Track selected event for modal
};

/** Top-level component that performs login and navigation. */
export class EventsPage extends Component<EventsProps, EventsState> {
  constructor(props: EventsProps) {
    super(props);
    this.state = {
      events: [],
      currentMonth: new Date(), // Start with current month
      selectedEvent: null // No event selected initially
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchEvents();
  }

  fetchEvents = () => {
    fetch('/api/events')
      .then((res) => this.doFetchEventsResp(res))
      .catch((error) => console.error('Error fetching events: ', error));
  };

  doFetchEventsResp = (res: Response) => {
    if (res.status === 200) {
      res.json().then((data) => this.doFetchEventsJson(data))
        .catch((error) => console.error('Error parsing events JSON:', error));
    } else {
      console.error('Failed to fetch events: ', res.statusText);
    }
  };

  doFetchEventsJson = (data: unknown) => {
    const events = this.doParseEvents(data);
    this.setState({ events: events });
  };

  doParseEvents = (data: unknown) => {
    if (!Array.isArray(data)) {
      throw new Error('Invalid events data format');
    }

    const list: Event[] = [];
    for (const event of data) {
      if (event == null || typeof event !== 'object' || event.title == null || event.month == null || event.day == null || event.year == null) {
        throw new Error('Invalid event object');
      }
      list.push({
        title: event.title,
        month: event.month,
        day: event.day,
        year: event.year,
        time: event.time,
        location: event.location,
        description: event.description
      });
    }
    return list;
  }

  // Navigate to previous month
  previousMonth = () => {
    this.setState((prevState) => {
      const newMonth = new Date(prevState.currentMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return { currentMonth: newMonth };
    });
  };

  // Navigate to next month
  nextMonth = () => {
    this.setState((prevState) => {
      const newMonth = new Date(prevState.currentMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return { currentMonth: newMonth };
    });
  };

  // Open event detail modal
  openEventModal = (event: Event) => {
    this.setState({ selectedEvent: event });
  };

  // Close event detail modal
  closeEventModal = () => {
    this.setState({ selectedEvent: null });
  };

  // Render event detail modal
  renderEventModal = (): JSX.Element | null => {
    const { selectedEvent } = this.state;
    
    if (!selectedEvent) {
      return null;
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const monthNumber = this.monthToNumber(selectedEvent.month);
    const monthName = monthNames[monthNumber];

    return (
      <div className="modal-overlay" onClick={this.closeEventModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={this.closeEventModal}>×</button>
          <h2 className="modal-title">{selectedEvent.title}</h2>
          <div className="modal-details">
            <div className="modal-detail-row">
              <span className="modal-label">Date:</span>
              <span className="modal-value">{monthName} {selectedEvent.day}, {selectedEvent.year}</span>
            </div>
            {selectedEvent.time && (
              <div className="modal-detail-row">
                <span className="modal-label">Time:</span>
                <span className="modal-value">{selectedEvent.time}</span>
              </div>
            )}
            {selectedEvent.location && (
              <div className="modal-detail-row">
                <span className="modal-label">Location:</span>
                <span className="modal-value">{selectedEvent.location}</span>
              </div>
            )}
            {selectedEvent.description && (
              <div className="modal-detail-row description">
                <span className="modal-label">Description:</span>
                <p className="modal-value">{selectedEvent.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Convert month abbreviation to number (0-11)
  monthToNumber = (monthStr: string): number => {
    const months: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return months[monthStr] ?? -1;
  };

  // Get events for a specific day
  getEventsForDay = (day: number, month: number, year: number): Event[] => {
    return this.state.events.filter(event => {
      const eventMonth = this.monthToNumber(event.month);
      const eventDay = parseInt(event.day);
      const eventYear = parseInt(event.year);
      return eventMonth === month && eventDay === day && eventYear === year;
    });
  };

  // Generate calendar grid
  generateCalendar = (): JSX.Element => {
    const { currentMonth } = this.state;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Create calendar grid
    const calendarDays: JSX.Element[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = this.getEventsForDay(day, month, year);
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === month && 
                      new Date().getFullYear() === year;
      
      calendarDays.push(
        <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}>
          <div className="day-number">{day}</div>
          {dayEvents.length > 0 && (
            <div className="day-events">
              {dayEvents.map((event, idx) => (
                <div 
                  key={idx} 
                  className="event-dot" 
                  onClick={() => this.openEventModal(event)}
                  title="Click for details"
                >
                  <div className="event-title">{event.title}</div>
                  {event.time && <div className="event-time">{event.time}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={this.previousMonth} className="nav-button">‹</button>
          <h2>{monthNames[month]} {year}</h2>
          <button onClick={this.nextMonth} className="nav-button">›</button>
        </div>
        <div className="calendar-weekdays">
          {dayNames.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {calendarDays}
        </div>
      </div>
    );
  };

  render = (): JSX.Element => {
    if (this.state.events == null) {
      return <div>Loading events...</div>;
    }
    
    return (
      <>
        <div className="events_page">
          {this.props.renderTopBar()}
          
          <div className="hero-section">
            <img className="hero-img" src="img/events.JPG" alt="Church events"></img>
            <div className="hero-overlay">
              <h1>Events</h1>
            </div>
          </div>

          <div className="events-container">
            <h2 className="events-subtitle">Upcoming Events</h2>
            {this.generateCalendar()}
          </div>
          {this.props.renderBottomMenu()}
        </div>
        {this.renderEventModal()}
      </>
    );
  }
}