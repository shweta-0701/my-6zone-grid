"use client";

import { useEffect, useRef } from "react";

export default function DisclaimerSection({ disclaimer }) {
  const disclaimerRef = useRef(null);

  useEffect(() => {
    if (disclaimerRef.current && disclaimer) {
      const styles = {
        backgroundColor: disclaimer.disclaimer_background_color,
        color: disclaimer.disclaimer_text_color,
        fontFamily: disclaimer.disclaimer_font_family,
        fontWeight: disclaimer.disclaimer_font_weight,
        fontSize: disclaimer.disclaimer_font_size,
        overflow: disclaimer.disclaimer_overflow,
      };

      Object.assign(disclaimerRef.current.style, styles);
    }
  }, [disclaimer]);

  if (!disclaimer?.disclaimer_text_one) {
    return null;
  }

  return (
    <div
      ref={disclaimerRef}
      id="disclaimer"
      className="slick-sliders position-fixed w-full bottom-0"
    >
      <marquee scrollamount="2" behavior="scroll" direction="left">
        {disclaimer.disclaimer_text_one}
      </marquee>
    </div>
  );
}
