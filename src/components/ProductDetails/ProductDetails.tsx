import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductType } from "../Products/Products";
import Heart from "../Heart/Heart";
import Loading from "../Loading/Loading";
import Cookies from 'js-cookie';
import './ProductDetails.css';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState<ProductType>();
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8082/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        });
        setProductDetail(response.data.product);
        setIsFavourite(response.data.isFavourite);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHeartClick = async () => {
    setIsFavourite(!isFavourite);
    if (isFavourite) {
      const response = await axios.patch(`http://localhost:8082/api/users/favourites/remove/${id}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
    } else {
      const response = await axios.patch(`http://localhost:8082/api/users/favourites/add/${id}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });
    }
  }

  return (
    <div>
      {loading ? (
      <Loading />
    ) : (
      <div>
        {productDetail?.name}
        {productDetail?.price}
        <div className="favourite">
          <Heart isClick={isFavourite} onClick={handleHeartClick} />
        </div>
      </div>
    )}
      </div>
      
  );
};

export default ProductDetails;