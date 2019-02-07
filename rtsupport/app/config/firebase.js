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
firebase.firestore()

window.addEventListener('load', function() {
    document.getElementById('sign-out').onclick = function() {
        firebase.auth().signOut();
    };
    // [START UIconfig_variable]
    // FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: 'https://metafries.com'
    };
    // [END UIconfig_variable]
    // [START auth_request]
    firebase.auth().onAuthStateChanged(
    function (user) {
        if (user) {
            // User is signed in.
            document.getElementById('sign-out').hidden = false;
            document.getElementById('post-form').hidden = false;
            document.getElementById('account-details').textContent =
                'Signed in as ' + user.displayName + ' (' + user.email + ')';
            user.getIdToken().then(function (accessToken) {
                // Add the token to the post form. The user info will be extracted
                // from the token by the server.
                document.getElementById('token').value = accessToken;
            });
        } else {
            // User is signed out.
            // Initialize the FirebaseUI Widget using Firebase.
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            // Show the Firebase login button.
            ui.start('#firebaseui-auth-container', uiConfig);
            // Update the login state indicators.
            document.getElementById('sign-out').hidden = true;
            document.getElementById('post-form').hidden = true;
            document.getElementById('account-details').textContent = '';
        }
    },  
    function (error) {
        console.log(error);
        alert('Unable to log in: ' + error)
    });
    // [END auth_request]
});

export default firebase