export interface Student {
  name: string;
  pizza: number;
  soda: number;
  pizzaWeight: number; // utility weight for pizza
  sodaWeight: number;  // utility weight for soda
}

export interface Trade {
  fromStudent: 'A' | 'B';
  toStudent: 'A' | 'B';
  pizzaAmount: number;
  sodaAmount: number;
}

export interface GameState {
  studentA: Student;
  studentB: Student;
  currentScenario: number;
  tradeHistory: Trade[];
}

export interface Scenario {
  name: string;
  description: string;
  initialA: { pizza: number; soda: number };
  initialB: { pizza: number; soda: number };
}

export interface ParetoStatus {
  isEfficient: boolean;
  canImprove: boolean;
  suggestedTrade?: Trade;
  explanation: string;
}
