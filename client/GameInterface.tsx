import React, { useState, useEffect, useRef } from 'react';
import { GameState, Student, Trade, Scenario } from '../types/game';
import { checkParetoStatus, executeTrade, scenarios, calculateUtility } from '../utils/paretoCalculations';
import StudentPanel from './StudentPanel';
import TradeInterface from './TradeInterface';

interface GameInterfaceProps {
  playerName: string;
}

export default function GameInterface({ playerName }: GameInterfaceProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    studentA: {
      name: 'A',
      pizza: 6,
      soda: 2,
      pizzaWeight: 3,
      sodaWeight: 1
    },
    studentB: {
      name: 'B',
      pizza: 2,
      soda: 6,
      pizzaWeight: 1,
      sodaWeight: 3
    },
    currentScenario: 0,
    tradeHistory: []
  });

  const [paretoStatus, setParetoStatus] = useState(checkParetoStatus(gameState.studentA, gameState.studentB));
  const [showHint, setShowHint] = useState(false);
  const [tradeResult, setTradeResult] = useState('');

  useEffect(() => {
    setParetoStatus(checkParetoStatus(gameState.studentA, gameState.studentB));
  }, [gameState.studentA, gameState.studentB]);

  const handleTrade = (trade: Trade) => {
    const result = executeTrade(gameState.studentA, gameState.studentB, trade);
    
    const oldUtilityA = calculateUtility(gameState.studentA);
    const oldUtilityB = calculateUtility(gameState.studentB);
    const newUtilityA = calculateUtility(result.newA);
    const newUtilityB = calculateUtility(result.newB);
    
    setGameState(prev => ({
      ...prev,
      studentA: result.newA,
      studentB: result.newB,
      tradeHistory: [...prev.tradeHistory, trade]
    }));
    
    // Show trade result with personalized message
    if (newUtilityA > oldUtilityA && newUtilityB > oldUtilityB) {
      setTradeResult(`✅ Excellent work, ${playerName}! This is a Pareto Improvement - both students are better off!`);
    } else if (newUtilityA > oldUtilityA || newUtilityB > oldUtilityB) {
      if (newUtilityA < oldUtilityA || newUtilityB < oldUtilityB) {
        setTradeResult(`⚠️ Careful, ${playerName}! This trade makes one student worse off.`);
      } else {
        setTradeResult(`📊 Good attempt, ${playerName}! This trade improves one student without hurting the other.`);
      }
    } else if (newUtilityA === oldUtilityA && newUtilityB === oldUtilityB) {
      setTradeResult(`↔️ Nice try, ${playerName}, but no change in utility for either student.`);
    } else {
      setTradeResult(`❌ Oops, ${playerName}! This trade makes both students worse off. Try again!`);
    }
    
    // Scroll to result
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    
    setTimeout(() => setTradeResult(''), 6000);
  };

  const handleReset = () => {
    const scenario = scenarios[gameState.currentScenario];
    setGameState(prev => ({
      ...prev,
      studentA: {
        ...prev.studentA,
        pizza: scenario.initialA.pizza,
        soda: scenario.initialA.soda
      },
      studentB: {
        ...prev.studentB,
        pizza: scenario.initialB.pizza,
        soda: scenario.initialB.soda
      },
      tradeHistory: []
    }));
    setTradeResult('');
  };

  const handleScenarioChange = (scenarioIndex: number) => {
    const scenario = scenarios[scenarioIndex];
    setGameState(prev => ({
      ...prev,
      currentScenario: scenarioIndex,
      studentA: {
        ...prev.studentA,
        pizza: scenario.initialA.pizza,
        soda: scenario.initialA.soda
      },
      studentB: {
        ...prev.studentB,
        pizza: scenario.initialB.pizza,
        soda: scenario.initialB.soda
      },
      tradeHistory: []
    }));
    setTradeResult('');
  };

  const getStatusColor = () => {
    if (paretoStatus.isEfficient) return 'bg-green-100 border-green-500 text-green-800';
    if (paretoStatus.canImprove) return 'bg-orange-100 border-orange-500 text-orange-800';
    return 'bg-blue-100 border-blue-500 text-blue-800';
  };

  const getStatusIcon = () => {
    if (paretoStatus.isEfficient) return '✅';
    if (paretoStatus.canImprove) return '⚠️';
    return 'ℹ️';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome, {playerName}! 👋
              </h1>
              <p className="text-gray-600">Let's explore resource allocation and Pareto efficiency together</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Reset Scenario
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Scenario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => handleScenarioChange(index)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  gameState.currentScenario === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <h3 className="font-semibold text-gray-800 mb-1">{scenario.name}</h3>
                <p className="text-sm text-gray-600">{scenario.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Status Panel */}
        <div className={`border-2 rounded-lg p-4 mb-6 ${getStatusColor()}`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{getStatusIcon()}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                {paretoStatus.isEfficient ? 'Pareto Efficient!' : 'Not Pareto Efficient'}
              </h3>
              <p className="mb-3">{paretoStatus.explanation}</p>
              
              {showHint && paretoStatus.suggestedTrade && (
                <div className="bg-white bg-opacity-80 rounded-lg p-3 border border-current border-opacity-30">
                  <h4 className="font-medium mb-2">💡 Suggested Trade:</h4>
                  <p className="text-sm">
                    Student A could give {Math.abs(paretoStatus.suggestedTrade.pizzaAmount)} pizza 
                    and {Math.abs(paretoStatus.suggestedTrade.sodaAmount)} soda to Student B 
                    for mutual benefit.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trade Result */}
        {tradeResult && (
          <div ref={resultRef} className="bg-white border-2 border-indigo-200 rounded-lg p-4 mb-6 trade-result-animation">
            <p className="text-indigo-800 font-medium text-center text-lg">{tradeResult}</p>
          </div>
        )}

        {/* Students Panel */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <StudentPanel student={gameState.studentA} isStudentA={true} />
          <StudentPanel student={gameState.studentB} isStudentA={false} />
        </div>

        {/* Trade Interface */}
        <TradeInterface
          studentA={gameState.studentA}
          studentB={gameState.studentB}
          onExecuteTrade={handleTrade}
        />

        {/* Educational Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Understanding Pareto Efficiency</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Key Concepts:</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li><strong>Pareto Efficient:</strong> No trade can make both students better off</li>
                <li><strong>Pareto Improvement:</strong> A trade that benefits at least one student without hurting the other</li>
                <li><strong>Utility:</strong> A measure of satisfaction from consuming goods</li>
                <li><strong>Preferences:</strong> Student A prefers pizza (3:1), Student B prefers soda (3:1)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Game Rules:</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Total resources are always conserved (8 pizza + 8 soda)</li>
                <li>Students cannot have negative amounts of any resource</li>
                <li>Trades must be mutual (both students give and receive)</li>
                <li>Goal: Find allocations that maximize both students' satisfaction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
