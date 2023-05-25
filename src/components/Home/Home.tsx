import './Home.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import pic from '../../assets/chem-lab.webp';
import { FiUserCheck } from 'react-icons/fi';
import { GiChemicalDrop } from 'react-icons/gi';
import { AiOutlineGlobal } from 'react-icons/ai';
import { useSpring, animated } from 'react-spring';
import { useState, useEffect, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Video from '../../assets/chem-intro.mp4';

function Home() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [num3, setNum3] = useState<number>(0);

  const [favourites, setFavourites] = useState<any>([]);
  const [randomProducts, setRandomProducts] = useState<any>([]);

  const firstRef = useRef(null);
  const secRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === ref1.current) {
            animateNumber(setNum1, 15000);
          } else if (entry.target === ref2.current) {
            animateNumber(setNum2, 100);
          } else if (entry.target === ref3.current) {
            animateNumber(setNum3, 300000);
          }
        }
      });
    });

    observer.observe(ref1.current!);
    observer.observe(ref2.current!);
    observer.observe(ref3.current!);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/products/home');
        setFavourites(response.data.favourites);
        setRandomProducts(response.data.randomProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacity = 1 - scrollPosition / window.innerHeight + 0.1;

  const animateNumber = (setNumber: (n: number) => void, targetNumber: number) => {
    let startNumber = 0;
    const step = Math.ceil(targetNumber / 50); // 50 steps over 1.5s
    const interval = setInterval(() => {
      startNumber = Math.min(startNumber + step, targetNumber);
      setNumber(startNumber);
      if (startNumber >= targetNumber) {
        clearInterval(interval);
      }
    }, 10);
  };

  const pageContentsAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000, // adds a 500ms delay before the animation starts
    config: { duration: 2000 }, // sets the duration of the animation to 1 second
  });

  const handleHorizantalScroll = (element: any, speed: number, distance: number, step: number) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft = element.scrollLeft + step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft + element.offsetWidth >= element.scrollWidth) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  const handleButtonClick = () => {
    navigate('/products');
  }

  return (
    <div className='Home'>
      <Nav/>

      <div className='page'>
        <div className="video-container">
          <video src={Video} width="100%" height="auto" autoPlay loop muted style={{ opacity }} />
        </div>
        <animated.div className='page-contents' style={pageContentsAnimation}>
          <h1>Your journey starts here</h1>
          <p>Choose your favourite place</p>
          <button onClick={handleButtonClick} className='page-button'>Start shopping</button>
        </animated.div>
      </div>

      <div className='index_description'>
        <h2>Massive supplier network.</h2>
        <h2>Verified by iChemical.</h2>
        <div className='index_description_paragraphs'>
          <p>Over 15,000 chemical suppliers from all over the world are verified by iChemical</p>
          <p>according to their track record. With a database of over 1 million transactions,</p>
          <p>iChemical provides accurate price forecast for over 380,000 chemicals</p>
          <p>and gets you chemicals from suppliers that best fit your sourcing budget.</p>
        </div>
        <button onClick={handleButtonClick}>
          <span>Continue</span>
          <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="37" cy="37" r="35.5" stroke="black" strokeWidth="3"></circle>
              <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
          </svg>
        </button>
      </div>

      <div className='index_data'>
      <div className='index_data_grid'>
        <div className='index_data_item' ref={ref1}>
          <FiUserCheck/>
          <h2>{num1}+</h2>
          <p>Over 15,000 verified suppliers</p>
        </div>
        <div className='index_data_item' ref={ref2}>
          <GiChemicalDrop/>
          <h2>{num2}+</h2>
          <p>Over 100 high quality products</p>
        </div>
        <div className='index_data_item' ref={ref3}>
          <AiOutlineGlobal/>
          <h2>{num3}+</h2>
          <p>Over 300,000 customers globally</p>
        </div>
      </div>
    </div>

    <div className='home-first-products'>
    <div className='home-products-list-title'>
        <h2>
          热销产品
        </h2>
      </div>
    

    <div className='home-products-list' ref={firstRef}>
      <button
        className='list-button-left'
        onClick={() => {
          handleHorizantalScroll(firstRef.current, 25, 100, -10);
        }}
      >
        <AiOutlineArrowLeft/>
    </button>

      <button
        className='list-button-right'
          onClick={() => {
            handleHorizantalScroll(firstRef.current, 25, 100, 10);
          }}
        >
          <AiOutlineArrowRight/>
      </button>
      
      <div className='home-products-wrapper'>
        {favourites.map((product: any) => (
          <ProductCard key={product._id} product={{
            _id: product._id,
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            image: product.imageBuffer
          }} />
      ))}
      </div>
    </div>
    </div>

    <div className='home-second-products'>
    <div className='home-products-list-title'>
        <h2>
          为你推荐
        </h2>
      </div>

    <div className='home-products-list' ref={secRef}>
      <button
        className='list-button-left'
        onClick={() => {
          handleHorizantalScroll(secRef.current, 25, 100, -10);
        }}
      >
        <AiOutlineArrowLeft/>
      </button>

      <button
        className='list-button-right'
          onClick={() => {
            handleHorizantalScroll(secRef.current, 25, 100, 10);
          }}
        >
          <AiOutlineArrowRight/>
      </button>
      
      <div className='home-products-wrapper'>
        {randomProducts.map((product: any) => (
          <ProductCard key={product._id} product={{
            _id: product._id,
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
            image: product.imageBuffer
          }} />
      ))}
      </div>
    </div>
    </div>

      <div className='stories-part'>
        <div className='stories'>
          <h2 className='stories_title'>Latest stories</h2>
          <div className='latest-stories'>
            <div className='story-left'>
              <div className='story-left-img'>
                <img src={pic}/>
              </div>
              <h1>The latest news is ...</h1>
            </div>

            <div className='story-right'>
              <div className='story-right-top'>
                <div className='story-right-top-img'>
                  <img className='image' src={pic}/>
                </div>
                <h1>The second news is ...</h1>
              </div>
              <div className='story-right-bottom'>
                <h1>The third news is ...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='contact'>
          <h1>Any questions?</h1>
          <p>You can click the button below to know more about us.</p>
          <p>Or you can send an email to us at enquries@aipurui.com</p>
          <div className='contact-buttons'>
            <button className='contact-buttons-first'>About us</button>
            <button className='contact-buttons-second'>Email us</button>
          </div>
        </div>
      <Footer/>
    </div>
  );
}

export default Home;
