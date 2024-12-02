import './Home.css';
import { Navigate } from "react-router-dom";
import useToken from './Login/useToken';

function Home() {
  const { token, setToken } = useToken();
  console.log("Token:", token);

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, show the Home page
  return (
    <>
      <h1 className="Home">Home</h1>
    </>
  );
}

export default Home;
