import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCl-8O175OZOJhePlCnFG241AeCnG3Ug8E",
    authDomain: "metafries-fs.firebaseapp.com",
    databaseURL: "https://metafries-fs.firebaseio.com",
    projectId: "metafries-fs",
    storageBucket: "metafries-fs.appspot.com",
    messagingSenderId: "972770329508"
};
firebase.initializeApp(config);

export default firebase