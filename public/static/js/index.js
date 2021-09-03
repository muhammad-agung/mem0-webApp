var firebaseConfig = {
  apiKey: "AIzaSyA_V4AyMV4KmZOZ7fQbyGau9vKl_kVxcwk",
  authDomain: "mem0-9b3b2.firebaseapp.com",
  projectId: "mem0-9b3b2",
  storageBucket: "mem0-9b3b2.appspot.com",
  messagingSenderId: "235350236158",
  appId: "1:235350236158:web:380db4dd8ac50f7c4b7eaf",
  measurementId: "G-5ZEQ6E6GT7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function(user) {
    var notloggedin = document.getElementById('notLogin')
    var loggedin = document.getElementById('logged-in')
  if (user) {
    // User is signed in.
    // loggedin.style.display = 'block'
    // notloggedin.style.display = 'none'
    window.location.replace("main.html");
  } else {
    // No user is signed in.
    // window.location.replace("index.html");
  }
});

function login(event){

  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('PasswordInput').value;
  event.preventDefault()
  firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
  // Signed in
  var user = userCredential.user;
  // ...
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  if(email != '' && password != ''){
    // window.alert(errorMessage)
    document.getElementById("errorOutput").innerHTML = errorMessage;
    document.getElementById("emailInput").classList.add('animate__animated', 'animate__shakeX');
    document.getElementById("PasswordInput").classList.add('animate__animated', 'animate__shakeX');
  }
  else{
    document.getElementById("emailInput").classList.add('animate__animated', 'animate__shakeX');
    document.getElementById("PasswordInput").classList.add('animate__animated', 'animate__shakeX');
  }

}).then(function(user){
    if(user){
        alert("welcome back logged in")
    }
})
}

function logout(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}