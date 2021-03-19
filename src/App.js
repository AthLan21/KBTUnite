import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Views/Home";
import Header from './Views/Components/Header';
import Profile from "./Views/pages/Profile";
import Search from "./Views/pages/Search";
import Clubs from "./Views/pages/Clubs";
import Login from './Views/auth/Login';
import Signup from './Views/auth/Signup';
import ForgotPassword from './Views/auth/ForgotPassword';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { auth, firestore } from "./firebase";

import {useDispatch} from 'react-redux';
import {fetchUser} from './redux/userReducer';


function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log("user has logged in");
        
        firestore.collection('users')
        .doc(auth.currentUser.uid)
        .get()
        .then(snapshot => {
          const user = snapshot.data();
          dispatch(fetchUser({user}))
        })
        .catch(err => {
          console.log(err);
        })
        
      } else {
        // user has logged out..
        setUser(null);
        console.log("user has logged out");
      }
    });
    setLoading(false)

    return () => unsubscribe();
  },
  []);

  return loading === true ? <h2>Loading...</h2> : (
    <div className="app">
      <Router>      
        <Header user={user} />
        <div className='app__body'>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            {/* auth routes */}
            <PublicRoute path="/signup" authenticated={user!==null} component={Signup}></PublicRoute>
            <PublicRoute path="/login" authenticated={user!==null} component={Login}></PublicRoute>
            <PublicRoute path="/forgotpassword" authenticated={user!==null} component={ForgotPassword}></PublicRoute>
            {/* primary routes */}
            <PrivateRoute path='/profile' authenticated={user!==null} component={Profile} ></PrivateRoute>
            <PrivateRoute path='/clubs' authenticated={user!==null} component={Clubs} ></PrivateRoute>
            <PrivateRoute path='/search' authenticated={user!==null} component={Search} ></PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
