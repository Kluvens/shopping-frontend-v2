import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Product from '../Products/Product/Product';
import ProductCard from '../ProductCard/ProductCard';
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
        for (const item of response.data.cart) {
          console.log(item.product);
        }
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
        <div className="user-profile">
          <h1>欢迎, {userData.userName}</h1>
          <p>我的邮箱地址是: {userData.email}</p>
          <button onClick={handleViewCart}><p>看看购物车</p></button>
          <button onClick={handleLogOut}><p>退出登录</p></button>
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
      </div>
    </div>
  );
};

export default Profile;