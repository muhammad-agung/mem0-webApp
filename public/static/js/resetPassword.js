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


function resetPassword(){

  var email = document.getElementById('emailInput').value;

  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    document.getElementById("errorOutput").innerHTML = "Password reset email sent!";
    document.getElementById("errorOutput").style.color = '#32CD32';

  })
  .catch((error) => {
    var errorMessage = error.message;
    document.getElementById("errorOutput").innerHTML = errorMessage;
    document.getElementById("emailInput").classList.add('animate__animated', 'animate__shakeX');
    document.getElementById("errorOutput").style.color = '#FF4B2B';
  });
}
