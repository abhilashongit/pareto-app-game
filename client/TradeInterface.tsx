import React, { useState } from 'react';
import { Student, Trade } from '../types/game';
import { validateTrade } from '../utils/paretoCalculations';

interface TradeInterfaceProps {
  studentA: Student;
  studentB: Student;
  onExecuteTrade: (trade: Trade) => void;
}

export default function TradeInterface({ studentA, studentB, onExecuteTrade }: TradeInterfaceProps) {
  const [aPizza, setAPizza] = useState(0);
  const [aSoda, setASoda] = useState(0);
  const [bPizza, setBPizza] = useState(0);
  const [bSoda, setBSoda] = useState(0);
  const [error, setError] = useState('');

  const handleExecuteTrade = () => {
    setError('');
    
    // Check if it's actually a trade (something must be exchanged)
    if (aPizza === 0 && aSoda === 0 && bPizza === 0 && bSoda === 0) {
      setError('💡 Tooltip: Both students need to exchange something! Enter amounts for at least one student to give.');
      return;
    }
    
    // Check if trade amounts are valid
    if (aPizza > studentA.pizza) {
      setError(`⚠️ Tooltip: Student A only has ${studentA.pizza} pizza slices. Try a smaller amount!`);
      return;
    }
    
    if (aSoda > studentA.soda) {
      setError(`⚠️ Tooltip: Student A only has ${studentA.soda} soda cans. Try a smaller amount!`);
      return;
    }
    
    if (bPizza > studentB.pizza) {
      setError(`⚠️ Tooltip: Student B only has ${studentB.pizza} pizza slices. Try a smaller amount!`);
      return;
    }
    
    if (bSoda > studentB.soda) {
      setError(`⚠️ Tooltip: Student B only has ${studentB.soda} soda cans. Try a smaller amount!`);
      return;
    }
    
    // Create trades for both directions
    const tradeAtoB: Trade = {
      fromStudent: 'A',
      toStudent: 'B',
      pizzaAmount: aPizza,
      sodaAmount: aSoda
    };
    
    const tradeBtoA: Trade = {
      fromStudent: 'B',
      toStudent: 'A',
      pizzaAmount: bPizza,
      sodaAmount: bSoda
    };
    
    // Validate both sides of the trade
    const validationA = validateTrade(studentA, studentB, tradeAtoB);
    const validationB = validateTrade(studentB, studentA, tradeBtoA);
    
    if (!validationA.valid) {
      setError(`⚠️ Tooltip: ${validationA.error}`);
      return;
    }
    
    if (!validationB.valid) {
      setError(`⚠️ Tooltip: ${validationB.error}`);
      return;
    }
    
    // Execute the trade
    onExecuteTrade({
      fromStudent: 'A',
      toStudent: 'B',
      pizzaAmount: aPizza - bPizza,
      sodaAmount: aSoda - bSoda
    });
    
    // Reset form
    setAPizza(0);
    setASoda(0);
    setBPizza(0);
    setBSoda(0);
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Propose a Trade
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Student A gives */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3">Student A Gives:</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🍕 Pizza Slices (max: {studentA.pizza})
              </label>
              <input
                type="number"
                min="0"
                max={studentA.pizza}
                value={aPizza}
                onChange={(e) => setAPizza(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🥤 Soda Cans (max: {studentA.soda})
              </label>
              <input
                type="number"
                min="0"
                max={studentA.soda}
                value={aSoda}
                onChange={(e) => setASoda(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Student B gives */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3">Student B Gives:</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🍕 Pizza Slices (max: {studentB.pizza})
              </label>
              <input
                type="number"
                min="0"
                max={studentB.pizza}
                value={bPizza}
                onChange={(e) => setBPizza(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🥤 Soda Cans (max: {studentB.soda})
              </label>
              <input
                type="number"
                min="0"
                max={studentB.soda}
                value={bSoda}
                onChange={(e) => setBSoda(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg shadow-sm">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button
          onClick={handleExecuteTrade}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
        >
          Execute Trade
        </button>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>💡 Tip: A successful trade requires both students to exchange something</p>
        <p>Total resources are always conserved: 8 pizza slices + 8 soda cans</p>
      </div>
    </div>
  );
}
