import './Layout.css';
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav> 
           <h1 className='Layout'> <a> <Link to="/">Home</Link> </a>
           <a> <Link to="/recipes">Recipes</Link> </a>
           <a> <Link to="/products">Products</Link> </a> </h1>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;