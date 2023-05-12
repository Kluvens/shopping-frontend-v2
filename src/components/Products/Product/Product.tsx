import { ProductType } from "../Products";
import {FaCartPlus} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import './Product.css'

const Product = (props: { key: string; product: ProductType }) => {
  const {_id, name, category, price, image} = props.product;
  const navigate = useNavigate();

  const addToCart = async () => {

  }

  const toProductDetails = () => {
    navigate(`/product/${_id}`);
  }
  
  return (
    <div className="product">
      <div className="p-img" onClick={toProductDetails}>
        <img
          src={URL.createObjectURL(new Blob([Buffer.from(image.data).buffer], { type: 'application/octet-binary' }))}
          alt={name}
        />
      </div>
      <h3 className="label">{name}</h3>
      <p className="label">分类: {category}</p>
      <p className="label">价格: {price}</p>
      <button onClick={addToCart}><FaCartPlus/> <span>加入购物车</span> </button>
    </div>
  );
};

export default Product;