import app from 'firebase/app';
import 'firebase/auth';


const config ={
    apiKey: "AIzaSyCWMYvcm4uglBRdkJ2qL71NdBicfgu5_yo",
    authDomain: "tp2melon.firebaseapp.com",
    databaseURL: "https://tp2melon.firebaseio.com",
    projectId: "tp2melon",
    storageBucket: "tp2melon.appspot.com",
    messagingSenderId: "514075923278",

}
class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        }
        doCreateUserWithEmailAndPassword = (email, password) =>
            this.auth.createUserWithEmailAndPassword(email, password);
        doSignInWithEmailAndPassword = (email, password) =>
            this.auth.signInWithEmailAndPassword(email, password);
        doSignOut = () => this.auth.signOut();
        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
        doPasswordUpdate = password =>
            this.auth.currentUser.updatePassword(password);
        }
      
  export default Firebase;