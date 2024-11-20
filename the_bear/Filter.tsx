import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Picker, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MenuItem } from './types';

type FilterRouteProp = RouteProp<{ Filter: { menuItems: MenuItem[] } }, 'Filter'>;

export default function FilterScreen({ route }: { route: FilterRouteProp }) {
  const { menuItems } = route.params;
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);

  const handleFilter = () => {
    let items: MenuItem[] = [];
    if (selectedCourse === 'all') {
      items = menuItems;
    } else {
      items = menuItems.filter(item => item.course === selectedCourse);
    }
    setFilteredItems(items);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Filter Menu Items</Text>
      <Text>Select Course:</Text>
      <Picker
        selectedValue={selectedCourse}
        style={styles.picker}
        onValueChange={(itemValue: string) => setSelectedCourse(itemValue)}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Starters" value="starters" />
        <Picker.Item label="Mains" value="mains" />
        <Picker.Item label="Desserts" value="desserts" />
      </Picker>

      <Button title="Apply Filter" onPress={handleFilter} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.name} - ${item.price}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
          </View>
        )}
        style={styles.flatList} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 10,
  },
  menuItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatList: {
    height: 400 
  },
});
