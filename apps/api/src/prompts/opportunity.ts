import { buildMarketContextBlock } from '../data/market-context.js';

export function getOpportunityPrompt(params: {
  idea: string;
  city: string;
  country: string;
  budget: number;
}) {
  const { idea, city, country, budget } = params;
  
  // Construit le contexte marché exact pour injection
  const marketContext = buildMarketContextBlock(country, city);

  return `
PERSONA: Tu es un consultant en stratégie d'entreprise senior spécialisé dans les marchés subsahariens et nord-africains. Tu as accompagné plus de 200 startups et PME. Tu écris en français professionnel, direct, et tu ne dis jamais de banalités. Tu dis la vérité sur les risques.

${marketContext || `CONTEXTE: Marché africain (${city}, ${country}).`}

PROJET À ANALYSER:
• Idée : "${idea}"
• Budget disponible : ${budget}

INSTRUCTIONS STRICTES:
1. Analyse cette idée spécifiquement pour le marché local défini ci-dessus.
2. Identifie 3 risques locaux réels (pas de risques génériques).
3. Ne fournis aucune introduction, aucune conclusion. 
4. Renvoie le résultat au format JSON strict selon le schéma fourni.
`.trim();
}
