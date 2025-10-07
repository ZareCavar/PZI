import React from 'react';
import QRCode from 'react-qr-code';

export default function GenerateQR({ id }) {
  const url = `${window.location.origin}/upload/${id}`;
  return (
    <div>
      <h2>QR za album {id}</h2>
      <QRCode value={url} size={200} />
    </div>
  );
}
