import getLocation from './Location';
import config from '../config';

const TYPE = 'restaurant'
// Google Places API call parameters
const API_KEY = config.API_KEY;
// Photo max width
const PHOTO_WIDTH = '400'
//Rank by which order
const RANKBY = 'distance'
//current/previous and next page token array
let pageTokens = ['', '']
//Do we want to fetch current or next page
let isNextPage = false


export default async function getRestaurants() {
  try {
    const loc = await getLocation();
    const api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc.latitude}%2C${loc.longitude}&rankby=${RANKBY}&type=${TYPE}&key=${API_KEY}`
    //Fetch with next or previous pagetoken, if pagetoken parameter is empty it fetches first page always, so no need to check for it
    let response = (!isNextPage) ? await fetch(api_url + '&pagetoken=' + pageTokens[0]) : await fetch(api_url + '&pagetoken=' + pageTokens[1])
    const result = await response.json()
    console.log(api_url)
    if (response.ok) {
      console.log('Number of restaurants fetched: ' + result.results.length)


      //Set token of current/previous and next page
      pageTokens[0] = (isNextPage) ? pageTokens[1] : pageTokens[0]
      pageTokens[1] = result.next_page_token
      // Load photos and filter out restaurants without any
      let restaurants = await getFilteredRestaurantsWithPhotos(result.results)
      setNextPage(false)
      return restaurants

    } else {
      console.log("RESPONSE NOT OK Couldn't load restaurants: " + result.message)
    }
  } catch (error) {
    console.log("ERROR Couldn't load restaurants: " + error.message)
  }

}

export const setNextPage = (bool) => {
  isNextPage = bool
}
//console.log(api_url)

const getFilteredRestaurantsWithPhotos = async (data) => {
  //Filter all restaurants from data that have photos
  let filteredRestaurants = data.filter(restaurant => restaurant.photos != undefined)
  //Promise.all called to convert an array of promises to a single promise before awaiting it, so it can be awaited in the first place
  let restaurantPhotos = await Promise.all(filteredRestaurants.map((restaurant) => {
    return restaurant.photos = loadPhotos(restaurant.place_id)

  }))
  //Map only used data
  let filterUnused = filteredRestaurants.map((restaurant) => {
    return {
      location: restaurant.geometry.location,
      name: restaurant.name,
      rating: restaurant.rating,
      vicinity: restaurant.vicinity,
      photos: restaurant.photos._W
    }
  })

  return filterUnused

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



