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

  // Smooth scrolling for navigation links
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

  // Observe service cards for animation
  document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});
