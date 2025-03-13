import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAiLrXUe1QVvtowLvy8A5esCShWpaUvqM4",
    authDomain: "haykalfs2005.firebaseapp.com",
    projectId: "haykalfs2005",
    storageBucket: "haykalfs2005.appspot.com",
    messagingSenderId: "794208445982",
    appId: "1:794208445982:web:67584fa93d8dce8e9df00f",
    measurementId: "G-FC128Q5501"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
            } else {
                console.log("No document found matching id");
            }
        })
        .catch((error) => {
            console.log("Error getting document", error);
        });
    } else {
        console.log("User ID not found in local storage");
    }
});

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        localStorage.removeItem('loggedInUserId');
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error signing out:', error);
    });
});