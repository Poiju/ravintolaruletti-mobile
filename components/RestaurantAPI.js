import getLocation from './Location';

const TYPE = 'restaurant'
// Google Places API call parameters
const API_KEY = ""
// Photo max width
const PHOTO_WIDTH = '400'
//Rank by which order
const RANKBY = 'distance'
//Next page token
let nextPageToken = false

export default async function getRestaurants(nextPage = nextPageToken) {
  try {
    const loc = await getLocation();
    const api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc.latitude}%2C${loc.longitude}&rankby=${RANKBY}&type=${TYPE}&key=${API_KEY}`
    //Fetch with or without nextpagetoken
    let response = (!nextPage) ? await fetch(api_url) : await fetch(api_url+'&pagetoken=' + nextPage)
    
    const result = await response.json()
    
    if (response.ok) {
      console.log('Number of restaurants fetched: ' + result.results.length)

      // Load photos and filter out restaurants without any
      nextPageToken = result.next_page_token
      let restaurants = await filterRestaurantsWithPhotos(result.results)
      return restaurants
    } else {
      console.log("RESPONSE NOT OK Couldn't load restaurants: " + result.message)
    }
  } catch (error) {
    console.log("ERROR Couldn't load restaurants: " + error.message)
  }

}

//console.log(api_url)

const filterRestaurantsWithPhotos = async (data) => {
  //Filter all restaurants from data that have photos
  let filteredRestaurants = data.filter(restaurant => restaurant.photos != undefined)
  //Promise.all called to convert an array of promises to a single promise before awaiting it, so it can be awaited in the first place
  let restaurantPhotos = await Promise.all(filteredRestaurants.map((restaurant) => {
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



