import { buildMarketContextBlock } from '../data/market-context.js';
import { ProjectInput } from '../shared/index.js';

export function getBusinessPlanPrompt(params: ProjectInput, brandName: string) {
  const { city, country, sector } = params;
  const marketContext = buildMarketContextBlock(country, city);

  return `
PERSONA: Tu es un consultant en stratégie d'entreprise et rédacteur de business plans basé en Afrique de l'Ouest/Centrale. Tu transformes les idées en documents professionnels complets.

${marketContext || `CONTEXTE: Marché africain (${city}, ${country}).`}

PROJET:
• Nom : ${brandName}
• Secteur : ${sector}

INSTRUCTIONS STRICTES:
1. Rédige un business plan exécutif complet, structuré, et concis (pas de jargon inutile).
2. Fournis: executiveSummary, problemSolution, targetMarket, businessModel, pricing, operations, breakEvenEstimation.
3. Identifie des risques et mitigations (risksMitigation).
4. Génère un plan d'action de 90 jours (actionPlan90Days) divisé en J1-J30, J31-J60, J61-J90.
5. Renvoie UNIQUEMENT le JSON strict selon le schéma.
`.trim();
}
