"use client";
import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';

export type ProductGalleryImage = {
  src: string;
  alt?: string;
};

type ProductGalleryProps = {
  images?: ProductGalleryImage[];
  coverImage: string;
  alt: string;
  spinFrames?: string[]; // ordered left→right frames for 360°
};

export default function ProductGallery({ images, coverImage, alt, spinFrames }: ProductGalleryProps) {
  const galleryImages = useMemo(() => {
    const list = images && images.length > 0 ? images : [{ src: coverImage, alt }];
    return list;
  }, [images, coverImage, alt]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  const hasSpin = (spinFrames?.length ?? 0) > 0;

  const handleImageError = (e: any) => {
    e.target.src = '/images/placeholder.png';
  };

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!hasSpin) return;
    isDraggingRef.current = true;
    // @ts-ignore
    lastXRef.current = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!hasSpin || !isDraggingRef.current) return;
    // @ts-ignore
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const delta = clientX - lastXRef.current;
    lastXRef.current = clientX;
    setAngle((prev) => prev + delta * 0.5);
  };
  const onUp = () => { isDraggingRef.current = false; };

  const currentSrc = useMemo(() => {
    if (hasSpin) {
      const frames = spinFrames as string[];
      const count = frames.length;
      const normalized = ((Math.round(angle / 5) % count) + count) % count; // every ~5deg next frame
      return frames[normalized];
    }
    return galleryImages[activeIndex]?.src ?? coverImage;
  }, [activeIndex, angle, coverImage, galleryImages, hasSpin, spinFrames]);

  const renderThumb = useCallback((img: ProductGalleryImage, idx: number) => (
    <button
      key={idx}
      onClick={() => setActiveIndex(idx)}
      className={`border rounded overflow-hidden w-16 h-16 flex items-center justify-center ${idx === activeIndex ? 'border-amber-500' : 'border-gray-200'}`}
      aria-label={`Show image ${idx + 1}`}
    >
      <Image src={img.src} alt={img.alt || alt} width={64} height={64} className="object-contain" onError={handleImageError} />
    </button>
  ), [activeIndex, alt]);

  return (
    <div className="w-full">
      <div
        onMouseDown={onDown as any}
        onMouseMove={onMove as any}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={onDown as any}
        onTouchMove={onMove as any}
        onTouchEnd={onUp}
        className="relative w-full max-w-xl mx-auto select-none"
        style={{ perspective: 1000 }}
      >
        <div className="rounded-lg overflow-hidden bg-white" style={{ transformStyle: 'preserve-3d', transform: hasSpin ? `rotateY(${angle}deg)` : undefined }}>
          <Image src={currentSrc} alt={alt} width={700} height={700} className="object-contain w-full h-auto" onError={handleImageError} />
        </div>
        {hasSpin && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-white/70 px-2 py-1 rounded">
            Drag for 360° view
          </div>
        )}
      </div>

      {!hasSpin && galleryImages.length > 1 && (
        <div className="mt-3 flex gap-2 justify-center flex-wrap">
          {galleryImages.map(renderThumb)}
        </div>
      )}
    </div>
  );
}


