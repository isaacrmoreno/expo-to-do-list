import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUT5ggHFQAITm8HoOVJkecfNobPzL3cs0",
  authDomain: "expo-task-list.firebaseapp.com",
  projectId: "expo-task-list",
  storageBucket: "expo-task-list.appspot.com",
  messagingSenderId: "583160570566",
  appId: "1:583160570566:web:352936f5a163ef979a2dc7"
};

// Initialize Firebase app
initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'users');

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);
    let books = []
    snapshot.docs.forEach((doc) => {
    books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
    .catch(err => {
      console.log(err.message)
    })
  })