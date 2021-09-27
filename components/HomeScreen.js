import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const BASE_PLACES_URL = 'https://open-api.myhelsinki.fi/v1/places/?limit=10'

export default function HomeScreen() {
  const [places, setPlaces] = useState('Loading...')
  const [restaurant, setRestaurant] = useState([])
  /*const [restaurant, setRestaurant] = useState([
    {
      name: {
        fi: 'Testi A'
      },
      location: {
        address: {
          street_address: 'Testikatu A'
        }
      },
      description: {
        body: 'Testibody A'
      }
    },
    {
      name: {
        fi: 'Testi B'
      },
      location: {
        address: {
          street_address: 'Testikatu B'
        }
      },
      description: {
        body: 'Testibody B'
      }
    },
    {
      name: {
        fi: 'Testi C'
      },
      location: {
        address: {
          street_address: 'Testikatu C'
        }
      },
      description: {
        body: 'Testibody C'
      }
    },
  ])*/
  const [errorMessage, setErrorMessage] = useState(null)
  const [cardIndex, setCardIndex] = useState(0)

  useEffect(() => {
    load()
    //console.log(restaurant)
  }, [])

  // Fetch data from API
  async function load() {
    try {
      const response = await fetch(BASE_PLACES_URL)
      const result = await response.json()

      if (response.ok) {
        setRestaurant(result.data)
        console.log(restaurant)
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
          data={restaurant}
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
                <Text style={{ fontSize: 30 }}>{item.name.fi}</Text>
                <Text>{item.location.address.street_address}</Text>
                <Text>{item.description.body}</Text>
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