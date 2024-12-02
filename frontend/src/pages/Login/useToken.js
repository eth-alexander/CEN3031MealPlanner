import { useState } from 'react';

function useToken() {
  // Get the token from localStorage when the component mounts
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken);

  // Function to update the token and store it in localStorage
  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return {
    token,
    setToken: updateToken
  };
}

export default useToken;
