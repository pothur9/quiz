
"use client"
import React, { useState, useEffect } from 'react';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Typography } from '@mui/material';

interface QuizData {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
}

interface QuizProps {
  quizData: QuizData;
  onNext: (timeTaken: number, isCorrect: boolean) => void;
  isLastQuestion: boolean;
  onSubmit: (timeTaken: number, isCorrect: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ quizData, onNext, isLastQuestion, onSubmit }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    setStartTime(Date.now());
    setTimeLeft(30);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (isLastQuestion) {
            handleSubmit();
          } else {
            handleNext();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData, isLastQuestion]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleNext = () => {
    const timeTaken = Date.now() - startTime;
    const isCorrect = selectedValue === quizData.correctAnswer;
    setSelectedValue('');
    onNext(timeTaken, isCorrect);
  };

  const handleSubmit = () => {
    const timeTaken = Date.now() - startTime;
    const isCorrect = selectedValue === quizData.correctAnswer;
    onSubmit(timeTaken, isCorrect);
  };

  return (
    <Box mb={4} position="relative">
      <FormControl component="fieldset">
        <FormLabel component="legend">{quizData.question}</FormLabel>
        <RadioGroup value={selectedValue} onChange={handleChange}>
          <FormControlLabel value={quizData.option1} control={<Radio />} label={quizData.option1} />
          <FormControlLabel value={quizData.option2} control={<Radio />} label={quizData.option2} />
          <FormControlLabel value={quizData.option3} control={<Radio />} label={quizData.option3} />
          <FormControlLabel value={quizData.option4} control={<Radio />} label={quizData.option4} />
        </RadioGroup>
      </FormControl>
      <Box position="absolute" top={0} right={0} p={2}>
        <Typography variant="h6" color="error">
          Time left: {timeLeft} seconds
        </Typography>
      </Box>
      <Box mt={2}>
        {!isLastQuestion && (
          <Button onClick={handleNext} variant="contained" color="primary" disabled={!selectedValue}>
            Next
          </Button>
        )}
        {isLastQuestion && (
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!selectedValue}>
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Quiz;
