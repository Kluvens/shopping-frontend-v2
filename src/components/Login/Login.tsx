import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'
import {HiOutlineMail} from 'react-icons/hi'
import {RiLockPasswordLine} from 'react-icons/ri'

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  },
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
      const response = await fetch("https://aipurui-backend.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 200) {
        const { user, token } = await response.json() as LoginResponse;
        localStorage.setItem('token', token); // Save JWT token to local storage
        localStorage.setItem('userId', user.id);
        navigate(`/profile/${user.id}`);
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      setError('An error occurred while processing your request. Please try again later.');
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
          <h4>还没有账户?   <span login-to-register><Link to="/register">立即注册</Link></span></h4>
        </form>
      </div>
    </div>
  );
};

export default Login;
