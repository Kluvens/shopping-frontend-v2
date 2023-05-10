import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [showRed, setShowRed] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowRed(false);
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === confirmPassword) {
      const response = await fetch('https://aipurui-backend.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 200) {
        const { message, userId, token } = await response.json();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.setItem('token', token); // Save JWT token to local storage
        localStorage.setItem('userId', userId);
        navigate(`/profile/${userId}`);
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } else {
      setShowRed(true);
      setPasswordMatch(false);
    }
  };

  return (
    <div>
      <div className="main">
        <div className="register-session">
          <div className="register-left"></div>
          <form className="form" onSubmit={handleSubmit}>
            <h2>注册我的爱普瑞</h2>
            <div>
              <label>姓名:</label>
              <input className="register-input" type="text" value={name} onChange={handleNameChange} />
            </div>
            <div>
              <label>邮箱:</label>
              <input className="register-input" type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label>密码:</label>
              <input className="register-input" type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div>
              <label>确认密码:</label>
              <input
                className="register-input"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                style={{ borderColor: showRed ? 'red' : 'initial' }}
              />
              {showRed ? <p style={{ color: 'red' }}>密码不匹配</p> : null}
            </div>
            <button className="register-button" type="submit">
              立即注册
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;