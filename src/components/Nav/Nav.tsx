import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Nav.css'; // Import the CSS file

const Nav = () => {
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState<String>('home');
  const [background, setBackground] = useState<Boolean>(false);

  const handleLinkClick = (link: String) => {
    setActiveLink(link);
    if (link === 'home') {
      navigate('/');
    } else if (link == 'profile' || link == 'carts') {
      const token = Cookies.get('token');
      const userId = Cookies.get('id');
      if (token && userId) {
        navigate(`/${link}/${userId}`);
      } else {
        navigate('/login');
      }
    } else {
      navigate(`/${link}`);
    }
  };

  const showBackground = () => {
    if (window.scrollY >= 64) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  };

  useEffect(() => {
    showBackground();
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveLink(currentPath.substring(1) || 'home');
  }, []);

  window.addEventListener('scroll', showBackground);

  return (
    <div className={background ? 'nav active' : 'nav'}>
      <h1 className='nav-title'>
        Trip.
      </h1>

      <ul className='nav-menu'>
        <li><a 
          className={activeLink === 'home' ? 'active' : ''}
          onClick={() => handleLinkClick('home')}
        >Home</a></li>
        <li><a 
          className={activeLink === 'products' ? 'active' : ''}
          onClick={() => handleLinkClick('products')}
        >Products</a></li>
        <li><a 
          className={activeLink === 'profile' ? 'active' : ''}
          onClick={() => handleLinkClick('profile')}
        >Profile</a></li>
        <li><a 
          className={activeLink === 'about' ? 'active' : ''}
          onClick={() => handleLinkClick('about')}
        >About</a></li>
        <li><a 
          className={activeLink === 'carts' ? 'active' : ''}
          onClick={() => handleLinkClick('carts')}
        >Carts</a></li>
      </ul>
    </div>
  );
};

export default React.memo(Nav);
