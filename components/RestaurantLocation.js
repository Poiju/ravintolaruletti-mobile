import React, { useEffect, useState } from 'react'; 
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';  
import * as Location from 'expo-location';


export default function RestaurantLocation( {route} ) { 

const { location } = route.params;

const [region, setRegion] = useState({
  latitude: location.lat, 
  longitude: location.lon,
  latitudeDelta:0.0322,
  longitudeDelta:0.0221,
  });  

const marker = {
  latitude: region.latitude, 
  longitude: region.longitude 
} 

  return ( 
    <View style={{height:100, flex:1}}>
    <MapView
      style={{ flex: 1 }}
      region={region}> 
      <Marker
        coordinate={marker}
          title='dummy'/>
      </MapView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
