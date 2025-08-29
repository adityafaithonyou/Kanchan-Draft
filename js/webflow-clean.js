/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  'use strict';


  
  // Safe array operations
  const removeFromArray = (arr, index) => {
    if (Array.isArray(arr) && index >= 0 && index < arr.length) {
      return arr.splice(index, 1);
    }
    return arr;
  };

  // Webflow core functionality
  const Webflow = {
    api: {},
    ready: [],
    
    push(fn) {
      if (typeof fn === 'function') {
        if (document.readyState === 'loading') {
          this.ready.push(fn);
        } else {
          fn();
        }
      }
    },

    init() {
      // Initialize Webflow components safely
      this.initNavigation();
      this.initInteractions();
    },

    initNavigation() {
      // Safe navigation handling
      const navToggles = document.querySelectorAll('[data-nav-toggle]');
      navToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(toggle.getAttribute('data-nav-toggle'));
          if (target) {
            target.classList.toggle('open');
          }
        });
      });
    },

    initInteractions() {
      // Safe interaction handling with input validation
      const elements = document.querySelectorAll('[data-w-id]');
      elements.forEach(el => {
        const animation = el.getAttribute('data-animation');
        // Validate animation name against whitelist
        if (animation && /^[a-zA-Z0-9_-]+$/.test(animation) && this.animations[animation]) {
          this.animations[animation](el);
        }
      });
    },

    animations: {
      fadeIn(element) {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.3s ease';
        requestAnimationFrame(() => {
          element.style.opacity = '1';
        });
      }
    }
  };

  // Safe DOM ready handler
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      Webflow.init();
      Webflow.ready.forEach(fn => fn());
    });
  } else {
    Webflow.init();
  }

  // Export to global scope
  window.Webflow = Webflow;
})();