// Account Settings Page
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

// ─── Password strength helpers ────────────────────────────────────────────────
const PWD_CRITERIA = [
  { key: 'length',    label: 'Ít nhất 8 ký tự',            test: (p) => p.length >= 8 },
  { key: 'upper',     label: 'Có chữ in hoa (A–Z)',         test: (p) => /[A-Z]/.test(p) },
  { key: 'lower',     label: 'Có chữ thường (a–z)',         test: (p) => /[a-z]/.test(p) },
  { key: 'digit',     label: 'Có chữ số (0–9)',             test: (p) => /[0-9]/.test(p) },
  { key: 'special',   label: 'Có ký tự đặc biệt (!@#$…)',  test: (p) => /[^A-Za-z0-9]/.test(p) },
];

function getStrength(password) {
  return PWD_CRITERIA.filter(c => c.test(password)).length; // 0–5
}

const STRENGTH_LABEL = ['', 'Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
const STRENGTH_COLOR = ['', '#E53935', '#FB8C00', '#F9A825', '#43A047', '#1B5E20'];

// ─── Email format validator ───────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, showToast, logout } = useApp();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated]);

  // Sync formData khi user thay đổi (dùng key prop thay vì setState in effect)
  // formData được khởi tạo trực tiếp từ user
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  // ─── Profile validation ──────────────────────────────────────────────────
  const validateProfile = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Vui lòng nhập họ tên';
    if (formData.phone && !/^\d+$/.test(formData.phone))
      errs.phone = 'Số điện thoại chỉ được chứa chữ số';
    if (formData.phone && (formData.phone.length < 9 || formData.phone.length > 12))
      errs.phone = 'Số điện thoại từ 9 đến 12 chữ số';
    return errs;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const errs = validateProfile();
    if (Object.keys(errs).length > 0) { setProfileErrors(errs); return; }
    setProfileErrors({});
    setIsSaving(true);
    try {
      await api.updateProfile(formData);
      showToast('Profile updated successfully');
      setIsEditing(false);
    } catch {
      showToast('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Password validation ─────────────────────────────────────────────────
  const newPwdStrength = getStrength(passwordData.newPassword);
  const allCriteriaMet = newPwdStrength === PWD_CRITERIA.length;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!allCriteriaMet) {
      showToast('Mật khẩu chưa đạt yêu cầu bảo mật');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Mật khẩu xác nhận không khớp');
      return;
    }
    setIsSaving(true);
    try {
      await api.changePassword(passwordData.currentPassword, passwordData.newPassword);
      showToast('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showToast(error.message || 'Failed to change password');
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
                  navigate('/');
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
                      inputMode="numeric"
                      value={formData.phone}
                      onKeyDown={e => {
                        // Cho phép: phím điều hướng, Backspace, Delete, Tab, Enter
                        const allowed = ['Backspace','Delete','Tab','Enter','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'];
                        if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault();
                      }}
                      onChange={e => {
                        // Lọc lại lần nữa (phòng paste chứa ký tự lạ)
                        const digits = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: digits });
                        // Xoá lỗi khi user đang gõ
                        if (profileErrors.phone) setProfileErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      disabled={!isEditing}
                      placeholder="0901234567"
                      maxLength={12}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `1px solid ${profileErrors.phone ? '#E53935' : '#E0E0E0'}`,
                        fontSize: '13px',
                        outline: 'none',
                        backgroundColor: isEditing ? '#FFFFFF' : '#F9F9F9',
                        color: '#000',
                      }}
                    />
                    {profileErrors.phone && (
                      <div style={{ fontSize: '10px', color: '#E53935', marginTop: '6px', letterSpacing: '0.3px' }}>
                        {profileErrors.phone}
                      </div>
                    )}
                    {!profileErrors.phone && (
                      <div style={{ fontSize: '10px', color: '#BDBDBD', marginTop: '6px' }}>
                        Chỉ nhập chữ số (9–12 chữ số)
                      </div>
                    )}
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

                  {/* Current Password */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                      autoComplete="current-password"
                      style={{
                        width: '100%', padding: '12px 16px',
                        border: '1px solid #E0E0E0', fontSize: '13px', outline: 'none',
                      }}
                    />
                  </div>

                  {/* New Password */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      autoComplete="new-password"
                      style={{
                        width: '100%', padding: '12px 16px',
                        border: `1px solid ${
                          passwordData.newPassword === '' ? '#E0E0E0'
                          : allCriteriaMet ? '#43A047' : '#FB8C00'
                        }`,
                        fontSize: '13px', outline: 'none',
                      }}
                    />

                    {/* Strength bar */}
                    {passwordData.newPassword !== '' && (
                      <>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
                          {[1, 2, 3, 4, 5].map(i => (
                            <div
                              key={i}
                              style={{
                                flex: 1, height: '3px',
                                borderRadius: '2px',
                                backgroundColor: i <= newPwdStrength
                                  ? STRENGTH_COLOR[newPwdStrength]
                                  : '#E0E0E0',
                                transition: 'background-color 0.3s',
                              }}
                            />
                          ))}
                        </div>
                        <div style={{
                          fontSize: '10px', marginTop: '5px',
                          color: STRENGTH_COLOR[newPwdStrength],
                          fontWeight: '600', letterSpacing: '0.5px',
                        }}>
                          {STRENGTH_LABEL[newPwdStrength]}
                        </div>

                        {/* Criteria checklist */}
                        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {PWD_CRITERIA.map(c => {
                            const passed = c.test(passwordData.newPassword);
                            return (
                              <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {/* Checkmark icon */}
                                <div style={{
                                  width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                                  backgroundColor: passed ? '#43A047' : '#E0E0E0',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  transition: 'background-color 0.25s',
                                }}>
                                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                                    {passed
                                      ? <polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                      : <line x1="4" y1="4" x2="8" y2="8" stroke="#BDBDBD" strokeWidth="1.5" strokeLinecap="round"/>
                                    }
                                  </svg>
                                </div>
                                <span style={{ fontSize: '11px', color: passed ? '#43A047' : '#757575', transition: 'color 0.25s' }}>
                                  {c.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#757575', marginBottom: '8px' }}>
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      autoComplete="new-password"
                      style={{
                        width: '100%', padding: '12px 16px',
                        border: `1px solid ${
                          passwordData.confirmPassword === '' ? '#E0E0E0'
                          : passwordData.confirmPassword === passwordData.newPassword ? '#43A047' : '#E53935'
                        }`,
                        fontSize: '13px', outline: 'none',
                      }}
                    />
                    {passwordData.confirmPassword !== '' && passwordData.confirmPassword !== passwordData.newPassword && (
                      <div style={{ fontSize: '10px', color: '#E53935', marginTop: '6px' }}>
                        Mật khẩu xác nhận chưa khớp
                      </div>
                    )}
                    {passwordData.confirmPassword !== '' && passwordData.confirmPassword === passwordData.newPassword && (
                      <div style={{ fontSize: '10px', color: '#43A047', marginTop: '6px' }}>
                        ✓ Mật khẩu khớp
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving || !allCriteriaMet || passwordData.confirmPassword !== passwordData.newPassword}
                    style={{
                      padding: '12px 32px',
                      backgroundColor: (isSaving || !allCriteriaMet || passwordData.confirmPassword !== passwordData.newPassword) ? '#BDBDBD' : '#000',
                      color: '#fff', border: 'none',
                      fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                      cursor: (isSaving || !allCriteriaMet || passwordData.confirmPassword !== passwordData.newPassword) ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {isSaving ? 'Đang lưu...' : 'Đổi mật khẩu'}
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

