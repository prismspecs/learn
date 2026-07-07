document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const homeSection = document.getElementById('home');
  const courseDetails = document.querySelectorAll('.course-detail');
  const bioToggleBtn = document.getElementById('bio-toggle');
  const bioDrawer = document.getElementById('bio-drawer');
  const bioOverlay = document.getElementById('bio-overlay');
  const bioCloseBtn = document.getElementById('bio-close');
  const themeToggleBtn = document.getElementById('theme-toggle');

  // --- Theme Management ---
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Update theme toggle icon/text if needed
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // --- Bio Drawer Toggling ---
  const openBio = () => {
    bioDrawer.classList.add('active');
    bioOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    bioCloseBtn.focus();
  };

  const closeBio = () => {
    bioDrawer.classList.remove('active');
    bioOverlay.classList.remove('active');
    document.body.style.overflow = '';
    bioToggleBtn.focus();
  };

  if (bioToggleBtn) bioToggleBtn.addEventListener('click', openBio);
  if (bioCloseBtn) bioCloseBtn.addEventListener('click', closeBio);
  if (bioOverlay) bioOverlay.addEventListener('click', closeBio);

  // Close bio on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bioDrawer.classList.contains('active')) {
      closeBio();
    }
  });

  // --- Routing & Transitions ---
  const handleRouting = () => {
    const hash = window.location.hash;
    
    // Determine target course section
    let targetSection = null;
    if (hash) {
      targetSection = document.querySelector(hash);
    }

    // If a valid course detail section is targeted
    if (targetSection && targetSection.classList.contains('course-detail')) {
      // Fade out home
      homeSection.classList.add('fade-out');
      
      // Fade out all details
      courseDetails.forEach(detail => {
        detail.classList.add('fade-out');
        detail.style.display = 'none';
      });

      // Transition timeout
      setTimeout(() => {
        homeSection.style.display = 'none';
        
        targetSection.style.display = 'grid';
        // Force reflow for transition
        void targetSection.offsetHeight;
        targetSection.classList.remove('fade-out');
        targetSection.classList.add('fade-in');
        
        // Scroll to top of window when changing pages
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 150);

    } else {
      // Show Home, hide details
      courseDetails.forEach(detail => {
        detail.classList.add('fade-out');
        detail.style.display = 'none';
      });

      setTimeout(() => {
        homeSection.style.display = 'block';
        void homeSection.offsetHeight;
        homeSection.classList.remove('fade-out');
        homeSection.classList.add('fade-in');
      }, 150);
    }
  };

  // Listen to hashchange
  window.addEventListener('hashchange', handleRouting);
  
  // Initial check
  handleRouting();
});
