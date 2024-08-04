"use client"
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';

const QuizForm: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSubmit = () => {
    const quiz = { question, option1, option2, option3, option4, correctAnswer };
    const existingQuizzes = localStorage.getItem('quizzes');
    const quizzes = existingQuizzes ? JSON.parse(existingQuizzes) : [];
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    setQuestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setCorrectAnswer('');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Create a New Quiz
      </Typography>
      <Paper elevation={3} style={{ padding: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Option 1"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Option 2"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Option 3"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Option 4"
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Quiz
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuizForm;
