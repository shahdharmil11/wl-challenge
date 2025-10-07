import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { state } = useAuth();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to WL Challenge
      </h1>
      
      <p className="text-xl text-gray-600 mb-12">
        Complete our 10-question survey and track your submissions
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Fill Survey
          </h2>
          <p className="text-gray-600 mb-6">
            Answer our 10 questions. No registration required, but register to track your submissions.
          </p>
          <Link
            to="/form"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Start Survey
          </Link>
        </div>

        {state.isAuthenticated ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              My Submissions
            </h2>
            <p className="text-gray-600 mb-6">
              View all your previous survey submissions.
            </p>
            <Link
              to="/submissions"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              View Submissions
            </Link>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Register Account
            </h2>
            <p className="text-gray-600 mb-6">
              Create an account to track and view your survey submissions.
            </p>
            <Link
              to="/register"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors"
            >
              Register Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;