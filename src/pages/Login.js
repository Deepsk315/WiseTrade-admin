import React, {useState , useEffect} from "react";
import { Link, useHistory } from 'react-router-dom'
import logo from "../assets/images/logo1.png";
import web3bg from "../assets/images/web3.jpg";
import { url } from '../actions/config'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'


export default function Login({ onLogin }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [localToken , SetLocalToken] = useState("");
  const history = useHistory()

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      login();
    }
  };

  const login = () => {
    setError('')

    if (!email?.trim() || !password?.trim()) {
      setError('Please enter both email and password')
    }

    axios.post(url() + 'users/login', {
      email,
      password
    }).then(response => {
      if (response?.status == 200) {
        const token = response?.data?.token
        if (token) {
          setAuthToken(token)
          window.localStorage.setItem('user_id', response?.data?._id)
          onLogin()
        }
        // history.push('/courses')
        history.push('/users')
      }
    }).catch(error => {
      console.error(error?.response);
      setError(error?.response?.data?.msg)
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('web3_japan_admin_token');
    // console.log(token)
    SetLocalToken(token)
  }, [localToken])

  return (
    <div className="profile-view">
      <div style={{textAlign: "center"}}>
        <img
          src={logo}
          alt="logo"
          className="sidebar-logo"
          style={{width: '200px'}}
        />
      </div>

      <div className="card bg-light border border-dark mx-auto" style={{ maxWidth: '600px' }}>
        <img className="card-img-top" style={{ objectFit: 'cover', maxHeight: '180px' }} src={web3bg} />

        <div className="card-body p-4">
          <h5 className="text-center my-3">Wise Trade Admin Login</h5>
          <hr/>
          <div className="form-group mt-3">
            <label className="text-dark">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onInput={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
            ></input>
          </div>
          <div className="form-group mt-2">
            <label className="text-dark">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onInput={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            ></input>
          </div>
          {error ? (
            <p className="text-center text-danger">{error}</p>
          ) : <></>}
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary m-2" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
