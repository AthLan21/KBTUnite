import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../firebase";
import './authStyle.css';

import {useDispatch } from 'react-redux';
import {fetchUser} from '../../redux/userReducer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            // console.log('user logged in -- Login');
            firestore.collection('users')
            .doc(auth.currentUser.uid)
            .get()
            .then(snapshot => {
                const user = snapshot.data();
                dispatch(fetchUser({user}));
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
            setError(err)
            console.log(err);
        })
    }
    
    return (
      <div className='auth-container' >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1>
            Login to
            <Link to="/">
              KBTUnite
            </Link>
          </h1>
          <p>
            Login to your account.
          </p>
          <div>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)} value={email}
              value={email}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              name="password"
              onChange={(event) => setPassword(event.target.value)} value={password}
              value={password}
              type="password"
            />
          </div>
          <div>
            {error ? (
              <p>{error}</p>
            ) : null}
            <button type="submit">Login</button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/forgotpassword">forgot password?</Link>
          </p>
        </form>
      </div>
    );
    
}