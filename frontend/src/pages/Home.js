import './Home.css';
import { Link } from "react-router-dom";

function Home() {

  const username = localStorage.getItem('profile')
 

  return (
    <>
      <div className='home-container'>
        <div className='input-box-welcome'>
          <p className="h1">Welcome {username}!</p>
          <br></br>
          <br></br>
          <p className='h1'>Browse recipe database</p> <a className='a'> <Link className='home-link'to="/recipes">Recipes</Link> </a>
          <br></br>
          <br></br>
          <p className='h1'>View saved recipes</p> <a className='a'><Link className='home-link' to="/dashboard">Dashboard</Link></a> 
        </div>

      </div>
      
      
      
    </>
  );
  
}

export default Home;





