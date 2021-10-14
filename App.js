import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createStackNavigator} from'@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen'; 
import Map from './components/Map';
import { Ionicons } from '@expo/vector-icons'; 
import RestaurantLocation from './components/RestaurantLocation';

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({ // Navigator can be customized using screenOptions
          tabBarIcon: ({ focused, color, size }) => { // Function tabBarIcon is given the focused state, color and size params
            let iconName;
            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Settings') {
              iconName = 'md-settings';
            } 
            else if (route.name === 'Map') {
             iconName = 'map';
            }
            return <Ionicons name={iconName} size={size} color={color} />; //it returns an icon component
          },  
         
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} /> 
        <Tab.Screen name="Map" component={Map} />   
        <Tab.Screen name="RestaurantLocation" component={RestaurantLocation} />  
      </Tab.Navigator> 
    </NavigationContainer>
  );
}
