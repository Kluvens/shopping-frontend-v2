import { ProductType } from "../Products/Products";
import {FaCartPlus} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import Cookies from 'js-cookie';
import './ProductCard.css';
import axios from "axios";

const ProductCard = (props: { key: string; product: ProductType }) => {
  const {_id, name, category, price, image} = props.product;
  const navigate = useNavigate();

  const toProductDetails = () => {
    navigate(`/product/${_id}`);
  }
  
  return (
    <div className="card">
      <div className="card-img" onClick={toProductDetails}>
        <img
          src={URL.createObjectURL(new Blob([Buffer.from(image.data).buffer], { type: 'application/octet-binary' }))}
          alt={name}
        />
      </div>
      <h2 className="label-title">{name}</h2>
      <p className="label">分类: {category}</p>
      <p className="label">价格: {price}</p>
    </div>
  );
};

export default ProductCard;