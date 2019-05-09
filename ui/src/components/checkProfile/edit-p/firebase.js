import firebase from 'firebase/app';
import 'firebase/storage';


var config = {
    apiKey: "AIzaSyD1cKXNWA2cJYWj0cEJxujGjWQZzNKkV5w",
    authDomain: "uploadimage-65506.firebaseapp.com",
    databaseURL: "https://uploadimage-65506.firebaseio.com",
    projectId: "uploadimage-65506",
    storageBucket: "uploadimage-65506.appspot.com",
    messagingSenderId: "936202179270"
  };

  firebase.initializeApp(config);




  export default firebase;
