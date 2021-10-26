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

  useEffect(() => {
    mapPhotos(restaurants)
  }, [restaurants])

  // Fetch data from API
  async function loadRestaurants() {
    try {
      const response = await fetch(PLACES_URL)
      const result = await response.json()

      if (response.ok) {
        setRestaurants(result.results)
      } else {
        console.log("RESPONSE NOT OK Couldn't load restaurants: " + result.message)
      }
    } catch (error) {
      console.log("ERROR Couldn't load restaurants: " + error.message)
    }
  }

  async function mapPhotos() {
    let newPhotos = []

    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].photos[0].photo_reference !== null) {

        let ref = restaurants[i].photos[0].photo_reference
        // Get picture URL from API
        let photo = await loadPhotos(ref)

        //console.log('Photo variable JSON: ' + JSON.stringify(photo, null, 4))
        console.log('Photo url: ' + photo)

        newPhotos = [...newPhotos, photo]
      }
    }

    setPhotos(newPhotos)
    console.log('Photos: ' + JSON.stringify(photos, null, 4))
  }

  async function loadPhotos(reference) {
    try {
      const max_width = '400'
      const photos_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${max_width}&photo_reference=${reference}&key=${API_KEY}`

      // Source: https://codeburst.io/adding-city-images-to-your-react-app-14c937df2db2
      const photo = await fetch(photos_url)
        .then(r => r.blob()) // Data is JPEG Binary so needs to be handled as a Blob
        .catch(console.error)

      //const photo = URL.createObjectURL(photoBlurb)
      return photo

    } catch (error) {
      console.log("ERROR Couldn't load photos: " + error.message)
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
        {restaurants.length > 0 &&
          <View>
            <Image
              style={styles.image}
            //source={{ uri: photos[0] }}
            />
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