<h1 align="center">Ravintolaruletti<p align="center"> <a href="https://github.com/Poiju" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/github/github-icon.svg" alt="github" width="40" height="40"/> </a> <a href="https://ruletti.herokuapp.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://github.com/Poiju/ravintolaruletti-mobile" target="_blank" rel="noreferrer"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/> </a> </p> </h1>


Team: [Risto Lähteenkorva](https://www.linkedin.com/in/r-lahteenkorva) , Maisa Mäntyvaara, [Krista Nyberg](https://www.linkedin.com/in/krista-nyberg-5a7721176/), Tomi Salo, [Tuomas Valkamo](https://www.linkedin.com/in/tuomasvalkamo/)

#
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#project-in-a-nutshell">Project in a nutshell</a></li>
    <li><a href="#ravintolaruletti-restaurant-roulette">Ravintolaruletti (Restaurant Roulette)</a></li>
    <li><a href="#user-interface--functionality">User interface & functionality</a></li>
    <li><a href="#technologies--libraries">Technologies and libraries</a></li>
    <li><a href="#key-functions">Key functions</a></li>
    <li><a href="#process--further-development">Process & further development</a></li>
        <ul>
          <li><a href="#user-stories">User stories</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="#ideas-for-further-development">Ideas for further development</a></li>
        </ul>
    <li><a href="#installation-instructions-for-development">Installation instructions for development</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## Project in a nutshell

* Project assignment for Ohjelmistoprojekti II (Software Project II) class, Business Information Technology degree programme at Haaga-Helia University of Applied Sciences, in autumn of 2021
* The assignment was to design and develop a software solution of the team's choice that uses open data
* In addition to software development, we were also to focus on utilising agile methods and version control in our teamwork
* The project was carried out remotely due to the COVID-19 pandemic situation

## Ravintolaruletti (Restaurant Roulette)

* Concept: A mobile app that helps the user find nearby restaurants quickly and examine results by swiping on the screen
* Restaurant information and images are retrieved from the Google Places API
* App repository [here](https://github.com/Poiju/ravintolaruletti-mobile) on GitHub

## User interface & functionality

This base functionality version of our app consists of these 3 main views (pictured below on iOS, from left to right):

1. **Nearby Restaurants tab (aka Restaurant Card view):** Nearby restaurants come up as swipable cards. The cards can be modified to include all sorts of restaurant data pulled from the API -- our version has the name, street address, and Google rating, as well as all the photos associated with the restaurant on Google Maps. The individual photos within one card can be browsed by swiping up and down on the photo, as indicated by the horizontal dots menu. By default, we have filtered out restaurants with no photos. 
2. **Map tab:** Shows the location of the user as a marker on the map, surrounded by their nearest restaurants. Clicking on a restaurant marker brings up the name of the restaurant (can be modified to include more information). 
3. **Chosen restaurant on map:** Shows the exact location of the chosen restaurant on the map. This view is brought up when the user clicks on "Go to map" on the Restaurant Card. The "Go back" button will take the user back to the respective Restaurant Card.

<p align="center">
<a href="https://imgbb.com/"><img src="https://i.ibb.co/9GsrT8C/kuva1.jpg" alt="kuva1" border="0" width="30%" />&nbsp;</a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/NjdNbgL/kuva2.jpg" alt="kuva1" border="0" width="30%" />&nbsp;</a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/6D9FG3S/kuva3.jpg" alt="kuva1" border="0" width="30%" /></a>
</p>

The early wireframe model used as the starting point for UI design can be found on Mockflow [here](http://wireframepro.mockflow.com/space/M0J2CZJDJmb)

## Technologies & libraries

* [React Native](https://reactnative.dev/), JavaScript framework for mobile app development
* [Expo](https://expo.dev/), framework & platform for universal React apps
* [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) for the restaurant data (free trial used for initial production)
* [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) for hiding the personal API keys on remote
* User location: [expo-location](https://docs.expo.dev/versions/latest/sdk/location/)
* User interface navigation: [React Navigation](https://reactnavigation.org/)
* Map component: [react-native-maps](https://www.npmjs.com/package/react-native-maps)
* Card view for Nearby Restaurants tab: [react-native-snap-carousel](https://www.npmjs.com/package/react-native-snap-carousel)
* Swiping feature: [react-native-swiper](https://github.com/leecade/react-native-swiper)
* Some visual user interface components: [React Native Paper](https://callstack.github.io/react-native-paper/)

## Key functions

| Function name | Component | Description |
| --- | --- | --- |
| `HomeScreen` | HomeScreen.js | The main component function that renders the Nearby Restaurant view with the swipeable carousel of fetched restaurants |
| `setMoreRestaurants` | HomeScreen.js | Fetches more restaurants after the very nearest ones have been swiped through  |
| `getLocation` | Location.js | Resolves user's current location after asking for permission to use device location |
| `Map` | Map.js | The main component function for adding restaurant and user location markers on the map. Android uses Google Maps, iOS uses Apple Maps as the map component |
| `Restaurants` | RestaurantAPI.js | The main component function that fetches nearby restaurants from the API based on user's current location. This is where you specify which parametres you want to call, as well as set your Google API key (required for making the calls) |
| `getFilteredRestaurantsWithPhotos` | RestaurantAPI.js | As one might guess... filters out any fetched restaurants that don't have photos |
| `loadPhotos` | RestaurantAPI.js | Adds a call to Place Details for additional restaurant photos, as the default Google Places API only returns one photo on fetch |
| `RestaurantLocation` | RestaurantLocation.js | The main component function for constructing restaurant markers |

## Process & further development

As often happens, we had to drop and modify features and change directions during the course of the project. The most significant milestones and implemented changes are reported here in this section of the documentation. Since the final product we ended up with is rather bare bones and front end focused, we have also included ideas and features for further development of the app.

### User stories
By the end of the project run, we managed to fulfill the following user stories:

* **User Story 1:** "As an information seeker, I want to be able to browse data by swiping"
* **User Story 2**: "As a busy lunch customer, I want to see restaurants on the app so I can choose a place to eat at."
* **User Story 3**: "As a busy lunch customer, I want to find a well rated restaurant near me effortlessly and quickly."
* **User Story 4**: "As a follower of trends, I want to choose the best looking restaurant to get great pictures on Instagram."

### Roadmap
- [x] brainstormed for product ideas and decided on the final concept
- [x] set up GitHub and project board on KanbanFlow
- [x] started requirement analysis
- [x] sprint 1
  * getting familiar with the chosen technologies
  * initialised documentation
  * initialised Django backend
  * designed UI structure
  * experimenting with Helsinki Open API data
  * first experimentations with navigation, map, card & swiping features
- [x] sprint 2
  * decided to switch from Helsinki Open API to Google Places API for access to restaurant data outside of Helsinki
  * filtered restaurant data, decided on parametres to be used
  * figured out and worked in: user location, restaurant location in relation to user
  * got restaurant data & photos showing on cards
  * reworked user stories due to changed requirements
  * worked on user profile feature on backend
- [x] sprint 3
  * working in asynchronicity
  * added the function to fetch for more restaurants after the initial ones are swiped through
  * decided on multiple photos per restaurant card feature
  * incorporated Place Details for additional photos
  * implemented login & signup pages...
  * ...and then decided to reduce project scope by dropping backend features altogether as time & resources were running out 
- [x] sprint 4
  * cleaning up the code
  * UI styling
  * finalising the documentation

### Ideas for further development
Our original project backlog included two additional user stories, which ended up not making it into the finalised product as they include backend functionalities. 
* **User Story 5:** "As a foodie, I want to be able to make my own user profile on the app."
* **User Story 6:** "As a foodie, I want to be able to save interesting restaurants in my favourites."

We have documented the features associated with these user stories and some other ideas [here](https://github.com/Poiju/ravintolaruletti-mobile/issues) as open issues for the sake of getting to mess with GitHub issues.
 
## Installation instructions for development

1. [Install node.js](https://nodejs.org/en/download/)  
2. [Install git](https://git-scm.com)  
3. [Install Expo Go](https://expo.dev/client) on your mobile device
4. To install the app with all its associated libraries and dependencies, run the following lines in your CLI or the built-in terminal of your code editor:  

`git clone https://github.com/Poiju/ravintolaruletti-mobile.git`

`cd ravintolaruletti-mobile`

`npm install` 

`npm install –g expo-cli`  

`expo start`


After completing these steps, a browser instance with a QR code will launch on your PC. Scan the QR code with Expo Go to view a local instance of the app on your phone. In order for things to run as smoothly as possible, make sure your phone and your PC are on the same local network! **Please also note that you need to sign up for a free trial on the Google Cloud Platform to access your personal API key. Otherwise the restaurant data will not show up on your app instance.** 

## License
<p align="center"><a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.</p>

Feel free to share and adapt to your own purposes, whatever they might be. All we ask is to credit us if you happen to draw any significant inspiration from our work! 