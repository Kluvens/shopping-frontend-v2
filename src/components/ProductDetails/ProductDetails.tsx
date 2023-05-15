import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductType } from "../Products/Products";
import Heart from "../Heart/Heart";
import './ProductDetails.css';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState<ProductType>();
  const { id } = useParams();
  const [isClick, setClick] = useState(false);

  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/products/${id}`);
        setProductDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {productDetail?.name}
      {productDetail?.price}
      <div className="favourite">
        <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
      </div>
    </div>
  );
};

export default ProductDetails;