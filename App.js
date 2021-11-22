import React from 'react';
import { View, Pressable, Button, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen'; 
import Map from './components/Map';
import { Ionicons } from '@expo/vector-icons';
import RestaurantLocation from './components/RestaurantLocation';
import LoginScreen from './components/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home({ navigation }) {

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({ // Navigator can be customized using screenOptions
          tabBarIcon: ({ focused, color, size }) => { // Function tabBarIcon is given the focused state, color and size params
            let iconName;
            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } 
            else if (route.name === 'Map') {
             iconName = 'map';
            }
            return <Ionicons name={iconName} size={size} color={color} />; //it returns an icon component
          },  
         
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} /> 
        <Tab.Screen name="Map" component={Map} />   
      </Tab.Navigator> 
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name="RestaurantLocation"
          component={RestaurantLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Login to account' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loginIconContainer: {
    marginRight: 10
  }
})