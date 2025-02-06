
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/register", {
        email,
        password,
      });
      console.log(response.data);
      router.push("/login");
    } catch (err) {
      setError("Failed to register, please try again");
    }
  };

  return (
    <Box className="register-container">
      <Paper elevation={3} className="register-box">
        <Typography variant="h4" className="register-title">
          Register
        </Typography>
        <Typography variant="subtitle1" className="register-subtitle">
          Join TaskVault and streamline your tasks!
        </Typography>
        {error && (
          <Typography variant="body1" className="register-error">
            {error}
          </Typography>
        )}
        <form onSubmit={handleRegister}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            className="register-button"
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;