'use client';

import { useEffect, useRef } from 'react';
import MenuSection from './MenuSection';
import MediaSection from './MediaSection';
import SlideshowSection from './SlideshowSection';

export default function DynamicSection({ sectionId, zone, zoneData, dataIdx }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current && zoneData) {
      applyZoneBackground(zoneData[dataIdx], sectionRef.current);
    }
  }, [zoneData, dataIdx]);

  const renderContent = () => {
    switch (zone.zone_type) {
      case 'Menu':
        return <MenuSection sections={zone.sections || []} />;
      case 'Image':
        return <MediaSection src={zone.image_link || ''} type="image" />;
      case 'Video':
        return <MediaSection src={zone.video_link || ''} type="video" />;
      case 'Slideshow':
        return <SlideshowSection media={zone.media || []} speed={zone.speed} />;
      default:
        return <div>Unknown zone type: {zone.zone_type}</div>;
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="dynamic-section col-md-4" 
      id={sectionId}
    >
      {renderContent()}
    </div>
  );
}

function applyZoneBackground(zone, element) {
  if (!zone) return;
  
  element.style.background = '';
  element.style.position = 'relative';

  if (zone.zone_background_type === 'Color') {
    element.style.backgroundColor = zone.zone_background_color || '';
  } else if (zone.zone_background_type === 'Image') {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      #${element.id}::before {
        content: "";
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background-image: url(${zone.zone_background_image});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0.1;
        z-index: 1;
      }
    `;
    document.head.appendChild(styleSheet);
  } else if (zone.zone_background_type === 'Gradient') {
    element.style.background = 
      `linear-gradient(to right, ${zone.gradiant_start_color || "transparent"}, ${zone.gradiant_end_color || "transparent"})`;
  }
}