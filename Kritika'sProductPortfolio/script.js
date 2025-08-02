// DOM Elements
const mainPage = document.getElementById('mainPage');
const caseStudyDetails = [
  document.getElementById('caseStudy1'),
  document.getElementById('caseStudy2'),
  document.getElementById('caseStudy3'),
  document.getElementById('caseStudy4'),
  document.getElementById('caseStudy5'),
  document.getElementById('caseStudy6')
];

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Stop event propagation to prevent closing case studies
themeToggle.addEventListener('click', function(e) {
  e.stopPropagation();
});

// Check for saved theme preference or use system preference
let currentTheme = localStorage.getItem('theme');

if (!currentTheme) {
  currentTheme = 'light'; // Force light mode by default
  localStorage.setItem('theme', 'light');
}

document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', e => {
  const newTheme = e.matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Show Case Study Function with History API integration
function showCaseStudy(studyNumber) {
  // Hide main page
  mainPage.style.display = 'none';
  
  // Hide all case study details
  caseStudyDetails.forEach(study => {
    study.style.display = 'none';
  });
  
  // Show selected case study
  const selectedStudy = document.getElementById(`caseStudy${studyNumber}`);
  if (selectedStudy) {
    selectedStudy.style.display = 'block';
    // Scroll to top of the case study
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update browser history
    history.pushState({ caseStudy: studyNumber }, '', `#case-${studyNumber}`);
  }
}

// Go Back Function with History API integration
function goBack() {
  // If we have history, use browser back
  if (history.state) {
    history.back();
  } else {
    // Otherwise just show main page
    showMainPage();
  }
}

// Function to show main page (used in multiple places)
function showMainPage() {
  // Hide all case study details
  caseStudyDetails.forEach(study => {
    study.style.display = 'none';
  });
  
  // Show main page
  mainPage.style.display = 'block';
  // Scroll to top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update URL if needed
  if (window.location.hash) {
    history.pushState(null, '', ' ');
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.caseStudy) {
    // Show the case study from history
    showCaseStudy(event.state.caseStudy);
  } else {
    // Show main page
    showMainPage();
  }
});

// Check URL hash on load
window.addEventListener('DOMContentLoaded', () => {
  // Hide all case study details initially
  caseStudyDetails.forEach(study => {
    study.style.display = 'none';
  });
  
  // Check for hash in URL
  if (window.location.hash) {
    const studyNumber = window.location.hash.match(/#case-(\d+)/)?.[1];
    if (studyNumber && document.getElementById(`caseStudy${studyNumber}`)) {
      showCaseStudy(studyNumber);
    }
  }
});

// Close case study when clicking outside content (optional)
document.addEventListener('click', function(e) {
  if (mainPage.style.display === 'none' && 
      !e.target.closest('.case-study-detail') && 
      !e.target.closest('.case-study-card') &&
      !e.target.closest('#themeToggle')) {
    goBack();
  }
});