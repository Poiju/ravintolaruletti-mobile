import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location'; 
import MapView, { Marker } from 'react-native-maps';  

export default function Map() {
  const [location, setLocation] = useState({
    latitude:0,
    longitude:0,
    latitudeDelta:0.0322,
    longitudeDelta:0.0221,
  });
  
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({latitude: location.coords.latitude,
      longitude:location.coords.longitude,
      latitudeDelta:0.0322,
      longitudeDelta:0.0221});
    })();
  }, []);


  return ( 
    <View style={{height:100, flex:1}}>
    {location.latitude != undefined && 
    <MapView
      style={{ flex: 1 }}
      region={location}> 
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

