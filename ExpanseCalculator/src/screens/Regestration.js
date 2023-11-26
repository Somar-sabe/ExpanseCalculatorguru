import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'; 

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    try {
      // Validate if all fields are not empty
      if (formData.name === '' || formData.email === '' || formData.password === '') {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      // Make an API call to register the user
      const response = await axios.post('http://localhost:3000/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Handle successful registration
      console.log('User registered:', response.data);
      Alert.alert('Success', 'Registration successful!');
      // You might navigate the user to a login screen or perform other actions
    } catch (error) {
      console.error('Registration error:', error.response.data);
      Alert.alert('Error', 'Failed to register. Please try again.');
      // Handle registration error - show an error message to the user
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Registration;
