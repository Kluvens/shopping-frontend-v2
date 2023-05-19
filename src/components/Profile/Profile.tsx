import { useParams, useNavigate, Link } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Product from '../Products/Product/Product';
import Footer from '../Footer/Footer';
import ProductCard from '../ProductCard/ProductCard';
import CoolBackground from '../../assets/cool-background.svg';
import DefaultProfile from '../../assets/Default_pfp.svg';
import './Profile.css';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<any>(`http://localhost:8082/api/users/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  if (!userData) {
    return <Loading />;
  }

  const handleLogOut = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    navigate('/');
  }

  const handleViewCart = () => {
    navigate(`/cart/${id}`);
  }

  return (
    <div>
      <Nav />
      <div className='profile-main'>
        <div className='cool-background-img'>
          <img src={CoolBackground} alt="background" />
        </div>
        
        <div className="user-profile">
          <div className='user-info'>
            <img src={DefaultProfile} alt="" />
            <div className='user-info-right'>
              <h1>{userData.userName}</h1>
              <p>{userData.email}</p>
            </div>

            <button className="Btn"  onClick={handleLogOut}>
              <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
              <div className="text">退出登录</div>
            </button>   
          </div>   
            
          <div className='user-cart'>
            <div className='profile-title'>

              <button className="cta" onClick={handleViewCart}>
                <span>查看购物车</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <React.Fragment>
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </React.Fragment>
                </svg>
              </button>
            </div>
            
            <div className='product-list'>
              {userData.cart.map((item: any) => (
                <ProductCard key={item.product._id} product={{
                  _id: item.product._id,
                  name: item.product.name,
                  category: item.product.category,
                  description: item.product.description,
                  price: item.product.price,
                  image: item.product.imageBuffer
                }} />
              ))}
            </div>
          </div>
          
          
          <div className='user-favourites'>
            <div className='profile-title'>
              <h2>收藏列表</h2>
            </div>
            <div className='product-list'>
              {userData.favourites.map((item: any) => (
                <ProductCard key={item._id} product={{
                  _id: item._id,
                  name: item.name,
                  category: item.category,
                  description: item.description,
                  price: item.price,
                  image: item.imageBuffer
                }} />
              ))}
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;