import { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/login', { email, password });
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.message || 'Unknown error');
    }
  };


  return (
    <div className="container d-flex justify-content-end align-items-center" style={{ minHeight: '100vh' }}>
        <img 
    // src="/images/desktop_view.png" 
    src={isMobile ? '/images/mobile_view.png' : '/images/desktop_view.png'}
    className="w-100 h-100 position-absolute top-0 start-0 object-cover" 
    alt="login background" 
    style={{ zIndex: -1 }}
  />
      <div className="col mt-5 mt-md-0 p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-start text-white mb-4">Welcome LogIn System</h2>
        <h5 className="text-start text-white mb-4">Your gateway to seamless transactions and easy payments</h5>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className='text-white mb-1'>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autocomplete="off"
              required
            />
          </div>
          <div className="mb-5">
          <label className='text-white mb-1'>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn bg-white w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default Login;
