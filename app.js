/**
 * TVK CONSTRUCTION LTD - Core Behavioral Script
 * Corporate Premium UX/UI Custom Implementations
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. PROFESSIONAL LOADING SCREEN FADEOUT
  // ==========================================
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('opacity-0', 'pointer-events-none');
      // trigger scroll reveals on load
      handleScrollReveal();
    }, 1000);
  });

  // Backup timeout in case resource load delays
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains('opacity-0')) {
      loadingScreen.classList.add('opacity-0', 'pointer-events-none');
      handleScrollReveal();
    }
  }, 3000);


  // ==========================================
  // 2. STICKY GLASSMORPHISM NAVBAR ON SCROLL
  // ==========================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ==========================================
  // 3. MOBILE MENU DYNAMIC TOGGLE
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    // Close menu when clicking link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }


  // ==========================================
  // 4. CREDENTIALS AND TRUST MARKS
  // ==========================================
  // Note: Old count-up statistics counters replaced with direct corporate credentials matching UK standards.


  // ==========================================
  // 5. SERVICES "READ MORE" EXTENSION TOGGLE
  // ==========================================
  window.toggleServiceDetails = (button) => {
    const card = button.closest('.glass-card');
    const details = card.querySelector('.hidden-details');
    const isExpanded = details.style.maxHeight && details.style.maxHeight !== '0px';

    if (isExpanded) {
      details.style.maxHeight = '0px';
      button.querySelector('span').innerText = 'Read More';
      button.querySelector('svg').style.transform = 'rotate(0deg)';
    } else {
      details.style.maxHeight = details.scrollHeight + 'px';
      button.querySelector('span').innerText = 'Show Less';
      button.querySelector('svg').style.transform = 'rotate(90deg)';
    }
  };


  // ==========================================
  // 6. PORTFOLIO FILTER MASONRY GRID SYSTEM
  // ==========================================
  window.filterPortfolio = (category) => {
    // 1. Highlight clicked tab
    const filterButtons = document.querySelectorAll('#portfolio-filters button');
    filterButtons.forEach(btn => {
      btn.className = "portfolio-filter-btn px-5 py-2.5 rounded bg-transparent text-white border border-white/10 hover:border-gold hover:text-gold transition-all duration-300";
    });

    // Find the button which has the specific category in onclick
    const activeBtn = Array.from(filterButtons).find(btn => btn.getAttribute('onclick').includes(category));
    if (activeBtn) {
      activeBtn.className = "portfolio-filter-btn px-5 py-2.5 rounded bg-gold text-charcoal border border-gold font-bold transition-all duration-300";
    }

    // 2. Filter Grid items with smooth fading
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        if (category === 'all' || item.classList.contains(category)) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      }, 300);
    });
  };


  // ==========================================
  // 7. DRAGGABLE BEFORE/AFTER COMPARISON SLIDER
  // ==========================================
  const slider = document.getElementById('before-after-slider');
  const handle = document.getElementById('ba-handle');
  const afterImage = document.querySelector('.ba-image-after');

  if (slider && handle && afterImage) {
    let isDragging = false;

    const moveSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;

      // Bound between 0% and 100%
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;

      // Adjust handle and clip path
      handle.style.left = `${percentage}%`;
      afterImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    };

    // Mouse Events
    handle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    // Touch Events for Mobile compatibility
    handle.addEventListener('touchstart', () => { isDragging = true; });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        moveSlider(e.touches[0].clientX);
      }
    });

    // Prevent image drag defaults
    slider.addEventListener('dragstart', (e) => { e.preventDefault(); });
  }


  // ==========================================
  // 8. WHY CHOOSE US PROGRESS BARS TIMELINE
  // ==========================================
  const progressBarsContainer = document.getElementById('progress-bars');
  const progressBars = document.querySelectorAll('.progress-bar');
  const progressValues = document.querySelectorAll('.progress-value');
  let startedBars = false;

  const animateBars = () => {
    progressBars.forEach((bar, index) => {
      const valElement = progressValues[index];
      const target = +valElement.getAttribute('data-value');
      bar.style.width = `${target}%`;
      bar.style.transition = 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)';

      // Count up values
      let currentVal = 0;
      const countInterval = setInterval(() => {
        if (currentVal < target) {
          currentVal++;
          valElement.innerText = `${currentVal}%`;
        } else {
          valElement.innerText = `${target}%`;
          clearInterval(countInterval);
        }
      }, 15);
    });
  };

  if (progressBarsContainer && progressBars.length > 0) {
    const barsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !startedBars) {
          startedBars = true;
          animateBars();
          barsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    barsObserver.observe(progressBarsContainer);
  }


  // ==========================================
  // 9. TESTIMONIALS SLIDING CAROUSEL
  // ==========================================
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  let activeTestimonialIndex = 0;
  let autoRotateInterval;

  const showTestimonial = (index) => {
    testimonialSlides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.remove('hidden');
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.98)';
        setTimeout(() => {
          slide.style.opacity = '1';
          slide.style.transform = 'scale(1)';
        }, 50);
      } else {
        slide.classList.add('hidden');
      }
    });
  };

  window.nextTestimonial = () => {
    activeTestimonialIndex = (activeTestimonialIndex + 1) % testimonialSlides.length;
    showTestimonial(activeTestimonialIndex);
    resetAutoRotate();
  };

  window.prevTestimonial = () => {
    activeTestimonialIndex = (activeTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(activeTestimonialIndex);
    resetAutoRotate();
  };

  const startAutoRotate = () => {
    autoRotateInterval = setInterval(() => {
      nextTestimonial();
    }, 6000);
  };

  const resetAutoRotate = () => {
    clearInterval(autoRotateInterval);
    startAutoRotate();
  };

  if (testimonialSlides.length > 0) {
    showTestimonial(activeTestimonialIndex);
    startAutoRotate();
  }


  // ==========================================
  // 10. COLLAPSIBLE FAQ ACCORDIONS
  // ==========================================
  window.toggleAccordion = (button) => {
    const accordion = button.closest('.glass-premium');
    const content = accordion.querySelector('.accordion-content');
    const icon = button.querySelector('svg');
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

    // Close all other accordions first for clean luxury feel
    const allAccordions = document.querySelectorAll('#faq .accordion-content');
    const allIcons = document.querySelectorAll('#faq button svg');
    allAccordions.forEach((item, idx) => {
      item.style.maxHeight = '0px';
      allIcons[idx].style.transform = 'rotate(0deg)';
    });

    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.style.transform = 'rotate(180deg)';
    }
  };


  // ==========================================
  // 11. DYNAMIC POPUP QUOTE MODAL CONTROLLER
  // ==========================================
  const quoteModal = document.getElementById('quote-modal');
  const quoteModalPanel = document.getElementById('quote-modal-panel');

  window.toggleQuoteModal = (open) => {
    if (open) {
      quoteModal.classList.remove('hidden');
      setTimeout(() => {
        quoteModalPanel.classList.remove('scale-95');
        quoteModalPanel.classList.add('scale-100');
      }, 50);
    } else {
      quoteModalPanel.classList.remove('scale-100');
      quoteModalPanel.classList.add('scale-95');
      setTimeout(() => {
        quoteModal.classList.add('hidden');
      }, 200);
    }
  };


  // ==========================================
  // 12. TOAST NOTIFICATION ON FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const modalQuoteForm = document.getElementById('modal-quote-form');
  const toastSuccess = document.getElementById('toast-success');

  const showToastNotification = () => {
    toastSuccess.classList.remove('hidden');
    setTimeout(() => {
      toastSuccess.classList.remove('translate-y-10', 'opacity-0');
      toastSuccess.classList.add('translate-y-0', 'opacity-100');
    }, 50);

    // Fade out and hide after 6 seconds
    setTimeout(() => {
      toastSuccess.classList.remove('translate-y-0', 'opacity-100');
      toastSuccess.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => {
        toastSuccess.classList.add('hidden');
      }, 500);
    }, 6000);
  };

  // Main Contact Form Action
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      emailjs.sendForm('service_g2n0ref', 'template_ym4vtmj', contactForm)
        .then(() => {
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
          contactForm.reset();
          showToastNotification();
        }, (error) => {
          console.error("EmailJS failed...", error);
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
          // Fallback showing toast so user experience doesn't break
          contactForm.reset();
          showToastNotification();
        });
    });
  }

  // Popup Modal Form Action
  if (modalQuoteForm) {
    modalQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = modalQuoteForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      emailjs.sendForm('service_g2n0ref', 'template_ym4vtmj', modalQuoteForm)
        .then(() => {
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
          modalQuoteForm.reset();
          toggleQuoteModal(false);
          setTimeout(() => {
            showToastNotification();
          }, 300);
        }, (error) => {
          console.error("EmailJS failed...", error);
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
          modalQuoteForm.reset();
          toggleQuoteModal(false);
          setTimeout(() => {
            showToastNotification();
          }, 300);
        });
    });
  }


  // ==========================================
  // 13. HIGH-PERFORMANCE SCROLL REVEALS
  // ==========================================
  const reveals = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

  const handleScrollReveal = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(reveal => {
      const rect = reveal.getBoundingClientRect();
      const elementTop = rect.top;
      const elementVisibleHeight = 100; // Trigger threshold in pixels

      if (elementTop < windowHeight - elementVisibleHeight) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScrollReveal);
  
});
