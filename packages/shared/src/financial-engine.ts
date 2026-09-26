import { 
  FinancialHypothesis, 
  Scenario, 
  MonthlyProjection 
} from './schemas.js';

/**
 * Modificateurs appliqués au volume d'affaires selon le scénario.
 * On suppose une croissance graduelle (ramp-up) au fil des mois.
 */
const SCENARIO_MULTIPLIERS = {
  conservative: {
    baseVolumeModifier: 0.6, // 60% du volume attendu initialement
    monthlyGrowth: 0.05,     // +5% de croissance mensuelle
    fixedCostsModifier: 1.0, // Les charges fixes restent les mêmes
  },
  central: {
    baseVolumeModifier: 1.0, // 100% du volume attendu
    monthlyGrowth: 0.10,     // +10% de croissance mensuelle
    fixedCostsModifier: 1.0,
  },
  ambitious: {
    baseVolumeModifier: 1.3, // 130% du volume attendu
    monthlyGrowth: 0.15,     // +15% de croissance mensuelle
    fixedCostsModifier: 1.1, // +10% de charges fixes (pour absorber le volume)
  }
};

/**
 * Calcule les projections d'un mois spécifique.
 */
function calculateMonth(
  monthIndex: number,
  hypotheses: FinancialHypothesis,
  scenarioType: keyof typeof SCENARIO_MULTIPLIERS,
  openingCash: number
): MonthlyProjection {
  const multipliers = SCENARIO_MULTIPLIERS[scenarioType];
  
  // 1. Calcul du volume pour le mois courant (Ramp-up)
  // Mois 1 = baseModifier * volumeInitial
  // Mois N = Mois (N-1) * (1 + monthlyGrowth)
  const growthFactor = Math.pow(1 + multipliers.monthlyGrowth, monthIndex - 1);
  const currentVolume = hypotheses.monthlyVolume * multipliers.baseVolumeModifier * growthFactor;

  // 2. Chiffre d'affaires
  const revenue = currentVolume * hypotheses.unitPrice;

  // 3. Coûts variables (COGS)
  const baseVariableCost = hypotheses.unitVariableCost + hypotheses.deliveryCostPerUnit;
  const paymentFees = revenue * hypotheses.paymentFeeRate;
  const variableCosts = (currentVolume * baseVariableCost) + paymentFees;

  // 4. Marge brute
  const grossMargin = revenue - variableCosts;

  // 5. Charges fixes (Opex)
  const totalMonthlyFixed = (
    hypotheses.monthlyRent +
    hypotheses.monthlyLabor +
    hypotheses.monthlyUtilities +
    hypotheses.monthlyMarketing +
    hypotheses.otherMonthlyFixed
  ) * multipliers.fixedCostsModifier;
  
  // 6. Résultat d'exploitation (EBITDA simplifié)
  const operatingResult = grossMargin - totalMonthlyFixed;

  // 7. Trésorerie
  const closingCash = openingCash + operatingResult;

  return {
    month: monthIndex,
    revenue: Math.round(revenue),
    variableCosts: Math.round(variableCosts),
    grossMargin: Math.round(grossMargin),
    fixedCosts: Math.round(totalMonthlyFixed),
    operatingResult: Math.round(operatingResult),
    profit: Math.round(operatingResult), // Alias pour compatibilité v1
    openingCash: Math.round(openingCash),
    closingCash: Math.round(closingCash),
  };
}

/**
 * Calcule les projections sur 6 mois pour un scénario donné.
 */
export function generateScenario(
  scenarioType: 'conservative' | 'central' | 'ambitious',
  label: string,
  hypotheses: FinancialHypothesis
): Scenario {
  const projections: MonthlyProjection[] = [];
  
  // La trésorerie d'ouverture du Mois 1 correspond à la réserve de cash initiale
  let currentCash = hypotheses.cashReserve;
  
  let breakEvenMonth: number | null = null;
  const initialInvestment = hypotheses.equipmentCost + hypotheses.initialStock + hypotheses.launchExpenses;
  let cumulativeProfit = 0;
  let initialInvestmentRecovery: number | null = null;

  for (let m = 1; m <= 6; m++) {
    const monthData = calculateMonth(m, hypotheses, scenarioType, currentCash);
    projections.push(monthData);
    
    // Le cash d'ouverture du mois suivant est le cash de clôture du mois courant
    currentCash = monthData.closingCash;
    cumulativeProfit += monthData.operatingResult;

    // Détection du point mort (Break-even mensuel : premier mois où le profit est > 0)
    if (breakEvenMonth === null && monthData.operatingResult >= 0) {
      breakEvenMonth = m;
    }

    // Détection du retour sur investissement (ROI)
    if (initialInvestmentRecovery === null && cumulativeProfit >= initialInvestment) {
      initialInvestmentRecovery = m;
    }
  }

  // Si on n'a pas atteint le ROI sur 6 mois, on fait une estimation linéaire (extrapolation brute)
  if (initialInvestmentRecovery === null && cumulativeProfit > 0) {
    const avgMonthlyProfit = cumulativeProfit / 6;
    if (avgMonthlyProfit > 0) {
       // Extrapolation : 6 mois + mois restants nécessaires
       const remainingToRecover = initialInvestment - cumulativeProfit;
       initialInvestmentRecovery = Math.round(6 + (remainingToRecover / avgMonthlyProfit));
    }
  }

  return {
    type: scenarioType,
    label,
    hypotheses: {
      volumeModifier: SCENARIO_MULTIPLIERS[scenarioType].baseVolumeModifier,
      monthlyGrowth: SCENARIO_MULTIPLIERS[scenarioType].monthlyGrowth,
      fixedCostModifier: SCENARIO_MULTIPLIERS[scenarioType].fixedCostsModifier,
    },
    projections: projections as [MonthlyProjection, MonthlyProjection, MonthlyProjection, MonthlyProjection, MonthlyProjection, MonthlyProjection],
    breakEvenMonth,
    initialInvestmentRecovery,
  };
}

/**
 * Génère les 3 scénarios standards (Pessimiste, Central, Optimiste) à partir d'une hypothèse de base.
 */
export function generateAllScenarios(hypotheses: FinancialHypothesis): Scenario[] {
  return [
    generateScenario('conservative', 'Pessimiste (60% des objectifs)', hypotheses),
    generateScenario('central', 'Central (Objectif 100%)', hypotheses),
    generateScenario('ambitious', 'Optimiste (130% des objectifs)', hypotheses),
  ];
}

/**
 * Calcule le total de l'investissement initial (Besoin en Fonds de Roulement initial)
 */
export function calculateInitialInvestment(hypotheses: FinancialHypothesis): number {
  return (
    hypotheses.equipmentCost +
    hypotheses.initialStock +
    hypotheses.launchExpenses +
    hypotheses.cashReserve
  );
}

/**
 * Calcule le coût fixe mensuel total attendu
 */
export function calculateTotalMonthlyFixedCosts(hypotheses: FinancialHypothesis): number {
  return (
    hypotheses.monthlyRent +
    hypotheses.monthlyLabor +
    hypotheses.monthlyUtilities +
    hypotheses.monthlyMarketing +
    hypotheses.otherMonthlyFixed
  );
}
