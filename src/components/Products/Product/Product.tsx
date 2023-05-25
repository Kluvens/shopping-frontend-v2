import { ProductType } from "../Products";
import {FaCartPlus} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import Cookies from 'js-cookie';
import './Product.css';
import axios from "axios";

const Product = (props: { key: string; product: ProductType }) => {
  const {_id, name, category, price, image} = props.product;
  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      const response = await axios.patch(`http://localhost:8082/api/users/cart/add/${_id}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
      const data = response.data;
      alert(data.message);
    } catch (error: any) {
      console.error(error);
    }
  }

  const toProductDetails = () => {
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    if (token && userId) {
      navigate(`/product/${_id}`);
    } else {
      navigate(`/login`);
    }
    
  }
  
  return (
    <div className="product">
      <div className="p-img"  onClick={toProductDetails}>
        <img
          src={URL.createObjectURL(new Blob([Buffer.from(image.data).buffer], { type: 'application/octet-binary' }))}
          alt={name}
        />
      </div>
      <h2 className="label-title">{name}</h2>
      <p className="label">分类: {category}</p>
      <p className="label">价格: {price}</p>
      <button onClick={addToCart}><FaCartPlus/> <span>加入购物车</span> </button>
    </div>
  );
};

export default Product;