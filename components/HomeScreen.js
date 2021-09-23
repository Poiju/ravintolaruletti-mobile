import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BASE_PLACES_URL = 'https://open-api.myhelsinki.fi/v1/places/'

export default function HomeScreen() {
  const [places, setPlaces] = useState('Loading...')
  const [restaurant, setRestaurant] = useState({
    id: "", name: "", lat: 0, long: 0, address: ""
    , postal_code: "", locality: "", description: "", hours: ""
  })
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
        setRestaurant({
          id: result.data[0].id, name: result.data[0].name.fi, lat: result.data[0].location.lat, long: result.data[0].location.long,
          address: result.data[0].location.address.street_address, postal_code: result.data[0].location.address.postal_code, locality: result.data[0].location.address.locality,
          description: result.data[0].description.body, hours: ""
        })
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
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.address}</Text>
      <Text>{restaurant.description}</Text>
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