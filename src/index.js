import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import Firebase, {FirebaseContext} from "./Components/FirebaseIndex.js"


ReactDOM.render(<FirebaseContext.Provider value= {new Firebase()}>
    <App /> 
    </FirebaseContext.Provider>, 
    document.getElementById('root'));

