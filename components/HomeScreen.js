import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { createStackNavigator } from '@react-navigation/stack';
import getRestaurants from './RestaurantAPI';
import getLocation from './Location';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons'
//import { API_TOKEN } from 'react-native-dotenv'

//console.log(API_KEY)
const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    let data = await getRestaurants()
    setRestaurants(data)
  }

  // Iterable item for card carousel
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageSliderContainer}>

          <Swiper
            height={230}
            horizontal={false}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,.2)',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#ededed',
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#007aff',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#ededed',
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
          >
            {
              item.photos._W.map((photo, index) => {
                return (
                  <ImageBackground
                    source={{ uri: photo }}
                    resizeMode="cover"
                    style={styles.imageBackground}
                    key={index}
                  >
                  </ImageBackground>
                )
              })
            }
          </Swiper>
        </View>

        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardAddress}>{item.vicinity}</Text>
            {
              item.rating &&
              <View style={styles.cardRating}>
                <Ionicons name="md-star" size={18} color="#eda800" style={styles.cardRatingIcon} />
                <Text style={styles.cardRatingText}>Rating: {item.rating}</Text>
              </View>
            }
            <View style={{ marginBottom: 15 }}></View>
          </View>
          <View>
            <Button
              style={styles.cardButton}
              title={'Go to map'}
              onPress={() => navigation.navigate('RestaurantLocation', {
                info: item
              })}
            />
          </View>
        </View>

      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center', marginVertical: 50 }}>
        <Carousel
          layout={'default'}
          data={restaurants}
          sliderWidth={350}
          itemWidth={350}
          renderItem={renderItem}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    flex: 1,
  },
  imageSliderContainer: {
    height: 230
  },
  imageBackground: {
    flex: 1
  },
  cardContent: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 10
  },
  cardAddress: {
    marginBottom: 6
  },
  cardRating: {
    flexDirection: 'row',
  },
  cardRatingText: {
    paddingLeft: 5
  }
});
