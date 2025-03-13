import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Konfigurasi Firebase dari environment variables
const _0x3542e2=_0x5467;(function(_0x5840a4,_0x22b4c2){const _0x5b84ac=_0x5467,_0x52bdd3=_0x5840a4();while(!![]){try{const _0x108078=-parseInt(_0x5b84ac(0x1ff))/0x1*(-parseInt(_0x5b84ac(0x1f6))/0x2)+-parseInt(_0x5b84ac(0x1fd))/0x3*(-parseInt(_0x5b84ac(0x1f4))/0x4)+parseInt(_0x5b84ac(0x1fe))/0x5+-parseInt(_0x5b84ac(0x202))/0x6*(-parseInt(_0x5b84ac(0x1f9))/0x7)+parseInt(_0x5b84ac(0x203))/0x8*(parseInt(_0x5b84ac(0x201))/0x9)+-parseInt(_0x5b84ac(0x1fc))/0xa*(-parseInt(_0x5b84ac(0x1fa))/0xb)+-parseInt(_0x5b84ac(0x1f7))/0xc*(parseInt(_0x5b84ac(0x1f8))/0xd);if(_0x108078===_0x22b4c2)break;else _0x52bdd3['push'](_0x52bdd3['shift']());}catch(_0x5a39b5){_0x52bdd3['push'](_0x52bdd3['shift']());}}}(_0x19ca,0xdfbe7));function _0x5467(_0x33254f,_0x3fc220){const _0x19ca76=_0x19ca();return _0x5467=function(_0x5467b7,_0x383e2e){_0x5467b7=_0x5467b7-0x1f3;let _0x39717a=_0x19ca76[_0x5467b7];return _0x39717a;},_0x5467(_0x33254f,_0x3fc220);}function _0x19ca(){const _0x10e165=['794208445982','22cfgkuD','36487020jAbhii','13VKooFO','35xXXrxT','3099041BwUSoN','AIzaSyAiLrXUe1QVvtowLvy8A5esCShWpaUvqM4','10EDUWiA','3wByDnQ','1294890FWsZcq','14021pwlift','haykalfs2005.firebasestorage.app','99wsqKLW','1559274OKfvrP','428560JQILEk','1:794208445982:web:67584fa93d8dce8e9df00f','haykalfs2005','5493740zQBKls'];_0x19ca=function(){return _0x10e165;};return _0x19ca();}const firebaseConfig={'apiKey':_0x3542e2(0x1fb),'authDomain':'haykalfs2005.firebaseapp.com','projectId':_0x3542e2(0x1f3),'storageBucket':_0x3542e2(0x200),'messagingSenderId':_0x3542e2(0x1f5),'appId':_0x3542e2(0x204),'measurementId':'G-FC128Q5501'};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Fungsi dan kode lainnya tetap sama...

 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })