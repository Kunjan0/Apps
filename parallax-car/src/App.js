import React, { useEffect, useRef } from 'react';
import './App.css';
import car from './car.jpg'; 

function App() {
  const carRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const car = carRef.current;
      const scrollPosition = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const windowWidth = window.innerWidth;
      const carWidth = car.offsetWidth;
      const maxTranslateX = windowWidth - carWidth;

      const translateX = (scrollPosition / maxScroll) * maxTranslateX;
      car.style.transform = `translateX(${translateX}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <div className="parallax">
        <div className="parallax-layer background"></div>
        <div className="parallax-layer foreground">
          <div className="car-container">
            <img ref={carRef} id="car" src={car} alt="Car" />
          </div>
        </div>
      </div>
      <div className="content">
        <h1>Parallax Scrolling Effect</h1>
        <p>Scroll down to see the effect.</p>
      </div>
    </div>
  );
}

export default App;
