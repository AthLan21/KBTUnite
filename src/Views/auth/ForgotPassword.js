import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import './authStyle.css';

export default class ForgotPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        email: "",
      };
      this.handleChange = this.handleChange.bind(this); 
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: "" });
        auth.sendPasswordResetEmail(this.state.email)
        .then(() => {
            alert('Email sent successfully!');
            this.setState({email: ''});
        })
        .catch(err => {
            // this.setState({ error: err });
            this.setState({email: ''});
            alert(err.message);
        })
    }
    render() {
        return (
          <div className='auth-container' >
            <form
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              
              <p>
                Enter your email.
              </p>
              <div>
                <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </div>
              <div>
                {this.state.error ? (
                  <p>{this.state.error}</p>
                ) : null}
                <button type="submit">Confirm</button>
              </div>
              <hr />
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        );
    }
}