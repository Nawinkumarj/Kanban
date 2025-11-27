import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // icons

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email.trim(), password);

    if (!success) {
      setError('Invalid email or password.');
      toast.error('Login failed. Check your credentials.');
      return;
    }

    setError('');
    toast.success('Logged in successfully!');
    navigate('/');
  };

  return (
    <div className="login-form">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="test@databus.co"
        />

        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPwd ? 'text' : 'password'}
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password123"
          />
          <span
            className="password-icon"
            onClick={() => setShowPwd(prev => !prev)}
            aria-label={showPwd ? 'Hide password' : 'Show password'}
          >
            {showPwd ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
