import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'; 

const ExpenseManagement = () => {
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleInputChange = (field, value) => {
    setExpenseData({ ...expenseData, [field]: value });
  };

  const handleAddExpense = async () => {
    try {
      // Validate if all fields are not empty
      if (
        expenseData.description === '' ||
        expenseData.amount === '' ||
        expenseData.category === '' ||
        expenseData.date === ''
      ) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      // Make an API call to add the expense
      const response = await axios.post('http://localhost:5000/expenses', expenseData);

      // Handle successful expense addition
      console.log('Added Expense:', response.data);
      
      Alert.alert('Success', 'Expense added successfully!');
      // Clear form fields after successful addition
      setExpenseData({
        description: '',
        amount: '',
        category: '',
        date: '',
      });
    } catch (error) {
      console.error('Add expense error:', error.response.data);
      Alert.alert('Error', 'Failed to add expense. Please try again.');
  
    }
  };

  const handleEditExpense = async () => {
    try {
      // Make an API call to edit the expense
      const response = await axios.put('http://localhost:5000/expenses/:id', expenseData);

      // Handle successful expense update
      console.log('Updated Expense:', response.data);
      Alert.alert('Success', 'Expense updated successfully!');
    } catch (error) {
      console.error('Edit expense error:', error.response.data);
      Alert.alert('Error', 'Failed to edit expense. Please try again.');
      // Handle edit expense error - show an error message to the user
    }
  };

  const handleDeleteExpense = async () => {
    try {
      // Make an API call to delete the expense
      const response = await axios.delete('http://localhost:5000/expenses/:id', {
        data: expenseData,
      });

      // Handle successful expense deletion
      console.log('Deleted Expense:', response.data);
      Alert.alert('Success', 'Expense deleted successfully!');
    } catch (error) {
      console.error('Delete expense error:', error.response.data);
      Alert.alert('Error', 'Failed to delete expense. Please try again.');
      // Handle delete expense error - show an error message to the user
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Description"
        value={expenseData.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      <TextInput
        placeholder="Amount"
        value={expenseData.amount}
        onChangeText={(text) => handleInputChange('amount', text)}
      />
      <TextInput
        placeholder="Category"
        value={expenseData.category}
        onChangeText={(text) => handleInputChange('category', text)}
      />
      <TextInput
        placeholder="Date"
        value={expenseData.date}
        onChangeText={(text) => handleInputChange('date', text)}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
      <Button title="Edit Expense" onPress={handleEditExpense} />
      <Button title="Delete Expense" onPress={handleDeleteExpense} />
    </View>
  );
};

export default ExpenseManagement;
