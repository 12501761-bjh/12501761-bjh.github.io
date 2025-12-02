// Navigation items and their corresponding sections
const navItems = [
  { element: document.querySelector('.text-wrapper-41'), section: '.home-container', name: 'Home' },
  { element: document.querySelector('.text-wrapper-42'), section: '.projects-container', name: 'Projects' },
  { element: document.querySelector('.text-wrapper-43'), section: '.blogs-container', name: 'Blogs' },
  { element: document.querySelector('.text-wrapper-44'), section: '.contact-container', name: 'Contact' }
];

const buttonBar = document.querySelector('.button-bar');

// Function to move button bar to a specific nav item
function moveButtonBar(navItem) {
  const navElement = navItem.element;
  const navRect = navElement.getBoundingClientRect();
  const headerRect = document.querySelector('.header').getBoundingClientRect();
  
  const leftPosition = navRect.left - headerRect.left;
  const width = navRect.width;
  
  buttonBar.style.left = `${leftPosition}px`;
  buttonBar.style.width = `${width}px`;
}

// Function to get current section based on scroll position
function getCurrentSection() {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  
  for (let i = navItems.length - 1; i >= 0; i--) {
    const section = document.querySelector(navItems[i].section);
    if (section) {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop) {
        return navItems[i];
      }
    }
  }
  
  return navItems[0];
}

// Update button bar position on scroll
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentSection = getCurrentSection();
      moveButtonBar(currentSection);
      ticking = false;
    });
    ticking = true;
  }
});

// Add click handlers to navigation items
navItems.forEach((navItem, index) => {
  navItem.element.style.cursor = 'pointer';
  
  navItem.element.addEventListener('click', (e) => {
    e.preventDefault();
    
    const section = document.querySelector(navItem.section);
    if (section) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const sectionTop = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      
      // Immediately update button bar position
      moveButtonBar(navItem);
    }
  });
});

// Initialize button bar position on page load
window.addEventListener('load', () => {
  const currentSection = getCurrentSection();
  moveButtonBar(currentSection);
});

// Also update on resize
window.addEventListener('resize', () => {
  const currentSection = getCurrentSection();
  moveButtonBar(currentSection);
});

// Function to add click animation to buttons
function addButtonClickAnimation(button) {
  button.addEventListener('click', () => {
    button.style.transform = 'scale(0.85)';
    button.style.filter = 'brightness(0.8)';
    
    setTimeout(() => {
      button.style.transform = 'scale(1.05)';
      button.style.filter = 'brightness(1.2)';
    }, 100);
    
    setTimeout(() => {
      button.style.transform = 'scale(1)';
      button.style.filter = 'brightness(1)';
    }, 250);
  });
}

// Resume download functionality
const resumeButton = document.querySelector('.download-resume');

resumeButton.addEventListener('click', () => {
  
  // Create resume content
  const resumeContent = `다운로드가 정상 작동합니다.
	${new Date().toLocaleDateString()}
`;
  
  // Create blob and download
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Resume_example.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
});

// Add click animation to resume button
addButtonClickAnimation(resumeButton);

// Add click animation to project buttons
const githubButton = document.querySelector('.go-github-button');
const expressionButton = document.querySelector('.go-expression-button');
const sendMessageButton = document.querySelector('.send-message-button');

if (githubButton) addButtonClickAnimation(githubButton);
if (expressionButton) {
  addButtonClickAnimation(expressionButton);
  expressionButton.addEventListener('click', () => {
    alert('The service is being prepared. Please wait');
  });
}
if (sendMessageButton) {
  addButtonClickAnimation(sendMessageButton);
  sendMessageButton.addEventListener('click', () => {
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const messageInput = document.getElementById('message-input');
    
    // Show confirmation popup
    alert('Message sent successfully!');
    
    // Clear all form fields
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';
  });
}

// Add click animation to all Read More buttons in Blogs section
const readMoreButtons = [
  document.querySelector('.button-readmore'),
  document.querySelector('.butoon-readmore'),
  document.querySelector('.div-wrapper')
];

readMoreButtons.forEach(button => {
  if (button) addButtonClickAnimation(button);
});
