import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLogin = async () => {
    try {
      // Validate if email and password are not empty
      if (formData.email === '' || formData.password === '') {
        Alert.alert('Error', 'Please provide both email and password');
        return;
      }

      // Make an API call to authenticate user
      const response = await axios.post('YOUR_BACKEND_LOGIN_ENDPOINT', {
        email: formData.email,
        password: formData.password,
      });

      // Handle successful login response - perform navigation or further actions
      console.log('Login successful:', response.data);
      // You might navigate to another screen upon successful login
      // navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Login error:', error.response.data);
      Alert.alert('Error', 'Invalid email or password. Please try again.');
      // Handle login error - show an error message to the user
    }
  };

  return (
    <View>
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
