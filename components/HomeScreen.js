import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// Google Places API call parameters
const API_KEY = ''
// Nearby Search
const TYPE = 'restaurant'
const RADIUS = '300' // meters
const LOCATION = '60.16083241285829%2C24.942086204628993' // ~ Helsinki centrum
const PLACES_URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LOCATION}&radius=${RADIUS}&type=${TYPE}&key=${API_KEY}`


export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([])
  const [photos, setPhotos] = useState([])
  const [cardIndex, setCardIndex] = useState(0)

  useEffect(() => {
    loadRestaurants()
    generateBoxShadowStyle(0, 5, '#9aa0b9', 0.05, 13, 20, '#9aa0b9')
  }, [])

  async function loadRestaurants() {
    try {
      const response = await fetch(PLACES_URL)
      const result = await response.json()

      if (response.ok) {
        // Set restaurant data
        setRestaurants(result.results)
        console.log('Number of restaurants fetched: ' + result.results.length)
        // Get restaurant photos
        mapPhotos(result.results)
      } else {
        console.log("RESPONSE NOT OK Couldn't load restaurants: " + result.message)
      }
    } catch (error) {
      console.log("ERROR Couldn't load restaurants: " + error.message)
    }
  }

  const mapPhotos = (res) => {
    let newPhotos = []

    for (let i = 0; i < res.length; i++) {
      if (res[i].photos) {
        // Create image URL for the first available photo
        let photo = loadPhoto(res[i].photos[0].photo_reference)
        newPhotos = [...newPhotos, photo]
      }
    }

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
  boxShadow: {}// See generateBoxShadowStyle function
});