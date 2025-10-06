import { Student, Trade, ParetoStatus } from '../types/game';

export function calculateUtility(student: Student): number {
  return student.pizza * student.pizzaWeight + student.soda * student.sodaWeight;
}

export function validateTrade(
  studentA: Student,
  studentB: Student,
  trade: Trade
): { valid: boolean; error?: string } {
  // Check if trade conserves resources
  if (trade.fromStudent === 'A' && trade.toStudent === 'B') {
    // A gives pizza/soda to B, B must give something back
    if (trade.pizzaAmount < 0 || trade.sodaAmount < 0) {
      return { valid: false, error: "Trade amounts cannot be negative" };
    }
    
    if (studentA.pizza < trade.pizzaAmount || studentA.soda < trade.sodaAmount) {
      return { valid: false, error: "Student A doesn't have enough resources" };
    }
  }
  
  return { valid: true };
}

export function executeTrade(
  studentA: Student,
  studentB: Student,
  trade: Trade
): { newA: Student; newB: Student } {
  const newA = { ...studentA };
  const newB = { ...studentB };

  if (trade.fromStudent === 'A' && trade.toStudent === 'B') {
    newA.pizza -= trade.pizzaAmount;
    newA.soda -= trade.sodaAmount;
    newB.pizza += trade.pizzaAmount;
    newB.soda += trade.sodaAmount;
  } else if (trade.fromStudent === 'B' && trade.toStudent === 'A') {
    newB.pizza -= trade.pizzaAmount;
    newB.soda -= trade.sodaAmount;
    newA.pizza += trade.pizzaAmount;
    newA.soda += trade.sodaAmount;
  }

  return { newA, newB };
}

export function checkParetoStatus(studentA: Student, studentB: Student): ParetoStatus {
  const utilityA = calculateUtility(studentA);
  const utilityB = calculateUtility(studentB);
  
  // Check if any beneficial trade exists
  let bestTrade: Trade | undefined;
  let maxImprovement = 0;
  
  // Try all possible trades (simplified - check common beneficial trades)
  for (let pizzaA = 0; pizzaA <= Math.min(studentA.pizza, 3); pizzaA++) {
    for (let sodaA = 0; sodaA <= Math.min(studentA.soda, 3); sodaA++) {
      for (let pizzaB = 0; pizzaB <= Math.min(studentB.pizza, 3); pizzaB++) {
        for (let sodaB = 0; sodaB <= Math.min(studentB.soda, 3); sodaB++) {
          if (pizzaA === 0 && sodaA === 0 && pizzaB === 0 && sodaB === 0) continue;
          
          // A gives pizzaA and sodaA, gets pizzaB and sodaB
          const newA = {
            ...studentA,
            pizza: studentA.pizza - pizzaA + pizzaB,
            soda: studentA.soda - sodaA + sodaB
          };
          
          const newB = {
            ...studentB,
            pizza: studentB.pizza - pizzaB + pizzaA,
            soda: studentB.soda - sodaB + sodaA
          };
          
          const newUtilityA = calculateUtility(newA);
          const newUtilityB = calculateUtility(newB);
          
          // Check if this is a Pareto improvement
          if (newUtilityA >= utilityA && newUtilityB >= utilityB && 
              (newUtilityA > utilityA || newUtilityB > utilityB)) {
            const improvement = (newUtilityA - utilityA) + (newUtilityB - utilityB);
            if (improvement > maxImprovement) {
              maxImprovement = improvement;
              bestTrade = {
                fromStudent: 'A',
                toStudent: 'B',
                pizzaAmount: pizzaA - pizzaB,
                sodaAmount: sodaA - sodaB
              };
            }
          }
        }
      }
    }
  }
  
  if (bestTrade) {
    return {
      isEfficient: false,
      canImprove: true,
      suggestedTrade: bestTrade,
      explanation: "This allocation is not Pareto efficient. A beneficial trade is possible!"
    };
  }
  
  return {
    isEfficient: true,
    canImprove: false,
    explanation: "This allocation is Pareto efficient. No trade can make both students better off."
  };
}

export const scenarios = [
  {
    name: "Default Scenario",
    description: "Both students start with equal utility but inefficient allocation",
    initialA: { pizza: 6, soda: 2 },
    initialB: { pizza: 2, soda: 6 }
  },
  {
    name: "Extreme Mismatch",
    description: "Students have resources they don't prefer",
    initialA: { pizza: 1, soda: 7 },
    initialB: { pizza: 7, soda: 1 }
  },
  {
    name: "Already Efficient",
    description: "Starting from a Pareto efficient allocation",
    initialA: { pizza: 7, soda: 1 },
    initialB: { pizza: 1, soda: 7 }
  },
  {
    name: "Equal Split",
    description: "Both students start with equal amounts",
    initialA: { pizza: 4, soda: 4 },
    initialB: { pizza: 4, soda: 4 }
  }
];
