import './Home.css';
import { Link } from "react-router-dom";

function Home() {

  const username = localStorage.getItem('profile')
 

  return (
    <>
      <h1 className="Home">Home</h1>
      Welcome {username}!
      <br></br>
      <br></br>
      Browse <a> <Link to="/recipes">Recipes</Link> </a>
      <br></br>
      <br></br>
      Look at saved recipes in your  <a><Link to="/dashboard">Dashboard</Link></a> 
      
    </>
  );
  
}

export default Home;
