import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Prodcuts from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import ProductDetails from './components/ProductDetails/ProductDetails';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/about" element={ <About/> }/>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/register" element={ <Register/> }/>
          <Route path="/products" element={ <Prodcuts/> }/>
          <Route path="/cart/:id" element={ <Cart/> }/>
          <Route path="/profile/:id" element={ <Profile/> }/>
          <Route path="/product/:id" element={ <ProductDetails/> }/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
      
  </React.StrictMode>

);

