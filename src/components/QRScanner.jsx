import React, { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

export default function QRScanner() {
  const navigate = useNavigate();
  const elementId = 'qr-reader';

  useEffect(() => {
    const scanner = new Html5Qrcode(elementId);
    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decoded) => {
          const id = decoded.split('/').pop();
          scanner.stop();
          navigate(`/upload/${id}`);
        },
        () => {}
      )
      .catch(console.error);

    return () => {
      scanner.stop().catch(() => {});
    };
  }, [navigate]);

  return (
    <div>
      <h2>Skeniraj QR kod</h2>
      <div id={elementId} style={{ width: 300, margin: 'auto' }} />
    </div>
  );
}