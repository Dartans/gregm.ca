import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import './styles.css'; // Import the CSS file

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB84gZTrgn-Xq68674mvxOdKabZnDnxpv8",
  authDomain: "gregm-2dab4.firebaseapp.com",
  projectId: "gregm-2dab4",
  storageBucket: "gregm-2dab4.firebasestorage.app",
  messagingSenderId: "780281744883",
  appId: "G-WBPJYPQT7D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ticketsCollection = collection(db, 'tickets');

function TicketSubmissionForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      const ticketData = {
        email: email,
        name: name,
        message: message,
        createdAt: serverTimestamp(),
      };

      // The document ID will be the email address, as per your Firestore rules
      const ticketDocRef = doc(ticketsCollection, email);
      await setDoc(ticketDocRef, ticketData);

      setSubmissionStatus('success');
      setEmail('');
      setName('');
      setMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmissionStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      {submissionStatus === 'success' && (
        <p className="success-message">Ticket submitted successfully! I will reach out to you within 24 Hours at the email address provided.</p>
      )}
      {submissionStatus === 'error' && (
        <p className="error-message">You have already submitted a ticket. Please call or Txt +1-289-479-0468 for emergency assistance. Emergency rates of $150/h may apply</p>
      )}
      {submissionStatus === 'submitting' && (
        <p>Submitting...</p>
      )}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Ticket</button>
    </form>
  );
}

function App() {
  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="logo">
          GM<span className="logo-accent">Tech</span>
        </div>
        <nav>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Greg Mueller: Your Partner in IT Solutions
          </h1>
          <p className="hero-description">
            Providing expert support in networking, cloud infrastructure, web development, and IT management to optimize your technology and drive business growth.
          </p>
          <a href="#services" className="cta-button">
            Explore My Services
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about">
        <h2>About Greg Mueller</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm an experienced IT professional dedicated to delivering effective solutions for businesses of all sizes. My expertise spans network infrastructure, cloud systems, web development, and IT support. I'm passionate about using technology to solve complex problems and drive your success.
            </p>
            <p>
              With strong communication and problem-solving skills developed through years of hands-on experience, I'm committed to providing exceptional service and building lasting partnerships with my clients.
            </p>
          </div>
          <div className="skills-highlight">
            <h3>Key Skills</h3>
            <ul>
              <li>Network Architecture & Security</li>
              <li>Cloud Solutions (Azure)</li>
              <li>Web Development & Hosting</li>
              <li>System Administration & Automation</li>
              <li>Database Management (SQL)</li>
              <li>IT Strategy & Consulting</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <h2>Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <i className="fas fa-network-wired service-icon"></i>
            <h3>Network & Infrastructure</h3>
            <p>
              Design, implementation, and maintenance of LANs/WANs, server setup, network security, and troubleshooting.
            </p>
            <p className="long-tail-keywords">
              Keywords: cabling, datacentre networks, web servers, network traffic, security, disaster recovery, network connectivity, performance.
            </p>
          </div>
          <div className="service-card">
            <i className="fas fa-cloud service-icon"></i>
            <h3>Cloud Solutions</h3>
            <p>
              Azure deployment and management, cloud security, and VDI solutions for modern workplaces.
            </p>
            <p className="long-tail-keywords">
              Keywords: Azure, Cloud security, VDI PCoIP, cloud migration.
            </p>
          </div>
          <div className="service-card">
            <i className="fas fa-code service-icon"></i>
            <h3>Web Development</h3>
            <p>
              Custom website development, hosting solutions, and web application consulting for your online presence.
            </p>
            <p className="long-tail-keywords">
              Keywords: website development, web hosting, app development, e-commerce, online portals.
            </p>
          </div>
          <div className="service-card">
            <i className="fas fa-tools service-icon"></i>
            <h3>IT Consulting</h3>
            <p>
              Strategic IT planning, system optimization, software implementation, and process automation.
            </p>
            <p className="long-tail-keywords">
              Keywords: IT strategy, system analysis, process automation, software implementation, technical consultation.
            </p>
          </div>
          <div className="service-card">
            <i className="fas fa-database service-icon"></i>
            <h3>Database Administration</h3>
            <p>
              Database support (SQL), backup and recovery, and data management solutions.
            </p>
            <p className="long-tail-keywords">
              Keywords: SQL, MSSQL EXPRESS, FOXCOM, database management, backup, disaster recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get in Touch</h2>
        <TicketSubmissionForm />
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Greg Mueller Consulting</p>
        {/* Add links to privacy policy, etc., if needed */}
      </footer>
    </div>
  );
}

export default App;