import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import Header from './components/Header';
import Nav from './components/Nav';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import ProfileView from './components/ProfileView';
import Login from './components/Login';
import Signup from './components/Signup'


function App() {
  return (
    <Router>
      <AuthProvider>
        <EventProvider>
          <div className="bg-gray-100 min-h-screen">
            <Header />
            <Nav />
            <main className="p-4"> 
              <Routes>
                <Route path="/" element={<EventList />} />
                <Route path="/create" element={<CreateEvent />} />
                <Route path="/edit/:id" element={<EditEvent />} />
                <Route path="/profile" element={<ProfileView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> {/* Add Signup Route */}
              </Routes>
            </main>
          </div>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;