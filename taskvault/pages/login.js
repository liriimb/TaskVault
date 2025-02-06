
import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../lib/authService';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      setMessage('Login Successful! Redirecting...');
      setTimeout(() => {
        router.push('/tasklist');
      }, 1500);
    } catch (error) {
      alert('Login Failed! Please try again!');
    }
  };

  return (
    <Box className="login-container">
      <Paper elevation={3} className="login-box">
        <Typography variant="h4" className="login-title">
          Welcome to TaskVault
        </Typography>
        <Typography variant="subtitle1" className="login-subtitle">
          Securely manage your tasks
        </Typography>
        <TextField 
          label="Email" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button 
          variant="contained" 
          fullWidth 
          className="login-button" 
          onClick={handleLogin}
        >
          Login
        </Button>
        {message && (
          <Typography variant="body1" className="login-message">
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;