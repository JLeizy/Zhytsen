document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header');
  let isExpanded = false;

  function expandHeader() {
    if (!isExpanded) {
      header.classList.add('expanded');
      isExpanded = true;

      header.removeEventListener('mouseenter', expandHeader);
      window.removeEventListener('scroll', expandHeaderOnScroll);
    }
  }

  function expandHeaderOnScroll() {
    if (window.scrollY > 0) {
      expandHeader();
    }
  }


  header.addEventListener('mouseenter', expandHeader);
  window.addEventListener('scroll', expandHeaderOnScroll);

  if (window.scrollY > 0) {
    expandHeader();
  }


  window.addEventListener('resize', function() {
    if (!isExpanded && window.scrollY > 0) {
      expandHeader();
    }
  });
});


function smoothScroll(target) {
  const element = document.querySelector(target);
  const headerHeight = document.querySelector('.header').offsetHeight;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}


function createParticles() {
  const container = document.querySelector('.particles-container');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${6 + Math.random() * 6}s infinite`;
    container.appendChild(particle);
  }
}


document.addEventListener('mousemove', (e) => {
  const particles = document.querySelectorAll('.particle');
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  particles.forEach(particle => {
    const rect = particle.getBoundingClientRect();
    const particleX = rect.left + rect.width / 2;
    const particleY = rect.top + rect.height / 2;
    
    const deltaX = mouseX - particleX;
    const deltaY = mouseY - particleY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < 150) {
      const angle = Math.atan2(deltaY, deltaX);
      const force = (150 - distance) / 5;
      particle.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`;
    } else {
      particle.style.transform = 'translate(0, 0)';
    }
  });
});


window.addEventListener('load', () => {
  createParticles();
});


window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 100);
})