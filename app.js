// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyD0JY9LKKzUbOlCqyHmqqgmHYr4acYZPok",
  authDomain: "project2-90f0d.firebaseapp.com",
  databaseURL: "https://project2-90f0d.firebaseio.com",
  projectId: "project2-90f0d",
  storageBucket: "project2-90f0d.appspot.com",
  messagingSenderId: "1016745152054",
  appId: "1:1016745152054:web:9ea121911036aff7df5297"
};

firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();

function signup() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var promise = auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  );
  promise.catch(e => alert(e.message));
  alert("Signed Up");
}

// Initialize Firebase

function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  var promise = auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  );
  promise.catch(e => alert(e.message));

  alert("Signed Up");
}

function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
}

function signOut() {
  auth.signOut();
  alert("Signed Out");
}

auth.onAuthStateChanged(function(user) {
  if (user) {
    var email = user.email;
    alert("Active User " + email);

    //Take user to a different or home page

    //is signed in
  } else {
    alert("No Active User");
    //no user is signed in
  }
});
