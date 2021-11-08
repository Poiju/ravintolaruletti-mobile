import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RestaurantLocation from './RestaurantLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import getLocation from './Location';
import Slideshow from 'react-native-image-slider-show';

// Google Places API call parameters
const API_KEY = ''
// Nearby Search
const TYPE = 'restaurant'
const RADIUS = '300' // meters
// Photo max width
const PHOTO_WIDTH = '400'

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    loadRestaurants()
    generateBoxShadowStyle(0, 5, '#9aa0b9', 0.05, 13, 20, '#9aa0b9')

  }, [])

  const loadRestaurants = async () => {
    try {
      const loc = await getLocation();
      const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + loc.latitude + '%2C' + loc.longitude + '&radius=' + RADIUS + '&type=' + TYPE + '&key=' + API_KEY)
      const result = await response.json()

      if (response.ok) {
        console.log('Number of restaurants fetched: ' + result.results.length)

        // Load photos and filter out restaurants without any
        setRestaurantsWithPhotos(result.results)
      } else {
        console.log("RESPONSE NOT OK Couldn't load restaurants: " + result.message)
      }
    } catch (error) {
      console.log("ERROR Couldn't load restaurants: " + error.message)
    }
  }

  const setRestaurantsWithPhotos = async (data) => {
    let newRestaurants = []

    for (let i = 0; i < data.length; i++) {
      // Check if restaurant has photos
      if (data[i].photos) {
        // Return array of photo urls
        let photoUrls = await loadPhotos(data[i].place_id)
        data[i].photos = photoUrls

        newRestaurants = [...newRestaurants, data[i]]
      }
    }

    console.log(newRestaurants)
    setRestaurants(newRestaurants)
  }

  const loadPhotos = async (placeId) => {
    try {
      // Google Places API Search (used for fetching restaurants) returns only a single photo.
      // We need to additionally use Place Details to get up to 10 photos per restaurant (API limitation)
      const fields = 'photos'
      const placeDetailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`

      // Fetch photo array
      const response = await fetch(placeDetailUrl)

      if (!response.ok) {
        throw new Error('HTTP ERROR! status: ' + response.status)
      }

      const result = await response.json()
      const photoRefArray = result.result.photos

      // Create new array with direct links to photos
      const photoUrls = photoRefArray.map(photoRef => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${PHOTO_WIDTH}&photo_reference=${photoRef.photo_reference}&key=${API_KEY}`
      })

      return photoUrls
    } catch (error) {
      console.log('ERROR loading photos: ' + error)
    }
  }

  // Necessary for unified iOS and Android box shadow
  // Source: https://blog.logrocket.com/applying-box-shadows-in-react-native/
  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
  ) => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      };
    } else if (Platform.OS === 'android') {
      styles.boxShadow = {
        elevation,
        shadowColor: shadowColorAndroid,
      };
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 50, }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
        <Carousel
          layout={'default'}
          data={restaurants}
          sliderWidth={350}
          itemWidth={350}
          renderItem={({ item, index }) => {
            return (
              <View style={[styles.card, styles.boxShadow]}>
                <View>
                  <ImageBackground
                    style={styles.image}
                    imageStyle={styles.imageBackground}
                    source={{ uri: item.photos[0] }}
                  >
                  </ImageBackground>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardAddress}>{item.vicinity}</Text>
                  <Text>Rating: {item.rating}</Text>
                  <Button title={item.vicinity}
                    onPress={() => navigation.navigate('RestaurantLocation', {
                      info: item
                    }
                    )
                    }
                  />
                </View>
              </View>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 250,
  },
  imageBackground: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 425,
    marginLeft: 25,
    marginRight: 25
  },
  cardContent: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  cardTitle: {
    fontSize: 24,
    marginBottom: 10
  },
  cardAddress: {
    marginBottom: 5
  },
  image: {
    width: 300,
    height: 250,
  },
  imageBackground: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 425,
    marginLeft: 25,
    marginRight: 25
  },
  cardContent: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  cardTitle: {
    fontSize: 24,
    marginBottom: 10
  },
  cardAddress: {
    marginBottom: 5
  },
  boxShadow: {}// See generateBoxShadowStyle function
});
