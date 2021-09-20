import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BASE_PLACES_URL = 'https://open-api.myhelsinki.fi/v1/places/'

export default function App() {
  const [places, setPlaces] = useState('Loading...')
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
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text>{places}</Text>
      <Text>{errorMessage}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
