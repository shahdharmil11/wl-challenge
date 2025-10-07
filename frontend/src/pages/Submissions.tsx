import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { formAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Submission {
  id: number;
  answers: Record<string, string>;
  submitted_at: string;
}

const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchSubmissions();
  }, [state.isAuthenticated, navigate]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await formAPI.getSubmissions();
      setSubmissions(response.data.submissions);
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load submissions');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getQuestionTitle = (questionId: string): string => {
    const questionMap: Record<string, string> = {
      question1: 'Full Name',
      question2: 'Phone Number',
      question3: 'City',
      question4: 'Job Title',
      question5: 'Years of Experience',
      question6: 'Education Level',
      question7: 'Top 3 Skills',
      question8: 'Learning Interests',
      question9: 'Professional Goals',
      question10: 'Additional Information',
    };
    return questionMap[questionId] || questionId;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={fetchSubmissions}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Submissions</h1>
        <p className="text-gray-600">View all your survey submissions</p>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No submissions yet</h2>
          <p className="text-gray-500 mb-6">You haven't submitted any surveys yet.</p>
          <button
            onClick={() => navigate('/form')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Fill Your First Survey
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {submissions.map((submission) => (
            <div key={submission.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Submission #{submission.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Submitted: {formatDate(submission.submitted_at)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubmission(
                    selectedSubmission?.id === submission.id ? null : submission
                  )}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {selectedSubmission?.id === submission.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {selectedSubmission?.id === submission.id && (
                <div className="border-t pt-4 space-y-4">
                  {Object.entries(submission.answers).map(([questionId, answer]) => (
                    <div key={questionId} className="border-l-4 border-blue-200 pl-4">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {getQuestionTitle(questionId)}
                      </h4>
                      <p className="text-gray-700 text-sm">{answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Submissions;