import { z } from 'zod';

// ============================================================
// DEVISES ISO
// ============================================================
export const CurrencyCodeSchema = z.enum([
  'XOF', 'XAF', 'NGN', 'KES', 'GHS', 'CDF', 'MAD', 'EUR', 'USD', 'GBP'
]);
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;

export const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  XOF: 'FCFA (XOF)',
  XAF: 'FCFA (XAF)',
  NGN: 'Naira (NGN)',
  KES: 'Shilling kenyan (KES)',
  GHS: 'Cedi ghanéen (GHS)',
  CDF: 'Franc congolais (CDF)',
  MAD: 'Dirham marocain (MAD)',
  EUR: 'Euro (EUR)',
  USD: 'Dollar américain (USD)',
  GBP: 'Livre sterling (GBP)',
};

// ============================================================
// SECTEURS D'ACTIVITÉ
// ============================================================
export const SectorSchema = z.enum([
  'agro-business',
  'fintech-mobile-money',
  'restauration',
  'ecommerce-logistique',
  'beaute-bien-etre',
  'education-formation',
  'services-b2b',
  'artisanat-mode',
  'sante',
  'immobilier',
  'tourisme',
  'tech-digital',
  'autre',
]);
export type Sector = z.infer<typeof SectorSchema>;

export const SECTOR_LABELS: Record<Sector, string> = {
  'agro-business': 'Agro-business & alimentation',
  'fintech-mobile-money': 'FinTech & Mobile Money',
  'restauration': 'Restauration & food service',
  'ecommerce-logistique': 'E-commerce & logistique',
  'beaute-bien-etre': 'Beauté & bien-être',
  'education-formation': 'Éducation & formation',
  'services-b2b': 'Services B2B',
  'artisanat-mode': 'Artisanat & mode',
  'sante': 'Santé & pharmacie',
  'immobilier': 'Immobilier & BTP',
  'tourisme': 'Tourisme & hospitality',
  'tech-digital': 'Tech & digital',
  'autre': 'Autre secteur',
};

export const REGULATED_SECTORS: Sector[] = [
  'fintech-mobile-money', 'sante', 'education-formation'
];

// ============================================================
// PAYS ET VILLES
// ============================================================
export const CountrySchema = z.enum([
  'SN', 'CI', 'CM', 'GA', 'CD', 'BJ', 'TG', 'NG', 'KE', 'GH', 'MA',
  'SN-other', 'CI-other', 'OTHER'
]);
export type Country = z.infer<typeof CountrySchema>;

export const COUNTRY_LABELS: Record<Country, string> = {
  SN: 'Sénégal',
  CI: 'Côte d\'Ivoire',
  CM: 'Cameroun',
  GA: 'Gabon',
  CD: 'RD Congo',
  BJ: 'Bénin',
  TG: 'Togo',
  NG: 'Nigéria',
  KE: 'Kenya',
  GH: 'Ghana',
  MA: 'Maroc',
  'SN-other': 'Autre pays francophone',
  'CI-other': 'Autre pays anglophone',
  OTHER: 'Autre pays',
};

export const COUNTRY_DEFAULT_CURRENCY: Partial<Record<Country, CurrencyCode>> = {
  SN: 'XOF', CI: 'XOF', BJ: 'XOF', TG: 'XOF',
  CM: 'XAF', GA: 'XAF',
  CD: 'CDF',
  NG: 'NGN',
  KE: 'KES',
  GH: 'GHS',
  MA: 'MAD',
};

// ============================================================
// STATUTS DES PROJETS ET JOBS
// ============================================================
export const ProjectStatusSchema = z.enum([
  'draft',
  'generating',
  'available',
  'partial',
  'failed',
]);
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: 'Brouillon',
  generating: 'Génération en cours',
  available: 'Dossier disponible',
  partial: 'Résultat partiel',
  failed: 'Échec',
};

export const JobStatusSchema = z.enum([
  'queued', 'running', 'succeeded', 'failed', 'cancelled'
]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

// ============================================================
// ENTRÉES UTILISATEUR — ASSISTANT DE CRÉATION
// ============================================================
export const ProjectModeSchema = z.enum(['idea', 'budget']);
export type ProjectMode = z.infer<typeof ProjectModeSchema>;

export const AmbitionSchema = z.enum([
  'complementary',   // Revenu complémentaire
  'main',            // Activité principale
  'scale',           // Développement grande échelle
  'franchise',       // Franchise ou export
]);
export type Ambition = z.infer<typeof AmbitionSchema>;

export const AMBITION_LABELS: Record<Ambition, string> = {
  complementary: 'Revenu complémentaire',
  main: 'Activité principale',
  scale: 'Développement à grande échelle',
  franchise: 'Franchise ou export',
};

export const ProjectInputSchema = z.object({
  mode: ProjectModeSchema,
  // Étape 1 — Point de départ
  description: z.string().min(10).max(2000).optional(),
  existingName: z.string().max(100).optional(),
  // Étape 2 — Marché
  country: z.string().min(2).max(50),
  city: z.string().min(2).max(100),
  zone: z.string().max(100).optional(),
  sector: SectorSchema,
  targetAudience: z.string().min(5).max(500),
  // Étape 3 — Moyens
  budget: z.number().min(0),
  currency: CurrencyCodeSchema,
  timeAvailablePerWeek: z.number().min(0).max(168), // heures/semaine
  skills: z.string().max(500).optional(),
  hasPhysicalLocation: z.boolean(),
  isRemoteManaged: z.boolean(),
  // Étape 4 — Ambition
  ambition: AmbitionSchema,
});
export type ProjectInput = z.infer<typeof ProjectInputSchema>;

// ============================================================
// CONCEPT SHORTLIST (mode budget)
// ============================================================
export const ConceptCandidateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(100),
  description: z.string().max(500),
  requiredResources: z.array(z.string()),
  estimatedBudget: z.object({
    min: z.number(),
    max: z.number(),
    currency: CurrencyCodeSchema,
  }),
  tradeoffs: z.string().max(300),
  viabilityScore: z.number().min(0).max(10),
});
export type ConceptCandidate = z.infer<typeof ConceptCandidateSchema>;

export const ConceptShortlistSchema = z.object({
  candidates: z.array(ConceptCandidateSchema).length(3),
  generatedAt: z.string().datetime(),
  projectId: z.string().uuid(),
});
export type ConceptShortlist = z.infer<typeof ConceptShortlistSchema>;

// ============================================================
// DOSSIER AFRIBIZ — CONTRAT PRINCIPAL
// ============================================================

export const EvidenceItemSchema = z.object({
  id: z.string(),
  source: z.string(),
  title: z.string(),
  url: z.string().url().optional(),
  consultedAt: z.string().datetime().optional(),
  periodCovered: z.string().optional(),
  territory: z.string().optional(),
  supports: z.array(z.string()),
});
export type EvidenceItem = z.infer<typeof EvidenceItemSchema>;

export const ConceptRankingSchema = z.object({
  id: z.string(),
  idea: z.string(),
  description: z.string().max(400),
  estimatedProfitability: z.enum(['low', 'medium', 'high']),
  startupSpeed: z.enum(['slow', 'medium', 'fast']),
  risk: z.enum(['low', 'medium', 'high']),
  score: z.number().min(0).max(10),
  scoreExplanation: z.string().max(300),
  confidenceLevel: z.enum(['low', 'medium', 'high']),
});
export type ConceptRanking = z.infer<typeof ConceptRankingSchema>;

export const ConceptSchema = z.object({
  recommendedIdea: z.string(),
  justification: z.string().max(600),
  rankings: z.array(ConceptRankingSchema).length(3),
});
export type Concept = z.infer<typeof ConceptSchema>;

export const BrandingOptionSchema = z.object({
  name: z.string().max(60),
  meaning: z.string().max(200),
  positioning: z.string().max(200),
});

export const BrandingSchema = z.object({
  recommendedName: z.string().max(60),
  tagline: z.string().max(120),
  options: z.array(BrandingOptionSchema).length(3),
  logoPrompt: z.string().max(500), // en anglais pour l'IA image
  palette: z.object({
    primary: z.string().max(20),
    secondary: z.string().max(20),
    accent: z.string().max(20),
    background: z.string().max(20),
    usageGuide: z.string().max(300),
  }),
});
export type Branding = z.infer<typeof BrandingSchema>;

export const StyleVariationSchema = z.object({
  label: z.string().max(60),
  aiPrompt: z.string().max(500), // en anglais
  description: z.string().max(200),
});

export const MarketingFormatSchema = z.object({
  aiPrompt: z.string().max(600), // en anglais
  description: z.string().max(300),
  caption: z.string().max(400),
  cta: z.string().max(100),
  visualStyle: z.string().max(200),
  styleVariations: z.array(StyleVariationSchema).length(3),
  aspectRatio: z.string(),
  assetStatus: JobStatusSchema.optional(),
  assetUrl: z.string().url().optional(),
});

export const MarketingPromptsSchema = z.object({
  tiktok: MarketingFormatSchema,
  instagramFeed: MarketingFormatSchema,
  instagramStory: MarketingFormatSchema,
  whatsappFlyer: MarketingFormatSchema,
  facebook: MarketingFormatSchema,
  billboard: MarketingFormatSchema,
});
export type MarketingPrompts = z.infer<typeof MarketingPromptsSchema>;

export const LocationZoneSchema = z.object({
  name: z.string().max(100),
  strategicValue: z.string().max(300),
  customerBehavior: z.string().max(200),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  estimatedRent: z.string().max(100).optional(),
});

export const LocationStrategySchema = z.object({
  bestZone: z.string().max(100).nullable(),
  strategicValue: z.string().max(400),
  customerBehavior: z.string().max(300),
  lowBudgetAlternative: z.string().max(300),
  channelRecommendation: z.string().max(300),
  otherZones: z.array(LocationZoneSchema),
  evidenceIds: z.array(z.string()),
  terrainValidations: z.array(z.string()),
});
export type LocationStrategy = z.infer<typeof LocationStrategySchema>;

export const ActionItemSchema = z.object({
  id: z.string(),
  phase: z.enum(['J1-J30', 'J31-J60', 'J61-J90']),
  title: z.string().max(200),
  description: z.string().max(500).optional(),
  priority: z.enum(['high', 'medium', 'low']),
  estimatedCost: z.number().min(0).optional(),
  currency: CurrencyCodeSchema.optional(),
  successCriteria: z.string().max(300).optional(),
  dependencies: z.array(z.string()),
  isCompleted: z.boolean().default(false),
  completedAt: z.string().datetime().optional(),
});
export type ActionItem = z.infer<typeof ActionItemSchema>;

export const MonthlyProjectionSchema = z.object({
  month: z.number().int().min(1).max(6),
  revenue: z.number(),
  variableCosts: z.number(),
  grossMargin: z.number(),
  fixedCosts: z.number(),
  operatingResult: z.number(), // = profit dans le contrat v1
  profit: z.number(),          // alias operatingResult (compatibilité brief)
  openingCash: z.number(),
  closingCash: z.number(),
});
export type MonthlyProjection = z.infer<typeof MonthlyProjectionSchema>;

export const ScenarioSchema = z.object({
  type: z.enum(['conservative', 'central', 'ambitious']),
  label: z.string(),
  hypotheses: z.record(z.string(), z.union([z.number(), z.string()])),
  projections: z.array(MonthlyProjectionSchema).length(6),
  breakEvenMonth: z.number().nullable(), // null si non atteint
  initialInvestmentRecovery: z.number().nullable(),
});
export type Scenario = z.infer<typeof ScenarioSchema>;

export const FinancialHypothesisSchema = z.object({
  // Revenus
  unitPrice: z.number().min(0),
  unitPriceCurrency: CurrencyCodeSchema,
  monthlyVolume: z.number().min(0),
  activeDaysPerMonth: z.number().min(0).max(31),
  // Coûts variables
  unitVariableCost: z.number().min(0),
  deliveryCostPerUnit: z.number().min(0),
  paymentFeeRate: z.number().min(0).max(1), // ex: 0.02 = 2%
  // Charges fixes
  monthlyRent: z.number().min(0),
  monthlyLabor: z.number().min(0),
  monthlyUtilities: z.number().min(0),
  monthlyMarketing: z.number().min(0),
  otherMonthlyFixed: z.number().min(0),
  // Investissement initial
  equipmentCost: z.number().min(0),
  initialStock: z.number().min(0),
  launchExpenses: z.number().min(0),
  cashReserve: z.number().min(0),
  currency: CurrencyCodeSchema,
});
export type FinancialHypothesis = z.infer<typeof FinancialHypothesisSchema>;

export const FinancialLogicSchema = z.object({
  currency: CurrencyCodeSchema,
  hypotheses: FinancialHypothesisSchema,
  hypothesesSource: z.string().max(300),
  roundingRule: z.string().max(100),
  scenarios: z.array(ScenarioSchema),
  notes: z.string().max(500).optional(),
});
export type FinancialLogic = z.infer<typeof FinancialLogicSchema>;

export const BusinessPlanSchema = z.object({
  executiveSummary: z.string().max(800),
  problemSolution: z.string().max(600),
  targetMarket: z.string().max(500),
  businessModel: z.string().max(500),
  pricing: z.string().max(400),
  operations: z.string().max(500),
  breakEvenEstimation: z.string().max(400),
  risksMitigation: z.array(z.object({
    risk: z.string().max(200),
    mitigation: z.string().max(300),
    severity: z.enum(['low', 'medium', 'high']),
  })),
  actionPlan90Days: z.array(ActionItemSchema),
});
export type BusinessPlan = z.infer<typeof BusinessPlanSchema>;

// ============================================================
// DOSSIER COMPLET
// ============================================================
export const AfriBizDossierSchema = z.object({
  schemaVersion: z.literal('1.0'),
  projectId: z.string().uuid(),
  revision: z.number().int().min(1),
  generatedAt: z.string().datetime(),
  locale: z.literal('fr'),
  inputSnapshot: ProjectInputSchema,
  selectedConceptId: z.string().uuid().optional(), // mode budget uniquement
  concept: ConceptSchema,
  branding: BrandingSchema,
  marketingPrompts: MarketingPromptsSchema,
  locationStrategy: LocationStrategySchema,
  businessPlan: BusinessPlanSchema,
  financialLogic: FinancialLogicSchema,
  evidence: z.array(EvidenceItemSchema),
  warnings: z.array(z.string()),
});
export type AfriBizDossier = z.infer<typeof AfriBizDossierSchema>;

// ============================================================
// API — REQUÊTES ET RÉPONSES
// ============================================================
export const CreateProjectRequestSchema = z.object({
  name: z.string().min(1).max(100),
  input: ProjectInputSchema,
});

export const UpdateProjectNameSchema = z.object({
  name: z.string().min(1).max(100),
});

export const SelectConceptSchema = z.object({
  conceptId: z.string().uuid(),
});

export const UpdateFinancialHypothesisSchema = FinancialHypothesisSchema;

export const UpdateActionTaskSchema = z.object({
  isCompleted: z.boolean(),
});

export const ContactInfoSchema = z.object({
  whatsapp: z.string().max(30).optional(),
  phone: z.string().max(30).optional(),
  address: z.string().max(200).optional(),
  socialHandle: z.string().max(100).optional(),
});
export type ContactInfo = z.infer<typeof ContactInfoSchema>;

// ============================================================
// RÉPONSES API STANDARDISÉES
// ============================================================
export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: string;
  code?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ============================================================
// UTILITAIRES DEVISE
// ============================================================
export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  locale = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyCompact(
  amount: number,
  currency: CurrencyCode,
  locale = 'fr-FR'
): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(amount / 1_000_000)} M ${currency}`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount / 1_000)} k ${currency}`;
  }
  return formatCurrency(amount, currency, locale);
}
