import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { createStackNavigator } from '@react-navigation/stack';
import getRestaurants from './RestaurantAPI';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons'

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
   
  //Fetch more restaurants
  const setMoreRestaurants = async () => {
    //if user is on the last restaurant of the "page"
    if (carousel && carousel.currentIndex == restaurants.length-1) {
      //Getting the last restaurant of the previous page
      let last = restaurants[restaurants.length-1]
      let newRestaurants = await getRestaurants()
      //Add last to the beginning of the next "page"
      newRestaurants.unshift(last)
      setRestaurants(newRestaurants)
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
                    source={{ uri: item.photos._W[0] }}
                  >
                  </ImageBackground>
                </View>
                <View style={styles.cardContent}> 
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardAddress}>{item.vicinity}</Text>
                  <Text>Rating: {item.rating}</Text> 
                  <Text> </Text>
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


/* {restaurants != undefined &&
        <Map restaurants={restaurants}/> }*/