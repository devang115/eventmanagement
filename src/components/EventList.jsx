import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext';
import { EventContext } from '../contexts/EventContext';

const EventList = () => {
  const { events, rsvpToEvent, deleteEvent } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  useEffect(() => {
    let filtered = [...events]; 

    if (dateFilter) {
      filtered = filtered.filter((event) => event.date >= dateFilter);
    }
    if (locationFilter) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
    if (typeFilter) {
      filtered = filtered.filter((event) => event.type === typeFilter);
    }

    setFilteredEvents(filtered);
  }, [dateFilter, locationFilter, typeFilter, events]);

  const handleRSVP = (eventId) => {
    if (user) {
      rsvpToEvent(eventId, user.id);
      alert('RSVP successful!'); 
    } else {
      alert('Please log in to RSVP for events.'); 
    }
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <input
          type="text"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          placeholder="Filter by location"
          className="border border-gray-300 rounded px-2 py-1"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">All event types</option>
          <option value="conference">Conference</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="party">Party</option>
          <option value="concert">Concert</option>
        </select>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-md shadow-md p-4 relative"> 
            {event.image && (
              <img
                src={URL.createObjectURL(event.image)} 
                alt={event.title}
                className="w-full h-48 object-cover rounded-md mb-2" 
              />
            )}

            <h3 className="text-lg font-medium text-blue-500">
              {event.title}
            </h3>
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span> {event.date}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Time:</span> {event.time}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Location:</span> {event.location}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Type:</span> {event.type}
            </p>
{/* Inside your EventList.jsx, within the map function */}
<div key={event.id} className="bg-white rounded-md shadow-md p-4 relative"> 
  {/* ... existing code for image, title, date, time, location, type ... */}

  <p className="text-gray-600">
    <span className="font-semibold">Description:</span> {event.description} 
  </p>

  {/* Max Attendees (if applicable) */}
  {event.maxAttendees > 0 && ( 
    <p className="text-gray-600">
      <span className="font-semibold">Max Attendees:</span>{' '}
      {event.maxAttendees}
    </p>
  )}

  {/* Number of RSVPs */}
  <p className="text-gray-600">
    <span className="font-semibold">RSVPs:</span> {event.attendees.length}
  </p>

  {/* ... Conditional Buttons (RSVP, Edit, Delete) ... */}
</div>

{/* ... rest of your EventList.jsx code ... */}
            {/* Conditional Buttons (RSVP, Edit, Delete) */}
            <div className="mt-4 flex flex-wrap gap-2">
              {user && event.attendees.includes(user.id) ? (
                <span className="text-green-500">You have RSVPd!</span>
              ) : (
                <button
                  onClick={() => handleRSVP(event.id)}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  RSVP
                </button>
              )}

              {/* Edit and Delete for Event Creator */}
              {user && event.createdBy === user.id && (
                <>
                  <Link 
                    to={`/edit/${event.id}`} 
                    className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-700 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;