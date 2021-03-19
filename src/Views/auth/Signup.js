import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from "../../firebase";
import './authStyle.css';
import Switch from '@material-ui/core/Switch';

import {useDispatch } from 'react-redux';
import {fetchUser} from '../../redux/userReducer'

export default function SignUp() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isStudent, setIsStudent] = useState(true);
    const [isAlumni, setIsAlumni] = useState(false);

    const dispatch = useDispatch();
    // const handleChange = (event) => {
    // this.setState({
    //     [event.target.name]: event.target.value
    // });
    // }

    const onToggle = (event) => {
      if(event.target.name === 'isStudent'){
          setIsStudent(true);
          setIsAlumni(false);
      }else{
          setIsStudent(false);
          setIsAlumni(true);
      }
    }



    const handleSubmit = async (event) =>  {
        event.preventDefault();
        setError('');
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            firestore.collection('users')
            .doc(auth.currentUser.uid)
            .set({
              name: name,
              email: email,
              userType: isStudent ? 'Student' : 'Alumni',
            })
            .then(() => {
              console.log('user added to firestore');
              dispatch(fetchUser({name, email}));
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
            // this.setState({ error: err });
            console.log(err);
        })
    }

    
        return (
          <div className='auth-container' >
            <form onSubmit={handleSubmit}>
              <h1>
                Sign Up to
              <Link to="/">KBTUnite</Link>
              </h1>
              <p>Create an account.</p>
              <div>
                <input placeholder="Enter full name" name="name" type="name" onChange={(event) => setName(event.target.value)} value={name}></input>
              </div>
              <div>
                <input placeholder="Email" name="email" type="email" onChange={(event) => setEmail(event.target.value)} value={email}></input>
              </div>
              <div>
              <p>Student</p>
              <Switch
                checked={isStudent}
                onChange={onToggle}
                color="primary"
                name="isStudent"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <p>Alumni</p>
              <Switch
                checked={isAlumni}
                onChange={onToggle}
                color="primary"
                name="isAlumni"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              </div>
              <div>
                <input placeholder="Password" name="password" onChange={(event) => setPassword(event.target.value)} value={password} type="password"></input>
              </div>
              <div>
                {error ? <p>{error}</p> : null}
                <button type="submit">Sign up</button>
              </div>
              <hr></hr>
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
          </div>
        )
      
}