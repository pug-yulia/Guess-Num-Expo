import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';

const NumberGuessingApp = () => {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [guessFeedback, setGuessFeedback] = useState('Guess a number between 1 - 100');
  const [attempts, setAttempts] = useState(0);

  const inputRef = useRef(null);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleMakeGuess = () => {
    const guess = parseInt(userGuess);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      Alert.alert('Invalid Guess', 'Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === secretNumber) {
      Alert.alert('Congratulations!', `You guessed the number in ${attempts} guesses.`);
      setSecretNumber(generateRandomNumber());
      setGuessFeedback('Guess a number between 1 - 100');
      setUserGuess('');
      setAttempts(0);
      inputRef.current.clear();
    } else if (guess < secretNumber) {
      setGuessFeedback(`Your guess ${guess} is too low`);
    } else {
      setGuessFeedback(`Your guess ${guess} is too high`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.feedback}>{guessFeedback}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Enter your guess"
        keyboardType="numeric"
        value={userGuess}
        onChangeText={(text) => setUserGuess(text)}
      />
      <Button title="Make Guess" onPress={handleMakeGuess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  feedback: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default NumberGuessingApp;
