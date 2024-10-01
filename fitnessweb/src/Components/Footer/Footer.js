import React from 'react';
import './Footer.css'; 
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import StarIcon from '@mui/icons-material/Star'; 
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="section">
          <h4><Link to="/about" className="footer-link">About Us</Link></h4>
          <p>Learn more about our App, values, and mission.</p>
          <img 
            src="https://cdn.dribbble.com/users/10608652/screenshots/18139016/media/a1994e655011a5a9a973fab3716cbdcd.png?resize=400x300&vertical=center" 
            alt="FitNet" 
            className="footer-image" 
          />
        </div>
        <div className="section">
          <h4>Customer Service</h4>
          <ul>
            <li><button className="footer-link" onClick={() => alert('Contact Us') /* Replace with actual navigation logic */}><ContactPhoneIcon /> Contact Us</button></li>
            <li><button className="footer-link" onClick={() => alert('FAQ') /* Replace with actual navigation logic */}><QuizIcon /> FAQ</button></li>
            <li><button className="footer-link" onClick={() => alert('Returns') /* Replace with actual navigation logic */}><AssignmentReturnIcon /> Returns</button></li>
          </ul>
        </div>
        <div className="section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://www.facebook.com" className="footer-link"><FacebookIcon /> Facebook</a></li>
            <li><a href="https://twitter.com" className="footer-link"><TwitterIcon /> Twitter</a></li>
            <li><a href="https://www.instagram.com" className="footer-link"><InstagramIcon /> Instagram</a></li>
            <li><a href="https://www.linkedin.com" className="footer-link"><LinkedInIcon /> LinkedIn</a></li>
            <li><a href="https://www.pinterest.com" className="footer-link"><PinterestIcon /> Pinterest</a></li>
          </ul>
        </div>
      </div>
      <div className="footerBottom">
        <p>&copy; {new Date().getFullYear()} FitNessTrack's Guide is part of Future US Inc, an international media group and leading digital publisher. Visit our corporate site.</p>
        <div className="footer-stars">
          <StarIcon className="star-icon" />
          <StarIcon className="star-icon" />
          <StarIcon className="star-icon" />
          <StarIcon className="star-icon" />
          <StarIcon className="star-icon" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
