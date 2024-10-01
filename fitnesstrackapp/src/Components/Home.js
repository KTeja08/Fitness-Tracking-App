import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom'; 
import './home.css';

const slideImages = [
  "https://www.shutterstock.com/shutterstock/photos/2324942763/display_1500/stock-photo-modern-technology-performance-in-sport-science-concept-muscle-strength-training-people-in-sport-2324942763.jpg",
  "https://media.istockphoto.com/id/1438034462/photo/latino-and-african-sport-woman-exercising-and-build-muscle-in-stadium-active-strong-beautiful.jpg?s=612x612&w=0&k=20&c=kFwCRkh8Q1v6uCoSTL7sQcsbk02zgSZJ1kDgnJ3DAZc=",
  "https://res.cloudinary.com/comparis-cms/image/upload/v1686125303/health%20/overviewpages/fitness/fitness_xptixd.jpg",
  "https://cdn.mos.cms.futurecdn.net/NFzw2bRq63vpg47yHatKwQ-1200-80.jpg",
  "https://c4.wallpaperflare.com/wallpaper/206/268/839/pose-muscle-muscle-rod-press-hd-wallpaper-preview.jpg",
];

const Home = () => {
  const navigate = useNavigate(); 

  const handleGetStartedClick = () => {
    navigate('/register'); 
  };

  return (
    <div className="home">
      <div className="slide-container">
        <Slide duration={3000}>
          {slideImages.map((url, index) => (
            <div className="each-slide" key={index}>
              <div style={{ backgroundImage: `url(${url})` }} className="slide-image">
                <div className="overlay">
                  <button className="slide-button" onClick={handleGetStartedClick}>Get Started</button>
                  <button className="slide-button">Download</button>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default Home;
