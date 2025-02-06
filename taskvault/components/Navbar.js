"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getToken, logoutUser } from '../lib/authService';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getToken();
      setIsLoggedIn(!!token);
    }
  }, [router.asPath]);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar className="toolbar">
        <div className="left-section">
          <Link href="/" passHref>
            <Typography variant="h6" className="brand">
              TaskVault
            </Typography>
          </Link>

          <div className="nav-links">
            <Link href="/" passHref>
              <Button color="inherit" className="nav-button">Home</Button>
            </Link>
            <Link href="/tasklist" passHref>
              <Button color="inherit" className="nav-button">My Tasks</Button>
            </Link>
            {isLoggedIn && (
              <Link href="/reminder" passHref>
                <Button color="inherit" className="nav-button">Reminders</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="auth-links">
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout} className="nav-button">Logout</Button>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button color="inherit" className="nav-button">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button color="inherit" className="nav-button">Register</Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;