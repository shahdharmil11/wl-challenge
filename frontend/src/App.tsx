function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            WL Challenge - Boilerplate Ready
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🚀 Frontend & Backend Setup Complete
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Your boilerplate is ready for development!
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">✅ What's Ready:</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>• React + TypeScript + Tailwind CSS (Frontend)</li>
              <li>• Express + TypeScript + CORS (Backend)</li>
              <li>• Development servers configured</li>
              <li>• Environment variables set up</li>
              <li>• Project structure organized</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Ready to start coding!
            </h3>
            <p className="text-blue-700">
              Backend: <code className="bg-blue-100 px-2 py-1 rounded">http://localhost:3001</code><br/>
              Frontend: <code className="bg-blue-100 px-2 py-1 rounded">http://localhost:5173</code>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
