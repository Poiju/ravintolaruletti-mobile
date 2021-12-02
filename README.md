# Softwareproject II: Ravintolaruletti<p align="right"> <a href="https://github.com/Poiju/ravintolaruletti-backend" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-original.svg" alt="django" width="40" height="40"/> </a> <a href="https://github.com/Poiju" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/github/github-icon.svg" alt="github" width="40" height="40"/> </a> <a href="https://ruletti.herokuapp.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://github.com/Poiju/ravintolaruletti-mobile" target="_blank" rel="noreferrer"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/> </a> </p>


Team: Risto Lähteenkorva, Maisa Mäntyvaara, Krista Nyberg, Tomi Salo, Tuomas Valkamo

## Project in a nutshell:

* Project assignment for Ohjelmistoprojekti II (Software Project II) class, Business Information Technology degree programme at Haaga-Helia University of Applied Sciences
* Assignment was to design and develop a software solution of the team's choice that uses open data
* Utilizing agile methods and version control was in important role as part of team work

## Ravintolaruletti:

* A mobile app that helps the user find nearby restaurants quickly and examine results by swiping on the screen
* Restaurant information and images are retrieved from the Google Places API
* Mobile app repository [here](https://github.com/Poiju/ravintolaruletti-mobile)
* ~~Backend repository [here](https://github.com/Poiju/ravintolaruletti-backend)~~

## User stories:

* US1: "As an information seeker, I want to be able to browse restaurants by swiping."
* US2: "As a busy lunch customer, I want to see nearby restaurants on the app and swipe them so I can find some interesting places to eat."
* US3: "As a busy lunch customer, I want to find a restaurant near me effortlessly and quickly."
* US4: "As a follower of trends, I want to choose the best looking restaurant to get great pictures on Instagram."
* (US5: "As a foodie, I want to be able to make my own user profile for the app."
* US6: "As a foodie, I also want to be able to bookmark my favourite restaurants.") Move these two into issues/further development ideas!

## Technologies & libraries:

* JavaScript framework for mobile app development: [React Native](https://reactnative.dev/)
* Framework & platform for universal React apps: [Expo](https://expo.dev/)
* [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) (free trial used for initial production)
* ~* Python / Django for backend something something, remove?~
* User location: [expo-location](https://docs.expo.dev/versions/latest/sdk/location/)
* User interface navigation: [React Navigation](https://reactnavigation.org/)
* Map component: [react-native-maps] (https://www.npmjs.com/package/react-native-maps)
* User interface "cards": [react-native-snap-carousel](https://www.npmjs.com/package/react-native-snap-carousel)
* Swiping feature: [react-native-swiper](https://github.com/leecade/react-native-swiper)
* Some visual user interface components from: [React Native Paper](https://callstack.github.io/react-native-paper/)

## Key functions

| Function | Component | Description |
| --- | --- | --- |
| `function1` | RestaurantAPI.js | What it does |
| `function2` | RestaurantAPI.js | What it does |
| `function3` | RestaurantAPI.js | What it does |

## User interface pictures

User interface wireframe [here](http://wireframepro.mockflow.com/space/M0J2CZJDJmb)
+ **would we need actual screenshots here?**

## Installation instructions for development

1. [Install node.js](https://nodejs.org/en/download/)  
2. [Install git](https://git-scm.com)  
3. [Install Expo Go](https://expo.dev/client) on your mobile device
4. Run the following lines in your CLI, or the built-in terminal of your code editor:  **(reconstruct this part with markdown code blocks for clarity?)**
* git clone https://github.com/Poiju/ravintolaruletti-mobile.git  
* cd ravintolaruletti-mobile  
* (install api key[under construction])  
* npm install  
* npm install –g expo-cli  
* expo start  

A browser instance with a QR code will launch on your PC. Scan the QR code with Expo Go to view the app on your phone. In order for things to run as smoothly as possible, make sure your phone and your PC are on the same local network!
