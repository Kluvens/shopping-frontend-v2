import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import {HiOutlineMail} from 'react-icons/hi';
import {RiLockPasswordLine} from 'react-icons/ri';
import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginResponse {
  userId: string;
  token: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setPassword(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await axios.post<LoginResponse>('http://localhost:8082/api/users/login', {
        email,
        password,
      });
    
      const { userId, token } = response.data;
    
      Cookies.remove('token');
      Cookies.remove('userId');

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      Cookies.set("token", token, { expires: expirationDate, path: '/' });
      Cookies.set("userId", userId, { expires: expirationDate, path: '/' });
      navigate(`/profile/${userId}`);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while processing your request. Please try again later.');
      }
    }
  }

  return (
    <div className='main'>
      <div className='login-session'>
        <div className='login-left'>
        </div>
        <form onSubmit={handleSubmit} className='form'>
        <h2>爱普瑞， 让化学融入生活！</h2>
        <p>欢迎回来! 立即登录去看看产品~:</p>
        <div className='login-box'>
          <HiOutlineMail />
          <input className='login-input' type="email" value={email} onChange={handleEmailChange} placeholder='邮箱' />
        </div>
        <div className='login-box'>
          <RiLockPasswordLine />
            <input className='login-input' type="password" value={password} onChange={handlePasswordChange} placeholder='密码' />
        </div>
          {error && <div style={{ color: 'red' }}>{error}</div>} {/* display error message in red */}
          <button className='login-button' type="submit">登录</button>
          <h4>还没有账户?   <span className='login-to-register'><Link to="/register">立即注册</Link></span></h4>
        </form>
      </div>
    </div>
  );
};

export default Login;
