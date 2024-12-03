import './Home.css';
import { useLocation } from "react-router-dom";

function Home() {

  const {state} = useLocation();
  const { user } = state; // Read values passed on state
 
  return (
    <>
      <h1 className="Home">Home</h1>
      Welcome {user}!
    </>
  );
}

export default Home;
