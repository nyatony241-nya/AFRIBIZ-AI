import { v4 as uuidv4 } from 'uuid';
import { 
  ProjectInput, 
  AfriBizDossier, 
  generateAllScenarios 
} from '@afribiz/shared';
import { 
  generateOpportunity, 
  generateBranding, 
  generateMarketing, 
  generateLocation, 
  generateFinanceHypotheses, 
  generateBusinessPlan 
} from './ai-generator.js';

export async function buildFullDossier(input: ProjectInput): Promise<AfriBizDossier> {
  const projectId = uuidv4();
  
  // 1. Appel AI : Concept / Opportunité (séquentiel car on a besoin du brand name pour la suite)
  console.log(`[${projectId}] Génération de l'opportunité...`);
  const concept = await generateOpportunity(input);

  console.log(`[${projectId}] Génération de l'identité de marque...`);
  const branding = await generateBranding(input);
  const brandName = branding.recommendedName;

  // 2. Appels IA parallèles pour le reste (économise beaucoup de temps)
  console.log(`[${projectId}] Génération parallèle (Marketing, Implantation, Finances, Plan)...`);
  const [marketingPrompts, locationStrategy, financialHypotheses, businessPlan] = await Promise.all([
    generateMarketing(input, brandName),
    generateLocation(input),
    generateFinanceHypotheses(input),
    generateBusinessPlan(input, brandName),
  ]);

  // 3. Calculs financiers 100% locaux (moteur TS, 0 token API)
  console.log(`[${projectId}] Exécution du moteur financier...`);
  // Injection de la monnaie et du volume d'hypothèses
  financialHypotheses.currency = input.currency;
  financialHypotheses.unitPriceCurrency = input.currency;
  const scenarios = generateAllScenarios(financialHypotheses);

  // 4. Assemblage du dossier final
  const dossier: AfriBizDossier = {
    schemaVersion: '1.0',
    projectId,
    revision: 1,
    generatedAt: new Date().toISOString(),
    locale: 'fr',
    inputSnapshot: input,
    concept,
    branding,
    marketingPrompts,
    locationStrategy,
    financialLogic: {
      currency: input.currency,
      hypotheses: financialHypotheses,
      hypothesesSource: "IA structurée + Contextes locaux",
      roundingRule: "Arrondi à l'entier le plus proche",
      scenarios,
    },
    businessPlan: businessPlan,
    evidence: [],
    warnings: [],
  };

  console.log(`[${projectId}] Dossier généré avec succès !`);
  return dossier;
}
