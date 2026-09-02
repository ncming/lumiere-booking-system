// Account Settings Page
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

const Account = ({ setActiveTab }) => {
  const { user, isAuthenticated, showToast, logout } = useApp();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setActiveTab('/auth');
    }
  }, [isAuthenticated, setActiveTab]);

  // Sync formData khi user thay đổi (dùng key prop thay vì setState in effect)
  // formData được khởi tạo trực tiếp từ user
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await api.updateProfile(formData);
      showToast('✦ Profile updated successfully');
      setIsEditing(false);
    } catch {
      showToast('✕ Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('✕ Passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      showToast('✕ Password must be at least 6 characters');
      return;
    }
    
    setIsSaving(true);
    
    try {
      await api.changePassword(passwordData.currentPassword, passwordData.newPassword);
      showToast('✦ Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showToast('✕ ' + (error.message || 'Failed to change password'));
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingTop: '68px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '12px' }}>
          Your Account
        </div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '400', letterSpacing: '3px', marginBottom: '12px' }}>
          Account Settings
        </h1>
        <p style={{ fontSize: '11px', color: '#757575', letterSpacing: '0.5px' }}>
          Manage your personal information and preferences
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px', '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } }}>
          
          {/* Sidebar */}
          <div style={{ borderRight: '1px solid #E0E0E0', paddingRight: '32px' }}>
            <nav style={{ position: 'sticky', top: '100px' }}>
              <MenuItem
                label="Profile Information"
                active={activeSection === 'profile'}
                onClick={() => setActiveSection('profile')}
              />
              <MenuItem
                label="Security"
                active={activeSection === 'security'}
                onClick={() => setActiveSection('security')}
              />
              <MenuItem
                label="Preferences"
                active={activeSection === 'preferences'}
                onClick={() => setActiveSection('preferences')}
              />
              
              <div style={{ height: '1px', backgroundColor: '#E0E0E0', margin: '20px 0' }} />
              
              <button
                onClick={() => {
                  logout();
                  setActiveTab('/');
                }}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '12px',
                  letterSpacing: '0.5px',
                  color: '#C62828',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#E53935'}
                onMouseLeave={e => e.target.style.color = '#C62828'}
              >
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div>
            {activeSection === 'profile' && (
              <div>
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    Profile Information
                  </h2>
                  <p style={{ fontSize: '11px', color: '#757575', lineHeight: 1.6 }}>
                    Update your personal details and contact information
                  </p>
                </div>

                <form onSubmit={handleUpdateProfile} style={{ maxWidth: '500px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #E0E0E0',
                        fontSize: '13px',
                        outline: 'none',
                        backgroundColor: isEditing ? '#FFFFFF' : '#F9F9F9',
                        color: '#000',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #E0E0E0',
                        fontSize: '13px',
                        backgroundColor: '#F9F9F9',
                        color: '#757575',
                        cursor: 'not-allowed',
                      }}
                    />
                    <div style={{ fontSize: '10px', color: '#BDBDBD', marginTop: '6px' }}>
                      Email cannot be changed
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="0901 234 567"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #E0E0E0',
                        fontSize: '13px',
                        outline: 'none',
                        backgroundColor: isEditing ? '#FFFFFF' : '#F9F9F9',
                        color: '#000',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        style={{
                          padding: '12px 32px',
                          backgroundColor: '#000',
                          color: '#fff',
                          border: 'none',
                          fontSize: '10px',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                        }}
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          disabled={isSaving}
                          style={{
                            padding: '12px 32px',
                            backgroundColor: isSaving ? '#BDBDBD' : '#000',
                            color: '#fff',
                            border: 'none',
                            fontSize: '10px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            cursor: isSaving ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: user?.name || '',
                              phone: user?.phone || '',
                            });
                          }}
                          disabled={isSaving}
                          style={{
                            padding: '12px 32px',
                            backgroundColor: '#FFFFFF',
                            color: '#000',
                            border: '1px solid #E0E0E0',
                            fontSize: '10px',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            )}

            {activeSection === 'security' && (
              <div>
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    Security
                  </h2>
                  <p style={{ fontSize: '11px', color: '#757575', lineHeight: 1.6 }}>
                    Manage your password and security settings
                  </p>
                </div>

                <form onSubmit={handleChangePassword} style={{ maxWidth: '500px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #E0E0E0',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      minLength={6}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #E0E0E0',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                    <div style={{ fontSize: '10px', color: '#BDBDBD', marginTop: '6px' }}>
                      At least 6 characters
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #E0E0E0',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    style={{
                      padding: '12px 32px',
                      backgroundColor: isSaving ? '#BDBDBD' : '#000',
                      color: '#fff',
                      border: 'none',
                      fontSize: '10px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      cursor: isSaving ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSaving ? 'Changing...' : 'Change Password'}
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'preferences' && (
              <div>
                <div style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    Preferences
                  </h2>
                  <p style={{ fontSize: '11px', color: '#757575', lineHeight: 1.6 }}>
                    Manage your communication and notification preferences
                  </p>
                </div>

                <div style={{ maxWidth: '500px' }}>
                  <PreferenceToggle
                    label="Email Notifications"
                    description="Receive updates about your bookings and orders"
                    defaultChecked={true}
                  />
                  <PreferenceToggle
                    label="Marketing Emails"
                    description="Get exclusive offers and new collection updates"
                    defaultChecked={false}
                  />
                  <PreferenceToggle
                    label="SMS Notifications"
                    description="Receive appointment reminders via SMS"
                    defaultChecked={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '12px 0',
      background: 'none',
      border: 'none',
      textAlign: 'left',
      fontSize: '12px',
      letterSpacing: '0.5px',
      color: active ? '#000' : '#757575',
      cursor: 'pointer',
      fontWeight: active ? '600' : '400',
      transition: 'color 0.2s',
      borderLeft: active ? '2px solid #000' : '2px solid transparent',
      paddingLeft: '12px',
      marginLeft: '-14px',
    }}
    onMouseEnter={e => !active && (e.target.style.color = '#000')}
    onMouseLeave={e => !active && (e.target.style.color = '#757575')}
  >
    {label}
  </button>
);

const PreferenceToggle = ({ label, description, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div style={{ 
      padding: '20px 0', 
      borderBottom: '1px solid #F0F0F0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{ fontSize: '11px', color: '#757575', lineHeight: 1.5 }}>
          {description}
        </div>
      </div>
      <label style={{ position: 'relative', width: '44px', height: '24px', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          style={{ display: 'none' }}
        />
        <div style={{
          width: '44px',
          height: '24px',
          backgroundColor: checked ? '#000' : '#E0E0E0',
          borderRadius: '12px',
          transition: 'background-color 0.2s',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            width: '18px',
            height: '18px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            top: '3px',
            left: checked ? '23px' : '3px',
            transition: 'left 0.2s',
          }} />
        </div>
      </label>
    </div>
  );
};

export default Account;
