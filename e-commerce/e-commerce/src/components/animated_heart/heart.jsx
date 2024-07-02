import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import './heart.css';
import Confetti from 'react-dom-confetti';

const WishlistButton = ({ user, product, handleWishlistToggle,isWishlisted }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
    const [isHeartWishlisted, setIsHeartWishlisted] = useState(isWishlisted);
//   const isWishlisted = true;

  const handleClick = () => {
    if(isHeartWishlisted === false)
        {
            setConfettiActive(true);
            setTimeout(() => {
                setConfettiActive(false);
              }, 1000); // Confetti duration

              setIsAnimating(true);
        }
        setIsHeartWishlisted(prev => !prev);

    // handleWishlistToggle(user?.id, product?.id);
   
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <button
      className="heartButton"
      onClick={handleClick}
    >
      <Heart
        size={40}
        strokeWidth={0.7}
        className={`heart-icon text-black ${isAnimating ? "heart-rainbow" : product?.isWishlisted ? "heart-red" : ""}`}
        onAnimationEnd={handleAnimationEnd}
      />
      <Confetti active={confettiActive} config={{ spread: 60, startVelocity: 30, elementCount: 50, decay: 0.9 }} />

    </button>
  );
};

export default WishlistButton;