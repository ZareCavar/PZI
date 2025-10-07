import React, { useState } from 'react';
import { auth } from '../firebaseConfig.js';
import { signInWithCustomToken } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login nije uspio');
      }

      // Prijavi korisnika sa custom tokenom koji je vratio proxy server
      await signInWithCustomToken(auth, data.token);
      
      navigate('/');
    } catch (err) {
      console.error('Login greška:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Prijava</h2>
        {error && <div className="error">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Prijavljujem...' : 'Prijavi se'}
        </button>
        
        <p>
          Nemaš račun? <Link to="/register">Registriraj se</Link>
        </p>
      </form>
    </div>
  );
}
