// src/contexts/EventContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const EventContext = createContext();

const EventProvider = ({ children }) => {
    if (React.Children.count(children) === 0) {
        console.error("EventProvider must have at least one child element.");
      }
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load events from local storage on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to local storage whenever events array changes
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    const newEvent = { ...event, id: Date.now(), attendees: [], image: event.image || null };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    // Optionally send notifications to attendees here
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const rsvpToEvent = (eventId, userId) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          if (event.attendees.includes(userId)) {
            // User is already attending, so remove them from the list
            return {
              ...event,
              attendees: event.attendees.filter((id) => id !== userId),
            };
          } else {
            // User is not attending, so add them to the list
            return {
              ...event,
              attendees: [...event.attendees, userId],
            };
          }
        }
        return event;
      })
    );
  };

  const addNotification = (userId, message) => {
    setNotifications([
      ...notifications,
      { userId, message, id: notifications.length + 1 },
    ]);
  };

  const getUserStats = (userId) => {
    const userEvents = events.filter((event) => event.createdBy === userId);
    const userRSVPs = events.filter((event) =>
      event.attendees.includes(userId)
    );
    return { createdCount: userEvents.length, rsvpCount: userRSVPs.length };
  };

  const getUserRSVPs = (userId) => {
    return events.filter((event) => event.attendees.includes(userId));
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        rsvpToEvent,
        addNotification,
        getUserStats,
        getUserRSVPs,
        notifications, // Assuming you want to provide notifications through context
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };