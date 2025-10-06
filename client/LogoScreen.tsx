import React from 'react';

interface LogoScreenProps {
  onContinue: () => void;
}

export default function LogoScreen({ onContinue }: LogoScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-800 mb-4">
            Pareto Efficiency Game
          </h1>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 mb-8">
            An Interactive Educational Game on Resource Allocation
          </p>
          
          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Created by</h2>
            <div className="text-gray-800">
              <p className="text-2xl font-bold mb-2">Abhilash Kar</p>
              <p className="text-lg">SYBSc Economics Honours</p>
              <p className="text-md text-gray-600">PRN: 24060223015</p>
            </div>
          </div>
          
          <button
            onClick={onContinue}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-lg"
          >
            Start Learning
          </button>
        </div>
        
        <p className="text-gray-600 text-sm">
          Learn about Pareto efficiency through interactive trading scenarios
        </p>
      </div>
    </div>
  );
}
