console.log("HELLO THERE!!!!!!!!!!")
import { initializeApp } from "firebase/app"
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, onSnapshot,
    query, where, orderBy, serverTimestamp,
    getDoc, updateDoc,
} from "firebase/firestore"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyDtOHlqdiXTcLRIyeDwkbyfBApz0M2Qsiw",
    authDomain: "fb9-dojo-cd7df.firebaseapp.com",
    projectId: "fb9-dojo-cd7df",
    storageBucket: "fb9-dojo-cd7df.appspot.com",
    messagingSenderId: "31163537102",
    appId: "1:31163537102:web:e9106646513356a811629f"
};

//inifre firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()

//collection ref
const colRef = collection(db, 'books')

//queries
const q = query(colRef, where("author", "==", "George Orwell"), orderBy("title", "desc"))

//real time collection data
// getDocs(colRef)
//     .then((snapshot) => {
//         let books = []
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(books)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})


//adding documents
const addBookForm = document.querySelector(".add")
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addBookForm.reset()
        })
})

//delecting documents
const deleteBookForm = document.querySelector(".delete")
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const docRef = doc(db, "books", deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})

//get a single document
const docRef = doc(db, "books", "kknXY5uw6ySyxg3tjEm8")
getDoc(docRef)
    .then((doc) => {
        console.log(doc.data(), doc.id)
    })

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})


//updating a document
const updateForm = document.querySelector(".update")
updateForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const docRef = doc(db, "books", updateForm.id.value)

    updateDoc(docRef, {
        title: "updated title"
    })
        .then(() => {
            updateForm.reset
        })
})


//signing users up
const signupForm = document.querySelector(".signup")
signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log("user created: ", cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})
