import React from 'react';
import { Student } from '../types/game';
import { calculateUtility } from '../utils/paretoCalculations';

interface StudentPanelProps {
  student: Student;
  isStudentA: boolean;
}

export default function StudentPanel({ student, isStudentA }: StudentPanelProps) {
  const utility = calculateUtility(student);
  const bgColor = isStudentA ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200';
  const accentColor = isStudentA ? 'text-blue-800' : 'text-green-800';
  const badgeColor = isStudentA ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';

  return (
    <div className={`${bgColor} border-2 rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-bold ${accentColor}`}>
          Student {student.name}
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}>
          Utility: {utility}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍕</span>
            <span className="font-medium">Pizza Slices:</span>
          </div>
          <span className="text-xl font-bold text-gray-800">{student.pizza}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🥤</span>
            <span className="font-medium">Soda Cans:</span>
          </div>
          <span className="text-xl font-bold text-gray-800">{student.soda}</span>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Preferences:</h4>
          <p className="text-xs text-gray-600">
            Pizza preference: {student.pizzaWeight}x | Soda preference: {student.sodaWeight}x
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Utility = {student.pizzaWeight}×{student.pizza} + {student.sodaWeight}×{student.soda} = {utility}
          </p>
        </div>
      </div>
    </div>
  );
}
