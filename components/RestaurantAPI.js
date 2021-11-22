import getLocation from './Location';

const TYPE = 'restaurant'
// Google Places API call parameters
const API_KEY = "AIzaSyBACLEeX8UlAUazX0IutzWht6fSW4_0vww"
// Nearby Search
const RADIUS = '1000' // meters
// Photo max width
const PHOTO_WIDTH = '400'

export default async function getRestaurants() {
    try {
      const loc = await getLocation();
      const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + loc.latitude + '%2C' + loc.longitude + '&radius=' + RADIUS + '&type=' + TYPE + '&key=' + API_KEY)
      const result = await response.json()

      if (response.ok) {
        console.log('Number of restaurants fetched: ' + result.results.length)

        // Load photos and filter out restaurants without any
        let restaurants = await filterRestaurantsWithPhotos(result.results)
        console.log(restaurants)
        return restaurants
      } else {
        console.log("RESPONSE NOT OK Couldn't load restaurants: " + result.message)
      }
    } catch (error) {
      console.log("ERROR Couldn't load restaurants: " + error.message)
    }
  }

  const filterRestaurantsWithPhotos = async (data) => {
    //Filter all restaurants from data that have photos
    let filteredRestaurants = data.filter(restaurant => restaurant.photos != undefined)
    //Promise.all called to convert an array of promises to a single promise before awaiting it, so it can be awaited in the first place
    let restaurantPhotos = await Promise.all(filteredRestaurants.map( (restaurant) => {
      return restaurant.photos = loadPhotos(restaurant.place_id)
      
    }))
    return filteredRestaurants

  }

  const loadPhotos = async (placeId) => {
    try {
      // Google Places API Search (used for fetching restaurants) returns only a single photo.
      // We need to additionally use Place Details to get up to 10 photos per restaurant (API limitation)
      const fields = 'photos'
      const placeDetailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`

      // Fetch photo array
      const response = await fetch(placeDetailUrl)

      if (!response.ok) {
        throw new Error('HTTP ERROR! status: ' + response.status)
      }

      const result = await response.json()
      const photoRefArray = result.result.photos

      // Create new array with direct links to photos
      const photoUrls = photoRefArray.map(photoRef => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${PHOTO_WIDTH}&photo_reference=${photoRef.photo_reference}&key=${API_KEY}`
      })

      return photoUrls
    } catch (error) {
      console.log('ERROR loading photos: ' + error)
    }
  }



