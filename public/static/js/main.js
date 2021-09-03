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

const db = firebase.firestore();



firebase.auth().onAuthStateChanged(function(user) {
    var notloggedin = document.getElementById('notLogin');
    var loggedin = document.getElementById('logged-in');
  if (user) {
  } else {
    // No user is signed in.
    window.location.replace("index.html");
  }
});

const memoList = document.querySelector('#memo');
const form = document.querySelector('#form-wrapper')
// create element and render data
function renderMemo(doc){
  let li = document.createElement('li');
  let title = document.createElement('span');
  let date = document.createElement('span');
  let info = document.createElement('span');
  let cross = document.createElement('div');

  if(doc.data().uid == firebase.auth().currentUser.uid){
    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    //Set timestamp to date before showing
    date.textContent = new Date(doc.data().date.toDate()).toDateString();
    info.textContent = doc.data().info;
    info.style.overflow= 'visible'
    cross.textContent = 'x';
    cross.style.color = 'red';
    li.appendChild(title);
    li.appendChild(date);
    li.appendChild(info);
    li.appendChild(cross);
    memoList.appendChild(li);
  }

  //deleting data
  cross.addEventListener('click', (e)=>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection("memos").doc(id).delete();
  })
}

//real-time listener
db.collection("memos").onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    if(change.type == 'added'){
      renderMemo(change.doc);
    } else if(change.type == 'removed'){
      let li = memoList.querySelector('[data-id=' + change.doc.id + ']');
      memoList.removeChild(li);
    }
  })
})

//Add Memo
function addMemo(){
    let addMemoView = document.getElementById('add-memo');
    let mainView = document.getElementById('main');
    addMemoView.removeAttribute("hidden");
    mainView.hidden = true;
}

//Checking before submit new memo
form.addEventListener('submit', (e) =>{
  e.preventDefault();

  if(form.title.value != '' && form.info.value != ''){

    let addMemoView = document.getElementById('add-memo');
    let mainView = document.getElementById('main');
    let todayDate = new Date();

    db.collection("memos").add({
      uid: firebase.auth().currentUser.uid,
      title: form.title.value,
      info: form.info.value,
      date: todayDate,
    }).then(() => {
      // document.getElementById('formInfo').value;
      mainView.removeAttribute("hidden");
      addMemoView.hidden = true;
    })
    .catch((error) => {
      window.alert("Error writing document:s ", error.message);
    });
  }
  else{
      document.getElementById("formTitle").classList.add('animate__animated', 'animate__shakeX');
      document.getElementById("formInfo").classList.add('animate__animated', 'animate__shakeX');
  }

})


//Clear text memo
function clearValue(){
  let title = document.getElementById('formTitle');
  let info = document.getElementById('formInfo');
  title.value = '';
  info.value = '';
}

function refreshPage(){
  window.location.reload();
}

// function logout(){
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });
// }

$('#logout').on('click', function () {

  var isConfirmed = confirm('Are you sure you want to logout?',
      buttons= {
          confirm: function () {
              // $.alert('Confirmed!');
             return true;
          },
          cancel: function () {
              // $.alert('Canceled!');
              return false;
          },
      });

  if(isConfirmed == true){
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

});