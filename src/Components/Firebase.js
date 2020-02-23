import app from "firebase/app";
import "firebase/auth";

const config ={
    
        apiKey: "AIzaSyBXcpWdQLmx769RiYXbZMTfV2wDbkYhJdc",
        authDomain: "tp2melon-42643.firebaseapp.com",
        databaseURL: "https://tp2melon-42643.firebaseio.com",
        projectId: "tp2melon-42643",
        storageBucket: "tp2melon-42643.appspot.com",
        messagingSenderId: "489902092238",
        appId: "1:489902092238:web:2b58c0947678b9b53d459f",
        measurementId: "G-2J01KFMVG7"
     
};
 class Firebase{
     constructor(){
         app.initializeApp(config);

         this.auth=app.auth();
     }
     doCreateUserWithEmailAndPassword = (email, password) =>
     this.auth.createUserWithEmailAndPassword(email, password);

     doSignInWithEmailAndPassword=(email, password) => 
     this.auth.signInWithEmailAndPassword(email, password);

     doSignOut=()=> this.auth.signOut();

     doPasswordReset= email=> this.auth.sendPasswordResetEmail(email);

     doPasswordUpdate=password=> this.auth.currentUser.updatePassword(password);
 }
export default Firebase;