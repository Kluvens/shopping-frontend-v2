import React from 'react';
import { AiFillWechat, AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer-dark">
      <div className="container">
        <div className="row">
          <div className='cols'>
            <div className="col-sm-6 col-md-3 item">
              <h3>Products</h3>
              <ul>
                <li><a href="#">All Products</a></li>
                <li><a href="#">Best Sellers</a></li>
                <li><a href="#">What's coming next</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3 item">
              <h3>Info</h3>
              <ul>
                <li><a href="#">Company</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Carts</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6-item-text">
            <h3>Company Name</h3>
            <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
          </div>
          <div className="col-item-social">
            <p>Follow us on: </p>
            <a href="#"><AiFillWechat/></a>
            <a href="#"><AiFillFacebook/></a>
            <a href="#"><AiFillInstagram/></a>
            <a href="#"><AiFillTwitterCircle/></a>
          </div>
        </div>
        <p className='copyright'>Made with ❤ by Jiapeng Yang</p>
        <p className="copyright">Aipurui © 2023</p>
      </div>
    </div>
  );
};

export default Footer;
