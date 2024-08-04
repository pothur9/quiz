"use client"
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Quiz App
        </Typography>
        <Button color="inherit" onClick={() => router.push('/createquiz')}>
          Create Quiz
        </Button>
        <Button color="inherit" onClick={() => router.push('/takequiz')}>
          Take Quiz
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
