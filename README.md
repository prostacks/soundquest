# SoundQuest

Music Recognition App built with React

<img src="https://www.prostacks.io/imgs/soundquest-screenshot.png" alt="SoundQuest Screenshot" width="400"/>

[Hosted Demo](https://soundquest.herokuapp.com)

### Overview

SoundQuest is a music recognition app built with React JS. The app is similar to [Shazam](https://www.shazam.com/). You can play an actual song or hum a melody and the app will return the song information as well as various media links. There is also basic search capabilities for finding lyrics or song info if you prefer to demo the app in a quiet setting. The app utilizes two separate APIs for fetching data. The AudD API is used for the grunt work for all request while the LastFM API is used for finding additional cover art. Node.JS is used on the backend for a simple solution to store the API Keys. Used Heroku to deploy application.

### Technologies Used

- React
- Bootstrap
- SASS
- Node JS
- Express

### Challenges

This app brought on a myriad of challenges especially post-deployment. The biggest problem was handling browser compatibility issues for both `MediaDevices.getUserMedia()` and `MediaRecorder` methods on mobile devices. Those methods handle the core functionality of the app, and depending on the browser and operating system (iOS, Android), the app may not work at first. I was not able to catch the issues during development. Because `MediaDevices.getUserMedia()` methods are not allowed on mobile browsers without a secure HTTPS connection.

### Solution

I created conditional statements for validation to determine the user's browser and device. That way if the user is using an iOS device, they get an alert to use the safari browser & instructions to enable `MediaRecorder` via their device settings.

### Key Features

- Error Handling for iOS Devices
- CSS/JS animations during recording, loading & success for UX
- External media links for search results (Apple Music, Spotify, YouTube etc.)
- Lyrics Search (Quest Mode) - available for quiet demo
- React Hooks `useState()`
- Custom Routes w/ReactRouter
