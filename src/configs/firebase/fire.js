import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAGEOlSJ_viYtTwTvgEYmLgjrqBuAkibZQ',
  authDomain: 'verb-a4864.firebaseapp.com',
  databaseURL: 'https://verb-a4864.firebaseio.com',
  projectId: 'verb-a4864',
  storageBucket: 'verb-a4864.appspot.com',
  messagingSenderId: '873522180447',
  appId: '1:873522180447:web:726d4c99c7066d366d06ea',
  measurementId: 'G-9YQBF78CBZ'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export default auth
