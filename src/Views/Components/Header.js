import React from "react";
import "./Header.css";

import { auth } from "../../firebase";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import LogoutIcon from '@material-ui/icons/ExitToApp';

import {useDispatch} from 'react-redux';
import {logout} from '../../redux/userReducer';

const Link = require("react-router-dom").Link;


function Header({ user }) {
  const dispatch = useDispatch();

  const logoutUser = () => {
    auth.signOut();
    dispatch(logout());
  }

  return (
    <div className="header">
      {/* <img
        className="header__LeftLogo"
        src="https://firebasestorage.googleapis.com/v0/b/whatsapp-link-generator-5376e.appspot.com/o/images%2Freact%20social%20theindianappguy.png?alt=media&token=453609cf-32e5-45f3-b1c6-cd9cbbd5a90c"
        alt="none"
      /> */}
      {user ? (
        <div  >
          <AppBar position='fixed' className='nav'>
                <Toolbar className='nav-container'>
                    <Grid item >
                      <Button color='inherit' component={Link} to='/'  >Home</Button>
                      <Button color='inherit' component={Link} to='/profile' >Profile</Button>
                      <Button color='inherit' component={Link} to='/clubs' >Clubs</Button>
                      <Button color='inherit' component={Link} to='/search' >Search</Button>
                    </Grid>
                      {/* <Search />  */}
                    {/* <Grid item >  */}
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<LogoutIcon />}
                        onClick={() => { logoutUser() }} 
                      >
                        Logout
                      </Button>
                    {/* </Grid> */}
                </Toolbar>
            </AppBar>
        </div>
      ) : (
        // <AuthDialogs label="Login/Register" />
        <AppBar position='fixed' className='nav'>
          <Toolbar className='nav-container'>
              <Grid item >
                <Button color='inherit' component={Link} to='/'  >Home</Button>
                {/* <Button color='inherit' component={Link} to='/login' >Login</Button>
                <Button color='inherit' component={Link} to='/signup' >Signup</Button> */}
              </Grid>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

export default Header;
