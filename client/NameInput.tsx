import React, { useState } from 'react';

interface NameInputProps {
  onComplete: (name: string) => void;
}

export default function NameInput({ onComplete }: NameInputProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name to continue');
      return;
    }
    
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    
    onComplete(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-indigo-800 mb-2">
              Welcome, Future Economist! 👋
            </h2>
            <p className="text-gray-600">
              Before we begin, let's get to know you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                What's your name?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
                autoFocus
              />
              {error && (
                <div className="mt-2 flex items-start gap-2 text-red-600 text-sm">
                  <span className="text-lg">⚠️</span>
                  <p>{error}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Let's Start Learning!
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Your name will be used to personalize your learning experience
          </p>
        </div>
      </div>
    </div>
  );
}
