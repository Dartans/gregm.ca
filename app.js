// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB84gZTrgn-Xq68674mvxOdKabZnDnxpv8",
  authDomain: "gregm-2dab4.firebaseapp.com",
  projectId: "gregm-2dab4",
  storageBucket: "gregm-2dab4.firebasestorage.app",
  messagingSenderId: "780281744883",
  appId: "G-WBPJYPQT7D",
};

// Wait for Firebase to be available and initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  // Wait a bit for Firebase modules to load
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Initialize Firebase
  const app = window.firebase.initializeApp(firebaseConfig);
  const db = window.firebase.getFirestore(app);

  // DOM Elements
  const ticketForm = document.getElementById('ticketForm');
  const submissionMessage = document.getElementById('submissionMessage');
  const submitButton = document.getElementById('submitButton');
  const emailInput = document.getElementById('email');
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  const currentYearSpan = document.getElementById('currentYear');

  // Set current year in footer
  currentYearSpan.textContent = new Date().getFullYear();

  // Helper function to show messages
  function showMessage(text, type) {
    submissionMessage.textContent = text;
    submissionMessage.className = `submission-message ${type}`;
    submissionMessage.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        submissionMessage.style.display = 'none';
      }, 5000);
    }
  }

  // Form submission handler
  ticketForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!email || !name || !message) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }
    
    // Show submitting state
    showMessage('Submitting...', 'submitting');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    try {
      const ticketData = {
        email: email,
        name: name,
        message: message,
        createdAt: window.firebase.serverTimestamp(),
      };

      // The document ID will be the email address, as per your Firestore rules
      const ticketsCollection = window.firebase.collection(db, 'tickets');
      const ticketDocRef = window.firebase.doc(ticketsCollection, email);
      await window.firebase.setDoc(ticketDocRef, ticketData);

      showMessage('Ticket submitted successfully! I will reach out to you within 24 Hours at the email address provided.', 'success');
      
      // Clear form
      emailInput.value = '';
      nameInput.value = '';
      messageInput.value = '';
      
    } catch (error) {
      console.error("Error adding document: ", error);
      showMessage('You have already submitted a ticket. Please call or Txt +1-289-479-0468 for emergency assistance. Emergency rates of $150/h may apply', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Ticket';
    }
  });

  // Enhanced scroll animations and interactivity
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all sections for fade-in animations
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('fade-in-up');
      observer.observe(section);
    });

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
      card.classList.add('fade-in-up');
      observer.observe(card);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        if (scrolled <= heroHeight) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      });
    }
  }

  // Enhanced smooth scrolling for navigation links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Add loading animation to form submission
  function enhanceFormInteractivity() {
    const form = document.getElementById('ticketForm');
    const submitButton = document.getElementById('submitButton');
    
    if (form && submitButton) {
      form.addEventListener('submit', () => {
        submitButton.classList.add('loading');
      });
    }
  }

  // Initialize all enhancements
  initScrollAnimations();
  initSmoothScrolling();
  enhanceFormInteractivity();

  // Add fade-in animation for service cards when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe service cards and demo cards for animation
  document.querySelectorAll('.service-card, .demo-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Demo cards are now all visible in a grid layout
  // No carousel functionality needed
  const demoCards = document.querySelectorAll('.demo-card');
  
  // Add staggered animation entrance for demo cards
  if (demoCards.length > 0) {
    demoCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
      card.classList.add('fade-in-up');
      observer.observe(card);
    });
  }

  // Portfolio carousel functionality
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const portfolioNavDots = document.querySelectorAll('.portfolio-nav .nav-dot');
  let currentPortfolioSlide = 0;
  let portfolioSlideInterval;

  function showPortfolioSlide(index) {
    // Hide all portfolio cards
    portfolioCards.forEach(card => {
      card.classList.remove('active');
    });
    
    // Remove active from all nav dots
    portfolioNavDots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current card and activate nav dot
    if (portfolioCards[index]) {
      portfolioCards[index].classList.add('active');
    }
    if (portfolioNavDots[index]) {
      portfolioNavDots[index].classList.add('active');
    }
    
    currentPortfolioSlide = index;
  }

  function nextPortfolioSlide() {
    const nextIndex = (currentPortfolioSlide + 1) % portfolioCards.length;
    showPortfolioSlide(nextIndex);
  }

  function startPortfolioSlideshow() {
    portfolioSlideInterval = setInterval(nextPortfolioSlide, 5000); // Change slide every 5 seconds
  }

  function stopPortfolioSlideshow() {
    if (portfolioSlideInterval) {
      clearInterval(portfolioSlideInterval);
    }
  }

  // Initialize portfolio carousel if it exists
  if (portfolioCards.length > 0) {
    // Set up nav dot click handlers
    portfolioNavDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showPortfolioSlide(index);
        stopPortfolioSlideshow();
        setTimeout(startPortfolioSlideshow, 3000); // Restart slideshow after 3 seconds
      });
    });

    // Pause slideshow on hover
    const portfolioCarousel = document.querySelector('.portfolio-carousel');
    if (portfolioCarousel) {
      portfolioCarousel.addEventListener('mouseenter', stopPortfolioSlideshow);
      portfolioCarousel.addEventListener('mouseleave', startPortfolioSlideshow);
    }

    // Start the portfolio slideshow
    showPortfolioSlide(0);
    startPortfolioSlideshow();
  }

  // Mobile Menu Functionality
  function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!mobileMenuToggle || !navMenu || !navOverlay) return;

    function toggleMenu() {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      navOverlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close menu when overlay is clicked
    navOverlay.addEventListener('click', closeMenu);

    // Close menu when nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu on window resize if desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Mobile performance optimizations
  function optimizeForMobile() {
    // Debounce scroll events for better performance
    let scrollTimeout;
    const originalScrollHandler = window.addEventListener;
    
    function debounceScroll(callback, delay = 16) {
      return function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(callback, delay);
      };
    }
    
    // Reduce parallax on mobile for performance
    if (window.innerWidth <= 768) {
      const hero = document.querySelector('.hero');
      if (hero) {
        const debouncedParallax = debounceScroll(() => {
          const scrolled = window.pageYOffset;
          const heroHeight = hero.offsetHeight;
          if (scrolled <= heroHeight) {
            hero.style.transform = `translateY(${scrolled * 0.2}px)`;
          }
        });
        
        window.addEventListener('scroll', debouncedParallax, { passive: true });
      }
    }
    
    // Add touch feedback for mobile buttons
    const buttons = document.querySelectorAll('button, .cta-button, .nav-menu a');
    buttons.forEach(button => {
      button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      }, { passive: true });
      
      button.addEventListener('touchend', function() {
        this.style.transform = '';
      }, { passive: true });
    });
  }

  // Enhanced mobile menu with swipe gestures
  function addSwipeGestures() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu || window.innerWidth > 768) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    navMenu.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    navMenu.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      
      // If swipe right (closing gesture) and menu is open
      if (swipeDistance > 50 && navMenu.classList.contains('active')) {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navOverlay = document.querySelector('.nav-overlay');
        
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }

  // Loading screen functionality
  function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
      // Hide loading screen when page is fully loaded
      window.addEventListener('load', () => {
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.remove();
          }, 500);
        }, 500); // Show loading for at least 500ms
      });
      
      // Fallback: Hide loading screen after 3 seconds max
      setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.remove();
          }, 500);
        }
      }, 3000);
    }
  }

  // Initialize loading screen immediately
  initLoadingScreen();

  // Initialize mobile menu
  initMobileMenu();
  
  // Add mobile optimizations
  optimizeForMobile();
  addSwipeGestures();

  // Optimize for mobile performance
  optimizeForMobile();

  // Add swipe gestures for mobile menu
  addSwipeGestures();
});
