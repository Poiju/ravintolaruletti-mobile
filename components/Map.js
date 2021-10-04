import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location'; 
import MapView, { Marker } from 'react-native-maps';  

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null); 
  

  useEffect(() => {
    (async () => {
     
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  
  return ( 
    <View style={{height:100, flex:1}}>
    <MapView
      style={{ flex: 1 }}
      region={location}> 
      </MapView>
      
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

