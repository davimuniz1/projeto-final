document.addEventListener('DOMContentLoaded', function() {
  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;
  
  // Check for saved user preference or use system preference
  const savedMode = localStorage.getItem('darkMode');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
    htmlElement.classList.add('dark');
    darkModeToggle.checked = true;
  }
  
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'light');
    }
  });
  
  // Mobile Menu Toggle (would need HTML adjustment)
  const mobileMenuButton = document.querySelector('.md\\:hidden button');
  const mobileMenu = document.querySelector('.md\\:hidden + div');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
  
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const width = skillBar.style.width;
        skillBar.style.width = '0';
        
        setTimeout(() => {
          skillBar.style.width = width;
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  };
  
  const skillBarObserver = new IntersectionObserver(animateSkillBars, {
    threshold: 0.5
  });
  
  skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
  });
  
  // Form submission handling
  const contactForm = document.querySelector('#contact form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', { name, email, message });
      
      // Show success message
      alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Scroll reveal animation for sections
  const sections = document.querySelectorAll('section');
  
  const revealSections = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  };
  
  const sectionObserver = new IntersectionObserver(revealSections, {
    threshold: 0.1
  });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Back to top button (would need HTML addition)
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopButton.className = 'fixed bottom-6 right-6 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center z-50 hidden';
  backToTopButton.id = 'backToTop';
  document.body.appendChild(backToTopButton);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('hidden');
    } else {
      backToTopButton.classList.add('hidden');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Project image hover effect enhancement
  const projectImages = document.querySelectorAll('.relative.group img');
  
  projectImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.parentNode.querySelector('.absolute.inset-0').classList.add('opacity-80');
      this.parentNode.querySelector('.absolute.bottom-0').classList.add('opacity-100');
    });
    
    img.addEventListener('mouseleave', function() {
      this.parentNode.querySelector('.absolute.inset-0').classList.remove('opacity-80');
      this.parentNode.querySelector('.absolute.bottom-0').classList.remove('opacity-100');
    });
  });
});