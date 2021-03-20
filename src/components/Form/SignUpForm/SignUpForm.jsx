import React, { useState } from "react";
import NavBar from "../../Navbar/NavBar";
import googleIcon from "../../../images/socialIcon/googleIcon.png";
import fbIcon from "../../../images/socialIcon/fbIcon.png";
import firebase from "firebase/app";
import "firebase/auth";
import "./SignUpForm.css";

function SignUpForm() {
  const [user,setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success:false
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSignUp = (e) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        const {displayName,email} = result.user;
      //   const signedInUser = {name:displayName,email}
      //   const signedInUser = {
      //     isSignedIn:true,
      //     name:displayName,
      //     email:email,
      //     photo:photoURL,
      //   }
      // setUser(signedInUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode,errorMessage,email,credential);
      });
  };
  const handleFbSignIn = (e) => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode,errorMessage,email,credential);
      });
  };
  const handleBlur = (e) =>{
    let isFieldValid;
     if(e.target.name === 'email'){
       isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
     }
     if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid=isPasswordValid && passwordHasNumber;
     }
     if(isFieldValid){
       //  [...cart,newItem]
       const newUserInfo = {...user};
       newUserInfo[e.target.name] = e.target.value;
       setUser(newUserInfo);
     }
   }
   const handleSubmit = (e) =>{
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
    })
    .catch((error) => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);

    });
    if(user.name && user.password){
      console.log('submitting');
       }
       e.preventDefault();
      }
  return (
    <>
      <NavBar />
      <div className="signUpArea">
        <form onSubmit={handleSubmit}>
          <h3>Create an account</h3>
          <input className="input" onBlur={handleBlur} type="text" name="name" placeholder="Name" />
          <input
            className="input"
            type="text"
            placeholder="Username or Email"
          />
          <input
            className="input"
            type="password"
            onBlur={handleBlur}
            name="password"
            id=""
            placeholder="password"
          />
          <input
            name="confirmPassword"
            className="input"
            type="password"
            placeholder="Confirm Password"
          />

          <input
            className="signUpBtn"
            type="submit"
            value="Create an account"
          />
          <p>Already have an Account?</p>
          <a href="#">Log In</a>
        </form>
        {user.success && <p style={{color:'green'}}>User created successfully</p>}
        <div className="googleFbLogIn">
          <div className="divider">
            <div className="lsHr"></div>
            <p>Or</p>
            <div className="rsHr"></div>
          </div>
          <div className="googleLogIn">
            <img onClick={handleGoogleSignUp} src={googleIcon} alt="" />
            <span>Continue with google</span>
          </div>
          <div className="fbLogIn">
            <img onClick={handleFbSignIn} src={fbIcon} alt="" />
            <span>Continue with Facebook</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
