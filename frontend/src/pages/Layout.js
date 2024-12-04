import './Layout.css';
import { Outlet, Link } from "react-router-dom";
import useToken from './Login/useToken';



function Layout() {

  const { clearToken } = useToken();  // Get the clearToken function
  
 
  const handleLogout = () => {
    clearToken();  // Clear the token
    localStorage.clear();
    window.location.href = '/login';  // Redirect to login page after logout
  };

  return (
    <>
      <nav> 
           <h1 className='Layout'> <a> <Link to="/">Home</Link> </a>
           <a> <Link to="/recipes">Recipes</Link> </a>
           <a><Link to="/dashboard">Dashboard</Link></a> </h1>
           <button onClick={handleLogout} >Logout</button> {/* Logout button */}
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
