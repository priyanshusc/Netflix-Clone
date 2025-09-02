import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import { TrailerProvider, useTrailer } from './hooks/TrailerContext';
import { TrailerModal } from './components/TrailerModal';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { TVShows } from './components/TVShows';
import { Movies } from './components/Movies';
import { Account } from './components/Account';
import { MyListPage } from './components/MyListPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <TrailerProvider>
        <Router>
          <MainContent />
        </Router>
      </TrailerProvider>
    </AuthProvider>
  );
}

// All the logic is now in this component, which is inside all the providers
const MainContent = () => {
  const { user, loading } = useAuth();
  const { trailerKey, closeTrailer } = useTrailer();

  if (loading) {
    return <div className="bg-black h-screen flex justify-center items-center text-white">Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/tv" element={<ProtectedRoute><TVShows /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/mylist" element={<ProtectedRoute><MyListPage /></ProtectedRoute>} />
      </Routes>
      <TrailerModal trailerKey={trailerKey} onClose={closeTrailer} />
    </>
  );
}

export default App;