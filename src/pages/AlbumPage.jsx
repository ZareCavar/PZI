import React, { useEffect, useState } from 'react';
import { createPortal }               from 'react-dom';
import { useParams, Link }            from 'react-router-dom';
import { db }                          from '../firebaseConfig.js';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import ImageUploader                   from '../components/ImageUploader.jsx';
import QRCode                          from 'react-qr-code';
import './AlbumPage.css';

export default function AlbumPage() {
  const { id } = useParams();
  const albumId = decodeURIComponent(id);

  const [photos, setPhotos]         = useState([]);
  const [albumData, setAlbumData]   = useState({ title: '', createdAt: null });
  const [selectedPhoto, setSelected] = useState(null);

  useEffect(() => {
    // dohvat albuma
    const albumRef = doc(db, 'albums', albumId);
    const unsubAlbum = onSnapshot(albumRef, snap => {
      if (snap.exists()) {
        setAlbumData(snap.data());
      } else {
        setAlbumData({ title: 'Album ne postoji', createdAt: null });
      }
    });

    // dohvat slika, sortirano po vremenu
    const photosQuery = query(
      collection(db, 'albums', albumId, 'photos'),
      orderBy('created', 'desc')
    );
    const unsubPhotos = onSnapshot(photosQuery, snap => {
      console.log('Nove fotografije:', snap.docs.length);
      setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubAlbum();
      unsubPhotos();
    };
  }, [albumId]);

  const handleDelete = async pid => {
    if (!window.confirm('Obriši ovu sliku?')) return;
    await deleteDoc(doc(db, 'albums', albumId, 'photos', pid));
    alert('Slika obrisana');
  };

  const getSrc = p => p.url || p.dataUrl;

  return (
    <div className="album-container">
      <div className="album-header">
        <Link to="/" className="back-link">← Nazad</Link>
        <div>
          <h1 className="album-title">{albumData.title}</h1>
          {albumData.createdAt && (
            <p className="album-date">
              Kreirano: {albumData.createdAt.toDate().toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="album-actions">
        <div className="qr-card">
          <h2>Podijeli album</h2>
          <QRCode value={`${window.location.origin}/album/${albumId}`} size={140} />
        </div>
        <div className="upload-section">
          <h2>Dodaj fotografije</h2>
          <ImageUploader />
        </div>
      </div>

      <div className="photos-section">
        <h2>Galerija</h2>
        {photos.length === 0 && <p className="empty">Još nema slika.</p>}
        <div className="image-grid">
          {photos.map(p => {
            const src = getSrc(p);
            return (
              <div key={p.id} className="image-card">
                <img
                  src={src}
                  alt={p.name}
                  onClick={() => setSelected(src)}
                />
                <div className="card-actions">
                  <a href={src} download={p.name} className="btn-download">⤓</a>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(p.id)}
                  >×</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedPhoto && createPortal(
        <div className="lightbox" onClick={() => setSelected(null)}>
          <img src={selectedPhoto} alt="Preview" />
        </div>,
        document.body
      )}
    </div>
  );
}
