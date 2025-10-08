import React, { useState } from 'react';

// Backend API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/contact/';

function App() {
  // Form state
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  // Status message state
  const [status, setStatus] = useState(null);
  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Message sent successfully!' });
        setForm({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setStatus({ type: 'error', msg: data.detail || 'Error sending message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Contact Us</h2>

      {status && (
        <div style={{ color: status.type === 'success' ? 'green' : 'red' }}>
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <button type="submit" disabled={loading} style={{ padding: '0.75rem', fontSize: '1rem', cursor: 'pointer' }}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default App;
