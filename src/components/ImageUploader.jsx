import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from '../firebaseConfig.js';
import './ImageUploader.css';

export default function ImageUploader() {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const onFileChange = e => {
    setFiles(Array.from(e.target.files));
  };

  const onDrop = useCallback(e => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped]);
  }, []);

  const onDragOver = e => e.preventDefault();

  const handleUpload = async () => {
    if (!files.length) return alert('Odaberi barem jednu datoteku');
    setUploading(true);
    
    try {
      const idToken = await auth.currentUser.getIdToken();
      
      for (let file of files) {
        const dataUrl = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result);
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });

        const response = await fetch(`http://localhost:3001/api/albums/${id}/photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: file.name,
            dataUrl,
            authToken: idToken
          })
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Upload nije uspio');
        }
      }
      
      alert('Upload uspješan!');
      setFiles([]);
      inputRef.current.value = '';
          window.location.reload();

    } catch (err) {
      console.error(err);
      alert('Upload nije uspio: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div 
      className="uploader"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <label className="upload-area">
        {files.length > 0
          ? `${files.length} datoteka odabrano`
          : 'Drag & drop ili klikni ovdje'}
        <input
          type="file"
          multiple
          onChange={onFileChange}
          ref={inputRef}
          className="file-input"
        />
      </label>

      <button
        className="btn-upload"
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
