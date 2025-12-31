import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Lock, Moon, Sun, Edit3, Save, X, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Settings = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, theme } = useTheme();
  const [activeTab, setActiveTab] = useState('account');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.name || '');
  const [lastUsernameChange, setLastUsernameChange] = useState(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [currentUser, setCurrentUser] = useState(user); // Local state for fresh user data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Fetch fresh user data when component mounts
    fetchCurrentUser();
    
    // Check last username change date
    const lastChange = localStorage.getItem(`lastUsernameChange_${user?.id}`);
    if (lastChange) {
      setLastUsernameChange(new Date(lastChange));
    }
  }, [user?.id]);

  useEffect(() => {
    // Update newUsername when currentUser changes
    if (currentUser?.name) {
      setNewUsername(currentUser.name);
    }
  }, [currentUser]);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.user) {
        setCurrentUser(response.data.user);
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const canChangeUsername = () => {
    if (!lastUsernameChange) return true;
    const daysSinceChange = (new Date() - lastUsernameChange) / (1000 * 60 * 60 * 24);
    return daysSinceChange >= 7;
  };

  const getDaysUntilUsernameChange = () => {
    if (!lastUsernameChange) return 0;
    const daysSinceChange = (new Date() - lastUsernameChange) / (1000 * 60 * 60 * 24);
    return Math.ceil(7 - daysSinceChange);
  };

  const handleUsernameUpdate = async () => {
    if (!canChangeUsername()) {
      setMessage({ type: 'error', text: `You can change your username in ${getDaysUntilUsernameChange()} days` });
      return;
    }

    if (newUsername.trim().length < 2) {
      setMessage({ type: 'error', text: 'Username must be at least 2 characters long' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put('/api/user/profile', {
        name: newUsername.trim()
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Update local storage with the response data
      const currentUserData = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...currentUserData, name: response.data.user.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem(`lastUsernameChange_${currentUser.id}`, new Date().toISOString());
      
      // Update the parent component's user state by reloading the page
      // This ensures all components get the updated username
      setCurrentUser(updatedUser);
      setLastUsernameChange(new Date());
      setIsEditingUsername(false);
      setMessage({ type: 'success', text: 'Username updated successfully! Refreshing page...' });
      
      // Refresh the page to update all components with new username
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Username update error:', error);
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to update username' });
    }
    setLoading(false);
  };

  const handlePasswordReset = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      return;
    }

    setLoading(true);
    try {
      await axios.put('/api/user/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordReset(false);
      setMessage({ type: 'success', text: 'Password updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to update password' });
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentTheme = theme;

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.bg,
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        marginBottom: '30px'
      }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: `2px solid ${currentTheme.border}`,
            color: currentTheme.text,
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: currentTheme.text,
          margin: 0
        }}>
          Settings
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: '30px'
      }}>
        {/* Sidebar */}
        <div style={{
          background: currentTheme.cardBg,
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '20px',
          height: 'fit-content',
          border: `1px solid ${currentTheme.border}`
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              color: currentTheme.text,
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 15px 0'
            }}>
              Settings
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('account')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: activeTab === 'account' ? currentTheme.tabActiveBg : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: activeTab === 'account' ? currentTheme.tabActiveText : currentTheme.textSecondary,
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              <User size={20} />
              Account Info
            </button>

            <button
              onClick={() => setActiveTab('appearance')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: activeTab === 'appearance' ? currentTheme.tabActiveBg : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: activeTab === 'appearance' ? currentTheme.tabActiveText : currentTheme.textSecondary,
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              Appearance
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          background: currentTheme.cardBg,
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '30px',
          border: `1px solid ${currentTheme.border}`
        }}>
          {/* Message Display */}
          {message.text && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
              color: message.type === 'success' ? '#16a34a' : '#dc2626'
            }}>
              {message.text}
            </div>
          )}

          {/* Account Info Tab */}
          {activeTab === 'account' && (
            <div>
              <h2 style={{
                color: currentTheme.text,
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '30px'
              }}>
                Account Information
              </h2>

              {/* Username Section */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  color: currentTheme.text,
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Username
                </label>
                
                {isEditingUsername ? (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: `2px solid ${currentTheme.inputBorder}`,
                        borderRadius: '8px',
                        background: currentTheme.inputBg,
                        color: currentTheme.text,
                        fontSize: '16px'
                      }}
                    />
                    <button
                      onClick={handleUsernameUpdate}
                      disabled={loading}
                      style={{
                        padding: '12px',
                        background: currentTheme.buttonBg,
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingUsername(false);
                        setNewUsername(currentUser?.name || '');
                      }}
                      style={{
                        padding: '12px',
                        background: 'transparent',
                        border: `2px solid ${currentTheme.inputBorder}`,
                        borderRadius: '8px',
                        color: currentTheme.textSecondary,
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      flex: 1,
                      padding: '12px 16px',
                      background: currentTheme.inputBg,
                      border: `2px solid ${currentTheme.inputBorder}`,
                      borderRadius: '8px',
                      color: currentTheme.text,
                      fontSize: '16px'
                    }}>
                      {currentUser?.name}
                    </span>
                    <button
                      onClick={() => setIsEditingUsername(true)}
                      disabled={!canChangeUsername()}
                      style={{
                        padding: '12px',
                        background: canChangeUsername() ? currentTheme.buttonBg : 'transparent',
                        border: `2px solid ${currentTheme.inputBorder}`,
                        borderRadius: '8px',
                        color: canChangeUsername() ? 'white' : currentTheme.textSecondary,
                        cursor: canChangeUsername() ? 'pointer' : 'not-allowed',
                        opacity: canChangeUsername() ? 1 : 0.5
                      }}
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                )}
                
                {!canChangeUsername() && (
                  <p style={{
                    color: currentTheme.textSecondary,
                    fontSize: '14px',
                    margin: '8px 0 0 0'
                  }}>
                    You can change your username in {getDaysUntilUsernameChange()} days
                  </p>
                )}
              </div>

              {/* Email Section */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  color: currentTheme.text,
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: currentTheme.inputBg,
                    border: `2px solid ${currentTheme.inputBorder}`,
                    borderRadius: '8px',
                    color: currentTheme.textSecondary,
                    fontSize: '16px',
                    opacity: 0.7
                  }}>
                    {currentUser?.email}
                  </span>
                  <div style={{
                    padding: '12px',
                    background: 'transparent',
                    border: `2px solid ${currentTheme.inputBorder}`,
                    borderRadius: '8px',
                    color: currentTheme.textSecondary,
                    opacity: 0.5
                  }}>
                    <Mail size={16} />
                  </div>
                </div>
                <p style={{
                  color: currentTheme.textSecondary,
                  fontSize: '14px',
                  margin: '8px 0 0 0'
                }}>
                  Email cannot be changed for security reasons
                </p>
              </div>

              {/* Date of Birth Section */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  color: currentTheme.text,
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Date of Birth
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{
                    flex: 1,
                    padding: '12px 16px',
                    background: currentTheme.inputBg,
                    border: `2px solid ${currentTheme.inputBorder}`,
                    borderRadius: '8px',
                    color: currentTheme.textSecondary,
                    fontSize: '16px',
                    opacity: 0.7
                  }}>
                    {formatDate(currentUser?.date_of_birth)}
                  </span>
                  <div style={{
                    padding: '12px',
                    background: 'transparent',
                    border: `2px solid ${currentTheme.inputBorder}`,
                    borderRadius: '8px',
                    color: currentTheme.textSecondary,
                    opacity: 0.5
                  }}>
                    <Calendar size={16} />
                  </div>
                </div>
                <p style={{
                  color: currentTheme.textSecondary,
                  fontSize: '14px',
                  margin: '8px 0 0 0'
                }}>
                  Date of birth cannot be changed for security reasons
                </p>
              </div>

              {/* Password Section */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  color: currentTheme.text,
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Password
                </label>
                
                {!showPasswordReset ? (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      flex: 1,
                      padding: '12px 16px',
                      background: currentTheme.inputBg,
                      border: `2px solid ${currentTheme.inputBorder}`,
                      borderRadius: '8px',
                      color: currentTheme.textSecondary,
                      fontSize: '16px'
                    }}>
                      ••••••••••••
                    </span>
                    <button
                      onClick={() => setShowPasswordReset(true)}
                      style={{
                        padding: '12px',
                        background: currentTheme.buttonBg,
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <Lock size={16} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {/* Current Password */}
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        placeholder="Current Password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 50px 12px 16px',
                          border: `2px solid ${currentTheme.inputBorder}`,
                          borderRadius: '8px',
                          background: currentTheme.inputBg,
                          color: currentTheme.text,
                          fontSize: '16px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: currentTheme.textSecondary,
                          cursor: 'pointer'
                        }}
                      >
                        {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {/* New Password */}
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 50px 12px 16px',
                          border: `2px solid ${currentTheme.inputBorder}`,
                          borderRadius: '8px',
                          background: currentTheme.inputBg,
                          color: currentTheme.text,
                          fontSize: '16px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: currentTheme.textSecondary,
                          cursor: 'pointer'
                        }}
                      >
                        {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        placeholder="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 50px 12px 16px',
                          border: `2px solid ${currentTheme.inputBorder}`,
                          borderRadius: '8px',
                          background: currentTheme.inputBg,
                          color: currentTheme.text,
                          fontSize: '16px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: currentTheme.textSecondary,
                          cursor: 'pointer'
                        }}
                      >
                        {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={handlePasswordReset}
                        disabled={loading}
                        style={{
                          padding: '12px 24px',
                          background: currentTheme.buttonBg,
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </button>
                      <button
                        onClick={() => {
                          setShowPasswordReset(false);
                          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                        }}
                        style={{
                          padding: '12px 24px',
                          background: 'transparent',
                          border: `2px solid ${currentTheme.inputBorder}`,
                          borderRadius: '8px',
                          color: currentTheme.textSecondary,
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>

                    {/* Forgot Password Link */}
                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: '15px',
                      padding: '15px',
                      background: 'rgba(59, 130, 246, 0.05)',
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px'
                    }}>
                      <p style={{
                        color: currentTheme.textSecondary,
                        fontSize: '14px',
                        margin: '0 0 8px 0'
                      }}>
                        Can't remember your current password?
                      </p>
                      <Link 
                        to="/forgot-password"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '600',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                        onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
                      >
                        Reset Password via Email →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div>
              <h2 style={{
                color: currentTheme.text,
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '30px'
              }}>
                Appearance
              </h2>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  color: currentTheme.text,
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  Theme
                </label>

                <div style={{ display: 'flex', gap: '15px' }}>
                  {/* Light Mode */}
                  <button
                    onClick={() => setDarkMode(false)}
                    style={{
                      flex: 1,
                      padding: '20px',
                      background: !darkMode ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      border: `2px solid ${!darkMode ? '#3b82f6' : currentTheme.inputBorder}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <Sun size={24} color={!darkMode ? '#3b82f6' : currentTheme.textSecondary} />
                      <span style={{
                        color: !darkMode ? '#3b82f6' : currentTheme.text,
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        Light Mode
                      </span>
                    </div>
                    <p style={{
                      color: currentTheme.textSecondary,
                      fontSize: '14px',
                      margin: 0,
                      textAlign: 'left'
                    }}>
                      Clean and bright interface
                    </p>
                  </button>

                  {/* Dark Mode */}
                  <button
                    onClick={() => setDarkMode(true)}
                    style={{
                      flex: 1,
                      padding: '20px',
                      background: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      border: `2px solid ${darkMode ? '#3b82f6' : currentTheme.inputBorder}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <Moon size={24} color={darkMode ? '#3b82f6' : currentTheme.textSecondary} />
                      <span style={{
                        color: darkMode ? '#3b82f6' : currentTheme.text,
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        Dark Mode
                      </span>
                    </div>
                    <p style={{
                      color: currentTheme.textSecondary,
                      fontSize: '14px',
                      margin: 0,
                      textAlign: 'left'
                    }}>
                      Easy on the eyes, perfect for night use
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;