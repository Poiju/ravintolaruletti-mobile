import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, RefreshControl } from 'react-native';
import * as Location from 'expo-location'; 
import MapView, { Marker } from 'react-native-maps';  
import getLocation from './Location'; 
import getRestaurants from './RestaurantAPI';
import { Ionicons} from '@expo/vector-icons';    



export default function Map({navigation}) {

  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState({
    latitudeDelta:0.0210,
    longitudeDelta:0.0180,
  });

  
  useEffect(() => {
    //Refresh the page on navigation, so the next restaurants can be seen on the map
    const unsubscribe = navigation.addListener('focus', () => {
      if (!location.latitude) setLoc()
      fetchRestaurants()
      console.log('Kartta päivitetty!');
    });
    return unsubscribe;
    

  }, [navigation]);

  const fetchRestaurants = async () => {
    let data = await getRestaurants()
    setRestaurants(data);
 }

 const setLoc = async () => {
  let userLocation = await getLocation()
  setLocation({...location, latitude: userLocation.latitude,
  longitude: userLocation.longitude,
  });
}


  return ( 
    <View style={{height:100, flex:1}}>
       {location.latitude != undefined && 
      <MapView
        style={{ flex: 1 }}
        region={location}>  
        <Marker  coordinate={{
          latitude: location.latitude, 
          longitude: location.longitude}}
          title='You are here'>
          <View>
            <Ionicons name={'happy'} size={30}/>
          </View>  
        </Marker>  
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.location.lat, 
              longitude: restaurant.location.lng}}
            title={restaurant.name}>  
            <View >
              <Ionicons name={'restaurant'} size={20}/>
            </View>
          </Marker>
        ))}
      </MapView> 
      } 
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