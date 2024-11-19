import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

let match = false;

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
            console.log(credentials.username)
            if (credentials.password === data[i].password) {
              console.log(credentials.password)
              match = true;
             }
             
            }
          }
        
      })
  }

  await fetchData();

  if (match) {
    return fetch('http://localhost:5005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }
  else {
    return 'F'
  }
}

export default function Login ({setToken}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [UsernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  //const navigate = useNavigate()

  const onButtonClick = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token); 
    
    setUsernameError('')
    setPasswordError('')

    if (token === 'F') {
       setUsernameError('No matching account') //may want to expand on this
    }

    if ('' === username) {
      setUsernameError('Please enter your username')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login to CHOMP</div>
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
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
