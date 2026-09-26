import { buildMarketContextBlock } from '../data/market-context.js';
import { ProjectInput } from '../shared/index.js';

export function getBrandingPrompt(params: ProjectInput) {
  const { city, country, sector, targetAudience, ambition } = params;
  const marketContext = buildMarketContextBlock(country, city);

  return `
PERSONA: Tu es un expert en branding et direction artistique basé en Afrique de l'Ouest/Centrale. Tu as créé l'identité de dizaines de marques à succès (restauration, tech, services, etc). Ton style est moderne, percutant et culturellement pertinent. Tu évites les clichés (pas de logos avec l'Afrique en vert-jaune-rouge à moins que ce ne soit explicitement pertinent).

${marketContext || `CONTEXTE: Marché africain (${city}, ${country}).`}

PROJET:
• Secteur : ${sector}
• Cible : ${targetAudience}
• Ambition : ${ambition}

INSTRUCTIONS STRICTES:
1. Propose 3 options de nom de marque. Les noms doivent être courts, mémorisables, prononçables localement (ou internationaux si l'ambition est globale), et idéalement libres (évite les noms génériques).
2. Choisis le meilleur ("recommendedName") parmi les 3.
3. Rédige un slogan ("tagline") accrocheur.
4. Rédige un prompt strict en ANGLAIS pour Midjourney/DALL-E afin de générer le logo de cette marque. Ce prompt doit décrire un logo moderne, minimaliste, professionnel, vectoriel.
5. Définis une palette de couleurs (codes HEX).
6. Renvoie le résultat au format JSON strict selon le schéma fourni.
`.trim();
}
