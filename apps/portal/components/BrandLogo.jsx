import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';

function BrandLogo({ className = '', title }) {
  const { t } = useTranslation();
  const uniqueId = useId().replace(/:/g, '');
  const sphereGradientId = `sphereGradient-${uniqueId}`;
  const orbitGradientId = `orbitGradient-${uniqueId}`;
  
  const displayTitle = title || t('Quantum-Proxy');

  return (
    <span className={`brand-logo ${className}`.trim()} aria-label={displayTitle}>
      <span className="brand-mark" aria-hidden="true">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id={sphereGradientId}
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(100 100) rotate(90) scale(40)"
            >
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="60%" stopColor="#00a0ff" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </radialGradient>

            <linearGradient id={orbitGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <ellipse
            cx="100"
            cy="100"
            rx="90"
            ry="30"
            transform="rotate(35 100 100)"
            stroke={`url(#${orbitGradientId})`}
            strokeWidth="4"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="90"
            ry="30"
            transform="rotate(-35 100 100)"
            stroke={`url(#${orbitGradientId})`}
            strokeWidth="4"
          />
          <circle cx="100" cy="100" r="40" fill={`url(#${sphereGradientId})`} />
          <circle cx="90" cy="90" r="15" fill="white" fillOpacity="0.2" />
        </svg>
      </span>
      <span className="brand-wordmark">
        <span className="brand-wordmark-main">{displayTitle}</span>
      </span>
    </span>
  );
}

export default BrandLogo;

