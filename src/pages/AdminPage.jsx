import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Authcontext.jsx';
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import './AdminPage.css';

export default function AdminPage() {
  const { role } = useAuth();
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [albumFilter, setAlbumFilter] = useState('');

  useEffect(() => {
    if (role !== 'admin') return;

    const qUsers = query(
      collection(db, 'users'),
      orderBy('email')
    );
    const unsubUsers = onSnapshot(qUsers, snap => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qAlbums = query(
      collection(db, 'albums'),
      orderBy('createdAt', 'desc')
    );
    const unsubAlbums = onSnapshot(qAlbums, snap => {
      setAlbums(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubUsers(); unsubAlbums(); };
  }, [role]);

  const handleCreateAlbum = async () => {
    if (!newTitle.trim()) return alert('Unesi naslov albuma');
    await addDoc(collection(db, 'albums'), {
      title: newTitle.trim(),
      ownerUid: 'admin',
      createdAt: serverTimestamp()
    });
    alert(`Album "${newTitle}" kreiran!`);
    setNewTitle('');
  };

  const handleEditAlbum = async (album) => {
    const updated = prompt('Novi naslov albuma:', album.title);
    if (!updated) return;
    await updateDoc(doc(db, 'albums', album.id), { title: updated });
    alert('Naslov albuma ažuriran');
  };

  const handleDeleteAlbum = async (id) => {
    if (!window.confirm('Obriši album i sve slike?')) return;
    const photosSnap = await getDocs(collection(db, 'albums', id, 'photos'));
    for (let p of photosSnap.docs) {
      await deleteDoc(doc(db, 'albums', id, 'photos', p.id));
    }
    await deleteDoc(doc(db, 'albums', id));
    alert('Album obrisan');
  };

  const handleDeleteUser = async (uid) => {
    if (!window.confirm('Obriši korisnika?')) return;
    await deleteDoc(doc(db, 'users', uid));
    alert('Korisnik obrisan');
  };

  if (role !== 'admin') {
    return <p className="admin-noaccess">Nisi admin—nemaš pristup ovoj stranici.</p>;
  }

  return (
    <div className="admin-container">
      {/* Album Creation */}
      <section className="admin-section">
        <h2>Kreiraj novi album</h2>
        <div className="admin-input-group">
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Naslov albuma"
          />
          <button onClick={handleCreateAlbum}>Create</button>
        </div>

        {/* Album Filter */}
        <div className="admin-section-header">
          <h3>Albumi</h3>
          <input
            className="admin-filter"
            placeholder="Filtriraj albume…"
            value={albumFilter}
            onChange={e => setAlbumFilter(e.target.value)}
          />
        </div>

        {/* Album List */}
        <ul className="album-list">
          {albums
            .filter(a => a.title.toLowerCase().includes(albumFilter.toLowerCase()))
            .map(a => (
            <li key={a.id}>
              <span>{a.title}</span>
              <div>
                <button onClick={() => handleEditAlbum(a)}>Edit</button>
                <button onClick={() => handleDeleteAlbum(a.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* User Management */}
      <section className="admin-section">
        <div className="admin-section-header">
          <h3>Korisnici</h3>
          <input
            className="admin-filter"
            placeholder="Filtriraj korisnike…"
            value={userFilter}
            onChange={e => setUserFilter(e.target.value)}
          />
        </div>
        <ul className="user-list">
          {users
            .filter(u => u.email.toLowerCase().includes(userFilter.toLowerCase()))
            .map(u => (
            <li key={u.id}>
              <span>{u.email} ({u.role})</span>
              <div>
                <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
