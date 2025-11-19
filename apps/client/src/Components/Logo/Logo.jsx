import React from 'react';
import styles from './Logo.module.css';

const Logo = ({ width = 40, height = 40, withText = true }) => {
  return (
    <div className={styles.container}>
      {/* The Icon SVG */}
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        {/* The 'I' (Stand) - Muted Grey */}
        <path 
          d="M32 42V54" 
          stroke="var(--text-muted)" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        <path 
          d="M22 54H42" 
          stroke="var(--text-muted)" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        
        {/* The 'A' (Mic Head) - Warm Gold */}
        <path 
          d="M32 10C26.4772 10 22 14.4772 22 20V32C22 37.5228 26.4772 42 32 42C37.5228 42 42 37.5228 42 32V20C42 14.4772 37.5228 10 32 10Z" 
          fill="var(--primary-glow)"
          stroke="var(--primary)"
          strokeWidth="3"
        />
        
        {/* The Mic Detail Line */}
        <path 
          d="M26 28H38" 
          stroke="var(--primary)" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </svg>

      {/* The Text */}
      {withText && (
        <div className={styles.text}>
          Intervu<span className={styles.accent}>.ai</span>
        </div>
      )}
    </div>
  );
};

export default Logo;