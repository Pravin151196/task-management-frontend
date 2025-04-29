import { useEffect, useState } from 'react';
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from '../services/api';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };



  return (
    <div className="d-flex align-items-center justify-content-center position-relative min-vh-100" style={{
      minHeight: '100vh',
    }}>
      <img
        // src="/images/desktop_view.png"
        src={isMobile ? '/images/mobile_view.png' : '/images/desktop_view.png'}
        className="w-100 h-100 position-absolute top-0 start-0 object-cover"
        alt="Signup background"
        style={{ zIndex: -1 }}
      />
      <div className='container'>
        <div className="row justify-content-end mt-5 mt-md-0 px-2">
          <div className='col-md-6 col-sm-10 px-5'>
            <h2 className="text-start text-white mb-4">Welcome Sign Up System</h2>
            <h5 className="text-start text-white mb-4">Your gateway to seamless transactions and easy payments</h5>
            <form onSubmit={handleSignup} autoComplete="off" >
              <div className="mb-3">
                <label className='text-white'>Email address</label>
                <input
                  className="form-control text-white"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="nope" 
                  required
                />
              </div>

              <div className="mb-5">
                <label className='text-white'>Password</label>
                <input
                  className="form-control text-white"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button type="submit" className="btn bg-white w-100">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
