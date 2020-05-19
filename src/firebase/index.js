import firebase from 'firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyB8XYnTDf--MQqX27g0ijxHZeJ5VxEOURM',
  authDomain: 'chatbox-codec.firebaseapp.com',
  databaseURL: 'https://chatbox-codec.firebaseio.com',
  projectId: 'chatbox-codec',
  storageBucket: 'chatbox-codec.appspot.com',
  messagingSenderId: '507474973589',
  appId: '1:507474973589:web:43e1dffd483eae0d541c9c'
}
// Initialize Firebase
const fireApp = firebase.initializeApp(firebaseConfig)

export default fireApp.firestore()
