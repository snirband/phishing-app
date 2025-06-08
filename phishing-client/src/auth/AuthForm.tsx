import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  setToken: (token: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({setToken}) => {
const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    setError(null);
      console.log('Login attempt:', { email, password });
  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log('Login success:', data);
    setToken(data.token); // Assuming the token is returned in the response
    navigate('/dashboard');

  } catch (error) {
    console.error('Error:', error);
  }

    //set in db

  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>

      <div>
        <label>Email</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default AuthForm;
