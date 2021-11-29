import React from 'react';
import { View, Pressable, Button, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Map from './components/Map';
import { Ionicons } from '@expo/vector-icons';
import RestaurantLocation from './components/RestaurantLocation';
import { colors } from './components/colors'

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
          } else if (route.name === 'Map') {
            iconName = 'map';
          }
          return <Ionicons name={iconName} size={size} color={color} />; //it returns an icon component
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.color1
        },
        headerTitleStyle: {
          color: '#fff'
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#dbdbdb'
        },
        tabBarItemStyle: { paddingVertical: 3 },
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: colors.color1,
        tabBarInactiveTintColor: '#999',
        tabBarInactiveBackgroundColor: '#fff'
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Nearby restaurants' }} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loginIconContainer: {
    marginRight: 10
  }
})