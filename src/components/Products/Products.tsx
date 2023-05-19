import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Buffer } from 'buffer';
import Nav from '../Nav/Nav';
import Product from './Product/Product';
import Footer from '../Footer/Footer';
import { RiOrderPlayFill } from 'react-icons/ri';
import Loading from '../Loading/Loading';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import './Products.css';

export type ProductType = {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: any;
  imageBuffer? : any;
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
  const [loading, setLoading] = useState(true);

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
        setLoading(true);
        const response = await axios.get(`http://localhost:8082/api/products?category=${categoryParam}&orderby=${orderbyParam}&pagenum=${pagenumParam}&search=${searchParam}`);
        setProducts(response.data.products);
        setPrevPage(response.data.prevPage);
        setNextPage(response.data.nextPage);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

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

  const handleOrderBy = (event: any) => {
    const value = event.target.value;
    setOrderby(value);
    navigate(`/products?category=${category}&orderby=${value}&pagenum=1&search=${searchString}`);
  }

  return (
    <div>
      {loading ? (
      <Loading />
    ) : (
      <div>
      <Nav />

      <div className='all-products'>
        <div className='shopleft'>
          <div className='shopbg'>
            <h2>搜索</h2>
            <div className="shop-w">
              <div className="products-form">
                <button type="submit" onClick={() => handleSearch(searchString)}>
                  <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                      <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </button>
                <input 
                  name="skeyword" 
                  className="input" 
                  placeholder="请输入产品名称." 
                  type="text" 
                  onChange={e => setSearchString(e.target.value)} 
                  onKeyUp={e => {
                    if (e.key === "Enter") {
                      handleSearch(searchString);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className='shopbg'>
            <h2>产品分类</h2>
            <div className="shop-w">
              <ul className="catelist">
                <li><a onClick={() => handleFilterCategory('all')}>全部</a></li>
                <li><a onClick={() => handleFilterCategory('h')}>h</a></li>
                <li><a onClick={() => handleFilterCategory('胶粘剂')}>胶粘剂</a></li>
                <li><a onClick={() => handleFilterCategory('催化剂及助剂')}>催化剂及助剂</a></li>
                <li><a onClick={() => handleFilterCategory('医药与生物化工')}>医药与生物化工</a></li>
                <li><a onClick={() => handleFilterCategory('化学试剂')}>化学试剂</a></li>
                <li><a onClick={() => handleFilterCategory('中间体')}>中间体</a></li>
                <li><a onClick={() => handleFilterCategory('聚合物')}>聚合物</a></li>
                <li><a onClick={() => handleFilterCategory('食品和饲料添加剂')}>食品和饲料添加剂</a></li>
                <li><a onClick={() => handleFilterCategory('信息化学品')}>信息化学品</a></li>
                <li><a onClick={() => handleFilterCategory('化学矿')}>化学矿</a></li>
                <li><a onClick={() => handleFilterCategory('石油化工')}>石油化工</a></li>
                <li><a onClick={() => handleFilterCategory('香精与香料')}>香精与香料</a></li>
                <li><a onClick={() => handleFilterCategory('无机化工')}>无机化工</a></li>
                <li><a onClick={() => handleFilterCategory('农用化学品')}>农用化学品</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='shopright'>
          <div className="mainwrap">
            <h2>所有产品</h2>
            <div className="filter">
              <RiOrderPlayFill className='order-icon' />
              <select id="filter-select" value={orderby} onChange={handleOrderBy}>
                <option value="random">默认</option>
                <option value="created">新品</option>
                <option value="price">价格</option>
                <option value="favourites">收藏</option>
              </select>
            </div>
          </div>

          <div className="product-list">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          
          <div className='products-btn'>
              {prevPage !== '' ? <div className='left-btn' onClick={handlePrev}><AiOutlineArrowLeft /><p>上一页</p></div> : <div className='left-btn-fake'></div>}
              {nextPage !== '' ? <div className='right-btn' onClick={handleNext}><p>下一页</p><AiOutlineArrowRight /></div> : <div className='right-btn-fake'></div>}
          </div>

        </div>
      </div>
      <Footer />
    </div>
    )}
    </div>
    
  );
};

export default Prodcuts;