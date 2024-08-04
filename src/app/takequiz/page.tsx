"use client"
import React, { useState, useEffect } from 'react';
import Quiz from '../quiz/page';
import Navbar from '../navbar/page';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

interface Result {
  question: string;
  timeTaken: number;
  isCorrect: boolean;
}

const TakeQuiz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    // Retrieve quizzes from local storage
    const existingQuizzes = localStorage.getItem('quizzes');
    const quizzesData = existingQuizzes ? JSON.parse(existingQuizzes) : [];

    setQuizzes(quizzesData);
  }, []);

  const handleNext = (timeTaken: number, isCorrect: boolean) => {
    setResults((prevResults) => [
      ...prevResults,
      { question: quizzes[currentQuizIndex].question, timeTaken, isCorrect },
    ]);
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  const handleSubmit = (timeTaken: number, isCorrect: boolean) => {
    setResults((prevResults) => [
      ...prevResults,
      { question: quizzes[currentQuizIndex].question, timeTaken, isCorrect },
    ]);
    setSubmitted(true);
  };

  const calculateTotalTime = () => results.reduce((total, result) => total + result.timeTaken, 0);

  const calculateScore = () => results.filter((result) => result.isCorrect).length;

  return (
    <div>
      <Navbar />
      <Container>
        <Box my={4}>
          <Typography variant="h3" gutterBottom align="center">
            Take Quiz
          </Typography>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            {quizzes.length > 0 ? (
              !submitted ? (
                <Quiz 
                  quizData={quizzes[currentQuizIndex]} 
                  onNext={handleNext} 
                  isLastQuestion={currentQuizIndex === quizzes.length - 1} 
                  onSubmit={handleSubmit} 
                />
              ) : (
                <div>
                  <Typography variant="h6" align="center">
                    You have completed the quiz!
                  </Typography>
                  <Typography variant="body1" align="center">
                    Total time taken: {calculateTotalTime()} ms
                  </Typography>
                  <Typography variant="body1" align="center">
                    Your score: {calculateScore()} / {quizzes.length}
                  </Typography>
                  <List>
                    {results.map((result, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`Question: ${result.question}`}
                          secondary={`Time taken: ${result.timeTaken} ms - ${result.isCorrect ? 'Correct' : 'Incorrect'}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              )
            ) : (
              <Typography variant="h6" align="center">
                No quizzes available. Please create a quiz first.
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default TakeQuiz;
