import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Buffer } from 'buffer';
import Nav from '../Nav/Nav';
import Product from './Product/Product';
import Footer from '../Footer/Footer';
import './Products.css';

export type ProductType = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: any;
};

const Prodcuts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParameters = useSearchParams();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [category, setCategory] = useState('all');
  const [orderby, setOrderby] = useState('random');
  const [pagenum, setPagenum] = useState('1');
  const [searchString, setSearchString] = useState('');
  const [nextPage, setNextPage] = useState('1');
  const [prevPage, setPrevPage] = useState('1');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category') ?? 'all';
    const orderbyParam = params.get('orderby') ?? 'random';
    const pagenumParam = params.get('pagenum') ?? '1';
    const searchParam = params.get('search') ?? '';

    setOrderby(orderbyParam);
    setPagenum(pagenumParam);
    setSearchString(searchParam);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/products?category=${categoryParam}&orderby=${orderbyParam}&pagenum=${pagenumParam}&search=${searchParam}`);
        setProducts(response.data.products);
        console.log(response.data.products[0].image);
        setPrevPage(response.data.prevPage);
        setNextPage(response.data.nextPage);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location.search]);

  const handleProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handlePrev = () => {
    const newNum = parseInt(pagenum) - 1;
    navigate(`/products?category=${category}&orderby=${orderby}&pagenum=${newNum}&search=${searchString}`);
  };

  const handleNext = () => {
    const newNum = parseInt(pagenum) + 1;
    navigate(`/products?category=${category}&orderby=${orderby}&pagenum=${newNum}&search=${searchString}`);
  };

  const handleSearch = (newSearchString: string) => {
    navigate(`/products?category=${category}&orderby=${orderby}&pagenum=1&search=${newSearchString}`);
  };

  const handleFilterCategory = (categoryString: string) => {
    navigate(`/products?category=${categoryString}&orderby=${orderby}&pagenum=1&search=${searchString}`);
  }

  const handleOrderBy = (newOrder: string) => {
    navigate(`/products?category=${category}&orderby=${newOrder}&pagenum=1&search=${searchString}`);
  }

  return (
    <div>
      <Nav />

      <div className='shopleft'>
        <div className='shopbg'>
          <h2>search</h2>
          <div className="shop-w">
            <input name="skeyword" className="sch" type="text" placeholder="请输入cas号或产品名称." onChange={e => setSearchString(e.target.value)}/>
            <button type="submit" className='schgo' onClick={() => handleSearch(searchString)}>Go</button>
          </div>
        </div>

        <div className='shopbg'>
          <h2>产品分类</h2>
          <div className="shop-w">
            <ul className="catelist">
              <li><a onClick={() => handleFilterCategory('all')}>全部</a></li>
              <li><a onClick={() => handleFilterCategory('h')}>h</a></li>
              {/* <li><a onClick={() => filterProducts('胶粘剂', '')}>胶粘剂</a></li>
              <li><a onClick={() => filterProducts('催化剂及助剂', '')}>催化剂及助剂</a></li>
              <li><a onClick={() => filterProducts('医药与生物化工', '')}>医药与生物化工</a></li>
              <li><a onClick={() => filterProducts('化学试剂', '')}>化学试剂</a></li>
              <li><a onClick={() => filterProducts('中间体', '')}>中间体</a></li>
              <li><a onClick={() => filterProducts('聚合物', '')}>聚合物</a></li>
              <li><a onClick={() => filterProducts('食品和饲料添加剂', '')}>食品和饲料添加剂</a></li>
              <li><a onClick={() => filterProducts('信息化学品', '')}>信息化学品</a></li>
              <li><a onClick={() => filterProducts('化学矿', '')}>化学矿</a></li>
              <li><a onClick={() => filterProducts('石油化工', '')}>石油化工</a></li>
              <li><a onClick={() => filterProducts('香精与香料', '')}>香精与香料</a></li>
              <li><a onClick={() => filterProducts('无机化工', '')}>无机化工</a></li>
              <li><a onClick={() => filterProducts('农用化学品', '')}>农用化学品</a></li> */}
            </ul>
          </div>
        </div>
      </div>

      <div className='shopright'>
        <div className="mainwrap">
          <h2>所有产品</h2>
          <button onClick={() => handleOrderBy('price')}>order by price</button>
        </div>

        <div className="product-list">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        {prevPage !== '' && <button onClick={handlePrev}>prev</button>}
      {nextPage !== '' && <button onClick={handleNext}>next {nextPage}</button>}

      </div>

      <Footer />
      
    </div>
  );
};

export default Prodcuts;