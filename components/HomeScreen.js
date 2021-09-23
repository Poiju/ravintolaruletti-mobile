import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BASE_PLACES_URL = 'https://open-api.myhelsinki.fi/v1/places/?limit=10'

export default function HomeScreen() {
  const [places, setPlaces] = useState('Loading...')
  const [restaurant, setRestaurant] = useState()
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const response = await fetch(BASE_PLACES_URL)
      const result = await response.json()

      if (response.ok) {
        setPlaces(result.data[0].id)
        setRestaurant(result.data[0])
        console.log(restaurant)
        
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <View>
      <Text>{restaurant.name.fi}</Text>
      <Text>{restaurant.location.address.street_address}</Text> 
      <Text>{restaurant.description.body}</Text>
      <Text>{errorMessage}</Text>
      <StatusBar style="auto" hidden={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});