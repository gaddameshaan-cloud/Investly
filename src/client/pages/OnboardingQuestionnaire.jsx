import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CheckCircle, Users, BookOpen, Target } from 'lucide-react';
import axios from 'axios';

const OnboardingQuestionnaire = ({ user, onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    howDidYouFindUs: [],
    familiarityWithFinance: '',
    currentGoal: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: 'howDidYouFindUs',
      title: 'How did you find us?',
      subtitle: 'Select up to 3 options',
      icon: <Users size={32} />,
      type: 'multiple',
      maxSelections: 3,
      options: [
        'Google Search',
        'Social Media (Instagram, TikTok, etc.)',
        'YouTube',
        'Friend or Family Recommendation',
        'School or University',
        'Online Advertisement',
        'Blog or Article',
        'Podcast',
        'Reddit or Online Forum',
        'App Store',
        'Other'
      ]
    },
    {
      id: 'familiarityWithFinance',
      title: 'How familiar are you with finance?',
      subtitle: 'Select one option',
      icon: <BookOpen size={32} />,
      type: 'single',
      maxSelections: 1,
      options: [
        'Unfamiliar',
        'Familiar', 
        'Moderately Familiar',
        'Very Familiar'
      ]
    },
    {
      id: 'currentGoal',
      title: 'What best describes your current goal?',
      subtitle: 'Select up to 3 options',
      icon: <Target size={32} />,
      type: 'multiple',
      maxSelections: 3,
      options: [
        'Learn basic money management',
        'Start investing for the first time',
        'Build an emergency fund',
        'Pay off debt',
        'Save for a major purchase (car, house, etc.)',
        'Plan for retirement',
        'Increase my income',
        'Start a business',
        'Improve my credit score',
        'Learn about cryptocurrency',
        'General financial education'
      ]
    }
  ];

  const currentQuestion = questions[currentStep];

  const handleOptionSelect = (option) => {
    const questionId = currentQuestion.id;
    
    if (currentQuestion.type === 'single') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: option
      }));
    } else {
      setAnswers(prev => {
        const currentSelections = prev[questionId] || [];
        const isSelected = currentSelections.includes(option);
        
        if (isSelected) {
          // Remove option
          return {
            ...prev,
            [questionId]: currentSelections.filter(item => item !== option)
          };
        } else {
          // Add option if under limit
          if (currentSelections.length < currentQuestion.maxSelections) {
            return {
              ...prev,
              [questionId]: [...currentSelections, option]
            };
          }
          return prev;
        }
      });
    }
  };

  const isOptionSelected = (option) => {
    const questionId = currentQuestion.id;
    if (currentQuestion.type === 'single') {
      return answers[questionId] === option;
    }
    return answers[questionId]?.includes(option) || false;
  };

  const canProceed = () => {
    const questionId = currentQuestion.id;
    if (currentQuestion.type === 'single') {
      return answers[questionId] !== '';
    }
    return answers[questionId]?.length > 0;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log('Submitting onboarding data:', {
        userId: user.id,
        responses: answers
      });

      // Save questionnaire responses
      const response = await axios.post('/api/user/onboarding', {
        userId: user.id,
        responses: answers
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Onboarding response:', response.data);

      // Mark onboarding as complete
      onComplete();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving questionnaire:', error);
      console.error('Error details:', error.response?.data);
      
      // Show error to user but still continue to dashboard
      alert(`Error saving responses: ${error.response?.data?.error || error.message}. You can continue to the dashboard.`);
      
      onComplete();
      navigate('/dashboard');
    }
    setIsSubmitting(false);
  };

  const getSelectionCount = () => {
    const questionId = currentQuestion.id;
    if (currentQuestion.type === 'single') {
      return answers[questionId] ? 1 : 0;
    }
    return answers[questionId]?.length || 0;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.1)'
      }}>
        {/* Progress Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '40px'
        }}>
          {questions.map((_, index) => (
            <div
              key={index}
              style={{
                width: '30%',
                height: '4px',
                background: index <= currentStep ? '#3b82f6' : '#e2e8f0',
                borderRadius: '2px',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Question Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '16px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)',
            borderRadius: '16px',
            marginBottom: '20px',
            color: 'white'
          }}>
            {currentQuestion.icon}
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px',
            lineHeight: '1.2'
          }}>
            {currentQuestion.title}
          </h2>
          <p style={{
            color: '#64748b',
            fontSize: '16px',
            margin: 0
          }}>
            {currentQuestion.subtitle}
          </p>
          {currentQuestion.type === 'multiple' && (
            <p style={{
              color: '#3b82f6',
              fontSize: '14px',
              fontWeight: '600',
              margin: '8px 0 0 0'
            }}>
              {getSelectionCount()}/{currentQuestion.maxSelections} selected
            </p>
          )}
        </div>

        {/* Options */}
        <div style={{
          display: 'grid',
          gap: '12px',
          marginBottom: '40px'
        }}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = isOptionSelected(option);
            const isDisabled = !isSelected && 
              currentQuestion.type === 'multiple' && 
              getSelectionCount() >= currentQuestion.maxSelections;

            return (
              <button
                key={index}
                onClick={() => !isDisabled && handleOptionSelect(option)}
                disabled={isDisabled}
                style={{
                  padding: '16px 20px',
                  border: `2px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'white',
                  color: isDisabled ? '#94a3b8' : (isSelected ? '#3b82f6' : '#1e293b'),
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: isDisabled ? 0.5 : 1
                }}
              >
                <span>{option}</span>
                {isSelected && <CheckCircle size={20} />}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              color: currentStep === 0 ? '#94a3b8' : '#64748b',
              fontSize: '16px',
              fontWeight: '600',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 0 ? 0.5 : 1
            }}
          >
            Back
          </button>

          <span style={{
            color: '#64748b',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {currentStep + 1} of {questions.length}
          </span>

          <button
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            style={{
              padding: '12px 24px',
              background: canProceed() && !isSubmitting 
                ? 'linear-gradient(135deg, #3b82f6 0%, #38bdf8 100%)' 
                : '#94a3b8',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: canProceed() && !isSubmitting ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            {isSubmitting ? 'Saving...' : (currentStep === questions.length - 1 ? 'Complete' : 'Next')}
            {!isSubmitting && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;