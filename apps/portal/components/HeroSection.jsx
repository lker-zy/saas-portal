import React, { useEffect, useRef } from 'react';

function HeroSection() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    // Play intro video
    if (video1Ref.current) {
      video1Ref.current.play().catch(err => {
        console.log('[Hero] Video autoplay blocked:', err);
      });
    }

    // Switch to loop video after intro ends
    const handleVideoEnd = () => {
      if (video2Ref.current) {
        video2Ref.current.play().catch(err => {
          console.log('[Hero] Loop video play failed:', err);
        });
      }
    };

    if (video1Ref.current) {
      video1Ref.current.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (video1Ref.current) {
        video1Ref.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  return (
    <section className="hero-section">
      {/* Video Background */}
      <div id="global-hero-video-container">
        <video
          ref={video1Ref}
          className="hero-video"
          muted
          playsInline
          preload="auto"
          autoPlay
          style={{ zIndex: 2, opacity: 1 }}
        >
          <source src="/assets/sample2.mp4" type="video/mp4" />
          <source src="/assets/sample2_optimized.mp4" type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          className="hero-video"
          muted
          loop
          playsInline
          preload="auto"
          style={{ zIndex: 1, opacity: 0 }}
        >
          <source src="/assets/sample.mp4" type="video/mp4" />
          <source src="/assets/sample_optimized.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">世界级<br />ISP代理</h1>
        <p className="hero-subtitle">满足多样化业务挑战<br />始终稳定可靠</p>
        <button
          className="cta-button"
          onClick={() => window.location.href = '/register'}
        >
          打造极致连接体验
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
