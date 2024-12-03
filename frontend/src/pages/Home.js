import './Home.css';
import { useLocation, Link } from "react-router-dom";

function Home() {

  const {state} = useLocation();
  const { user } = state; // Read values passed on state
 

  return (
    <>
      <h1 className="Home">Home</h1>
      Welcome {user}!
      <br></br>
      <br></br>
      Browse <a> <Link to="/recipes">Recipes</Link> </a>
      <br></br>
      <br></br>
      Look at saved recipes in your  <a><Link to="/dashboad">Dashboard</Link></a> 
      
    </>
  );
  
}

export default Home;


