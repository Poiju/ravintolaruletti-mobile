import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RestaurantLocation from './RestaurantLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import getLocation from './Location';

// Google Places API call parameters
const API_KEY = ''
// Nearby Search
const TYPE = 'restaurant'
const RADIUS = '300' // meters


const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([])
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    loadRestaurants()
    generateBoxShadowStyle(0, 5, '#9aa0b9', 0.05, 13, 20, '#9aa0b9')

  }, [])

  async function loadRestaurants() {
    try {
      const loc = await getLocation(); 
      const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + loc.latitude + '%2C' + loc.longitude + '&radius=' + RADIUS + '&type=' + TYPE + '&key=' + API_KEY)
      const result = await response.json()

      if (response.ok) {
        console.log('Number of restaurants fetched: ' + result.results.length)

        // Load photos and filter out restaurants without any
        filterRestaurantData(result.results)
      } else {
        console.log("RESPONSE NOT OK Couldn't load restaurants: " + result.message)
      }
    } catch (error) {
      console.log("ERROR Couldn't load restaurants: " + error.message)
    }
  }

  const filterRestaurantData = (data) => {
    let newRestaurants = []
    let newPhotos = []

    for (let i = 0; i < data.length; i++) {
      // Check if restaurant has photos
      if (data[i].photos) {
        // Create image URL for the first image in array
        let photo = loadPhoto(data[i].photos[0].photo_reference)
        newPhotos = [...newPhotos, photo]
        newRestaurants = [...newRestaurants, data[i]]
      }
    }

    // Keep only restaurants with photos
    setRestaurants(newRestaurants)
    setPhotos(newPhotos)
  }

  const loadPhoto = (reference) => {
    const max_width = '400'
    const photos_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${max_width}&photo_reference=${reference}&key=${API_KEY}`

    return photos_url
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
                    source={{ uri: photos[index] }}
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
