import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as Roles from "../Constants/Roles.js";

const config = {
  apiKey: "AIzaSyATAkgoiS3tjM5IAQBB2BqhZFPwcNOd3o4",
  authDomain: "fir-react-auth-2020.firebaseapp.com",
  databaseURL: "https://fir-react-auth-2020.firebaseio.com",
  projectId: "fir-react-auth-2020",
  storageBucket: "fir-react-auth-2020.appspot.com",
  messagingSenderId: "656112410762",
  appId: "1:656112410762:web:1db26c2448fbe1b7150d73",
  measurementId: "G-2R81RY053S"
};
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            console.log(dbUser);
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // *** App API ***
  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref("messages");
}
export default Firebase;
