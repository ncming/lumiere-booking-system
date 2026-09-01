// Authentication Page - Login & Register
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Auth = ({ setActiveTab }) => {
  const { login, register, showToast, isAuthLoading } = useApp();
  
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error khi user typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        // Login
        if (!formData.email || !formData.password) {
          setError('Please enter email and password');
          return;
        }

        await login(formData.email, formData.password);
        showToast('✦ Welcome back');
        setActiveTab('/'); // Redirect to home
      } else {
        // Register
        if (!formData.name || !formData.email || !formData.password) {
          setError('Please fill in all required fields');
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }

        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined
        });

        showToast('✦ Account created successfully');
        setActiveTab('/'); // Redirect to home
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
      showToast('✕ ' + (err.message || 'Authentication failed'));
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: ''
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '80px 20px 40px',
      backgroundColor: '#FFFFFF'
    }}>
      <div style={{ 
        maxWidth: '440px', 
        width: '100%', 
        border: '1px solid #E0E0E0', 
        padding: '48px 40px',
        backgroundColor: '#FFFFFF'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ 
            fontFamily: '"Playfair Display", serif', 
            fontSize: 'clamp(24px, 4vw, 32px)', 
            fontWeight: '400',
            letterSpacing: '2px',
            marginBottom: '8px'
          }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <div style={{ 
            fontSize: '10px', 
            letterSpacing: '2px', 
            textTransform: 'uppercase', 
            color: '#757575' 
          }}>
            {mode === 'login' ? 'Sign in to your account' : 'Join Lumiere'}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#FFEBEE',
            border: '1px solid #EF5350',
            borderRadius: '2px',
            marginBottom: '24px',
            fontSize: '11px',
            color: '#C62828',
            letterSpacing: '0.5px'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '9px', 
                letterSpacing: '2px', 
                textTransform: 'uppercase', 
                color: '#757575',
                marginBottom: '8px'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                required={mode === 'register'}
                disabled={isAuthLoading}
                style={{ 
                  width: '100%',
                  padding: '12px 16px', 
                  border: '1px solid #E0E0E0', 
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  backgroundColor: isAuthLoading ? '#F9F9F9' : '#FFFFFF'
                }}
                onFocus={e => e.target.style.borderColor = '#000'}
                onBlur={e => e.target.style.borderColor = '#E0E0E0'}
              />
            </div>
          )}

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '9px', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              color: '#757575',
              marginBottom: '8px'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              required
              disabled={isAuthLoading}
              style={{ 
                width: '100%',
                padding: '12px 16px', 
                border: '1px solid #E0E0E0', 
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                backgroundColor: isAuthLoading ? '#F9F9F9' : '#FFFFFF'
              }}
              onFocus={e => e.target.style.borderColor = '#000'}
              onBlur={e => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>

          {mode === 'register' && (
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '9px', 
                letterSpacing: '2px', 
                textTransform: 'uppercase', 
                color: '#757575',
                marginBottom: '8px'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="0901 234 567"
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                disabled={isAuthLoading}
                style={{ 
                  width: '100%',
                  padding: '12px 16px', 
                  border: '1px solid #E0E0E0', 
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  backgroundColor: isAuthLoading ? '#F9F9F9' : '#FFFFFF'
                }}
                onFocus={e => e.target.style.borderColor = '#000'}
                onBlur={e => e.target.style.borderColor = '#E0E0E0'}
              />
            </div>
          )}

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '9px', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              color: '#757575',
              marginBottom: '8px'
            }}>
              Password *
            </label>
            <input
              type="password"
              placeholder={mode === 'register' ? 'At least 6 characters' : 'Enter your password'}
              value={formData.password}
              onChange={e => handleInputChange('password', e.target.value)}
              required
              disabled={isAuthLoading}
              minLength={mode === 'register' ? 6 : undefined}
              style={{ 
                width: '100%',
                padding: '12px 16px', 
                border: '1px solid #E0E0E0', 
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                backgroundColor: isAuthLoading ? '#F9F9F9' : '#FFFFFF'
              }}
              onFocus={e => e.target.style.borderColor = '#000'}
              onBlur={e => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAuthLoading}
            style={{ 
              padding: '14px 40px', 
              backgroundColor: isAuthLoading ? '#BDBDBD' : '#000', 
              color: '#fff', 
              border: 'none', 
              fontSize: '10px', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              cursor: isAuthLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              marginTop: '8px'
            }}
            onMouseEnter={e => !isAuthLoading && (e.target.style.backgroundColor = '#333')}
            onMouseLeave={e => !isAuthLoading && (e.target.style.backgroundColor = '#000')}
          >
            {isAuthLoading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Divider */}
        <div style={{ 
          height: '1px', 
          backgroundColor: '#E0E0E0', 
          margin: '32px 0' 
        }} />

        {/* Switch Mode */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '11px', 
            color: '#757575', 
            marginBottom: '12px',
            lineHeight: 1.6
          }}>
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          </div>
          <button
            onClick={switchMode}
            disabled={isAuthLoading}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#000', 
              fontSize: '11px',
              letterSpacing: '1px',
              textDecoration: 'underline', 
              cursor: isAuthLoading ? 'not-allowed' : 'pointer',
              fontWeight: '500'
            }}
          >
            {mode === 'login' ? 'Create an Account' : 'Sign In Instead'}
          </button>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            onClick={() => setActiveTab('/')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#757575', 
              fontSize: '10px',
              letterSpacing: '1px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
