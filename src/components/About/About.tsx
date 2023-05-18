import './About.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Video from '../../assets/chem-sec-video.mp4';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const About = () => {
  const navigate = useNavigate();
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

  const handleAboutClick = () => {
    navigate('/products');
  }

  return (
    <div className='background'>
      <Nav />
      <div className="video-container">
        <video src={Video} width="100%" height="auto" autoPlay loop muted style={{ opacity }} />
      </div>
      <div className='background-contents'>
        <div className='background-first'>
          <h1>欢迎来到爱普瑞</h1>
          <p>我们是一家致力于提供高质量实验室制成化学药剂的公司。</p>
        </div>
        <div className='background-second'>
          <h1>我们的质量</h1>
          <p>我们的团队由经验丰富的化学和生物学专家组成</p>
          <p>他们致力于研发和生产最高质量的化学药剂</p>
          <p>我们的产品范围广泛，包括各种类型的实验室制成药剂</p>
          <p>例如生物试剂、医药中间体、合成试剂和高级精细化学品等</p>
        </div>
        <div className='background-third'>
          <h1>个性化服务</h1>
          <p>我们注重客户的需求和满意度，为客户提供个性化的解决方案和专业的建议。</p>
          <p>我们的销售团队会与客户密切合作，确保他们得到最优质的服务和支持。</p>
        </div>
        <div className='background-fourth'>
          <h1>社会责任</h1>
          <p>我们非常注重环境保护和社会责任。</p>
          <p>我们的生产流程符合环保要求，我们的团队也积极参与各种社会公益活动和慈善事业，为社会做出贡献。</p>
          <button onClick={handleAboutClick}>看看我们的产品</button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
