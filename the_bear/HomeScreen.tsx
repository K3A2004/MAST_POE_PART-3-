import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MenuItem } from './types';

const preListedMenuItems: MenuItem[] = [
  { id: '1', name: 'Tomato Soup', description: 'A delicious tomato-based soup', price: '5.99', course: 'starters' },
  { id: '2', name: 'Caesar Salad', description: 'Fresh Caesar salad with croutons and dressing', price: '6.49', course: 'starters' },
  { id: '3', name: 'Grilled Chicken', description: 'Juicy grilled chicken served with veggies', price: '10.99', course: 'mains' },
  { id: '4', name: 'Steak with Fries', description: 'Perfectly cooked steak served with crispy fries', price: '15.99', course: 'mains' },
  { id: '5', name: 'Chocolate Cake', description: 'Rich and moist chocolate cake with frosting', price: '6.99', course: 'desserts' },
  { id: '6', name: 'Cheesecake', description: 'Creamy cheesecake with a buttery crust', price: '7.49', course: 'desserts' },
];

type RootStackParamList = {
  Home: undefined;
  AddMenu: { addMenuItem: (item: MenuItem) => void };
  Filter: { menuItems: MenuItem[]; applyFilter: (filteredItems: MenuItem[]) => void };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(preListedMenuItems);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(preListedMenuItems);

  const addMenuItem = (item: MenuItem) => {
    const newItems = [...menuItems, { ...item, id: Math.random().toString() }];
    setMenuItems(newItems);
    setFilteredItems(newItems);
  };

  const removeMenuItem = (id: string) => {
    const updatedItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderHeader = () => (
    <View>
      <Text style={styles.welcomeText}>Cristoffel's Digital Menu</Text>
      <Image source={require('./img/the_bear_logo.jpeg')} style={styles.image} />
      <Text style={styles.menuHeading}>Menu Items ({filteredItems.length})</Text>
      <Text style={styles.courseHeading}>Average Price by Course for Prelisted menu items</Text>
      <View style={styles.courseContainer}>
        <Text style={styles.courseText}>Starters: $5.99</Text>
        <Text style={styles.courseText}>Mains: $9.49</Text>
        <Text style={styles.courseText}>Desserts: $6.19</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View>
      <TouchableHighlight onPress={() => navigation.navigate('AddMenu', { addMenuItem })}>
        <View style={styles.Button}>
          <Text style={styles.btnText}>Add Menu</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('Filter', { menuItems, applyFilter: setFilteredItems })}>
        <View style={styles.Button}>
          <Text style={styles.btnText}>Filter Menu</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.name} - ${item.price}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Button title="Remove" onPress={() => removeMenuItem(item.id)} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        style={styles.flatList} // Fixed height
        contentContainerStyle={styles.flatListContentContainer}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginVertical: 20,
  },
  welcomeText: {
    paddingTop: 40,
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  menuHeading: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
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
  Button: {
    height: 50,
    marginTop: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  courseHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
  },
  courseContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  courseText: {
    fontSize: 18,
    marginVertical: 5,
  },
  flatList: {
    height: 400, // Fixed height
  },
  flatListContentContainer: {
    paddingBottom: 10,
  },
});
