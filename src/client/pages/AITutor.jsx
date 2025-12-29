import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, MessageSquare, Plus, Trash2, Menu, X, Home, TrendingUp, Sparkles } from 'lucide-react';

function AITutor({ user }) {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = React.useRef(null);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load conversations on mount
  React.useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(response.data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadConversation = async (conversationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Full conversation response:', response.data);
      console.log('Messages from API:', response.data.messages);
      
      setCurrentConversationId(conversationId);
      
      // Check if messages exist and are in the right format
      if (response.data.messages && response.data.messages.length > 0) {
        const formattedMessages = response.data.messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        setMessages(formattedMessages);
        console.log('Formatted messages:', formattedMessages);
      } else {
        console.warn('No messages found for this conversation');
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const startNewConversation = () => {
    setCurrentConversationId(null);
    setMessages([]);
  };

  const deleteConversation = async (conversationId, e) => {
    e.stopPropagation();
    if (!confirm('Delete this conversation?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await loadConversations();
      if (currentConversationId === conversationId) {
        startNewConversation();
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const saveMessage = async (role, content, conversationId = null) => {
    const convId = conversationId || currentConversationId;
    if (!convId) {
      console.warn('No conversation ID to save message to');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/conversations/${convId}/messages`, {
        role,
        content
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`Saved ${role} message to conversation ${convId}`);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    const currentInput = input;
    let newConversationId = currentConversationId;
    
    // If no conversation exists, create one
    if (!currentConversationId) {
      try {
        const token = localStorage.getItem('token');
        const title = currentInput.slice(0, 50) + (currentInput.length > 50 ? '...' : '');
        const convResponse = await axios.post('/api/conversations', {
          title,
          firstMessage: currentInput
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        newConversationId = convResponse.data.id;
        setCurrentConversationId(newConversationId);
        await loadConversations();
        console.log('Created new conversation:', newConversationId);
      } catch (error) {
        console.error('Error creating conversation:', error);
      }
    } else {
      // Save user message to existing conversation
      await saveMessage('user', currentInput);
      console.log('Saved user message to conversation:', currentConversationId);
    }

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/ai/chat', {
        message: currentInput,
        history: messages
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const assistantMessage = { role: 'assistant', content: response.data.response };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Save assistant response (use newConversationId if we just created one)
      if (newConversationId) {
        await saveMessage('assistant', response.data.response, newConversationId);
        console.log('Saved assistant message to conversation:', newConversationId);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      background: '#f7f7f8',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '0',
        background: '#0f172a',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        {/* Sidebar Header */}
        <div style={{ 
          padding: '16px',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <button
            onClick={startNewConversation}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>

        {/* Conversations List */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '8px'
        }}>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => loadConversation(conv.id)}
              style={{
                padding: '12px',
                marginBottom: '4px',
                background: currentConversationId === conv.id 
                  ? 'rgba(59, 130, 246, 0.15)'
                  : 'transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                border: currentConversationId === conv.id
                  ? '1px solid rgba(59, 130, 246, 0.3)'
                  : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (currentConversationId !== conv.id) {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentConversationId !== conv.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{ 
                flex: 1, 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <MessageSquare size={16} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <span style={{ 
                  color: 'white',
                  fontSize: '14px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {conv.title}
                </span>
              </div>
              <button
                onClick={(e) => deleteConversation(conv.id, e)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.7,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div style={{ 
          padding: '16px',
          borderTop: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
          >
            <Home size={18} />
            Dashboard
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        background: '#f7f7f8'
      }}>
        {/* Top Bar */}
        <div style={{
          padding: '16px 24px',
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div style={{ flex: 1 }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}>
                💰
              </span>
              AI Finance Tutor
            </h2>
          </div>
          <span style={{ 
            color: '#6b7280', 
            fontSize: '14px',
            padding: '6px 12px',
            background: '#f3f4f6',
            borderRadius: '6px'
          }}>
            {user.name}
          </span>
        </div>

        {/* Messages Area */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {messages.length === 0 ? (
            // Empty State
            <div style={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                marginBottom: '24px',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
              }}>
                💰
              </div>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '12px'
              }}>
                Welcome to AI Finance Tutor
              </h1>
              <p style={{ 
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                I'm here to help you master personal finance, investing, and economics. Ask me anything!
              </p>

              {/* Quick Prompts */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                width: '100%',
                maxWidth: '600px'
              }}>
                {[
                  { icon: '📊', text: 'Explain compound interest', prompt: 'Explain compound interest in simple terms' },
                  { icon: '💹', text: 'Stocks vs Bonds', prompt: "What's the difference between stocks and bonds?" },
                  { icon: '🎯', text: 'Start investing', prompt: 'How should I start investing as a beginner?' },
                  { icon: '💰', text: 'Saving strategies', prompt: 'What are the best strategies for saving money?' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(item.prompt)}
                    style={{
                      padding: '16px',
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <span style={{ 
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Messages
            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '24px',
                    display: 'flex',
                    gap: '16px',
                    animation: 'fadeIn 0.3s ease-out'
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0
                  }}>
                    {msg.role === 'user' ? '👤' : '🤖'}
                  </div>

                  {/* Message Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      {msg.role === 'user' ? 'You' : 'AI Tutor'}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      lineHeight: '1.7',
                      color: '#374151',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading State */}
              {loading && (
                <div style={{
                  marginBottom: '24px',
                  display: 'flex',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    🤖
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      AI Tutor
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s ease-in-out infinite 0.2s'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s ease-in-out infinite 0.4s'
                      }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{
          padding: '20px 24px',
          background: 'white',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            gap: '12px',
            alignItems: 'stretch'
          }}>
            <div style={{ 
              flex: 1,
              position: 'relative',
              display: 'flex'
            }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Message AI Finance Tutor..."
                disabled={loading}
                rows={1}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  resize: 'none',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'all 0.2s',
                  minHeight: '52px',
                  maxHeight: '200px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                width: '52px',
                height: '52px',
                background: loading || !input.trim()
                  ? '#e5e7eb'
                  : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: loading || !input.trim() ? '#9ca3af' : 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.2s',
                boxShadow: loading || !input.trim()
                  ? 'none'
                  : '0 4px 12px rgba(59, 130, 246, 0.3)',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = loading || !input.trim()
                  ? 'none'
                  : '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              <Send size={18} />
            </button>
          </div>
          <p style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#9ca3af',
            marginTop: '12px',
            marginBottom: 0
          }}>
            AI can make mistakes. Check important info.
          </p>
        </div>


      </div>
    </div>
  );
}

export default AITutor;
