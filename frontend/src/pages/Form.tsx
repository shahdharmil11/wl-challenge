import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formAPI } from '../services/api';

// Hardcoded 10 questions
const QUESTIONS = [
  {
    id: 'question1',
    title: 'Personal Information',
    label: 'What is your full name?',
  },
  {
    id: 'question2',
    title: 'Contact Details',
    label: 'What is your phone number?',
  },
  {
    id: 'question3',
    title: 'Location',
    label: 'What city do you currently live in?',
  },
  {
    id: 'question4',
    title: 'Professional Background',
    label: 'What is your current job title?',
  },
  {
    id: 'question5',
    title: 'Experience Level',
    label: 'How many years of professional experience do you have?',
  },
  {
    id: 'question6',
    title: 'Education',
    label: 'What is your highest level of education?',
  },
  {
    id: 'question7',
    title: 'Skills',
    label: 'What are your top 3 technical skills?',
  },
  {
    id: 'question8',
    title: 'Interests',
    label: 'What topics or technologies are you most interested in learning?',
  },
  {
    id: 'question9',
    title: 'Goals',
    label: 'What are your professional goals for the next 2 years?',
  },
  {
    id: 'question10',
    title: 'Additional Information',
    label: 'Is there anything else you would like us to know about you?',
  },
];

const Form = () => {
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrorMessage('Email is required');
      return;
    }

    // Check if all questions are answered
    const unansweredQuestions = QUESTIONS.filter(q => !answers[q.id]?.trim());
    if (unansweredQuestions.length > 0) {
      setErrorMessage(`Please answer all questions. Missing: ${unansweredQuestions.length} question(s)`);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await formAPI.submit(email, answers);
      setSuccessMessage('Form submitted successfully! Thank you for your responses.');
      setEmail('');
      setAnswers({});
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
          <div className="text-green-600 text-2xl mb-4">✓</div>
          <h2 className="text-xl font-semibold text-green-800 mb-2">Success!</h2>
          <p className="text-green-700">{successMessage}</p>
          <p className="text-sm text-green-600 mt-2">Redirecting you to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Survey Form</h1>
        <p className="text-gray-600 mb-8">Please fill out all 10 questions below</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Field */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Your Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Questions */}
          {QUESTIONS.map((question, index) => (
            <div key={question.id} className="border-b border-gray-200 pb-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {index + 1}. {question.title}
                </h3>
                <p className="text-gray-600 text-sm">{question.label}</p>
              </div>
              
              <textarea
                id={question.id}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter your answer here..."
                required
              />
            </div>
          ))}

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-700">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;