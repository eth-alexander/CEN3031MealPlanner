import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import './Login.css'

let match = false;
let created = false;
let taken = false;

async function loginUser(credentials) {
  const fetchData = async () => {
    await fetch('http://localhost:5005/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (credentials.username === data[i].username) {
            console.log(credentials.username);
            if (credentials.password === data[i].password) {
              console.log(credentials.password);
              match = true;
            }
          }
        }
      });
  };

  await fetchData();

  if (match) {
    return fetch('http://localhost:5005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  } else {
    return 'F';
  }
}

async function createUser(newUser) {
  await fetch('http://localhost:5005/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (newUser.username === data[i].username) {
          taken = true;
        }
      }
    });

  if (!taken) {
    await fetch('http://localhost:5005/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  }).then((data) => {
    data.json();
    created = true;
    console.log(created);
  });
}

  if (created) {
    return 'Account created. You may login.';
  }
  else{
    return 'Account taken. Input a different username and password.'
  }
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [UsernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [account, setAccount] = useState('');

  const navigate = useNavigate(); // Use the useNavigate hook

  const onButtonClick = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });

    if (token !== 'F') {
      localStorage.setItem('token', token); // Store the token in localStorage
      setToken(token); // Update the state with the token
      
      localStorage.setItem('profile', username)
  
      // After setting the token, redirect to the Home page
      navigate('/home'); // This redirects to the Home page
    }

    setUsernameError('');
    setPasswordError('');

    if (token === 'F') {
      setUsernameError('Incorrect username or password');
    }

    if ('' === username) {
      setUsernameError('Please enter your username');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter your password');
      return;
    }
  };

  const clickCreate = async (e) => {
    e.preventDefault();

    setUsernameError('');
    setPasswordError('');

    if ('' === username) {
      setUsernameError('Please enter a username');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }

    const account = await createUser({
      username,
      password,
    });
    console.log(account);
    setAccount(account);
  };

  return (
    <div className={'mainContainer'}>
      <div className={'input-box-login'}>
          <h1 className='h1-login'>CHOMP Login</h1>
          <label className="errorLabel"> {account}</label>
          
          <input
            value={username}
            placeholder="Enter your username here"
            onChange={(ev) => setUsername(ev.target.value)}
            className={'input-box'}
          />
          <label className="errorLabel">{UsernameError}</label>
        
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'input-box'}
          />
          <label className="errorLabel">{passwordError}</label>
          
          <div className={'inputContainer'}>
            <input 
              className={'btn-secondary'} 
              type="button" 
              onClick={onButtonClick} 
              value={'Log in'} />
          </div>
        
          
          <p className='p-login'>New user? Enter a username and password. </p>
          <p className='p-login'>Then click 'Create Account.'</p>
          <input 
            className={'btn-secondary'} 
            type="button" 
            onClick={clickCreate} 
            value={'Create Account'} 
          />
          
        
      </div> 
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
