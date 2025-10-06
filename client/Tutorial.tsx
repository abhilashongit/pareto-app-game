import React, { useState } from 'react';

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [step, setStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Pareto Efficiency!",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            This game teaches you about <strong>Pareto Efficiency</strong> - a key concept in economics!
          </p>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-800 mb-2">What is Pareto Efficiency?</h3>
            <p className="text-gray-700">
              An allocation is <strong>Pareto Efficient</strong> when no one can be made better off 
              without making someone else worse off.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">What is a Pareto Improvement?</h3>
            <p className="text-gray-700">
              A <strong>Pareto Improvement</strong> is a change that makes at least one person better off 
              without making anyone worse off.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Meet the Students",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700 mb-4">
            Two students are sharing pizza 🍕 and soda 🥤, but they have different preferences:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 text-xl mb-3">Student A</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="text-2xl">🍕</span> <strong>LOVES pizza!</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Values pizza <strong>3 times more</strong> than soda
                </p>
                <div className="bg-white p-2 rounded mt-3">
                  <p className="text-xs font-mono">
                    Utility = <strong>3×pizza + 1×soda</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
              <h3 className="font-bold text-green-800 text-xl mb-3">Student B</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="text-2xl">🥤</span> <strong>LOVES soda!</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Values soda <strong>3 times more</strong> than pizza
                </p>
                <div className="bg-white p-2 rounded mt-3">
                  <p className="text-xs font-mono">
                    Utility = <strong>1×pizza + 3×soda</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How Trading Works",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            You can propose trades to help both students maximize their happiness!
          </p>
          <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> Example Trade
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>If Student A has lots of soda but wants pizza, and Student B has lots of pizza but wants soda...</p>
              <p className="font-semibold text-indigo-800">They can trade to make BOTH happier!</p>
            </div>
          </div>
          <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Trading Rules:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Total resources stay the same (8 pizza + 8 soda)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Both students must trade something</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>No one can have negative items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Best trades increase total happiness</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Understanding the Interface",
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700 mb-4">
            Here's what you'll see in the game:
          </p>
          <div className="space-y-3">
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <p className="font-semibold text-green-800">🟢 Green Status = Pareto Efficient!</p>
              <p className="text-sm text-gray-600">No beneficial trades possible</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
              <p className="font-semibold text-orange-800">🟠 Orange Status = Not Efficient</p>
              <p className="text-sm text-gray-600">Beneficial trades are possible - try to find them!</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="font-semibold text-blue-800">🔵 Blue Result = Pareto Improvement</p>
              <p className="text-sm text-gray-600">Your trade made someone better without hurting anyone!</p>
            </div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg mt-4">
            <h3 className="font-semibold text-indigo-800 mb-2">💡 Hint System</h3>
            <p className="text-sm text-gray-700">
              Click <strong>"Show Hint"</strong> if you're stuck - the game will suggest a beneficial trade!
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">🎯 Your Goal</h3>
            <p className="text-sm text-gray-700">
              Try different scenarios and find the Pareto efficient allocations. Learn when trades help 
              and when no more improvements are possible!
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStep = tutorialSteps[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {step + 1} of {tutorialSteps.length}
              </span>
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Skip Tutorial
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((step + 1) / tutorialSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {currentStep.title}
            </h2>
            <div className="text-gray-700">
              {currentStep.content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                step === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === step ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
            >
              {step === tutorialSteps.length - 1 ? "Let's Play!" : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
