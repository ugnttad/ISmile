import { useState } from 'react';

export default function ImageWithBlur({ src, alt, className = '', imageClassName = '', fit = 'cover', ...props }) {
  const [loaded, setLoaded] = useState(false);
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div className={`relative overflow-hidden bg-accent ${className}`}>
      {src && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-xl"
        />
      )}
      <div className="absolute inset-0 bg-white/18" />
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`relative h-full w-full ${fitClass} transition-all duration-700 ${loaded ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-md opacity-0'} ${imageClassName}`}
          {...props}
        />
      )}
    </div>
  );
}
