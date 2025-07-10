// script.js
// DOM Elements


// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Stop event propagation to prevent closing case studies
themeToggle.addEventListener('click', function(e) {
  e.stopPropagation(); // This prevents the event from bubbling up
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

// Modify your existing click handler to ignore clicks on the theme toggle
document.addEventListener('click', function(e) {
  // Check if click was on theme toggle or its children
  if (e.target.closest('#themeToggle') || e.target.closest('.theme-toggle')) {
    return; // Do nothing if click was on theme toggle
  }
  
  if (mainPage.style.display === 'none' && 
      !e.target.closest('.case-study-detail') && 
      !e.target.closest('.case-study-card')) {
    goBack();
  }
});
const mainPage = document.getElementById('mainPage');
const caseStudyDetails = [
  document.getElementById('caseStudy1'),
  document.getElementById('caseStudy2'),
  document.getElementById('caseStudy3'),
  document.getElementById('caseStudy4'),
  document.getElementById('caseStudy5'),
  document.getElementById('caseStudy6')
];

// Show Case Study Function
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
  }
}

// Go Back Function
function goBack() {
  // Hide all case study details
  caseStudyDetails.forEach(study => {
    study.style.display = 'none';
  });
  
  // Show main page
  mainPage.style.display = 'block';
  // Scroll to top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close case study when clicking outside content (optional)
document.addEventListener('click', function(e) {
  if (mainPage.style.display === 'none' && 
      !e.target.closest('.case-study-detail') && 
      !e.target.closest('.case-study-card')) {
    goBack();
  }
});

// Initialize - hide all case study details on load
window.addEventListener('DOMContentLoaded', () => {
  caseStudyDetails.forEach(study => {
    study.style.display = 'none';
  });
});
