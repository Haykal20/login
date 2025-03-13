import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithPopup, 
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up with Email and Password
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            console.error("Error writing document", error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
            showMessage('Email Address Already Exists!', 'signUpMessage');
        } else {
            showMessage('Unable to Create User', 'signUpMessage');
        }
    });
});

// Sign In with Email and Password
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Login Successful', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Incorrect Email or Password', 'signInMessage');
        } else {
            showMessage('Account Does Not Exist', 'signInMessage');
        }
    });
});

// Recover Password
const recoverPassword = document.getElementById('recoverPassword');
recoverPassword.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;

    if (email) {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage('Password reset email sent!', 'signInMessage');
        })
        .catch((error) => {
            showMessage('Error sending password reset email.', 'signInMessage');
        });
    } else {
        showMessage('Please enter your email address.', 'signInMessage');
    }
});

// Sign In with Google
const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        const user = result.user;
        const userData = {
            email: user.email,
            firstName: user.displayName.split(' ')[0],
            lastName: user.displayName.split(' ')[1] || ''
        };
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                showMessage('Account already exists!', 'signInMessage');
            } else {
                setDoc(docRef, userData)
                .then(() => {
                    localStorage.setItem('loggedInUserId', user.uid);
                    window.location.href = 'homepage.html';
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
            }
        });
    })
    .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
            showMessage('Account already exists with a different provider!', 'signInMessage');
        } else {
            showMessage('Error signing in with Google', 'signInMessage');
        }
    });
};

// Sign In with Facebook
const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then((result) => {
        const user = result.user;
        const userData = {
            email: user.email,
            firstName: user.displayName.split(' ')[0],
            lastName: user.displayName.split(' ')[1] || ''
        };
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                showMessage('Account already exists!', 'signInMessage');
            } else {
                setDoc(docRef, userData)
                .then(() => {
                    localStorage.setItem('loggedInUserId', user.uid);
                    window.location.href = 'homepage.html';
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
            }
        });
    })
    .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
            showMessage('Account already exists with a different provider!', 'signInMessage');
        } else {
            showMessage('Error signing in with Facebook', 'signInMessage');
        }
    });
};

// Attach Google and Facebook Sign In
document.getElementById('googleSignIn').addEventListener('click', handleGoogleSignIn);
document.getElementById('googleSignUp').addEventListener('click', handleGoogleSignIn);
document.getElementById('facebookSignIn').addEventListener('click', handleFacebookSignIn);
document.getElementById('facebookSignUp').addEventListener('click', handleFacebookSignIn);