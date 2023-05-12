import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Profile.css';

interface UserData {
  name: string;
  email: string;
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>(`http://localhost:8082/api/users/profile/${id}`, {
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
    return <div>正在加载中...</div>;
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
          <h1>欢迎, {userData.name}</h1>
          <p>我的邮箱地址是: {userData.email}</p>
          <button onClick={handleViewCart}><p>看看购物车</p></button>
          <button onClick={handleLogOut}><p>退出登录</p></button>
        </div>
      </div>
    </div>
  );
};

export default Profile;