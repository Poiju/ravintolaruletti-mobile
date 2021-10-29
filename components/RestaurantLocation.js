import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, Button, Alert } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';  
import * as Location from 'expo-location';


export default function RestaurantLocation( {route, navigation} ) { 


const { info } = route.params;
console.log(info.name); 
console.log(info.geometry.location.lat);
console.log(info.geometry.location.lng);

const loc = {
  latitude: info.geometry.location.lat, 
  longitude: info.geometry.location.lng,
  latitudeDelta:0.0322,
  longitudeDelta:0.0221, 
  };  

const marker = {
  latitude: loc.latitude, 
  longitude: loc.longitude,
}    




  return ( 
    <View style={{height:100, flex:1}}>
    <MapView
      style={{ flex: 5 }}
      region={loc}> 
      <Marker coordinate={marker}>
        <View style={styles.circle}> 
          <Text>{info.name}</Text>
        </View>
      </Marker>
    </MapView>
      <Button title='Takaisin' onPress={() => navigation.navigate('HomeScreen')}></Button>
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
