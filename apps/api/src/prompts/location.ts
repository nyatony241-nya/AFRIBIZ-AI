import { buildMarketContextBlock } from '../data/market-context.js';
import { ProjectInput } from '../shared/index.js';

export function getLocationPrompt(params: ProjectInput) {
  const { city, country, sector, hasPhysicalLocation, isRemoteManaged } = params;
  const marketContext = buildMarketContextBlock(country, city);

  return `
PERSONA: Tu es un expert en immobilier commercial et en stratégie d'implantation basé à ${city}, ${country}.

${marketContext || `CONTEXTE: Marché africain (${city}, ${country}).`}

PROJET:
• Secteur : ${sector}
• Nécessite un local physique : ${hasPhysicalLocation ? 'Oui' : 'Non'}
• Gestion à distance : ${isRemoteManaged ? 'Oui' : 'Non'}

INSTRUCTIONS STRICTES:
1. Recommande la meilleure zone ("bestZone") pour ce business dans cette ville précise.
2. Détaille la valeur stratégique et le comportement des clients dans cette zone.
3. Propose une alternative pour les petits budgets.
4. Identifie au moins 2 autres zones potentielles avec leurs avantages et inconvénients (loyers estimés réels).
5. Renvoie UNIQUEMENT le résultat au format JSON strict selon le schéma.
`.trim();
}
