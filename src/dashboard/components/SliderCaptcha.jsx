import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SliderCaptcha = ({ onVerify }) => {
  const { t } = useTranslation();
  const [isVerified, setIsVerified] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e) => {
    if (isVerified) return;
    isDragging.current = true;
    startX.current = e.clientX || e.touches[0].clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || isVerified) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    if (!clientX) return;

    const containerWidth = containerRef.current.clientWidth;
    const maxSlide = containerWidth - 48; // 48px is slider button width
    
    let newPos = clientX - startX.current;
    
    if (newPos < 0) newPos = 0;
    if (newPos > maxSlide) newPos = maxSlide;
    
    setSliderPosition(newPos);
    
    if (newPos >= maxSlide) {
      setIsVerified(true);
      isDragging.current = false;
      if (onVerify) onVerify(true);
    }
  };

  const handleMouseUp = () => {
    if (!isVerified) {
      isDragging.current = false;
      setSliderPosition(0);
    }
  };

  useEffect(() => {
    const handleMove = (e) => handleMouseMove(e);
    const handleUp = () => handleMouseUp();

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isVerified]);

  return (
    <div 
      className="relative w-full h-10 bg-gray-100 rounded-md overflow-hidden select-none border border-gray-200"
      ref={containerRef}
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs pointer-events-none z-10">
        {!isVerified && (t('profile.slide_to_verify') || "Drag to verify")}
      </div>

      {/* Green Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-0 ease-linear flex items-center justify-center text-white text-xs z-20"
        style={{ width: isVerified ? '100%' : `${sliderPosition + 24}px` }}
      >
        {isVerified && <span className="animate-in fade-in font-medium">{t('profile.verified') || "Success"}</span>}
      </div>
      
      {/* Slider Button */}
      <div
        className={`absolute top-0 h-full w-12 bg-white shadow-sm border-r border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 active:bg-gray-100 z-30 ${isVerified ? 'right-0 border-none' : 'left-0'}`}
        style={{ 
          transform: isVerified ? 'none' : `translateX(${sliderPosition}px)`,
          transition: isDragging.current ? 'none' : 'transform 0.3s ease'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {isVerified ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default SliderCaptcha;
