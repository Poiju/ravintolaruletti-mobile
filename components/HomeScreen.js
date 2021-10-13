import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Google Places API call parameters
const API_KEY = ''
const TYPE = 'restaurant'
const RADIUS = '150' // meters
const LOCATION = '60.16083241285829%2C24.942086204628993' // ~ Helsinki centrum
const PLACES_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LOCATION}&radius=${RADIUS}&type=${TYPE}&key=${API_KEY}`

export default function HomeScreen() {
  const [places, setPlaces] = useState('Loading...')
  const [restaurants, setRestaurants] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [cardIndex, setCardIndex] = useState(0)

  useEffect(() => {
    load()
    //console.log(restaurants)
  }, [])

  // Fetch data from API
  async function load() {
    try {
      const response = await fetch(PLACES_URL)
      const result = await response.json()

      if (response.ok) {
        setRestaurants(result.results)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50, }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
        <Carousel
          layout={"tinder"}
          data={restaurants}
          sliderWidth={300}
          itemWidth={300}
          renderItem={({ item, index }) => {
            return (
              <View style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
              }}>
                <Text style={{ fontSize: 30 }}>{item.name}</Text>
                <Text>{item.vicinity}</Text>
                <Text>Rating: {item.rating}</Text>
              </View>
            )
          }}
        />
      </View>
    </SafeAreaView>
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