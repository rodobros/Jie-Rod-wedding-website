var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDr98J7XvwnYY0X_cOCmPCpPJPFtrkO-Bs",
    authDomain: "rodandjie.firebaseapp.com",
    databaseURL: "https://rodandjie.firebaseio.com",
    projectId: "rodandjie",
    storageBucket: "rodandjie.appspot.com",
    messagingSenderId: "624590485081"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

