import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

// Učitaj serviceAccountKey.json
const serviceAccount = JSON.parse(
  readFileSync('./firebaseService.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email i lozinka su obavezni' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      emailVerified: false
    });

    await admin.firestore().collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      role: 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.json({ 
      success: true, 
      token: customToken,
      uid: userRecord.uid 
    });
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email i lozinka su obavezni' });
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: data.error?.message || 'Login failed' });
    }

    const customToken = await admin.auth().createCustomToken(data.localId);

    res.json({
      success: true,
      token: customToken,
      uid: data.localId,
      email: data.email
    });
  } catch (error) {
    console.error('Greška pri loginu:', error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE ALBUM ENDPOINT - NOVO!
app.post('/api/albums', async (req, res) => {
  const { title, authToken } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Naslov albuma je obavezan' });
  }

  if (!authToken) {
    return res.status(401).json({ error: 'Autentifikacija je potrebna' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    
    const docRef = await admin.firestore().collection('albums').add({
      title,
      ownerUid: decodedToken.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({ 
      success: true, 
      albumId: docRef.id 
    });
  } catch (error) {
    console.error('Greška pri kreiranju albuma:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/albums/:albumId/photos', async (req, res) => {
  const { albumId } = req.params;
  const { name, dataUrl, authToken } = req.body;
  
  if (!name || !dataUrl) {
    return res.status(400).json({ error: 'Ime i podaci slike su obavezni' });
  }

  if (!authToken) {
    return res.status(401).json({ error: 'Autentifikacija je potrebna' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    
    const docRef = await admin.firestore()
      .collection('albums')
      .doc(albumId)
      .collection('photos')
      .add({
        name,
        dataUrl,
        created: admin.firestore.FieldValue.serverTimestamp()
      });
    
    res.json({ 
      success: true, 
      photoId: docRef.id 
    });
  } catch (error) {
    console.error('Greška pri uploadu fotografije:', error);
    res.status(500).json({ error: error.message });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Proxy server radi na portu ${PORT}`);
});
