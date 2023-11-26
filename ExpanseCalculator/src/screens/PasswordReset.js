import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'; 

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      // Validate if email is not empty
      if (email === '') {
        Alert.alert('Error', 'Please provide your email');
        return;
      }

      // Make an API call to initiate password reset
      const response = await axios.post('http://localhost:5000/auth/reset-password', {
        email: email,
      });

      console.log('Password reset email sent:', response.data);
      Alert.alert('Success', 'Password reset email sent successfully.');
      // You might navigate the user to a confirmation screen or perform other actions
    } catch (error) {
      console.error('Password reset error:', error.response.data);
      Alert.alert('Error', 'Failed to initiate password reset. Please try again.');
      
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Reset Password" onPress={handleReset} />
    </View>
  );
};

export default PasswordReset;
