import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Send, ArrowLeft, Linkedin, Instagram } from 'lucide-react';

function ContactPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Handle scroll for navigation animations
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts (only once)
    window.scrollTo(0, 0);
    
    // Animate floating navigation bar entrance
    const animateNavigation = () => {
      const nav = document.getElementById('contact-nav');
      if (nav) {
        setTimeout(() => {
          nav.style.transform = 'translateX(-50%) translateY(0px)';
          nav.style.opacity = '1';
        }, 100);
      }
    };
    
    // Trigger animations on page load
    const animateElements = () => {
      const elements = document.querySelectorAll('.contact-animate');
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate-in');
        }, (index * 150) + 400); // Start after nav animation
      });
    };

    // Start animations
    animateNavigation();
    setTimeout(animateElements, 300);
  }, []); // Remove scrollY dependency

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        console.error('Contact form error:', data.message);
        
        // Reset error status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e0f2fe 75%, #f0f9ff 100%)', 
      position: 'relative'
    }}>
      {/* Enhanced background elements */}
      <div style={{ 
        position: 'absolute', 
        top: '5%', 
        right: '5%', 
        width: '400px', 
        height: '400px', 
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(56, 189, 248, 0.04) 50%, transparent 80%)', 
        borderRadius: '50%', 
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite'
      }}></div>
      <div style={{ 
        position: 'absolute', 
        bottom: '10%', 
        left: '2%', 
        width: '500px', 
        height: '500px', 
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, rgba(139, 92, 246, 0.03) 60%, transparent 80%)', 
        borderRadius: '50%', 
        filter: 'blur(90px)',
        animation: 'float 14s ease-in-out infinite',
        animationDelay: '2s'
      }}></div>
      <div style={{ 
        position: 'absolute', 
        top: '30%', 
        left: '70%', 
        width: '300px', 
        height: '300px', 
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 70%, transparent 90%)', 
        borderRadius: '50%', 
        filter: 'blur(60px)',
        animation: 'float 12s ease-in-out infinite',
        animationDelay: '4s'
      }}></div>

      {/* Floating Navigation Bar */}
      <nav id="contact-nav" style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: `translateX(-50%) translateY(${scrollY > 100 ? '-5px' : '0px'})`,
        background: scrollY > 100 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(226, 232, 240, 0.6)',
        padding: '16px 32px',
        borderRadius: '50px',
        zIndex: 1000,
        boxShadow: scrollY > 100 ? '0 12px 40px rgba(0, 0, 0, 0.12)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: 0,
        transform: 'translateX(-50%) translateY(-100px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'white',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
            border: '1px solid rgba(226, 232, 240, 0.5)'
          }}>
            <img 
              src="/assets/investly-logo.png" 
              alt="Investly Logo"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                objectFit: 'contain'
              }}
            />
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#1e293b',
            fontFamily: 'Space Grotesk, sans-serif'
          }}>
            Investly
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a 
            onClick={(e) => {
              e.preventDefault();
              // Add smooth navigation animation
              const nav = document.getElementById('contact-nav');
              if (nav) {
                nav.style.transform = 'translateX(-50%) translateY(-10px)';
                nav.style.opacity = '0.8';
              }
              
              // Navigate after animation
              setTimeout(() => {
                navigate('/');
              }, 150);
            }}
            style={{ 
              color: '#64748b', 
              textDecoration: 'none', 
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.textShadow = '0 4px 8px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#64748b';
              e.target.style.transform = 'translateY(0)';
              e.target.style.textShadow = 'none';
            }}
          >
            Home
          </a>
          <span 
            style={{ 
              color: '#8b5cf6', 
              textDecoration: 'none', 
              fontWeight: '700',
              fontSize: '14px',
              position: 'relative'
            }}
          >
            Contact
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              left: '0',
              right: '0',
              height: '2px',
              background: 'linear-gradient(90deg, #8b5cf6 0%, #a855f7 100%)',
              borderRadius: '1px'
            }}></div>
          </span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              // Add smooth navigation animation
              const nav = document.getElementById('contact-nav');
              if (nav) {
                nav.style.transform = 'translateX(-50%) translateY(-10px)';
                nav.style.opacity = '0.8';
              }
              
              // Navigate after animation
              setTimeout(() => {
                navigate('/auth');
              }, 150);
            }}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.2)';
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ 
        paddingTop: '120px', 
        paddingBottom: '80px', 
        position: 'relative', 
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 24px 80px'
      }}>
        {/* Header */}
        <div className="contact-animate" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ 
            fontSize: '64px', 
            fontWeight: '900', 
            marginBottom: '24px', 
            color: '#1e293b',
            letterSpacing: '-2px', 
            fontFamily: 'Space Grotesk, sans-serif',
            lineHeight: '1.1'
          }}>
            Get in <span style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Touch</span>
          </h1>
          
          <p style={{ 
            fontSize: '22px', 
            maxWidth: '600px', 
            margin: '0 auto', 
            color: '#64748b', 
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Have questions about Investly? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Contact Form */}
          <div className="contact-animate" style={{ 
            background: 'white',
            padding: '48px',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '12px',
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                Send us a message
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                color: '#16a34a',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                color: '#dc2626',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                ✗ Failed to send message. Please try again or contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s',
                    fontFamily: 'Poppins, sans-serif',
                    background: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Your full name"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s',
                    fontFamily: 'Poppins, sans-serif',
                    background: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s',
                    fontFamily: 'Poppins, sans-serif',
                    background: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="What's this about?"
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s',
                    fontFamily: 'Poppins, sans-serif',
                    background: 'white',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Tell us more about your question or feedback..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  background: isSubmitting 
                    ? '#9ca3af' 
                    : 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '18px 32px',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: isSubmitting 
                    ? 'none' 
                    : '0 8px 25px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #ffffff40',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-animate">
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '16px',
                fontFamily: 'Space Grotesk, sans-serif'
              }}>
                Other ways to reach us
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                Prefer a different way to get in touch? Here are some alternatives.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Email */}
              <div className="contact-animate" style={{ 
                background: 'white',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}>
                    <Mail size={24} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '700', 
                      color: '#1e293b', 
                      marginBottom: '4px',
                      fontFamily: 'Space Grotesk, sans-serif'
                    }}>
                      Email Us
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                      investly.official@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="contact-animate" style={{ 
                background: 'white',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => window.open('https://www.linkedin.com/company/investly-education/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3BJMWS5o1qTOypvc9p9DbNjA%3D%3D', '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 119, 181, 0.3)'
                  }}>
                    <Linkedin size={24} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '700', 
                      color: '#1e293b', 
                      marginBottom: '4px',
                      fontFamily: 'Space Grotesk, sans-serif'
                    }}>
                      LinkedIn
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                      Connect with us professionally
                    </p>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="contact-animate" style={{ 
                background: 'white',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => window.open('https://www.instagram.com/investlyeducation/', '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(236, 72, 153, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    padding: '12px', 
                    background: 'linear-gradient(135deg, #e1306c 0%, #c13584 50%, #833ab4 100%)', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(225, 48, 108, 0.3)'
                  }}>
                    <Instagram size={24} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '700', 
                      color: '#1e293b', 
                      marginBottom: '4px',
                      fontFamily: 'Space Grotesk, sans-serif'
                    }}>
                      Instagram
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                      Follow us for updates
                    </p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          padding: '60px 0',
          margin: '80px -24px 0',
          textAlign: 'center',
          borderTop: '1px solid rgba(56, 189, 248, 0.2)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            {/* Disclaimer */}
            <div style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '12px',
              padding: '20px 24px',
              marginBottom: '32px',
              textAlign: 'left'
            }}>
              <p style={{
                color: '#475569',
                fontSize: '14px',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6',
                fontFamily: 'Poppins, sans-serif'
              }}>
                <strong style={{ color: '#1e293b' }}>Disclaimer:</strong> Investly provides educational content and tools for learning about finance and investing. This information is for general purposes only and should not be considered financial advice. Always consult a licensed professional before making financial decisions.
              </p>
            </div>
            
            <p style={{
              color: '#64748b',
              fontSize: '16px',
              fontWeight: '500',
              margin: 0,
              fontFamily: 'Poppins, sans-serif'
            }}>
              © 2025 Investly Education. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;