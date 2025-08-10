import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    if (input.trim()) navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <p className="subtext">
            Connect with top talent and get your project done — fast, easy, and professionally.
          </p>

          <div className="search">
            <div className="search-input">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="search" />
              <input
                type="text"
                placeholder="Try building a mobile app"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleClick()}
              />
            </div>
            <button onClick={handleClick}>Search</button>
          </div>

          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => navigate(`/gigs?search=Web Design`)}>Web Design</button>
            <button onClick={() => navigate(`/gigs?search=Wordpress`)}>Wordpress</button>
            <button onClick={() => navigate(`/gigs?search=Logo Design`)}>Logo Design</button>
            <button onClick={() => navigate(`/gigs?search=AI Services`)}>AI Services</button>
          </div>
        </div>

        <div className="right">
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Digital nomad working from futuristic workspace" 
              className="main-image"
            />
            <div className="floating-elements">
              <img 
                src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80" 
                alt="UI elements" 
                className="ui-elements" 
              />
              <img 
                src="https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Code window" 
                className="code-window" 
              />
              <img 
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
                alt="Graphic design" 
                className="graphic-design" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
