import './Home.css';
import Login from "./Login/Login";
import useToken from './Login/useToken';

function Home() { 

  const {token, setToken} = useToken();
  console.log(token);
  if(!token) {
    return (
      <>
        <h1 className="Home">Home</h1>
        <Login setToken={setToken} /> 
      </>
    )
    
  }
  else {
    return (
      <>
        <h1 className="Home">Home</h1>
      </>
      );
  }
   
  };
  
  export default Home;