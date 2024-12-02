import { useState } from 'react';

function useToken() {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(null); // Clear the token in the state
  };

  return {
    token,
    setToken: updateToken,
    clearToken
  };
}

export default useToken;