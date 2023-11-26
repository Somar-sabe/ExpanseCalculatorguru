import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => { 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLogin = async () => {
    try {
      if (formData.email === '' || formData.password === '') {
        Alert.alert('Error', 'Please provide both email and password');
        return;
      }

      
      const response = await axios.post('YOUR_BACKEND_LOGIN_ENDPOINT', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful:', response.data);

      // Navigate to 'ExpanseMangment' screen upon successful login
      navigation.navigate('ExpanseMangment'); 
    } catch (error) {
      console.error('Login error:', error.response.data);
      Alert.alert('Error', 'Invalid email or password. Please try again.');
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
