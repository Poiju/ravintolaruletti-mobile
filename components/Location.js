import * as Location from 'expo-location'; 
import React, { useState, useEffect } from 'react';

export default async function getLocation() {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude}
    

    return userLocation
}

    