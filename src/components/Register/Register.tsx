import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import './Register.css';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [showRed, setShowRed] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8082/api/users/register",
        formData
      );
      const { token, userId } = response.data;
      Cookies.remove('token');
      Cookies.remove('userId');

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      Cookies.set("token", token, { expires: expirationDate, path: '/' });
      Cookies.set("userId", userId, { expires: expirationDate, path: '/' });
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error(error);
      setError("Failed to register. Please try again.");
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
              <input className="register-input" type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
              <label>邮箱:</label>
              <input className="register-input" type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div>
              <label>密码:</label>
              <input className="register-input" type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div>
              <label>确认密码:</label>
              <input
                className="register-input"
                type="password"
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleInputChange}
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