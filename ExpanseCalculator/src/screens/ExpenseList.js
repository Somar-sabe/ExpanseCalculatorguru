import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Picker, Button, Alert } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system'; 
import { styles } from '../css/ExpenseListingStyles';

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
        const response = await axios.get(`http://localhost:5000/expenses/monthly/${userId}?year=${selectedYear}&month=${selectedMonth}`);
        setExpenses(response.data.expenses); // Assuming expenses are returned as an array within the 'expenses' property
        setFilteredExpenses(response.data.expenses); // Similarly, update filtered expenses
      } else {
        const response = await axios.get(`http://localhost:5000/expenses`, {
          params: { userId },
        });
        setExpenses(response.data.expenses);
        setFilteredExpenses(response.data.expenses);
      }
    } catch (error) {
      console.error('Fetch expenses error:', error.response.data);
      
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
        `http://localhost:5000/expenses/pdf-download/${userId}?startDate=${selectedYear}-01-01&endDate=${selectedYear}-12-31`,
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
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
      <Picker
  selectedValue={selectedMonth}
  onValueChange={(itemValue) => setSelectedMonth(itemValue)}
  style={{ width: 150 }}
>
  <Picker.Item label="Select Month" value="" />
  <Picker.Item label="January" value="1" />
  <Picker.Item label="February" value="2" />
  <Picker.Item label="March" value="3" />
  <Picker.Item label="April" value="4" />
  <Picker.Item label="May" value="5" />
  <Picker.Item label="June" value="6" />
  <Picker.Item label="July" value="7" />
  <Picker.Item label="August" value="8" />
  <Picker.Item label="September" value="9" />
  <Picker.Item label="October" value="10" />
  <Picker.Item label="November" value="11" />
  <Picker.Item label="December" value="12" />
</Picker>

        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={{ width: 150 }}
        >
          <Picker.Item label="Select Year" value="" />
          \
          <Picker.Item label="2022" value="2022" />
          <Picker.Item label="2023" value="2023" />
          {/* Add other years */}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePDFDownload}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredExpenses}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>Description: {item.description}</Text>
            <Text style={styles.expenseText}>Amount: {item.amount}</Text>
            <Text style={styles.expenseText}>Category: {item.category}</Text>
            <Text style={styles.expenseText}>Date: {item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} 
      />
    </View>
  );
};

export default ExpenseListing;
