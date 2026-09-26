import { buildMarketContextBlock } from '../data/market-context.js';
import { ProjectInput } from '../shared/index.js';

export function getFinancePrompt(params: ProjectInput) {
  const { city, country, sector, budget, currency } = params;
  const marketContext = buildMarketContextBlock(country, city);

  return `
PERSONA: Tu es un analyste financier (CFO) spécialisé dans les PME africaines. Tu construis des modèles financiers hyper-réalistes. Tu ne sous-estimes JAMAIS les coûts cachés.

${marketContext || `CONTEXTE: Marché africain (${city}, ${country}).`}

PROJET:
• Secteur : ${sector}
• Budget disponible : ${budget} ${currency}

INSTRUCTIONS STRICTES:
1. Fournis UNIQUEMENT des hypothèses financières (nombres réels) pour ce business.
2. Utilise les montants moyens réalistes pour ${city}.
3. L'investissement initial (equipment + stock + launch + reserve) doit si possible tenir dans le budget de ${budget} ${currency}, sinon indique les vrais coûts du marché.
4. "unitPrice" est le prix de vente unitaire (ex: un repas, un service, un produit).
5. "monthlyVolume" est le nombre de ventes espérées par mois (réalisable).
6. "paymentFeeRate" est le taux de frais de paiement mobile (souvent entre 0.01 et 0.03).
7. "monthlyLabor" est le coût total des salaires mensuels.
8. Renvoie UNIQUEMENT le JSON strict des hypothèses financières.
`.trim();
}
