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
          <div className='Layout'> 
            <a> <Link className="nav-link" to="/">Home</Link></a>
            <a> <Link className="nav-link" to="/recipes">Recipes</Link></a>
            <a> <Link className="nav-link" to="/dashboard">Dashboard</Link></a> 
            <button className="btn-primary" onClick={handleLogout}>Logout</button> 
          </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
