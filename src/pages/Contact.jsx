import { useState } from 'react';
import { useApp } from '../context/AppContext';

const SUBJECTS = [
  'Product Inquiry',
  'Order & Delivery',
  'Returns & Exchanges',
  'Press & Media',
  'Boutique Appointment',
  'VIP Client Services',
  'Other',
];

const Contact = ({ setActiveTab }) => {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
    showToast('✦ Your message has been received. We will respond within 24 hours.');
  };

  const fieldStyle = (hasError) => ({
    width: '100%',
    border: 'none',
    borderBottom: `1px solid ${hasError ? '#C00000' : '#E0E0E0'}`,
    padding: '12px 0',
    fontSize: '12px',
    letterSpacing: '0.3px',
    background: 'transparent',
    outline: 'none',
    color: '#000',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    transition: 'border-color 0.2s',
  });

  const errorStyle = { fontSize: '9px', letterSpacing: '1px', color: '#C00000', marginTop: '4px' };

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#FFFFFF', paddingTop: '68px', paddingBottom: '80px' }}>

      {/* Hero Header */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(40px, 7vw, 80px) 24px clamp(32px, 5vw, 56px)',
        borderBottom: '1px solid #EEEEEE',
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '12px' }}>
          Client Relations
        </div>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(26px, 4vw, 40px)',
          fontWeight: '400', letterSpacing: '3px', marginBottom: '16px',
        }}>
          Contact Us
        </h1>
        <p style={{ fontSize: '12px', color: '#757575', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8, letterSpacing: '0.3px' }}>
          Our Client Relations team is at your disposal Monday – Sunday, 9:30 AM – 9:00 PM.
        </p>
      </div>

      {/* Three info columns */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 60px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
        gap: 'clamp(32px, 4vw, 48px)',
        borderBottom: '1px solid #EEEEEE',
      }}>
        {[
          {
            label: 'VIP Hotline',
            value: '0339 708 788',
            sub: 'Available daily · 9:30 AM – 9:00 PM',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.11 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
            ),
          },
          {
            label: 'Email',
            value: 'clientservices@mitumaison.com',
            sub: 'Response within 24 hours',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            ),
          },
          {
            label: 'Press & Media',
            value: 'press@mitumaison.com',
            sub: 'For editorial and media inquiries',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2">
                <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            ),
          },
        ].map(({ label, value, sub, icon }) => (
          <div key={label}>
            <div style={{ marginBottom: '16px', color: '#000' }}>{icon}</div>
            <div style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
              {label}
            </div>
            <div style={{ fontSize: '13px', letterSpacing: '0.5px', marginBottom: '6px', fontFamily: '"Playfair Display", serif' }}>
              {value}
            </div>
            <div style={{ fontSize: '10px', color: '#BDBDBD', letterSpacing: '0.3px', lineHeight: 1.6 }}>
              {sub}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 40px)' }}>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              border: '1px solid #000', margin: '0 auto 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#757575', marginBottom: '12px' }}>
              Message Sent
            </div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: '400', letterSpacing: '2px', marginBottom: '16px' }}>
              Thank You, {form.name.split(' ')[0]}
            </h2>
            <p style={{ fontSize: '11px', color: '#757575', lineHeight: 1.8, marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
              Our Client Relations team will respond to your enquiry within 24 hours.
            </p>
            <button
              onClick={() => setActiveTab('/')}
              style={{
                padding: '14px 40px', backgroundColor: '#000', color: '#fff',
                border: 'none', fontSize: '10px', letterSpacing: '2px',
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Return to Home
            </button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                Send a Message
              </div>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: '400', letterSpacing: '2px' }}>
                We Are Here to Assist You
              </h2>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>

                {/* Name */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', display: 'block', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => e.target.style.borderBottomColor = '#000'}
                    onBlur={e => e.target.style.borderBottomColor = errors.name ? '#C00000' : '#E0E0E0'}
                    style={fieldStyle(errors.name)}
                    placeholder="Your full name"
                  />
                  {errors.name && <div style={errorStyle}>{errors.name}</div>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', display: 'block', marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={e => e.target.style.borderBottomColor = '#000'}
                    onBlur={e => e.target.style.borderBottomColor = errors.email ? '#C00000' : '#E0E0E0'}
                    style={fieldStyle(errors.email)}
                    placeholder="your@email.com"
                  />
                  {errors.email && <div style={errorStyle}>{errors.email}</div>}
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', display: 'block', marginBottom: '4px' }}>
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  style={{
                    ...fieldStyle(false),
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23BDBDBD' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                    paddingRight: '20px',
                  }}
                >
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '36px' }}>
                <label style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD', display: 'block', marginBottom: '4px' }}>
                  Message *
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = '#000'}
                  onBlur={e => e.target.style.borderColor = errors.message ? '#C00000' : '#E0E0E0'}
                  rows={5}
                  placeholder="How may we assist you today?"
                  style={{
                    width: '100%',
                    border: `1px solid ${errors.message ? '#C00000' : '#E0E0E0'}`,
                    padding: '14px 16px',
                    fontSize: '12px',
                    background: 'transparent',
                    outline: 'none',
                    color: '#000',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    letterSpacing: '0.3px',
                    lineHeight: 1.7,
                    resize: 'vertical',
                    transition: 'border-color 0.2s',
                  }}
                />
                {errors.message && <div style={errorStyle}>{errors.message}</div>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '9px', color: '#BDBDBD', letterSpacing: '0.5px' }}>
                  * Required fields
                </div>
                <button
                  type="submit"
                  style={{
                    padding: '14px 48px',
                    backgroundColor: '#000', color: '#fff',
                    border: '1px solid #000',
                    fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.25s',
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#222'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#000'}
                >
                  Send Message →
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Boutique CTA */}
      <div style={{
        backgroundColor: '#F9F9F9', borderTop: '1px solid #EEEEEE',
        textAlign: 'center', padding: 'clamp(32px, 5vw, 56px) 24px',
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#757575', marginBottom: '10px' }}>
          Prefer to speak in person?
        </div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: '400', letterSpacing: '2px', marginBottom: '20px' }}>
          Visit One of Our Boutiques
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('/store-locator')}
            style={{
              padding: '12px 32px', backgroundColor: '#000', color: '#fff',
              border: '1px solid #000', fontSize: '10px', letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#222'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#000'}
          >
            Find a Boutique
          </button>
          <button
            onClick={() => setActiveTab('/reserve')}
            style={{
              padding: '12px 32px', backgroundColor: '#fff', color: '#000',
              border: '1px solid #E0E0E0', fontSize: '10px', letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#000'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#E0E0E0'}
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
