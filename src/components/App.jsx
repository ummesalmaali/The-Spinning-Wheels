import React, { createContext, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import NavBar from './Navbar/NavBar'
import './App.css'
import Home from './Home/Home'
import SignInForm from './Form/SignInForm/SignInForm'
import SignUpForm from './Form/SignUpForm/SignUpForm'
import firebaseConfig from '../firebase.cofig'
import firebase from 'firebase/app'
import Destination from './Destination';
import Ride from './Ride';
import Contact from './Contact';
import PrivateRoute from './PrivateRoute';
import Blog from './Blog';
export const UserContext = createContext()
if(firebase.apps.length ===0){
    firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
    return (
    
     <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
       <Router>
           <Switch>
               <Route path="/home">
                 <Home></Home>
               </Route>
               <PrivateRoute path='/destination'>
                  <Destination/>
               </PrivateRoute>
               <Route path='/ride'>
                  <Ride/>
               </Route>
               <Route path="/signInForm">
                  <SignInForm></SignInForm>
               </Route>
                  <Route path="/signUpForm">
                  <SignUpForm/>
                  </Route>
                  <Route path='/blog'>
                    <Blog/>
                  </Route>
                  <Route path='/contact'>
                     <Contact/>
                  </Route>
                  <PrivateRoute path='ride/:rideType'>
                     <Destination/>
                  </PrivateRoute>
                    <Route exact path='/'>
                     <Home/>
                    </Route>
                    <Route path ='*' render={()=>(
                      <h1 className='text-center my-4'>404 ERROR...!!! The page is not found</h1>
                     )}>

                    </Route>
           </Switch>
       </Router>
       </UserContext.Provider>
    )
}
