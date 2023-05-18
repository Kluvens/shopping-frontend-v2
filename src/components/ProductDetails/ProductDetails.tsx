import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductType } from "../Products/Products";
import Heart from "../Heart/Heart";
import Loading from "../Loading/Loading";
import Cookies from 'js-cookie';
import { Buffer } from "buffer";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import './ProductDetails.css';

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState<ProductType>();
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        <div className="main-content">
          <Nav />
          <div className="product-display">
            <div className="display-left">
            <img
              src={URL.createObjectURL(new Blob([Buffer.from(productDetail?.imageBuffer).buffer], { type: 'application/octet-binary' }))}
              alt={productDetail?.name}
            />
            </div>

            <div className="display-right">
              <div className="title">
                <h2>{productDetail?.name}</h2>
                <div className="favourite">
                  <Heart isclick={isFavourite} onClick={handleHeartClick} />
                </div>
              </div>

              <div className="entry">
                <div  className='entry-first'>分类: </div>
                <div className='entry-second'>{productDetail?.category}</div>
              </div>

              <div className="entry">
                <div  className='entry-first'>价格: </div>
                <div className='entry-second'>¥{productDetail?.price}</div>
              </div>

              <div className="entry">
                <div  className='entry-first'>简介: </div>
                <div className='entry-second'>{productDetail?.description}</div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

    )}
      </div>
      
  );
};

export default ProductDetails;