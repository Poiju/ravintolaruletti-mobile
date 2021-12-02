import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ImageBackground, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { createStackNavigator } from '@react-navigation/stack';
import getRestaurants from './RestaurantAPI';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons'
import { setNextPage } from './RestaurantAPI';
import { colors } from './colors'

const Stack = createStackNavigator();


export default function HomeScreen({ navigation }) {

  const [restaurants, setRestaurants] = useState([])

  const [carousel, setCarousel] = useState(null);


  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    let data = await getRestaurants()
    setRestaurants(data)

  }


  //Fetch/set more restaurants
  const setMoreRestaurants = async () => {
    //if user is on the last restaurant of the "page"
    if (carousel && carousel.currentIndex == restaurants.length - 1) {
      //We will be fetching next page now
      setNextPage(true)
      //Getting the last restaurant of the previous page
      let last = restaurants[restaurants.length - 1]
      let newRestaurants = await getRestaurants()
      //Add last to the beginning of the next "page"
      newRestaurants.unshift(last)
      setRestaurants(newRestaurants)
      //Send user to the first item to avoid confusion
      carousel.snapToItem(0, false, false)
    } else {
      console.log("Currently on index: " + carousel.currentIndex)
    }
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
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,.5)',
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
                  backgroundColor: colors.color2,
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,.5)',
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
          >
            {
              item.photos.map((photo, index) => {
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
            <View style={[styles.cardIconBox, styles.cardAddress]}>
              <Ionicons name="ios-pin" size={16} color={colors.color1} />
              <Text style={styles.cardIconText}>{item.vicinity}</Text>
            </View>
            {
              item.rating &&
              <View style={[styles.cardIconBox, styles.cardRating]}>
                <Ionicons name="md-star" size={16} color={colors.color1} />
                <Text style={styles.cardIconText}>Rating: {item.rating}</Text>
              </View>
            }
            <View style={{ marginBottom: 15 }}></View>
          </View>
          <View>
            <Button
              title={'Go to map'}
              onPress={() => navigation.navigate('RestaurantLocation', {
                info: item
              })}
              color={colors.color2}
            />
          </View>
        </View>

      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.color1} />
      <View style={{ flex: 1, justifyContent: 'center', marginVertical: 50 }}>
        <Carousel
          layout={'default'}
          data={restaurants}
          sliderWidth={350}
          itemWidth={350}
          renderItem={renderItem}
          ref={c => { setCarousel(c); }}
          onSnapToItem={() => setMoreRestaurants()}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3
  },
  card: {
    backgroundColor: '#fff',
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
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 15
  },
  cardIconBox: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#f1f1f1',
  },
  cardAddress: {
    borderTopWidth: 2,
    borderTopColor: '#f1f1f1',
  },
  cardIconText: {
    paddingLeft: 5
  }
});
