import React, { useState } from "react";
import image from "./img2.png";
import './App.css';


function App() {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseHover = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });

    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };

  return (
  <div
    className="img-magnifier-container"
    onMouseEnter={() => setShowMagnifier(true)}
    onMouseLeave={() => setShowMagnifier(false)}
    onMouseMove={handleMouseHover}
  >
    <img className="magnifier-img" src={image} alt="processsor" />

    {showMagnifier && (
      <div
        style={{
          position: "absolute",
          left: `${cursorPosition.x - 100}px`,
          top: `${cursorPosition.y - 100}px`,
          pointerEvents: "none",
          
        }}
      >

        <div
          className="magnifier-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            borderRadius:"50%"
          }}
        />

      </div>
    )}
  </div>
  )
}

export default App;
