// Optimized lazy loading and WebP support
(() => {
  'use strict';

  // Cache WebP support check
  const webpSupported = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('webp') > 0;
  })();

  const convertToWebP = (img) => {
    if (!webpSupported || !img.src || img.src.includes('.webp')) return;
    
    const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const webpTest = new Image();
    
    webpTest.onload = () => img.src = webpSrc;
    webpTest.onerror = () => console.warn('WebP fallback failed for:', img.src);
    webpTest.src = webpSrc;
  };

  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src], img[srcset]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          convertToWebP(img);
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));
  };

  document.addEventListener('DOMContentLoaded', lazyLoadImages);
})();