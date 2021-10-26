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
  const [restaurants, setRestaurants] = useState([])
  const [photos, setPhotos] = useState([])
  const [cardIndex, setCardIndex] = useState(0)

  useEffect(() => {
    loadRestaurants()
  }, [])

  // Fetch data from API
  async function loadRestaurants() {
    try {
      const response = await fetch(PLACES_URL)
      const result = await response.json()

      if (response.ok) {
        // Set restaurant data
        setRestaurants(result.results)
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
      if (res[i].photos[0].photo_reference !== null) {
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
        {restaurants.length > 0 &&
          <View>
            <ImageBackground
              style={styles.image}
              source={{ uri: photos[0] }}
            >
            </ImageBackground>
            <Text style={{ fontSize: 30 }}>{restaurants[0].name}</Text>
            <Text>{restaurants[0].vicinity}</Text>
            <Text>Rating: {restaurants[0].rating}</Text>
          </View>
        }
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
    width: 200,
    height: 200
  }
});