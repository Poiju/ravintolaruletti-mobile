import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Alert, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RestaurantLocation from './RestaurantLocation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import getLocation from './Location';
import Slideshow from 'react-native-image-slider-show';
import getRestaurants from './RestaurantAPI';
//import { API_TOKEN } from 'react-native-dotenv'



//console.log(API_KEY)
const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetchRestaurants()
    generateBoxShadowStyle(0, 5, '#9aa0b9', 0.05, 13, 20, '#9aa0b9')
    console.log(restaurants)
  }, [])


  const fetchRestaurants = async () => {

     let data = await getRestaurants()
     setRestaurants(data)
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


/* {restaurants != undefined &&
        <Map restaurants={restaurants}/> }*/