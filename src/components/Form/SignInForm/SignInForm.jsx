import React, { useState } from "react";
import NavBar from "../../Navbar/NavBar";
import googleIcon from "../../../images/socialIcon/googleIcon.png";
import fbIcon from "../../../images/socialIcon/fbIcon.png";
import "./SignInForm.css";
import firebase from "firebase/app";
import "firebase/auth";
import {} from '../../App'
function SignInForm() {
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
      .auth().signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        const {displayName,photoURL,email} = result.user;
        const signedInUser = {
          isSignedIn:true,
          name:displayName,
          email:email,
          photo:photoURL,
        }
      setUser(signedInUser);
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
        const user = result.user;
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
      <NavBar></NavBar>
      <div className="signInArea">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <input
            name="email"
            className="email"
            type="Email"
            onBlur={handleBlur}
            placeholder="Write your Email address" required
          />
          <input
            name="password" required
            className="password"
            type="password"
            onBlur={handleBlur}
            placeholder="Your Password"
          />
          <div className="recoverArea">
            <div className="rememberCheck">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <div className="forgotPassword?">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <input className="signInBtn" type="submit" value="Login" />
          <p>Don't have an Account?</p>
          <a href="#">Create an account</a>
          </form>
          <p style={{color:'red'}}>{user.error}</p>
          {user.success && <p style={{color:'green'}}>User created successfully</p>}
        <div className="googleFbLogIn">
          <div className="divider">
            <div className="lsHr"></div>
            <p>Or</p>
            <div className="rsHr"></div>
          </div>
          <div className="googleLogIn">
            <img onClick={handleGoogleSignUp}  src={googleIcon} alt="" />
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

export default SignInForm;
