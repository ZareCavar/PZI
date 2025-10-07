import React, { useState } from 'react';
import { useAuth } from '../context/Authcontext.jsx';
import { auth } from '../firebaseConfig.js';
import { useNavigate, Link } from 'react-router-dom';
import './CreateAlbum.css';

export default function CreateAlbum() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const idToken = await auth.currentUser.getIdToken();

      // Šalji zahtjev na proxy server
      const response = await fetch('http://localhost:3001/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          authToken: idToken
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kreiranje albuma nije uspjelo');
      }

      // Preusmjeri na novi album
      navigate(`/album/${data.albumId}`);
    } catch (err) {
      console.error('Greška pri kreiranju albuma:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-album-container">
      <form onSubmit={handleCreate} className="create-album-form">
        <h2>Kreiraj novi album</h2>

        {error && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#fee', 
            color: '#c00', 
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            {error}
          </div>
        )}

        <label className="input-label">
          Naslov albuma
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Unesi naslov..."
            required
            className="text-input"
            disabled={loading}
          />
        </label>

        <button 
          type="submit" 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? 'Kreiram...' : 'Create Album'}
        </button>

        <p className="back-link">
          <Link to="/">« Nazad</Link>
        </p>
      </form>
    </div>
  );
}
