import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

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

function App() {
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
    <div style={styles.container}>
      <h1>Submit a Ticket</h1>
      {submissionStatus === 'success' && (
        <p style={styles.successMessage}>Ticket submitted successfully!</p>
      )}
      {submissionStatus === 'error' && (
        <p style={styles.errorMessage}>Failed to submit ticket. Please try again.</p>
      )}
      {submissionStatus === 'submitting' && (
        <p>Submitting...</p>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>Submit Ticket</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    width: '80%',
    maxWidth: '500px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default App;