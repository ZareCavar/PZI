import React from 'react';
import { useAuth } from './context/Authcontext.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Home from './pages/Home.jsx';
import ScanPage from './pages/ScanPage.jsx';
import AlbumPage from './pages/AlbumPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import CreateAlbum from './pages/CreateAlbum.jsx';
import { PrivateRoute, AdminRoute } from './components/RouteGuards.jsx';

export default function App() {
  const { role } = useAuth();

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          {/* javni putevi */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* home je dostupan svima */}
          <Route path="/" element={<Home />} />

          {/* scan stranica */}
          <Route path="/scan" element={<ScanPage />} />

          {/* create album, samo kad nije guest */}
          {role !== 'guest' && (
            <Route
              path="/create-album"
              element={<PrivateRoute><CreateAlbum /></PrivateRoute>}
            />
          )}

          {/* privatna ruta: samo prijavljeni */}
          <Route
            path="/album/:id"
            element={
              <PrivateRoute>
                <AlbumPage />
              </PrivateRoute>
            }
          />

          {/* admin ruta: samo admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}