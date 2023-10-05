import React from 'react'
import { useState } from 'react'
import { auth } from '../Config/Firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { userActions } from './store/user-slice';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth-slice';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const db = getDatabase();
  const dispatch = useDispatch();


  const handleSignup = () => {
    //console.log(email, username, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((success) => {
        console.log("user creatted")

        set(ref(db, `users/${success.user.uid}`), {
          username: username,
          email: email,
          id: success.user.uid
        });


        const user = success.user;
        dispatch(
            userActions.updateUserData({
              username: username,
              email: email,
              password: password,
            })
          );

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });

    setIsSignup(!isSignup);

  }


  const handleLogin = () => {
    console.log(email, password, username);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(log.uids)
        alert("user logged Inn");
        navigate('/home');
        // navigate("/homesc",{
        //   state:arr
        // })
        // ...

        dispatch(
            userActions.updateUserData({
              username: username,
              email: email,
              password: password,
            })
          );

          dispatch(authActions.isLoggedIn());
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }
  return (
    <div className='text-center shadow-lg p-3 mb-5 bg-body rounded'>
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>
      <br />
      {error && <Alert variant='danger'>{error}</Alert>}

      {isSignup && (
        <div>
          <label htmlFor="username" className='fs-5'>Username</label>
          <br />
          <input type="text" id="username" className='w-25 rounded-pill' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      )}
      <div>
        <label htmlFor="email" className='fs-5'>Email</label>
        <br />
        <input type="text" name="" id="email" className='w-25 rounded-pill' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email" className='fs-5'>Password</label>
        <br />
        <input type="password" name="" id="password" className='w-25 rounded-pill' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {isSignup ? (
        <button className='mt-3 mx-auto m-4 btn btn-success rounded-pill' onClick={handleSignup} >Signup</button>
      ) : (
        <button className='mt-3 mx-auto m-4 btn btn-success rounded-pill' onClick={handleLogin}>Login</button>
      )}

      <br />
      <button type='button' onClick={() => setIsSignup(!isSignup)} className="btn btn-info rounded-pill">{isSignup ? "Already have an acount?Login " : "Dont Have An Acount ? Signup"}</button>
    </div>
  )
}

export default AuthForm;