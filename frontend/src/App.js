/*import logo from './logo.svg';
import './App.css';*/
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Products from "./pages/Products";
import Dashboard from "./pages/private/Dashboard"
import Login from "./pages/Login/Login";
import useToken from './pages/Login/useToken';

function App() {
  const {token, setToken} = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="products" element={<Products />} />
          <Route path="dashboard" element={<Dashboard />} />  
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
