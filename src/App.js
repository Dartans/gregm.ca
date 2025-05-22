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
            <li><a href="#marketing-insights">Marketing Insights</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock Peak Performance: Your IT Partner for Growth & Efficiency
          </h1>
          <p className="hero-description">
            Achieve cost savings, increased efficiency, and scalable solutions with expert IT support in networking, cloud infrastructure, web development, and strategic IT management. Let's optimize your technology for lasting business success and peace of mind.
          </p>
          <div className="hero-cta-buttons">
            <a href="#services" className="cta-button">
              Explore My Services
            </a>
            {/* Greg: Replace # with your booking service URL */}
            <a href="#contact" className="cta-button cta-button-secondary">
              Book Your Free 15-Min Consultation
            </a>
          </div>
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

      {/* Services Section - Restructured */}
      <section id="services" className="services">
        <h2>Transform Your Business with Our Tailored IT Packages</h2>
        <p className="services-intro">
          From foundational support to comprehensive modernization, we offer tiered packages designed to meet your specific business needs, ensuring cost savings, increased efficiency, and scalable growth.
        </p>

        <div className="service-packages">
          {/* Package 1: Essential IT Support & Security */}
          <div className="service-package-card">
            <i className="fas fa-shield-alt service-icon"></i>
            <h3>Essential IT Support & Security</h3>
            <p className="package-description">
              Solidify your IT foundation with reliable network management, proactive security measures, and robust data protection for uninterrupted core operations and peace of mind.
            </p>
            <h4>Key Deliverables:</h4>
            <ul>
              <li>Network health monitoring & optimization</li>
              <li>Security patching & threat management</li>
              <li>Regular data backups & recovery plans</li>
              <li>LAN/WAN design, setup, and support</li>
              <li>Secure SQL database administration</li>
            </ul>
            <h4>Core Benefits:</h4>
            <ul>
              <li><strong>Stable & Secure Operations:</strong> Minimize downtime and protect against threats.</li>
              <li><strong>Data Integrity:</strong> Ensure your critical information is safe and accessible.</li>
              <li><strong>Peace of Mind:</strong> Focus on your business, knowing your IT is handled.</li>
            </ul>
          </div>

          {/* Package 2: Business Growth & Optimization Package */}
          <div className="service-package-card">
            <i className="fas fa-chart-line service-icon"></i>
            <h3>Business Growth & Optimization</h3>
            <p className="package-description">
              Elevate your business with scalable cloud solutions, engaging web presence, and strategic IT consulting aimed at boosting efficiency and driving growth.
            </p>
            <h4>Key Deliverables:</h4>
            <ul>
              <li>Azure cloud migration, deployment & management</li>
              <li>Custom website & web application development</li>
              <li>VDI (Virtual Desktop Infrastructure) solutions</li>
              <li>Process automation consulting & implementation</li>
              <li>IT system optimization for performance</li>
            </ul>
            <h4>Core Benefits:</h4>
            <ul>
              <li><strong>Increased Efficiency:</strong> Streamline operations with cloud and automation.</li>
              <li><strong>Scalable Solutions:</strong> Adapt your IT to your business growth trajectory.</li>
              <li><strong>Enhanced Online Presence:</strong> Drive customer engagement and market reach.</li>
              <li><strong>Cost Savings:</strong> Optimize resource utilization and reduce operational overhead.</li>
            </ul>
          </div>

          {/* Package 3: Comprehensive Modernization & Strategy */}
          <div className="service-package-card">
            <i className="fas fa-cogs service-icon"></i>
            <h3>Comprehensive Modernization & Strategy</h3>
            <p className="package-description">
              Achieve peak performance with a complete IT overhaul. This all-inclusive package offers strategic planning, advanced technology solutions, and dedicated partnership for transformative results.
            </p>
            <h4>Key Deliverables:</h4>
            <ul>
              <li>Full IT infrastructure strategy development</li>
              <li>Advanced Azure cloud architecture & security</li>
              <li>Custom enterprise application development</li>
              <li>Comprehensive security audits & compliance</li>
              <li>Ongoing IT management, support, and strategic consulting</li>
            </ul>
            <h4>Core Benefits:</h4>
            <ul>
              <li><strong>Peak Operational Performance:</strong> Maximize efficiency across all systems.</li>
              <li><strong>Strategic Cost Savings:</strong> Long-term financial benefits from optimized IT.</li>
              <li><strong>Future-Proof Infrastructure:</strong> Stay ahead with cutting-edge technology.</li>
              <li><strong>Dedicated IT Partnership:</strong> Expert guidance for sustained success and peace of mind.</li>
            </ul>
          </div>
        </div>

        <div className="cta-consultation">
          <h3>Ready to Discuss Your IT Needs?</h3>
          <p>Let's explore how our expertise can translate into tangible benefits for your business, like increased efficiency, significant cost savings, and robust scalability.</p>
          <a href="#contact" className="cta-button">Book Your Free 15-Minute Consultation</a>
        </div>
      </section>

      {/* Marketing Insights Section */}
      <section id="marketing-insights" className="about"> {/* Using "about" class for similar styling */}
        <h2>Grow Your Business with GMTech: Marketing Insights</h2>
        <div className="about-content"> {/* Using "about-content" for layout consistency */}
          <div className="about-text"> {/* Using "about-text" for text block styling */}
            <p>
              Beyond providing top-tier IT solutions, GMTech is invested in your success. Here are some marketing strategies that can help you leverage your technology and services to grow your business:
            </p>
            
            <h3>Content Marketing: Share Your Expertise</h3>
            <p>
              Establish yourself as a thought leader by regularly publishing blog posts or articles addressing common IT challenges and innovative solutions. This not only helps your clients but also boosts your website's SEO, attracting more organic traffic. Consider topics like "5 Cybersecurity Tips for Small Businesses" or "The Benefits of Cloud Migration for SMBs."
            </p>

            <h3>Showcase Successes: Build Trust</h3>
            <p>
              Let your work speak for itself. Build trust and credibility by featuring client testimonials or in-depth case studies. Positive feedback from satisfied clients is incredibly powerful. 
              <br /><em>(Placeholder: Consider adding a dedicated 'Testimonials/Case Studies' subsection or page as you gather client stories.)</em>
            </p>

            <h3>Local SEO Optimization: Attract Nearby Clients</h3>
            <p>
              Ensure local businesses can find you. Optimize your website content and Google My Business (GMB) profile for local search terms. Think "IT support in [Your City/Region]," "cloud solutions [Your Town]," or "small business tech consultant near me." A well-optimized GMB listing with your services, hours, and location is crucial.
            </p>

            <h3>Targeted Online Advertising: Reach Specific Audiences</h3>
            <p>
              For more direct outreach, explore targeted online advertising. Platforms like LinkedIn Ads allow you to reach specific industries or job titles, while Google Ads can capture users actively searching for your services. This can be a cost-effective way to generate leads for specialized IT packages.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get in Touch</h2>
        <p className="contact-intro">
          Ready to discuss your IT challenges or interested in our <strong>Free 15-Minute Consultation</strong>?
          <br />
          Fill out the form below, or use the button to schedule your consultation directly.
        </p>
        {/* Greg: Replace # with your booking service URL */}
        <a href="#contact" className="cta-button cta-button-centered">
          Book Your Free 15-Min Consultation Now
        </a>
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