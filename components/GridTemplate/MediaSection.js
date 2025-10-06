"use client";

import Image from "next/image";
import { useState } from "react";

export default function MediaSection({ src, type }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "auto",
    position: "relative",
  };

  const mediaStyle = {
    width: "100%",
    height: "auto",
    position: "relative",
    display: isLoading ? "none" : "block",
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Loader component
  const MediaLoader = () => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: isLoading ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        width: "100%",
      }}
    >
      <div className="spinner"></div>
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        Loading {type}...
      </p>
    </div>
  );

  // Error component
  const MediaError = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        backgroundColor: "#f8f9fa",
        border: "1px dashed #dee2e6",
        color: "#6c757d",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "10px" }}>⚠️</div>
      <p>Failed to load {type}</p>
      <small>{src}</small>
    </div>
  );

  if (type === "image") {
    return (
      <div style={containerStyle}>
        <MediaLoader />
        {hasError ? (
          <MediaError />
        ) : (
          <Image
            src={src}
            alt="Media content"
            width={800}
            height={600}
            className="img-fluid"
            style={{
              ...mediaStyle,
              zIndex: 9999,
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={true}
          />
        )}
      </div>
    );
  }

  if (type === "video") {
    return (
      <div style={containerStyle}>
        <MediaLoader />
        {hasError ? (
          <MediaError />
        ) : (
          <video
            src={src}
            autoPlay
            muted
            loop
            controls={false}
            style={{
              ...mediaStyle,
              zIndex: 0,
              objectFit: "cover",
            }}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onCanPlayThrough={handleVideoLoad}
          />
        )}
      </div>
    );
  }

  return <div>Unsupported media type</div>;
}
