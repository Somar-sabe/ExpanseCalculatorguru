import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Picker, Button, Alert } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system'; // Import FileSystem for file download

const ExpenseListing = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, [selectedMonth, selectedYear]);

  const fetchExpenses = async () => {
    try {
      if (selectedMonth && selectedYear) {
        const response = await axios.get(`/api/expenses/monthly/${userId}?year=${selectedYear}&month=${selectedMonth}`);
        setExpenses(response.data);
        setFilteredExpenses(response.data);
      } else {
        const response = await axios.get(`/api/expenses/user/${userId}`);
        setExpenses(response.data);
        setFilteredExpenses(response.data);
      }
    } catch (error) {
      console.error('Fetch expenses error:', error.response.data);
      // Handle error
    }
  };

  const handleFilter = (searchTerm) => {
    const filtered = expenses.filter(
      (expense) =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase())
      // Add other fields to filter as needed
    );
    setFilteredExpenses(filtered);
  };

  const handlePDFDownload = async () => {
    try {
      const response = await axios.get(
        `/api/expenses/pdf-download/${userId}?startDate=${selectedYear}-01-01&endDate=${selectedYear}-12-31`,
        { responseType: 'blob' }
      );

      const fileUri = FileSystem.cacheDirectory + 'expense_report.pdf';
      await FileSystem.writeAsStringAsync(fileUri, response.data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      await FileSystem.getContentUriAsync(fileUri).then(async (contentUri) => {
        await FileSystem.copyAsync({ from: contentUri, to: FileSystem.documentDirectory + 'expense_report.pdf' });
        Alert.alert('Success', 'Expense report downloaded successfully!');
      });
    } catch (error) {
      console.error('PDF download error:', error.response.data);
      Alert.alert('Error', 'Failed to download expense report. Please try again.');
      // Handle download error
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={{ width: 150 }}
        >
          <Picker.Item label="Select Month" value="" />
          {/* Add Picker items for months */}
          <Picker.Item label="January" value="1" />
          {/* Add other months */}
        </Picker>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={{ width: 150 }}
        >
          <Picker.Item label="Select Year" value="" />
          {/* Add Picker items for years */}
          <Picker.Item label="2023" value="2023" />
          {/* Add other years */}
        </Picker>
      </View>
      <Button title="Download PDF" onPress={handlePDFDownload} />
      <FlatList
        data={filteredExpenses}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text>Description: {item.description}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Change 'id' to your unique identifier
      />
    </View>
  );
};

export default ExpenseListing;
