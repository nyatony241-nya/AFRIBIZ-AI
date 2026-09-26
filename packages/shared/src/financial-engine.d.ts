import { FinancialHypothesis, Scenario } from './schemas.js';
/**
 * Calcule les projections sur 6 mois pour un scénario donné.
 */
export declare function generateScenario(scenarioType: 'conservative' | 'central' | 'ambitious', label: string, hypotheses: FinancialHypothesis): Scenario;
/**
 * Génère les 3 scénarios standards (Pessimiste, Central, Optimiste) à partir d'une hypothèse de base.
 */
export declare function generateAllScenarios(hypotheses: FinancialHypothesis): Scenario[];
/**
 * Calcule le total de l'investissement initial (Besoin en Fonds de Roulement initial)
 */
export declare function calculateInitialInvestment(hypotheses: FinancialHypothesis): number;
/**
 * Calcule le coût fixe mensuel total attendu
 */
export declare function calculateTotalMonthlyFixedCosts(hypotheses: FinancialHypothesis): number;
//# sourceMappingURL=financial-engine.d.ts.map