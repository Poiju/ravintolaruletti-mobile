import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Google Places API call parameters
const API_KEY = ''
// Nearby Search
const TYPE = 'restaurant'
const RADIUS = '100' // meters
const LOCATION = '60.16083241285829%2C24.942086204628993' // ~ Helsinki centrum
const PLACES_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LOCATION}&radius=${RADIUS}&type=${TYPE}&key=${API_KEY}`

export default function HomeScreen() {
  const [places, setPlaces] = useState('Loading...')
  const [restaurants, setRestaurants] = useState([])
  const [photos, setPhotos] = useState([])
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
        //console.log('Results: ' + result.results)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      console.log('Restaurants: ' + restaurants)
      mapPhotos()
    }

    console.log('Photos: ' + photos)
    for (i = 0; i < photos; i++) {
      console.log('Photo ' + i + ': ' + photos[i])
    }
  }

  const mapPhotos = () => {
    for (let i = 0; i < restaurants.length; i++) {
      console.log('Photo reference: ' + restaurants[i].photos[0].photo_reference)
      const photo = loadPhotos(restaurants[i].photos[0].photo_reference)
      console.log('Photo variable: ' + photo)
      setPhotos([...photos, { url: photo }])
    }
  }

  async function loadPhotos(reference) {
    try {
      const max_width = '400'
      const photos_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${max_width}&photo_reference=${reference}&key=${API_KEY}`

      const response = await fetch(photos_url)
      const result = await response.json()

      if (response.ok) {
        console.log('LoadPhotos result: ' + result)
        return result
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  /**
   
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
                height: 450,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
              }}>
                <Image
                  style={styles.image}
                  source={{
                    uri: photos[index],
                  }}
                />
                <Text style={{ fontSize: 30 }}>{item.name}</Text>
                <Text>{item.vicinity}</Text>
                <Text>Rating: {item.rating}</Text>
              </View>
            )
          }}
        />

   */

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50, }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
        {restaurants == true &&
          <View>
            <Image
              style={styles.image}
              source={{
                uri: photos[0],
              }}
            />
            <Text style={{ fontSize: 30 }}>{restaurants[0].name}</Text>
            <Text>{restaurants[0].vicinity}</Text>
            <Text>Rating: {restaurants[0].rating}</Text>
          </View>
        }
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
  image: {
    width: 200,
    height: 200
  }
});