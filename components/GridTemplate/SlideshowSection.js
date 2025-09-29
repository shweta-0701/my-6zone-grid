'use client';

import { useState, useEffect } from 'react';

export default function SlideshowSection({ media, speed }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imagesLoading, setImagesLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());
  const fadeSpeed = speed || 1000;
  const slideDelay = 7000;

  useEffect(() => {
    if (!media || media.length === 0) {
      setImagesLoading(false);
      return;
    }

    // Preload all images
    const imagePromises = media.map((mediaItem, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
          resolve();
        };
        img.onerror = () => {
          setImageErrors(prev => new Set([...prev, index]));
          resolve(); // Still resolve to not block other images
        };
        img.src = mediaItem.url;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoading(false);
    });
  }, [media]);

  useEffect(() => {
    if (!media || media.length <= 1 || imagesLoading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, slideDelay);

    return () => clearInterval(interval);
  }, [media, imagesLoading]);

  if (!media || media.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        backgroundColor: '#f8f9fa',
        color: '#6c757d'
      }}>
        No images available
      </div>
    );
  }

  // Show loader while images are loading
  if (imagesLoading) {
    return (
      <div 
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Loading slideshow images... ({loadedImages.size}/{media.length})
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="custom-fade-container"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      {media.map((mediaItem, index) => {
        const hasError = imageErrors.has(index);
        const isLoaded = loadedImages.has(index);
        
        return (
          <div
            key={index}
            className="fade-slide"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentIndex ? 1 : 0,
              transition: `opacity ${fadeSpeed}ms ease-in-out`,
              zIndex: index === currentIndex ? 2 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {hasError ? (
              // Error state for individual image
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: '#f8f9fa',
                border: '1px dashed #dee2e6',
                color: '#6c757d',
                padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
                <p>Failed to load image</p>
                <small style={{ wordBreak: 'break-all' }}>{mediaItem.url}</small>
              </div>
            ) : isLoaded ? (
              // Successfully loaded image
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${mediaItem.url})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ) : (
              // Loading state for individual image (fallback)
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div className="spinner"></div>
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                  Loading image...
                </p>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Loading progress indicator */}
      {loadedImages.size < media.length && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          {loadedImages.size}/{media.length} loaded
        </div>
      )}
    </div>
  );
}