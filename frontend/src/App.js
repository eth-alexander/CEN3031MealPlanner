/*import logo from './logo.svg';
import './App.css';*/
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Products from "./pages/Products";
import Dashboard from "./pages/private/Dashboard"
import Login from "./pages/Login/Login";

function App() {
  const [items, setItems] = useState([])
  useEffect( () => {
    const fetchData = async() => {
      const res = await fetch('https://localhost:3000')
      const data = await res.json()
      setItems(data.items)

    }
    fetchData();
  }, [])
  return (
      <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="products" element={<Products />} />
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="login" element={<Login />}> 
           <p>
           {items.map(i => (
            <p>{i.username}, {i.password}</p>
           )) }
           </p>
          </Route> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
