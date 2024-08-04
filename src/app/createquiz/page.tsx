"use client"
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import QuizForm from '../quizform/page';
import Navbar from '../navbar/page';

const CreateQuiz: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Box my={4}>
          <Typography variant="h3" gutterBottom align="center">
            Create Quiz
          </Typography>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <QuizForm />
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default CreateQuiz;
