import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Award, Sparkles, Star, BarChart3, Users, TrendingUp, Shield, Zap, ArrowRight, Play, CheckCircle, Target, Lightbulb, Globe, Clock, Award as Trophy, Rocket, ChevronDown, Quote } from 'lucide-react';
import Footer from '../components/Footer';

function LandingPage() {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Manager",
      content: "Investly transformed my understanding of investing. The AI tutor made complex concepts so easy to grasp!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Software Engineer", 
      content: "Finally, a platform that explains finance in plain English. I went from zero to confident investor in 3 months.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Teacher",
      content: "The structured curriculum and progress tracking kept me motivated. Best investment in my financial education!",
      rating: 5
    }
  ];

  const stats = [
    { number: "500+", label: "Expert Lessons", icon: BookOpen, color: "#3b82f6" },
    { number: "24/7", label: "AI Support", icon: Brain, color: "#8b5cf6" },
    { number: "100%", label: "Free Access", icon: Shield, color: "#22c55e" },
    { number: "95%", label: "Success Rate", icon: Trophy, color: "#f59e0b" }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(testimonialInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [testimonials.length]);

  useEffect(() => {
    // Smooth scroll behavior for navigation links
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e0f2fe 75%, #f0f9ff 100%)', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 15s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 18s ease-in-out infinite'
        }}></div>
      </div>

      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 10s ease-in-out infinite'
      }}></div>

      {/* Enhanced Floating Navigation Bar */}
      <nav style={{
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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
            href="#features" 
            style={{ 
              color: '#64748b', 
              textDecoration: 'none', 
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#3b82f6';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#64748b';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Features
          </a>
          <a 
            href="#curriculum" 
            style={{ 
              color: '#64748b', 
              textDecoration: 'none', 
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#38bdf8';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#64748b';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Curriculum
          </a>
          <a 
            onClick={() => navigate('/contact')}
            style={{ 
              color: '#64748b', 
              textDecoration: 'none', 
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#8b5cf6';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#64748b';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Contact
          </a>
          <button 
            onClick={() => navigate('/auth')}
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
            Dashboard
          </button>
        </div>
      </nav>

      {/* Modern Hero Section - Redesigned */}
      <div style={{ 
        paddingTop: '120px', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Full Width Content - Centered Layout */}
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 60px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          
          {/* Left Content - Enhanced */}
          <div style={{ position: 'relative' }}>
            {/* Trust Badges - Horizontal Layout */}
            <div className="hero-badges" style={{ 
              marginBottom: '40px',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                color: '#059669',
                fontWeight: '700',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.1)'
              }}>
                <Shield size={14} />
                Trusted by Hundreds
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(59, 130, 246, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                color: '#3b82f6',
                fontWeight: '700',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)'
              }}>
                <Star size={14} fill="currentColor" />
                Duke Alumni Reviewed
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title" style={{ 
              fontSize: '84px', 
              fontWeight: '950', 
              marginBottom: '32px', 
              color: '#1e293b',
              letterSpacing: '-4px', 
              fontFamily: 'Space Grotesk, sans-serif',
              lineHeight: '0.9'
            }}>
              Build Your
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Financial
              </span>
              <br />
              Future
            </h1>
            
            <p className="hero-description" style={{ 
              fontSize: '24px', 
              maxWidth: '520px', 
              marginBottom: '48px', 
              color: '#64748b', 
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              Transform your relationship with money through expert-crafted lessons, AI tutoring, and personalized learning paths.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons" style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '60px',
              alignItems: 'center'
            }}>
              <button 
                onClick={() => navigate('/auth')}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '20px 40px',
                  borderRadius: '16px',
                  fontSize: '18px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                }}
              >
                <Rocket size={20} />
                Start Learning Free
              </button>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#64748b',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle size={20} style={{ color: '#22c55e' }} />
                </div>
                No Credit Card Required
              </div>
            </div>

            {/* Stats Row */}
            <div className="hero-stats" style={{
              display: 'flex',
              gap: '48px'
            }}>
              <div>
                <div style={{ 
                  fontSize: '36px', 
                  fontWeight: '900', 
                  color: '#3b82f6',
                  fontFamily: 'Space Grotesk, sans-serif',
                  marginBottom: '4px'
                }}>500+</div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Expert Lessons</div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '36px', 
                  fontWeight: '900', 
                  color: '#8b5cf6',
                  fontFamily: 'Space Grotesk, sans-serif',
                  marginBottom: '4px'
                }}>24/7</div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>AI Support</div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '36px', 
                  fontWeight: '900', 
                  color: '#22c55e',
                  fontFamily: 'Space Grotesk, sans-serif',
                  marginBottom: '4px'
                }}>100%</div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>Free Access</div>
              </div>
            </div>
          </div>

          {/* Right Side - Modern Dashboard Preview */}
          <div className="dashboard-preview" style={{
            position: 'relative',
            height: '600px'
          }}>
            {/* Main Dashboard Card */}
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '32px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#1e293b',
                    marginBottom: '4px',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}>
                    Your Learning Dashboard
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Track progress and achievements
                  </p>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BarChart3 size={24} style={{ color: 'white' }} />
                </div>
              </div>

              {/* Progress Section */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                    Overall Progress
                  </span>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#22c55e', fontFamily: 'Space Grotesk, sans-serif' }}>
                    78%
                  </span>
                </div>
                <div style={{
                  background: '#f1f5f9',
                  height: '12px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
                    height: '100%',
                    width: '78%',
                    borderRadius: '6px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      animation: 'shimmer 2s infinite'
                    }}></div>
                  </div>
                </div>
              </div>

              {/* Course Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Personal Budgeting', progress: 100, color: '#22c55e', icon: Target },
                  { title: 'Investment Basics', progress: 85, color: '#3b82f6', icon: TrendingUp },
                  { title: 'Retirement Planning', progress: 45, color: '#f59e0b', icon: Shield }
                ].map((course, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(248, 250, 252, 0.8)',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid rgba(226, 232, 240, 0.5)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          background: `${course.color}20`,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <course.icon size={16} style={{ color: course.color }} />
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                          {course.title}
                        </span>
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: course.color }}>
                        {course.progress}%
                      </span>
                    </div>
                    <div style={{
                      background: '#e2e8f0',
                      height: '6px',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: course.color,
                        height: '100%',
                        width: `${course.progress}%`,
                        borderRadius: '3px',
                        transition: 'width 1s ease-out'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Floating Achievement Badge */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              background: 'white',
              padding: '16px',
              borderRadius: '16px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              animation: 'float 6s ease-in-out infinite',
              animationDelay: '2s'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: '#fbbf24',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Trophy size={12} style={{ color: 'white' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>
                  Achievement
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>
                Budget Master
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div id="features" style={{ 
        background: 'white',
        padding: '120px 0',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div className="scroll-animate" style={{ 
            textAlign: 'center', 
            marginBottom: '80px',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <h2 style={{
              fontSize: '60px',
              fontWeight: '950',
              color: '#1e293b',
              marginBottom: '20px',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-2px'
            }}>
              Why Choose Investly?
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Three powerful pillars that revolutionize financial education
            </p>
          </div>

          {/* Enhanced Feature Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '40px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            
            {[
              {
                icon: BookOpen,
                title: '500+ Expert Lessons',
                description: 'Comprehensive curriculum from budgeting basics to advanced investment strategies, crafted by financial experts',
                color: '#3b82f6',
                gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(56, 189, 248, 0.02) 100%)',
                tags: ['Beginner Friendly', 'Interactive', 'Expert Level']
              },
              {
                icon: Brain,
                title: 'AI-Powered Tutoring',
                description: 'Get instant, personalized help 24/7 with our advanced AI tutor that adapts to your learning style',
                color: '#8b5cf6',
                gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(168, 85, 247, 0.02) 100%)',
                tags: ['24/7 Available', 'Personalized', 'Instant Help']
              },
              {
                icon: BarChart3,
                title: 'Smart Analytics',
                description: 'Track your progress with detailed insights, performance analytics, and personalized recommendations',
                color: '#22c55e',
                gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(22, 163, 74, 0.02) 100%)',
                tags: ['Progress Tracking', 'Insights', 'Goal Setting']
              }
            ].map((feature, idx) => (
              <div key={idx} className="scroll-animate" style={{
                background: feature.gradient,
                padding: '48px 36px',
                borderRadius: '28px',
                textAlign: 'center',
                border: `2px solid ${feature.color}20`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: 0,
                transform: 'translateY(40px)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 25px 80px ${feature.color}25`;
                e.currentTarget.style.borderColor = `${feature.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${feature.color}20`;
              }}>
                
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '120px',
                  height: '120px',
                  background: `${feature.color}08`,
                  borderRadius: '50%',
                  filter: 'blur(30px)'
                }}></div>

                <div style={{
                  width: '90px',
                  height: '90px',
                  background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                  borderRadius: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 28px',
                  boxShadow: `0 15px 40px ${feature.color}30`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <feature.icon size={40} style={{ color: 'white', zIndex: 2 }} />
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                    animation: 'rotate 4s linear infinite'
                  }}></div>
                </div>

                <h3 style={{
                  fontSize: '26px',
                  fontWeight: '800',
                  color: '#1e293b',
                  marginBottom: '18px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '-0.5px'
                }}>
                  {feature.title}
                </h3>

                <p style={{
                  fontSize: '16px',
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '24px'
                }}>
                  {feature.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  {feature.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} style={{
                      background: `${feature.color}15`,
                      color: feature.color,
                      padding: '6px 14px',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: '600',
                      border: `1px solid ${feature.color}25`
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '100px 0',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div className="scroll-animate" style={{
            marginBottom: '60px',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '900',
              color: '#1e293b',
              marginBottom: '16px',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              What Our Students Say
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Real stories from students who transformed their financial future
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="scroll-animate" style={{
            background: 'white',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
          }}>
            <Quote size={40} style={{ 
              color: '#3b82f6', 
              marginBottom: '24px',
              opacity: 0.3
            }} />
            
            <p style={{
              fontSize: '20px',
              color: '#1e293b',
              lineHeight: '1.6',
              marginBottom: '32px',
              fontStyle: 'italic',
              fontWeight: '500'
            }}>
              "{testimonials[currentTestimonial].content}"
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} size={20} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
              ))}
            </div>

            <div>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '4px'
              }}>
                {testimonials[currentTestimonial].name}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#64748b',
                fontWeight: '500'
              }}>
                {testimonials[currentTestimonial].role}
              </div>
            </div>

            {/* Testimonial indicators */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '32px'
            }}>
              {testimonials.map((_, idx) => (
                <div key={idx} style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: idx === currentTestimonial ? '#3b82f6' : '#cbd5e1',
                  transition: 'all 0.3s ease'
                }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '56px',
              fontWeight: '950',
              color: '#1e293b',
              marginBottom: '20px',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-2px'
            }}>
              What Students Say
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Real stories from students who transformed their financial future
            </p>
          </div>

          {/* Testimonials Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            {[
              {
                name: "Sarah Chen",
                role: "Marketing Manager",
                content: "Investly transformed my understanding of investing. The AI tutor made complex concepts so easy to grasp!",
                rating: 5,
                avatar: "SC"
              },
              {
                name: "Michael Rodriguez",
                role: "Software Engineer", 
                content: "Finally, a platform that explains finance in plain English. I went from zero to confident investor in 3 months.",
                rating: 5,
                avatar: "MR"
              },
              {
                name: "Emily Johnson",
                role: "Teacher",
                content: "The structured curriculum and progress tracking kept me motivated. Best investment in my financial education!",
                rating: 5,
                avatar: "EJ"
              }
            ].map((testimonial, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '32px',
                borderRadius: '20px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                position: 'relative',
                transition: 'all 0.3s ease',
                animation: `slideInUp 0.8s ease-out ${idx * 0.2}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
              }}>
                
                {/* Quote Icon */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.1
                }}>
                  <Quote size={20} style={{ color: 'white' }} />
                </div>

                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  ))}
                </div>

                {/* Content */}
                <p style={{
                  fontSize: '16px',
                  color: '#374151',
                  lineHeight: '1.7',
                  marginBottom: '24px',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '16px'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '2px'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#64748b'
                    }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#3b82f6',
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: '8px'
              }}>
                4.9/5
              </div>
              <div style={{
                fontSize: '14px',
                color: '#64748b',
                fontWeight: '600'
              }}>
                Average Rating
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#22c55e',
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: '8px'
              }}>
                500+
              </div>
              <div style={{
                fontSize: '14px',
                color: '#64748b',
                fontWeight: '600'
              }}>
                Happy Students
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#8b5cf6',
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: '8px'
              }}>
              95%
              </div>
              <div style={{
                fontSize: '14px',
                color: '#64748b',
                fontWeight: '600'
              }}>
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Curriculum Section - Timeline Layout */}
      <div id="curriculum" style={{ 
        background: 'white',
        padding: '120px 0',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 40px' }}>
          <div className="scroll-animate" style={{ 
            textAlign: 'center', 
            marginBottom: '80px',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <h2 style={{
              fontSize: '60px',
              fontWeight: '950',
              color: '#1e293b',
              marginBottom: '20px',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-2px'
            }}>
              Your Learning Journey
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Progress through our structured path from beginner to financial expert
            </p>
          </div>

          {/* Enhanced Timeline Layout */}
          <div style={{ position: 'relative' }}>
            {/* Animated Timeline Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: '4px',
              background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #22c55e 100%)',
              transform: 'translateX(-50%)',
              borderRadius: '2px',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
            }}></div>

            {/* Timeline Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              
              {[
                {
                  level: 'LEVEL 1',
                  title: 'Foundation',
                  color: '#3b82f6',
                  items: ['Personal budgeting basics', 'Understanding bank accounts', 'Credit management', 'Emergency fund planning'],
                  side: 'left'
                },
                {
                  level: 'LEVEL 2', 
                  title: 'Investment',
                  color: '#8b5cf6',
                  items: ['Stock market fundamentals', 'ETFs & mutual funds', 'Portfolio diversification', 'Retirement planning'],
                  side: 'right'
                },
                {
                  level: 'LEVEL 3',
                  title: 'Mastery',
                  color: '#22c55e',
                  items: ['Options & derivatives', 'Technical analysis', 'Real estate investing', 'Tax optimization'],
                  side: 'left'
                }
              ].map((level, idx) => (
                <div key={idx} className="scroll-animate" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  position: 'relative',
                  opacity: 0,
                  transform: 'translateY(40px)',
                  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 0.2}s`,
                  minHeight: '200px'
                }}>
                  {level.side === 'left' ? (
                    <>
                      {/* Left Side Content */}
                      <div style={{ width: '45%', paddingRight: '40px', display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{
                          background: 'white',
                          padding: '32px',
                          borderRadius: '20px',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
                          border: `2px solid ${level.color}15`,
                          transition: 'all 0.3s ease',
                          width: '100%',
                          maxWidth: '380px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = `0 20px 60px ${level.color}20`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
                        }}>
                          <div style={{
                            display: 'inline-block',
                            background: level.color,
                            color: 'white',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {level.level}
                          </div>
                          <h3 style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#1e293b',
                            marginBottom: '16px',
                            fontFamily: 'Space Grotesk, sans-serif'
                          }}>
                            {level.title}
                          </h3>
                          <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            color: '#64748b',
                            fontSize: '15px',
                            lineHeight: '1.7'
                          }}>
                            {level.items.map((item, itemIdx) => (
                              <li key={itemIdx} style={{ 
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                              }}>
                                <CheckCircle size={14} style={{ color: level.color, flexShrink: 0 }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Timeline Node */}
                      <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '28px',
                        height: '28px',
                        background: level.color,
                        borderRadius: '50%',
                        border: '4px solid white',
                        boxShadow: `0 6px 20px ${level.color}30`,
                        zIndex: 3
                      }}></div>
                      
                      {/* Right Side Empty */}
                      <div style={{ width: '45%' }}></div>
                    </>
                  ) : (
                    <>
                      {/* Left Side Empty */}
                      <div style={{ width: '45%' }}></div>
                      
                      {/* Timeline Node */}
                      <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '28px',
                        height: '28px',
                        background: level.color,
                        borderRadius: '50%',
                        border: '4px solid white',
                        boxShadow: `0 6px 20px ${level.color}30`,
                        zIndex: 3
                      }}></div>
                      
                      {/* Right Side Content */}
                      <div style={{ width: '45%', paddingLeft: idx === 1 ? '130px' : '40px', display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{
                          background: 'white',
                          padding: '32px',
                          borderRadius: '20px',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
                          border: `2px solid ${level.color}15`,
                          transition: 'all 0.3s ease',
                          width: '100%',
                          maxWidth: '380px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = `0 20px 60px ${level.color}20`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
                        }}>
                          <div style={{
                            display: 'inline-block',
                            background: level.color,
                            color: 'white',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {level.level}
                          </div>
                          <h3 style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#1e293b',
                            marginBottom: '16px',
                            fontFamily: 'Space Grotesk, sans-serif'
                          }}>
                            {level.title}
                          </h3>
                          <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            color: '#64748b',
                            fontSize: '15px',
                            lineHeight: '1.7'
                          }}>
                            {level.items.map((item, itemIdx) => (
                              <li key={itemIdx} style={{ 
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                              }}>
                                <CheckCircle size={14} style={{ color: level.color, flexShrink: 0 }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '120px 0',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          
          {/* Enhanced CTA Card */}
          <div className="scroll-animate" style={{
            background: 'white',
            borderRadius: '32px',
            padding: '80px 60px',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid rgba(59, 130, 246, 0.1)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.1)',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            
            {/* Enhanced Background Elements */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(60px)'
            }}></div>
            
            <div style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Enhanced Trust Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '15px',
                color: '#059669',
                fontWeight: '700',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                marginBottom: '40px',
                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.1)'
              }}>
                <CheckCircle size={18} />
                100% Free • No Credit Card Required • Instant Access
              </div>

              <h3 style={{
                fontSize: '56px',
                fontWeight: '950',
                color: '#1e293b',
                marginBottom: '24px',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-2px',
                lineHeight: '1.1'
              }}>
                Ready to Transform Your
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Financial Future?
                </span>
              </h3>
              
              <p style={{
                fontSize: '22px',
                color: '#64748b',
                marginBottom: '48px',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto 48px',
                fontWeight: '500'
              }}>
                Join hundreds of students who are already growing their financial knowledge and building wealth through our comprehensive platform.
              </p>

              {/* Enhanced Feature Pills */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '48px',
                flexWrap: 'wrap'
              }}>
                {[
                  { icon: BookOpen, text: '500+ Expert Lessons', color: '#3b82f6' },
                  { icon: Brain, text: 'AI-Powered Tutoring', color: '#8b5cf6' },
                  { icon: BarChart3, text: 'Progress Tracking', color: '#22c55e' }
                ].map((feature, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(248, 250, 252, 0.8)',
                    padding: '16px 24px',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.05)';
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: feature.color,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <feature.icon size={14} style={{ color: 'white' }} />
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Button */}
              <button 
                onClick={() => navigate('/auth')}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '24px 56px',
                  borderRadius: '18px',
                  fontSize: '22px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '16px',
                  boxShadow: '0 15px 40px rgba(59, 130, 246, 0.3)',
                  marginBottom: '32px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px) scale(1.02)';
                  e.target.style.boxShadow = '0 25px 60px rgba(59, 130, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.3)';
                }}
              >
                <Rocket size={26} />
                Start Your Journey Today
                <ArrowRight size={22} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 3s infinite'
                }}></div>
              </button>

              {/* Enhanced Trust Indicators */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
                flexWrap: 'wrap',
                opacity: 0.8
              }}>
                {[
                  { icon: '⭐', text: '4.9/5 Student Rating' },
                  { icon: '🔒', text: 'Secure & Private' },
                  { icon: '⚡', text: 'Instant Access' }
                ].map((indicator, idx) => (
                  <span key={idx} style={{
                    color: '#64748b',
                    fontSize: '15px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '18px' }}>{indicator.icon}</span>
                    {indicator.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer style={{
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(20px)',
        color: 'rgba(255, 255, 255, 0.8)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }} />
    </div>
  );
}

export default LandingPage;