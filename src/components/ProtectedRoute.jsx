import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../services/api';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get('/auth/verify')
      .then((res) => setAuth(res.data.auth))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;
  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
