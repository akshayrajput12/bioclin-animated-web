/**
 * Utility functions to optimize scroll performance
 */

// Disable smooth scrolling during animations to improve performance
export function disableSmoothScrollTemporarily(durationMs = 1000): void {
  const html = document.documentElement;
  html.classList.add('disable-smooth-scroll');
  
  setTimeout(() => {
    html.classList.remove('disable-smooth-scroll');
  }, durationMs);
}

// Optimize image loading for expertise section
export function optimizeExpertiseImages(): void {
  // Find all expertise images
  const expertiseImages = document.querySelectorAll<HTMLImageElement>('.expertise-image');
  
  // Set loading priority based on visibility
  expertiseImages.forEach((img, index) => {
    // First image loads with higher priority
    if (index === 0) {
      img.setAttribute('fetchpriority', 'high');
    } else {
      img.setAttribute('fetchpriority', 'low');
    }
    
    // Add intersection observer to load images only when needed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          // Ensure the image is loaded
          if (image.dataset.src) {
            image.src = image.dataset.src;
            delete image.dataset.src;
          }
          // Disconnect after loading
          observer.unobserve(image);
        }
      });
    }, {
      rootMargin: '200px', // Load images when they're within 200px of viewport
    });
    
    observer.observe(img);
  });
}
