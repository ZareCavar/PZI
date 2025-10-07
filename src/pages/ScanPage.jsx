// src/pages/ScanPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import QRScanner from '../components/QRScanner.jsx';

export default function ScanPage() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Scan QR Code</h2>
      {/* Gumb za povratak na početnu */}
      <p>
        <Link to="/">« Nazad na Početnu</Link>
      </p>
      {/* Sama komponenta za skeniranje */}
      <QRScanner />
    </div>
  );
}
