import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, Button, Alert } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';  
import * as Location from 'expo-location';


export default function RestaurantLocation( {route} ) { 


const { info } = route.params;
console.log(info.name.fi); 

const loc = {
  latitude: info.location.lat, 
  longitude: info.location.lon,
  latitudeDelta:0.0322,
  longitudeDelta:0.0221, 
  name: info.name.fi,
  description: info.description.body
  };  

const marker = {
  latitude: loc.latitude, 
  longitude: loc.longitude, 
  name: loc.name,
  description: loc.description
}    




  return ( 
    <View style={{height:100, flex:1}}>
    <MapView
      style={{ flex: 5 }}
      region={loc}> 
      <Marker coordinate={marker}>
        <View style={styles.circle}> 
          <Text>{info.name.fi}</Text>
        </View>
      </Marker>
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
  circle: {
    width: 90,
    height: 110,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  pinText: {
    marginBottom: 12,
    width: 30,
    height: 50,
},
});
