import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventContext } from '../contexts/EventContext';
import { useDropzone } from 'react-dropzone';

const EditEvent = () => {
  const { events, updateEvent, deleteEvent } = useContext(EventContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // State for the event being edited
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('conference');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [image, setImage] = useState(null); 
  const [errors, setErrors] = useState({});

  // Find the event to edit when the component mounts or when the id changes
  useEffect(() => {
    const eventToEdit = events.find((e) => e.id === parseInt(id));
    if (eventToEdit) {
      setEvent(eventToEdit);
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      setTime(eventToEdit.time);
      setLocation(eventToEdit.location);
      setType(eventToEdit.type);
      setMaxAttendees(eventToEdit.maxAttendees);
      // setImage(eventToEdit.image); // No need to reset the image on every render
    }
  }, [events, id]);

  // Ensure the form fields are updated if the `event` changes (e.g., after an update)
  useEffect(() => {
    if (event) { 
      setTitle(event.title);
      setDate(event.date);
      setTime(event.time);
      setLocation(event.location);
      setType(event.type);
      setMaxAttendees(event.maxAttendees);
      // setImage(event.image); // Don't reset the image state here
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 60) {
      newErrors.title = 'Title should be less than 60 characters';
    }
  
    // Date Validation (required, not in the past)
    if (!date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }
  
    // Time Validation (required) 
    if (!time) {
      newErrors.time = 'Time is required';
    }
  
    // Location Validation (required, reasonable length)
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    } else if (location.length > 100) {
      newErrors.location = 'Location should be less than 100 characters';
    }
  
    // Max Attendees Validation (optional, must be a positive number)
    if (maxAttendees && (isNaN(maxAttendees) || parseInt(maxAttendees) <= 0)) {
      newErrors.maxAttendees = 'Max attendees must be a positive number';
    }

    const maxImageSize = 2 * 1024 * 1024; // 2MB (adjust as needed)
    if (image && image.size > maxImageSize) {
      newErrors.image = `Image size too large. Maximum allowed: ${maxImageSize / (1024 * 1024)}MB`;
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }
  
    updateEvent({
      ...event,
      title,
      date,
      time,
      location,
      type,
      maxAttendees: parseInt(maxAttendees) || 0,
      image: image || event.image, // Update only if a new image is selected 
    });
    navigate('/');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
      navigate('/');
    }
  };

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Date Input */}
        <div>
          <label htmlFor="date" className="block text-gray-700">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date ? 'border-red-500' : ''
            }`}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Time Input */}
        <div>
          <label htmlFor="time" className="block text-gray-700">
            Time:
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.time ? 'border-red-500' : ''
            }`}
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>

{/* ... other parts of your EditEvent.jsx component ... */}

<div> 
  <label htmlFor="location" className="block text-gray-700">
    Location:
  </label>
  <input
    type="text"
    id="location"
    value={location} 
    onChange={(e) => setLocation(e.target.value)}
    className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors.location ? 'border-red-500' : ''
    }`} 
  />
  {errors.location && (
    <p className="text-red-500 text-sm">{errors.location}</p>
  )}
</div>

{/* Event Type Select */}
<div>
  <label htmlFor="type" className="block text-gray-700">
    Type:
  </label>
  <select
    id="type"
    value={type} 
    onChange={(e) => setType(e.target.value)} 
    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
  >
    <option value="conference">Conference</option>
    <option value="seminar">Seminar</option>
    <option value="workshop">Workshop</option>
    <option value="party">Party</option>
    <option value="concert">Concert</option>
  </select>
</div>

<div>
  <label htmlFor="maxAttendees" className="block text-gray-700">
    Max Attendees (optional): 
  </label>
  <input
    type="number"
    id="maxAttendees"
    value={maxAttendees}
    onChange={(e) => setMaxAttendees(e.target.value)}
    className={`w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors.maxAttendees ? 'border-red-500' : ''
    }`} 
  />
  {errors.maxAttendees && (
    <p className="text-red-500 text-sm">{errors.maxAttendees}</p>
  )}
</div>

{/* ... other parts of your form ... */}
        <div>
          <label htmlFor="image" className="block text-gray-700">
            Event Image:
          </label>
          <div
            {...getRootProps()}
            className="border border-gray-300 border-dashed rounded-md p-4 cursor-pointer hover:bg-gray-100"
          >
            <input {...getInputProps()} />
            {image ? ( 
              <p className="text-green-500">
                {image.name} - {image.size} bytes
              </p>
            ) : event.image ? ( // Show the current image if no new image is selected
              <div>
                <img
                  src={URL.createObjectURL(event.image)}
                  alt="Current Event"
                  className="w-24 h-24 object-cover rounded-md mr-2" 
                />
                <p className="text-gray-600">Current Image</p> 
              </div>
            ) : (
              <p className="text-gray-500">
                Drag and drop a new image here, or click to select a file
              </p>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" 
          >
            Update Event
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;