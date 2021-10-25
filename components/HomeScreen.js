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
  const [errorMessage, setErrorMessage] = useState()
  const [photoErrorMessage, setPhotoErrorMessage] = useState()

  useEffect(() => {
    load()
      .then((res) => mapPhotos(res))
      .then(() => console.log('Photos: ' + JSON.stringify(photos, null, 4)))
    //JSON.stringify(photos[0], null, 4)
  }, [])

  // Fetch data from API
  async function load() {
    try {
      const response = await fetch(PLACES_URL)
      const result = await response.json()

      if (response.ok) {
        setRestaurants(result.results)
        return result.results
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  async function mapPhotos(res) {
    console.log('Restaurants: ' + res)
    for (let i = 0; i < res.length; i++) {
      if (res[i].photos[0].photo_reference !== null) {

        //console.log('Photo reference: ' + restaurants[i].photos[0].photo_reference)

        let ref = res[i].photos[0].photo_reference
        // Get picture URL from API
        let photo = await loadPhotos(ref)

        //console.log('Photo variable JSON: ' + JSON.stringify(photo, null, 4))
        console.log('Photo variable NORMAL: ' + photo)

        setPhotos([...photos, { url: photo }])
      }
    }
  }

  async function loadPhotos(reference) {
    try {
      const max_width = '400'
      const photos_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${max_width}&photo_reference=${reference}&key=${API_KEY}`

      const response = await fetch(photos_url)
      const resultBlob = await response.blob()
      const photo = URL.createObjectURL(resultBlob)

      if (response.ok) {
        //console.log('LoadPhotos result: ' + results)
        return photo
      } else {
        console.log("RESPONSE NOT OK Couldn't load photos")
      }
    } catch (error) {
      setPhotoErrorMessage(error.message)
      console.log("ERROR Couldn't load photos: " + photoErrorMessage)
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
              source={{

              }}
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