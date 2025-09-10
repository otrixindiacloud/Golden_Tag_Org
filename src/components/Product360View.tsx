"use client";

import { useCallback, useMemo, useRef, useState } from 'react';

interface Product360ViewProps {
  images: string[];
  alt: string;
  className?: string;
  onImageError?: (e: any) => void;
}

export default function Product360View({ 
  images, 
  alt, 
  className = "",
  onImageError 
}: Product360ViewProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Generate frames for smooth 360° rotation
  const frames = useMemo(() => {
    if (images.length === 0) return [];
    if (images.length === 1) {
      // If only one image, create a simple rotation effect
      return Array.from({ length: 36 }, (_, i) => ({
        src: images[0],
        angle: i * 10
      }));
    }
    // If multiple images, use them as frames
    return images.map((src, i) => ({
      src,
      angle: (i / images.length) * 360
    }));
  }, [images]);

  // Get current frame based on rotation
  const getCurrentFrame = useCallback(() => {
    if (frames.length === 0) return images[0] || '';
    
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    
    if (frames.length === 1) {
      return frames[0].src;
    }
    
    // Find the closest frame
    const closestFrame = frames.reduce((prev, curr) => 
      Math.abs(curr.angle - normalizedRotation) < Math.abs(prev.angle - normalizedRotation) 
        ? curr 
        : prev
    );
    
    return closestFrame.src;
  }, [frames, rotation, images]);

  // Mouse/Touch event handlers
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragStart;
    const sensitivity = 0.5;
    
    setRotation(prev => prev + delta * sensitivity);
    setDragStart(clientX);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Auto-rotation functionality
  const startAutoRotate = () => {
    if (autoRotateRef.current) return;
    
    setIsAutoRotating(true);
    autoRotateRef.current = setInterval(() => {
      setRotation(prev => prev + rotationSpeed);
    }, 50);
  };

  const stopAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
    setIsAutoRotating(false);
  };

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  // Reset rotation
  const resetRotation = () => {
    setRotation(0);
    stopAutoRotate();
  };

  // Handle image error
  const handleImageError = (e: any) => {
    if (onImageError) {
      onImageError(e);
    } else {
      e.target.src = '/placeholder.png';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={isAutoRotating ? stopAutoRotate : startAutoRotate}
          className={`p-2 rounded-full shadow-lg transition-colors ${
            isAutoRotating 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-white hover:bg-gray-100 text-gray-700'
          }`}
          title={isAutoRotating ? 'Stop auto-rotation' : 'Start auto-rotation'}
        >
          {isAutoRotating ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <button
          onClick={resetRotation}
          className="p-2 bg-white hover:bg-gray-100 text-gray-700 rounded-full shadow-lg transition-colors"
          title="Reset rotation"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Speed Control */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Rotation Speed
        </label>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={rotationSpeed}
          onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
          className="w-20"
        />
        <span className="text-xs text-gray-500 ml-2">{rotationSpeed}x</span>
      </div>

      {/* 360° View Container */}
      <div
        ref={containerRef}
        className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <img
            src={getCurrentFrame()}
            alt={alt}
            className="w-full h-full object-contain p-4"
            onError={handleImageError}
            draggable={false}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-white/90 px-3 py-1 rounded-full shadow-sm">
        {isDragging ? 'Dragging...' : isAutoRotating ? 'Auto-rotating...' : 'Drag to rotate 360°'}
      </div>

      {/* Frame Counter */}
      {frames.length > 1 && (
        <div className="absolute top-4 left-4 z-10 bg-white/90 rounded-lg px-3 py-1 text-xs text-gray-600">
          Frame: {Math.floor((rotation % 360) / (360 / frames.length)) + 1} / {frames.length}
        </div>
      )}

      {/* Cleanup effect */}
      {cleanup}
    </div>
  );
}
