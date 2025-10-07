import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext.jsx';

export function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export function AdminRoute({ children }) {
  const { role } = useAuth();
  return role === 'admin' ? children : <Navigate to="/" />;
}
