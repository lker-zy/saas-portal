import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    let hasSwitched = false;
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    // Preload video2
    if (v2) v2.load();

    const playVideo2 = () => {
      if (!v2) return;
      
      // Make v2 visible and on top before playing to avoid black flash
      v2.style.zIndex = '2';
      v2.style.opacity = '1';

      v2.play().then(() => {
        // Fade out v1 shortly after v2 starts playing
        setTimeout(() => {
          if (v1) {
            v1.style.opacity = '0';
            v1.style.zIndex = '1';
            // Pause v1 later to save resources
            setTimeout(() => {
                if (v1 && !v1.paused) v1.pause();
            }, 1500);
          }
        }, 100);
      }).catch(err => {
        console.warn('[Hero] Loop video play failed:', err);
        // Fallback: if v2 fails, loop v1
        if (v1) {
          v1.loop = true;
          v1.play().catch(e => console.log('Fallback play failed', e));
        }
      });
    };

    // Play intro video
    if (v1) {
      v1.play().catch(err => {
        console.log('[Hero] Video autoplay blocked:', err);
      });
    }

    const handleTimeUpdate = () => {
      if (hasSwitched || !v1) return;
      
      // Switch 0.4s early to ensure seamless transition
      const timeLeft = v1.duration - v1.currentTime;
      if (timeLeft <= 0.4 && v1.duration > 0) {
        hasSwitched = true;
        playVideo2();
      }
    };

    const handleEnded = () => {
      if (hasSwitched) return;
      hasSwitched = true;
      playVideo2();
    };

    if (v1) {
      v1.addEventListener('timeupdate', handleTimeUpdate);
      v1.addEventListener('ended', handleEnded);
    }

    return () => {
      if (v1) {
        v1.removeEventListener('timeupdate', handleTimeUpdate);
        v1.removeEventListener('ended', handleEnded);
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
        <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>
        <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}></p>
        <button
          className="cta-button"
          onClick={() => window.location.href = '/register'}
        >
          {t('打造极致连接体验')}
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
