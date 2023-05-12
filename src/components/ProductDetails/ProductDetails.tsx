import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductType } from "../Products/Products";

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState<ProductType>();
  const { id } = useParams();

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
    </div>
  );
};

export default ProductDetails;