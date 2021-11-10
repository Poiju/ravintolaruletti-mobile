import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location'; 
import MapView, { Marker } from 'react-native-maps';  
import getLocation from './Location'; 
import {restaurants} from './HomeScreen';

export default function Map( ) {

  //console.log(restaurants)
  const {k} = {restaurants};
  const [takenRestaurants, setTakenRestaurants] = useState([]);
  
  const x = 1;

  console.log('mi' + k);

  const [location, setLocation] = useState({
    latitudeDelta:0.0322,
    longitudeDelta:0.0221,
  });

  useEffect(() => {
    (async () => {
      let userLocation = await getLocation()
      setLocation({...location, latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      });
    })();
  }, []);


  return ( 
    <View style={{height:100, flex:1}}>
    {location.latitude != undefined && 
    <MapView
      style={{ flex: 1 }}
      region={location}>  
     <Marker coordinate={{
       latitude: location.latitude, 
       longitude: location.longitude
       }}
       title='You are here'/>  
      </MapView>
      } 
      <MapView>
        {k.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.geometry.location.lat, 
              longitude: restaurant.geometry.location.lng
              }}
            title='juu'
          />
        ))}
      </MapView>     
      <Button title='Ravintolat lähelläni'
      onPress={() => r()}> </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

/*<Marker coordinate={{
       latitude: restaurants[0].geometry.location.lat, 
       longitude: restaurants[0].geometry.location.lng
       }}
       
  <MapView>
        {takenRestaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.geometry.location.lat, 
              longitude: restaurant.geometry.location.lng
              }}
            title='juu'
          />
        ))}
      </MapView>     
       */