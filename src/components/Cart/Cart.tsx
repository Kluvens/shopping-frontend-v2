import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Buffer } from 'buffer';
import Loading from '../Loading/Loading';
import './Cart.css';

const Cart = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8082/api/users/cart/${id}`);
        const data = response.data;
        setCartItems(data.cart);
        console.log(data.cart);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [id, navigate]);

  const handleIncrement = async (_id: string) => {
    try {
      const response = await axios.patch(`http://localhost:8082/api/users/cart/add/${_id}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      const data = response.data;
      const sec_response = await axios.get(`http://localhost:8082/api/users/cart/${id}`);
      const sec_data = sec_response.data;
      setCartItems(sec_data.cart);
    } catch (error: any) {
      console.error(error);
    }
  }

  const handleDecrement = async (_id: string) => {
    try {
      const response = await axios.patch(`http://localhost:8082/api/users/cart/remove/${_id}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      const data = response.data;
      const sec_response = await axios.get(`http://localhost:8082/api/users/cart/${id}`);
      const sec_data = sec_response.data;
      setCartItems(sec_data.cart);
    } catch (error: any) {
      console.error(error);
    }
  }

  const handleDelete = async (_id: string) => {
    try {
      const response = await axios.patch(`http://localhost:8082/api/users/cart/delete/${_id}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      const data = response.data;
      const sec_response = await axios.get(`http://localhost:8082/api/users/cart/${id}`);
      const sec_data = sec_response.data;
      setCartItems(sec_data.cart);
    } catch (error) {
      setError("An error happened");
    }
  }

  const handleEmptyCart = () => {
    navigate('/products');
  }

  const handleClickProdcut = (id: string) => {
    navigate(`/product/${id}`);
  }

  const getTotal = () => {
    let totalPrice = 0;

    for (const item of cartItems) {
      const productPrice = item.product.price;
      const quantity = item.quantity;
      totalPrice += productPrice * quantity;
    }

    return totalPrice;
  }

  return (
    <>
      {loading ? (
      <Loading />
    ) : (
      <div>
      <Nav />
      <div className='cart-main'>
      
      {cartItems.length > 0 ? (
        <div className='cart-body'>
          <div className='cart-header'>
            <h3 className='cart-heading'>我的购物车</h3>
          </div>
          {cartItems.map((item) => (
            <div className='cart-item' key={item._id}>
              <img 
                className='cart-item-img' 
                src={URL.createObjectURL(new Blob([Buffer.from(item.product.imageBuffer).buffer], { type: 'application/octet-binary' }))}
                alt="cart-product" 
                onClick={() => handleClickProdcut(item.product._id)}
              />
              <div className='cart-item-middle'>
                <div className='cart-item-name'>{item.product.name}</div>
                <div className='cart-quan'>
                  <button className='cart-item-quan-button' onClick={() => handleIncrement(item._id)}>+</button>
                  <div className='cart-item-quantity'>{item.quantity}</div>
                  <button className='cart-item-quan-button' onClick={() => handleDecrement(item._id)}>-</button>
                </div>
                
              </div>
              <div className='cart-item-right'>
                <div className='cart-item-price'><span className='cart-rmb'>¥</span><span>{item.product.price * item.quantity}</span></div>
                <button className='cart-item-delete' onClick={() => handleDelete(item._id)}>删除</button>
              </div>
            </div>
          ))}
          <div className='cart-total'>
            总价: ¥{Math.round(getTotal() * 100) / 100}
            <button className='cart-check-out'>开始结算</button>
          </div>
          
        </div>
      ) : (
        <div className='cart-empty'>
          <p>购物车竟然是空的 <span className='empty-cart' onClick={handleEmptyCart}>现在就逛！嗷嗷嗷~</span></p>
        </div>
      )}
    </div>
    </div>
    )}
    </>
  );
}

export default Cart;