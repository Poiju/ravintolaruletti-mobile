
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', padding: 30}} > 
        <Image style={{  width:200, height:205, alignItems: 'center',
            justifyContent: 'center', borderRadius: 150}}
            source={{  uri: 'https://cdn.pixabay.com/photo/2017/08/06/04/01/ice-cream-2588541_1280.jpg'}}  />
    <Text style={{padding: 20}}> Hei käyttäjä! </Text>    
    <Text>Tähän suosikit</Text>
    
    </View> 

);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
});

