import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook

let match = false;
let created = false;

async function loginUser(credentials) {
  let match = false;
  let userId = null;

  // Fetch users and check credentials
  const fetchData = async () => {
    const response = await fetch('http://localhost:5005/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      if (credentials.username === data[i].username && credentials.password === data[i].password) {
        match = true;
        userId = data[i]._id; // Store userId if credentials match
        break;
      }
    }
  };

  await fetchData();

  if (match) {
    // If credentials match, request a token
    const response = await fetch('http://localhost:5005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // Return token and userId
    return { token: data.token, id: userId };
  } else {
    return 'F'; // Return 'F' if credentials do not match
  }
}


async function createUser(newUser) {
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

  if (created) {
    return 'Account created. You may login.';
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
    
    // Call loginUser with the username and password
    const response = await loginUser({
      username,
      password,
    });
  
    // Check if login was successful (response is not 'F')
    if (response !== 'F') {
      const { token, id } = response; // Destructure to get the token and id
  
      // Store token, username, and id in localStorage
      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('username', username); // Store the username
      localStorage.setItem('id', id); // Store the user's id
  
      setToken(token); // Update the state with the token
  
      // After setting the token, redirect to the Home page
      navigate('/home'); // This redirects to the Home page
    }
  
    // Reset error messages
    setUsernameError('');
    setPasswordError('');
  
    // Error handling for invalid credentials or empty fields
    if (response === 'F') {
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
      <div className={'titleContainer'}>
        <div>
          Login to CHOMP
          <label className="errorLabel"> {account}</label>
        </div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{UsernameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
      <br />
      <div className={'inputContainer'}>
        New user? Enter a username and password. Then click 'Create Account.'
        <input className={'inputButton'} type="button" onClick={clickCreate} value={'Create Account'} />
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
