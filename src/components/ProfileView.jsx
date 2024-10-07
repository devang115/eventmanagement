import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { EventContext } from '../contexts/EventContext';
import { Link } from 'react-router-dom'; 

const ProfileView = () => {
  const { user } = useContext(AuthContext);
  const { getUserStats, getUserRSVPs } = useContext(EventContext);

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg">
          Please <Link to="/login" className="text-blue-500 hover:underline">log in</Link> to view your profile.
        </p>
      </div>
    );
  }

  const stats = getUserStats(user.id);
  const userRSVPs = getUserRSVPs(user.id);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-md shadow-md"> 
        <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>

        <div className="mb-6">
          <p className="text-gray-700 font-medium">
            Username: <span className="font-normal">{user.name}</span>
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Event Stats</h3>
          <p className="text-gray-700">
            <span className="font-medium">Events Created:</span> {stats.createdCount}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Events RSVPd to:</span> {stats.rsvpCount}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">RSVPd Events</h3>
          {userRSVPs.length > 0 ? (
            <ul className="list-disc list-inside"> 
              {userRSVPs.map((event) => (
                <li key={event.id} className="mb-2">
                  <Link to={`/events/${event.id}`} className="text-blue-500 hover:underline"> 
                    {event.title} 
                  </Link> - {event.date}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You havent RSVPd to any events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;