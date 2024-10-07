import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../contexts/EventContext';
import { AuthContext } from '../contexts/AuthContext';
import { useDropzone } from 'react-dropzone';

const CreateEvent = () => {
  const { addEvent } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('conference'); // Set a default value
  const [maxAttendees, setMaxAttendees] = useState('');
  const [image, setImage] = useState(null);

  // Error Handling State
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      alert('Please log in to create events.');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';
    // ... add more validation as needed ...

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if errors
    }

    const newEvent = {
      title,
      date,
      time,
      location,
      type,
      maxAttendees: parseInt(maxAttendees) || 0, // Handle empty maxAttendees
      image,
      createdBy: user.id,
      attendees: [],
    };

    addEvent(newEvent);
    alert('Event created successfully!');

    // Reset form and errors (optional but good UX)
    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
    setType('conference'); 
    setMaxAttendees('');
    setImage(null);
    setErrors({});

    navigate('/'); 
  };

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (!user) return null; 

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
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

        {/* Location Input */}
        <div>
          <label htmlFor="location" className="block text-gray-700">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

        {/* Max Attendees Input */}
        <div>
          <label htmlFor="maxAttendees" className="block text-gray-700">
            Max Attendees (optional): 
          </label>
          <input
            type="number"
            id="maxAttendees"
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
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
            ) : (
              <p className="text-gray-500">
                Drag and drop an image here, or click to select a file
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" 
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;