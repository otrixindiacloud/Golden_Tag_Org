import React from 'react';

interface GoldenTagSVGLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function GoldenTagSVGLogo({ 
  width = 300, 
  height = 120, 
  className = "" 
}: GoldenTagSVGLogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 300 120" 
      xmlns="http://www.w3.org/2000/svg"
      className={`golden-tag-logo ${className}`}
    >
      {/* Decorative Frame */}
      <g stroke="#CFA46D" strokeWidth="2" fill="none">
        {/* Outer decorative border */}
        <rect x="20" y="25" width="260" height="70" rx="8" ry="8"/>
        
        {/* Inner decorative border */}
        <rect x="28" y="33" width="244" height="54" rx="4" ry="4"/>
        
        {/* Corner decorations */}
        <circle cx="35" cy="40" r="3" fill="#CFA46D"/>
        <circle cx="265" cy="40" r="3" fill="#CFA46D"/>
        <circle cx="35" cy="80" r="3" fill="#CFA46D"/>
        <circle cx="265" cy="80" r="3" fill="#CFA46D"/>
        
        {/* Side decorative elements */}
        <line x1="20" y1="45" x2="12" y2="45" strokeWidth="1.5"/>
        <line x1="20" y1="60" x2="12" y2="60" strokeWidth="1.5"/>
        <line x1="20" y1="75" x2="12" y2="75" strokeWidth="1.5"/>
        
        <line x1="280" y1="45" x2="288" y2="45" strokeWidth="1.5"/>
        <line x1="280" y1="60" x2="288" y2="60" strokeWidth="1.5"/>
        <line x1="280" y1="75" x2="288" y2="75" strokeWidth="1.5"/>
      </g>
      
      {/* Decorative Bow/Ribbon at top center */}
      <g transform="translate(150, 15)">
        {/* Bow ribbon */}
        <path d="M-15,-5 Q-20,-8 -18,-12 Q-15,-15 -10,-12 Q-5,-10 0,-12 Q5,-10 10,-12 Q15,-15 18,-12 Q20,-8 15,-5 Q10,-3 5,-5 Q0,-7 -5,-5 Q-10,-3 -15,-5 Z" 
              fill="#CFA46D" stroke="#CFA46D" strokeWidth="0.5"/>
        
        {/* Bow center knot */}
        <ellipse cx="0" cy="-7" rx="4" ry="3" fill="#CFA46D"/>
        
        {/* Bow tails */}
        <path d="M-12,-5 Q-15,0 -12,3 Q-8,0 -12,-5" fill="#CFA46D"/>
        <path d="M12,-5 Q15,0 12,3 Q8,0 12,-5" fill="#CFA46D"/>
      </g>
      
      {/* Main Text: GOLDEN TAG */}
      <text 
        x="150" 
        y="50" 
        textAnchor="middle" 
        fontFamily="serif, Times, 'Times New Roman'" 
        fontSize="18" 
        fontWeight="bold" 
        letterSpacing="3px"
        className="logo-text text-black dark:text-white"
        fill="currentColor"
      >
        GOLDEN TAG
      </text>
      
      {/* Subtitle: CORPORATE GIFTS */}
      <text 
        x="150" 
        y="72" 
        textAnchor="middle" 
        fontFamily="serif, Times, 'Times New Roman'" 
        fontSize="10" 
        fontWeight="normal" 
        letterSpacing="2px"
        className="logo-subtitle text-black dark:text-white"
        fill="currentColor" 
        opacity="0.8"
      >
        CORPORATE GIFTS
      </text>
      
      {/* Decorative flourishes */}
      <g stroke="#CFA46D" strokeWidth="1" fill="none">
        {/* Left flourish */}
        <path d="M45,60 Q50,55 55,60 Q60,65 55,60 Q50,55 45,60" opacity="0.6"/>
        
        {/* Right flourish */}
        <path d="M245,60 Q250,55 255,60 Q260,65 255,60 Q250,55 245,60" opacity="0.6"/>
        
        {/* Center divider */}
        <line x1="120" y1="58" x2="130" y2="58" strokeWidth="0.5" opacity="0.5"/>
        <line x1="170" y1="58" x2="180" y2="58" strokeWidth="0.5" opacity="0.5"/>
      </g>
      
      {/* Optional: Year or establishment text */}
      <text 
        x="150" 
        y="87" 
        textAnchor="middle" 
        fontFamily="serif, Times, 'Times New Roman'" 
        fontSize="8" 
        fontWeight="normal" 
        letterSpacing="1px"
        fill="#CFA46D" 
        opacity="0.7"
      >
        EST. 2015
      </text>
    </svg>
  );
}
