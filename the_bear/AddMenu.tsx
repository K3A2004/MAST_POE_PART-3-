import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MenuItem } from './types';

type AddMenuRouteProp = RouteProp<{ AddMenu: { addMenuItem: (item: MenuItem) => void } }, 'AddMenu'>;

export default function AddMenuScreen() {
  const route = useRoute<AddMenuRouteProp>();
  const { addMenuItem } = route.params;
  const navigation = useNavigation();

  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [course, setCourse] = useState<string>('starters');

  const handleAddItem = () => {
    if (dishName && description && price) {
      const newItem: MenuItem = {
        id: Math.random().toString(),
        name: dishName,
        description,
        price,
        course,
      };
      addMenuItem(newItem);
      setDishName('');
      setDescription('');
      setPrice('');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Menu Item</Text>

      <Text>Dish Name:</Text>
      <TextInput style={styles.input} placeholder="Enter dish name" value={dishName} onChangeText={setDishName} />

      <Text>Description:</Text>
      <TextInput style={styles.input} placeholder="Enter description" value={description} onChangeText={setDescription} />

      <Text>Price:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text>Course:</Text>
      <Picker selectedValue={course} style={styles.picker} onValueChange={(itemValue: string) => setCourse(itemValue)}>
        <Picker.Item label="Starters" value="starters" />
        <Picker.Item label="Mains" value="mains" />
        <Picker.Item label="Desserts" value="desserts" />
      </Picker>

      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10, borderRadius: 5 },
  picker: { height: 50, width: '100%', marginTop: 10 },
});
