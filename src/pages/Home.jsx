import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import './Home.css';

export default function Home() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'albums'), snap => {
      setAlbums(snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      })));
    });
    return unsub;
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1> Albumi </h1>
        <div className="home-actions">
          <Link to="/scan" className="btn">Scan QR</Link>
          <Link to="/create-album" className="btn primary">Novi Album</Link>
        </div>
      </header>

      {albums.length === 0 ? (
        <p className="empty">Još nema albuma. Kreiraj prvi!</p>
      ) : (
        <div className="album-grid">
          {albums.map(a => (
            <Link to={`/album/${a.id}`} key={a.id} className="album-card">
              <div className="card-content">
                <h2>{a.title}</h2>
                <p className="date">
                  {a.createdAt
                    ? a.createdAt.toDate().toLocaleDateString('hr-HR')
                    : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
