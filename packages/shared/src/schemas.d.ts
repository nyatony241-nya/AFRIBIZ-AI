import { z } from 'zod';
export declare const CurrencyCodeSchema: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;
export declare const CURRENCY_LABELS: Record<CurrencyCode, string>;
export declare const SectorSchema: z.ZodEnum<["agro-business", "fintech-mobile-money", "restauration", "ecommerce-logistique", "beaute-bien-etre", "education-formation", "services-b2b", "artisanat-mode", "sante", "immobilier", "tourisme", "tech-digital", "autre"]>;
export type Sector = z.infer<typeof SectorSchema>;
export declare const SECTOR_LABELS: Record<Sector, string>;
export declare const REGULATED_SECTORS: Sector[];
export declare const CountrySchema: z.ZodEnum<["SN", "CI", "CM", "GA", "CD", "BJ", "TG", "NG", "KE", "GH", "MA", "SN-other", "CI-other", "OTHER"]>;
export type Country = z.infer<typeof CountrySchema>;
export declare const COUNTRY_LABELS: Record<Country, string>;
export declare const COUNTRY_DEFAULT_CURRENCY: Partial<Record<Country, CurrencyCode>>;
export declare const ProjectStatusSchema: z.ZodEnum<["draft", "generating", "available", "partial", "failed"]>;
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
export declare const PROJECT_STATUS_LABELS: Record<ProjectStatus, string>;
export declare const JobStatusSchema: z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>;
export type JobStatus = z.infer<typeof JobStatusSchema>;
export declare const ProjectModeSchema: z.ZodEnum<["idea", "budget"]>;
export type ProjectMode = z.infer<typeof ProjectModeSchema>;
export declare const AmbitionSchema: z.ZodEnum<["complementary", "main", "scale", "franchise"]>;
export type Ambition = z.infer<typeof AmbitionSchema>;
export declare const AMBITION_LABELS: Record<Ambition, string>;
export declare const ProjectInputSchema: z.ZodObject<{
    mode: z.ZodEnum<["idea", "budget"]>;
    description: z.ZodOptional<z.ZodString>;
    existingName: z.ZodOptional<z.ZodString>;
    country: z.ZodString;
    city: z.ZodString;
    zone: z.ZodOptional<z.ZodString>;
    sector: z.ZodEnum<["agro-business", "fintech-mobile-money", "restauration", "ecommerce-logistique", "beaute-bien-etre", "education-formation", "services-b2b", "artisanat-mode", "sante", "immobilier", "tourisme", "tech-digital", "autre"]>;
    targetAudience: z.ZodString;
    budget: z.ZodNumber;
    currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
    timeAvailablePerWeek: z.ZodNumber;
    skills: z.ZodOptional<z.ZodString>;
    hasPhysicalLocation: z.ZodBoolean;
    isRemoteManaged: z.ZodBoolean;
    ambition: z.ZodEnum<["complementary", "main", "scale", "franchise"]>;
}, "strip", z.ZodTypeAny, {
    mode: "idea" | "budget";
    country: string;
    budget: number;
    city: string;
    sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
    targetAudience: string;
    currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    timeAvailablePerWeek: number;
    hasPhysicalLocation: boolean;
    isRemoteManaged: boolean;
    ambition: "main" | "scale" | "complementary" | "franchise";
    description?: string | undefined;
    existingName?: string | undefined;
    zone?: string | undefined;
    skills?: string | undefined;
}, {
    mode: "idea" | "budget";
    country: string;
    budget: number;
    city: string;
    sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
    targetAudience: string;
    currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    timeAvailablePerWeek: number;
    hasPhysicalLocation: boolean;
    isRemoteManaged: boolean;
    ambition: "main" | "scale" | "complementary" | "franchise";
    description?: string | undefined;
    existingName?: string | undefined;
    zone?: string | undefined;
    skills?: string | undefined;
}>;
export type ProjectInput = z.infer<typeof ProjectInputSchema>;
export declare const ConceptCandidateSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    requiredResources: z.ZodArray<z.ZodString, "many">;
    estimatedBudget: z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
        currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
    }, "strip", z.ZodTypeAny, {
        max: number;
        min: number;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    }, {
        max: number;
        min: number;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    }>;
    tradeoffs: z.ZodString;
    viabilityScore: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
    description: string;
    requiredResources: string[];
    estimatedBudget: {
        max: number;
        min: number;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    };
    tradeoffs: string;
    viabilityScore: number;
}, {
    title: string;
    id: string;
    description: string;
    requiredResources: string[];
    estimatedBudget: {
        max: number;
        min: number;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    };
    tradeoffs: string;
    viabilityScore: number;
}>;
export type ConceptCandidate = z.infer<typeof ConceptCandidateSchema>;
export declare const ConceptShortlistSchema: z.ZodObject<{
    candidates: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        requiredResources: z.ZodArray<z.ZodString, "many">;
        estimatedBudget: z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
        }, "strip", z.ZodTypeAny, {
            max: number;
            min: number;
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        }, {
            max: number;
            min: number;
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        }>;
        tradeoffs: z.ZodString;
        viabilityScore: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        title: string;
        id: string;
        description: string;
        requiredResources: string[];
        estimatedBudget: {
            max: number;
            min: number;
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        };
        tradeoffs: string;
        viabilityScore: number;
    }, {
        title: string;
        id: string;
        description: string;
        requiredResources: string[];
        estimatedBudget: {
            max: number;
            min: number;
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        };
        tradeoffs: string;
        viabilityScore: number;
    }>, "many">;
    generatedAt: z.ZodString;
    projectId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    projectId: string;
    candidates: {
        title: string;
        id: string;
        description: string;
        requiredResources: string[];
        estimatedBudget: {
            max: number;
            min: number;
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        };
        tradeoffs: string;
        viabilityScore: number;
    }[];
    generatedAt: string;
}, {
    projectId: string;
    candidates: {
        title: string;
        id: string;
        description: string;
        requiredResources: string[];
        estimatedBudget: {
            max: number;
            min: number;
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        };
        tradeoffs: string;
        viabilityScore: number;
    }[];
    generatedAt: string;
}>;
export type ConceptShortlist = z.infer<typeof ConceptShortlistSchema>;
export declare const EvidenceItemSchema: z.ZodObject<{
    id: z.ZodString;
    source: z.ZodString;
    title: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    consultedAt: z.ZodOptional<z.ZodString>;
    periodCovered: z.ZodOptional<z.ZodString>;
    territory: z.ZodOptional<z.ZodString>;
    supports: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    source: string;
    title: string;
    id: string;
    supports: string[];
    url?: string | undefined;
    consultedAt?: string | undefined;
    periodCovered?: string | undefined;
    territory?: string | undefined;
}, {
    source: string;
    title: string;
    id: string;
    supports: string[];
    url?: string | undefined;
    consultedAt?: string | undefined;
    periodCovered?: string | undefined;
    territory?: string | undefined;
}>;
export type EvidenceItem = z.infer<typeof EvidenceItemSchema>;
export declare const ConceptRankingSchema: z.ZodObject<{
    id: z.ZodString;
    idea: z.ZodString;
    description: z.ZodString;
    estimatedProfitability: z.ZodEnum<["low", "medium", "high"]>;
    startupSpeed: z.ZodEnum<["slow", "medium", "fast"]>;
    risk: z.ZodEnum<["low", "medium", "high"]>;
    score: z.ZodNumber;
    scoreExplanation: z.ZodString;
    confidenceLevel: z.ZodEnum<["low", "medium", "high"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    idea: string;
    description: string;
    estimatedProfitability: "low" | "medium" | "high";
    startupSpeed: "medium" | "slow" | "fast";
    risk: "low" | "medium" | "high";
    score: number;
    scoreExplanation: string;
    confidenceLevel: "low" | "medium" | "high";
}, {
    id: string;
    idea: string;
    description: string;
    estimatedProfitability: "low" | "medium" | "high";
    startupSpeed: "medium" | "slow" | "fast";
    risk: "low" | "medium" | "high";
    score: number;
    scoreExplanation: string;
    confidenceLevel: "low" | "medium" | "high";
}>;
export type ConceptRanking = z.infer<typeof ConceptRankingSchema>;
export declare const ConceptSchema: z.ZodObject<{
    recommendedIdea: z.ZodString;
    justification: z.ZodString;
    rankings: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        idea: z.ZodString;
        description: z.ZodString;
        estimatedProfitability: z.ZodEnum<["low", "medium", "high"]>;
        startupSpeed: z.ZodEnum<["slow", "medium", "fast"]>;
        risk: z.ZodEnum<["low", "medium", "high"]>;
        score: z.ZodNumber;
        scoreExplanation: z.ZodString;
        confidenceLevel: z.ZodEnum<["low", "medium", "high"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        idea: string;
        description: string;
        estimatedProfitability: "low" | "medium" | "high";
        startupSpeed: "medium" | "slow" | "fast";
        risk: "low" | "medium" | "high";
        score: number;
        scoreExplanation: string;
        confidenceLevel: "low" | "medium" | "high";
    }, {
        id: string;
        idea: string;
        description: string;
        estimatedProfitability: "low" | "medium" | "high";
        startupSpeed: "medium" | "slow" | "fast";
        risk: "low" | "medium" | "high";
        score: number;
        scoreExplanation: string;
        confidenceLevel: "low" | "medium" | "high";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    recommendedIdea: string;
    justification: string;
    rankings: {
        id: string;
        idea: string;
        description: string;
        estimatedProfitability: "low" | "medium" | "high";
        startupSpeed: "medium" | "slow" | "fast";
        risk: "low" | "medium" | "high";
        score: number;
        scoreExplanation: string;
        confidenceLevel: "low" | "medium" | "high";
    }[];
}, {
    recommendedIdea: string;
    justification: string;
    rankings: {
        id: string;
        idea: string;
        description: string;
        estimatedProfitability: "low" | "medium" | "high";
        startupSpeed: "medium" | "slow" | "fast";
        risk: "low" | "medium" | "high";
        score: number;
        scoreExplanation: string;
        confidenceLevel: "low" | "medium" | "high";
    }[];
}>;
export type Concept = z.infer<typeof ConceptSchema>;
export declare const BrandingOptionSchema: z.ZodObject<{
    name: z.ZodString;
    meaning: z.ZodString;
    positioning: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    meaning: string;
    positioning: string;
}, {
    name: string;
    meaning: string;
    positioning: string;
}>;
export declare const BrandingSchema: z.ZodObject<{
    recommendedName: z.ZodString;
    tagline: z.ZodString;
    options: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        meaning: z.ZodString;
        positioning: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        meaning: string;
        positioning: string;
    }, {
        name: string;
        meaning: string;
        positioning: string;
    }>, "many">;
    logoPrompt: z.ZodString;
    palette: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
        background: z.ZodString;
        usageGuide: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        background: string;
        primary: string;
        secondary: string;
        accent: string;
        usageGuide: string;
    }, {
        background: string;
        primary: string;
        secondary: string;
        accent: string;
        usageGuide: string;
    }>;
}, "strip", z.ZodTypeAny, {
    options: {
        name: string;
        meaning: string;
        positioning: string;
    }[];
    recommendedName: string;
    tagline: string;
    logoPrompt: string;
    palette: {
        background: string;
        primary: string;
        secondary: string;
        accent: string;
        usageGuide: string;
    };
}, {
    options: {
        name: string;
        meaning: string;
        positioning: string;
    }[];
    recommendedName: string;
    tagline: string;
    logoPrompt: string;
    palette: {
        background: string;
        primary: string;
        secondary: string;
        accent: string;
        usageGuide: string;
    };
}>;
export type Branding = z.infer<typeof BrandingSchema>;
export declare const StyleVariationSchema: z.ZodObject<{
    label: z.ZodString;
    aiPrompt: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    label: string;
    description: string;
    aiPrompt: string;
}, {
    label: string;
    description: string;
    aiPrompt: string;
}>;
export declare const MarketingFormatSchema: z.ZodObject<{
    aiPrompt: z.ZodString;
    description: z.ZodString;
    caption: z.ZodString;
    cta: z.ZodString;
    visualStyle: z.ZodString;
    styleVariations: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        aiPrompt: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        label: string;
        description: string;
        aiPrompt: string;
    }, {
        label: string;
        description: string;
        aiPrompt: string;
    }>, "many">;
    aspectRatio: z.ZodString;
    assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
    assetUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    caption: string;
    description: string;
    aiPrompt: string;
    cta: string;
    visualStyle: string;
    styleVariations: {
        label: string;
        description: string;
        aiPrompt: string;
    }[];
    aspectRatio: string;
    assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
    assetUrl?: string | undefined;
}, {
    caption: string;
    description: string;
    aiPrompt: string;
    cta: string;
    visualStyle: string;
    styleVariations: {
        label: string;
        description: string;
        aiPrompt: string;
    }[];
    aspectRatio: string;
    assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
    assetUrl?: string | undefined;
}>;
export declare const MarketingPromptsSchema: z.ZodObject<{
    tiktok: z.ZodObject<{
        aiPrompt: z.ZodString;
        description: z.ZodString;
        caption: z.ZodString;
        cta: z.ZodString;
        visualStyle: z.ZodString;
        styleVariations: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            aiPrompt: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            description: string;
            aiPrompt: string;
        }, {
            label: string;
            description: string;
            aiPrompt: string;
        }>, "many">;
        aspectRatio: z.ZodString;
        assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
        assetUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }>;
    instagramFeed: z.ZodObject<{
        aiPrompt: z.ZodString;
        description: z.ZodString;
        caption: z.ZodString;
        cta: z.ZodString;
        visualStyle: z.ZodString;
        styleVariations: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            aiPrompt: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            description: string;
            aiPrompt: string;
        }, {
            label: string;
            description: string;
            aiPrompt: string;
        }>, "many">;
        aspectRatio: z.ZodString;
        assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
        assetUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }>;
    instagramStory: z.ZodObject<{
        aiPrompt: z.ZodString;
        description: z.ZodString;
        caption: z.ZodString;
        cta: z.ZodString;
        visualStyle: z.ZodString;
        styleVariations: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            aiPrompt: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            description: string;
            aiPrompt: string;
        }, {
            label: string;
            description: string;
            aiPrompt: string;
        }>, "many">;
        aspectRatio: z.ZodString;
        assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
        assetUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }>;
    whatsappFlyer: z.ZodObject<{
        aiPrompt: z.ZodString;
        description: z.ZodString;
        caption: z.ZodString;
        cta: z.ZodString;
        visualStyle: z.ZodString;
        styleVariations: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            aiPrompt: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            description: string;
            aiPrompt: string;
        }, {
            label: string;
            description: string;
            aiPrompt: string;
        }>, "many">;
        aspectRatio: z.ZodString;
        assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
        assetUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }>;
    facebook: z.ZodObject<{
        aiPrompt: z.ZodString;
        description: z.ZodString;
        caption: z.ZodString;
        cta: z.ZodString;
        visualStyle: z.ZodString;
        styleVariations: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            aiPrompt: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            description: string;
            aiPrompt: string;
        }, {
            label: string;
            description: string;
            aiPrompt: string;
        }>, "many">;
        aspectRatio: z.ZodString;
        assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
        assetUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }>;
    billboard: z.ZodObject<{
        aiPrompt: z.ZodString;
        description: z.ZodString;
        caption: z.ZodString;
        cta: z.ZodString;
        visualStyle: z.ZodString;
        styleVariations: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            aiPrompt: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            description: string;
            aiPrompt: string;
        }, {
            label: string;
            description: string;
            aiPrompt: string;
        }>, "many">;
        aspectRatio: z.ZodString;
        assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
        assetUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }, {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    tiktok: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    instagramFeed: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    instagramStory: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    whatsappFlyer: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    facebook: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    billboard: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
}, {
    tiktok: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    instagramFeed: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    instagramStory: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    whatsappFlyer: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    facebook: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
    billboard: {
        caption: string;
        description: string;
        aiPrompt: string;
        cta: string;
        visualStyle: string;
        styleVariations: {
            label: string;
            description: string;
            aiPrompt: string;
        }[];
        aspectRatio: string;
        assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
        assetUrl?: string | undefined;
    };
}>;
export type MarketingPrompts = z.infer<typeof MarketingPromptsSchema>;
export declare const LocationZoneSchema: z.ZodObject<{
    name: z.ZodString;
    strategicValue: z.ZodString;
    customerBehavior: z.ZodString;
    pros: z.ZodArray<z.ZodString, "many">;
    cons: z.ZodArray<z.ZodString, "many">;
    estimatedRent: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    strategicValue: string;
    customerBehavior: string;
    pros: string[];
    cons: string[];
    estimatedRent?: string | undefined;
}, {
    name: string;
    strategicValue: string;
    customerBehavior: string;
    pros: string[];
    cons: string[];
    estimatedRent?: string | undefined;
}>;
export declare const LocationStrategySchema: z.ZodObject<{
    bestZone: z.ZodNullable<z.ZodString>;
    strategicValue: z.ZodString;
    customerBehavior: z.ZodString;
    lowBudgetAlternative: z.ZodString;
    channelRecommendation: z.ZodString;
    otherZones: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        strategicValue: z.ZodString;
        customerBehavior: z.ZodString;
        pros: z.ZodArray<z.ZodString, "many">;
        cons: z.ZodArray<z.ZodString, "many">;
        estimatedRent: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        strategicValue: string;
        customerBehavior: string;
        pros: string[];
        cons: string[];
        estimatedRent?: string | undefined;
    }, {
        name: string;
        strategicValue: string;
        customerBehavior: string;
        pros: string[];
        cons: string[];
        estimatedRent?: string | undefined;
    }>, "many">;
    evidenceIds: z.ZodArray<z.ZodString, "many">;
    terrainValidations: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    strategicValue: string;
    customerBehavior: string;
    bestZone: string | null;
    lowBudgetAlternative: string;
    channelRecommendation: string;
    otherZones: {
        name: string;
        strategicValue: string;
        customerBehavior: string;
        pros: string[];
        cons: string[];
        estimatedRent?: string | undefined;
    }[];
    evidenceIds: string[];
    terrainValidations: string[];
}, {
    strategicValue: string;
    customerBehavior: string;
    bestZone: string | null;
    lowBudgetAlternative: string;
    channelRecommendation: string;
    otherZones: {
        name: string;
        strategicValue: string;
        customerBehavior: string;
        pros: string[];
        cons: string[];
        estimatedRent?: string | undefined;
    }[];
    evidenceIds: string[];
    terrainValidations: string[];
}>;
export type LocationStrategy = z.infer<typeof LocationStrategySchema>;
export declare const ActionItemSchema: z.ZodObject<{
    id: z.ZodString;
    phase: z.ZodEnum<["J1-J30", "J31-J60", "J61-J90"]>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodEnum<["high", "medium", "low"]>;
    estimatedCost: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>>;
    successCriteria: z.ZodOptional<z.ZodString>;
    dependencies: z.ZodArray<z.ZodString, "many">;
    isCompleted: z.ZodDefault<z.ZodBoolean>;
    completedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
    phase: "J1-J30" | "J31-J60" | "J61-J90";
    priority: "low" | "medium" | "high";
    dependencies: string[];
    isCompleted: boolean;
    description?: string | undefined;
    currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
    estimatedCost?: number | undefined;
    successCriteria?: string | undefined;
    completedAt?: string | undefined;
}, {
    title: string;
    id: string;
    phase: "J1-J30" | "J31-J60" | "J61-J90";
    priority: "low" | "medium" | "high";
    dependencies: string[];
    description?: string | undefined;
    currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
    estimatedCost?: number | undefined;
    successCriteria?: string | undefined;
    isCompleted?: boolean | undefined;
    completedAt?: string | undefined;
}>;
export type ActionItem = z.infer<typeof ActionItemSchema>;
export declare const MonthlyProjectionSchema: z.ZodObject<{
    month: z.ZodNumber;
    revenue: z.ZodNumber;
    variableCosts: z.ZodNumber;
    grossMargin: z.ZodNumber;
    fixedCosts: z.ZodNumber;
    operatingResult: z.ZodNumber;
    profit: z.ZodNumber;
    openingCash: z.ZodNumber;
    closingCash: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    month: number;
    revenue: number;
    variableCosts: number;
    grossMargin: number;
    fixedCosts: number;
    operatingResult: number;
    profit: number;
    openingCash: number;
    closingCash: number;
}, {
    month: number;
    revenue: number;
    variableCosts: number;
    grossMargin: number;
    fixedCosts: number;
    operatingResult: number;
    profit: number;
    openingCash: number;
    closingCash: number;
}>;
export type MonthlyProjection = z.infer<typeof MonthlyProjectionSchema>;
export declare const ScenarioSchema: z.ZodObject<{
    type: z.ZodEnum<["conservative", "central", "ambitious"]>;
    label: z.ZodString;
    hypotheses: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
    projections: z.ZodArray<z.ZodObject<{
        month: z.ZodNumber;
        revenue: z.ZodNumber;
        variableCosts: z.ZodNumber;
        grossMargin: z.ZodNumber;
        fixedCosts: z.ZodNumber;
        operatingResult: z.ZodNumber;
        profit: z.ZodNumber;
        openingCash: z.ZodNumber;
        closingCash: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        month: number;
        revenue: number;
        variableCosts: number;
        grossMargin: number;
        fixedCosts: number;
        operatingResult: number;
        profit: number;
        openingCash: number;
        closingCash: number;
    }, {
        month: number;
        revenue: number;
        variableCosts: number;
        grossMargin: number;
        fixedCosts: number;
        operatingResult: number;
        profit: number;
        openingCash: number;
        closingCash: number;
    }>, "many">;
    breakEvenMonth: z.ZodNullable<z.ZodNumber>;
    initialInvestmentRecovery: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    label: string;
    type: "conservative" | "central" | "ambitious";
    hypotheses: Record<string, string | number>;
    projections: {
        month: number;
        revenue: number;
        variableCosts: number;
        grossMargin: number;
        fixedCosts: number;
        operatingResult: number;
        profit: number;
        openingCash: number;
        closingCash: number;
    }[];
    breakEvenMonth: number | null;
    initialInvestmentRecovery: number | null;
}, {
    label: string;
    type: "conservative" | "central" | "ambitious";
    hypotheses: Record<string, string | number>;
    projections: {
        month: number;
        revenue: number;
        variableCosts: number;
        grossMargin: number;
        fixedCosts: number;
        operatingResult: number;
        profit: number;
        openingCash: number;
        closingCash: number;
    }[];
    breakEvenMonth: number | null;
    initialInvestmentRecovery: number | null;
}>;
export type Scenario = z.infer<typeof ScenarioSchema>;
export declare const FinancialHypothesisSchema: z.ZodObject<{
    unitPrice: z.ZodNumber;
    unitPriceCurrency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
    monthlyVolume: z.ZodNumber;
    activeDaysPerMonth: z.ZodNumber;
    unitVariableCost: z.ZodNumber;
    deliveryCostPerUnit: z.ZodNumber;
    paymentFeeRate: z.ZodNumber;
    monthlyRent: z.ZodNumber;
    monthlyLabor: z.ZodNumber;
    monthlyUtilities: z.ZodNumber;
    monthlyMarketing: z.ZodNumber;
    otherMonthlyFixed: z.ZodNumber;
    equipmentCost: z.ZodNumber;
    initialStock: z.ZodNumber;
    launchExpenses: z.ZodNumber;
    cashReserve: z.ZodNumber;
    currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
}, "strip", z.ZodTypeAny, {
    currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    unitPrice: number;
    unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    monthlyVolume: number;
    activeDaysPerMonth: number;
    unitVariableCost: number;
    deliveryCostPerUnit: number;
    paymentFeeRate: number;
    monthlyRent: number;
    monthlyLabor: number;
    monthlyUtilities: number;
    monthlyMarketing: number;
    otherMonthlyFixed: number;
    equipmentCost: number;
    initialStock: number;
    launchExpenses: number;
    cashReserve: number;
}, {
    currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    unitPrice: number;
    unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    monthlyVolume: number;
    activeDaysPerMonth: number;
    unitVariableCost: number;
    deliveryCostPerUnit: number;
    paymentFeeRate: number;
    monthlyRent: number;
    monthlyLabor: number;
    monthlyUtilities: number;
    monthlyMarketing: number;
    otherMonthlyFixed: number;
    equipmentCost: number;
    initialStock: number;
    launchExpenses: number;
    cashReserve: number;
}>;
export type FinancialHypothesis = z.infer<typeof FinancialHypothesisSchema>;
export declare const FinancialLogicSchema: z.ZodObject<{
    currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
    hypotheses: z.ZodObject<{
        unitPrice: z.ZodNumber;
        unitPriceCurrency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
        monthlyVolume: z.ZodNumber;
        activeDaysPerMonth: z.ZodNumber;
        unitVariableCost: z.ZodNumber;
        deliveryCostPerUnit: z.ZodNumber;
        paymentFeeRate: z.ZodNumber;
        monthlyRent: z.ZodNumber;
        monthlyLabor: z.ZodNumber;
        monthlyUtilities: z.ZodNumber;
        monthlyMarketing: z.ZodNumber;
        otherMonthlyFixed: z.ZodNumber;
        equipmentCost: z.ZodNumber;
        initialStock: z.ZodNumber;
        launchExpenses: z.ZodNumber;
        cashReserve: z.ZodNumber;
        currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
    }, "strip", z.ZodTypeAny, {
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        unitPrice: number;
        unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        monthlyVolume: number;
        activeDaysPerMonth: number;
        unitVariableCost: number;
        deliveryCostPerUnit: number;
        paymentFeeRate: number;
        monthlyRent: number;
        monthlyLabor: number;
        monthlyUtilities: number;
        monthlyMarketing: number;
        otherMonthlyFixed: number;
        equipmentCost: number;
        initialStock: number;
        launchExpenses: number;
        cashReserve: number;
    }, {
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        unitPrice: number;
        unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        monthlyVolume: number;
        activeDaysPerMonth: number;
        unitVariableCost: number;
        deliveryCostPerUnit: number;
        paymentFeeRate: number;
        monthlyRent: number;
        monthlyLabor: number;
        monthlyUtilities: number;
        monthlyMarketing: number;
        otherMonthlyFixed: number;
        equipmentCost: number;
        initialStock: number;
        launchExpenses: number;
        cashReserve: number;
    }>;
    hypothesesSource: z.ZodString;
    roundingRule: z.ZodString;
    scenarios: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["conservative", "central", "ambitious"]>;
        label: z.ZodString;
        hypotheses: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        projections: z.ZodArray<z.ZodObject<{
            month: z.ZodNumber;
            revenue: z.ZodNumber;
            variableCosts: z.ZodNumber;
            grossMargin: z.ZodNumber;
            fixedCosts: z.ZodNumber;
            operatingResult: z.ZodNumber;
            profit: z.ZodNumber;
            openingCash: z.ZodNumber;
            closingCash: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            month: number;
            revenue: number;
            variableCosts: number;
            grossMargin: number;
            fixedCosts: number;
            operatingResult: number;
            profit: number;
            openingCash: number;
            closingCash: number;
        }, {
            month: number;
            revenue: number;
            variableCosts: number;
            grossMargin: number;
            fixedCosts: number;
            operatingResult: number;
            profit: number;
            openingCash: number;
            closingCash: number;
        }>, "many">;
        breakEvenMonth: z.ZodNullable<z.ZodNumber>;
        initialInvestmentRecovery: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        type: "conservative" | "central" | "ambitious";
        hypotheses: Record<string, string | number>;
        projections: {
            month: number;
            revenue: number;
            variableCosts: number;
            grossMargin: number;
            fixedCosts: number;
            operatingResult: number;
            profit: number;
            openingCash: number;
            closingCash: number;
        }[];
        breakEvenMonth: number | null;
        initialInvestmentRecovery: number | null;
    }, {
        label: string;
        type: "conservative" | "central" | "ambitious";
        hypotheses: Record<string, string | number>;
        projections: {
            month: number;
            revenue: number;
            variableCosts: number;
            grossMargin: number;
            fixedCosts: number;
            operatingResult: number;
            profit: number;
            openingCash: number;
            closingCash: number;
        }[];
        breakEvenMonth: number | null;
        initialInvestmentRecovery: number | null;
    }>, "many">;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    hypotheses: {
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        unitPrice: number;
        unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        monthlyVolume: number;
        activeDaysPerMonth: number;
        unitVariableCost: number;
        deliveryCostPerUnit: number;
        paymentFeeRate: number;
        monthlyRent: number;
        monthlyLabor: number;
        monthlyUtilities: number;
        monthlyMarketing: number;
        otherMonthlyFixed: number;
        equipmentCost: number;
        initialStock: number;
        launchExpenses: number;
        cashReserve: number;
    };
    hypothesesSource: string;
    roundingRule: string;
    scenarios: {
        label: string;
        type: "conservative" | "central" | "ambitious";
        hypotheses: Record<string, string | number>;
        projections: {
            month: number;
            revenue: number;
            variableCosts: number;
            grossMargin: number;
            fixedCosts: number;
            operatingResult: number;
            profit: number;
            openingCash: number;
            closingCash: number;
        }[];
        breakEvenMonth: number | null;
        initialInvestmentRecovery: number | null;
    }[];
    notes?: string | undefined;
}, {
    currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    hypotheses: {
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        unitPrice: number;
        unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        monthlyVolume: number;
        activeDaysPerMonth: number;
        unitVariableCost: number;
        deliveryCostPerUnit: number;
        paymentFeeRate: number;
        monthlyRent: number;
        monthlyLabor: number;
        monthlyUtilities: number;
        monthlyMarketing: number;
        otherMonthlyFixed: number;
        equipmentCost: number;
        initialStock: number;
        launchExpenses: number;
        cashReserve: number;
    };
    hypothesesSource: string;
    roundingRule: string;
    scenarios: {
        label: string;
        type: "conservative" | "central" | "ambitious";
        hypotheses: Record<string, string | number>;
        projections: {
            month: number;
            revenue: number;
            variableCosts: number;
            grossMargin: number;
            fixedCosts: number;
            operatingResult: number;
            profit: number;
            openingCash: number;
            closingCash: number;
        }[];
        breakEvenMonth: number | null;
        initialInvestmentRecovery: number | null;
    }[];
    notes?: string | undefined;
}>;
export type FinancialLogic = z.infer<typeof FinancialLogicSchema>;
export declare const BusinessPlanSchema: z.ZodObject<{
    executiveSummary: z.ZodString;
    problemSolution: z.ZodString;
    targetMarket: z.ZodString;
    businessModel: z.ZodString;
    pricing: z.ZodString;
    operations: z.ZodString;
    breakEvenEstimation: z.ZodString;
    risksMitigation: z.ZodArray<z.ZodObject<{
        risk: z.ZodString;
        mitigation: z.ZodString;
        severity: z.ZodEnum<["low", "medium", "high"]>;
    }, "strip", z.ZodTypeAny, {
        risk: string;
        mitigation: string;
        severity: "low" | "medium" | "high";
    }, {
        risk: string;
        mitigation: string;
        severity: "low" | "medium" | "high";
    }>, "many">;
    actionPlan90Days: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        phase: z.ZodEnum<["J1-J30", "J31-J60", "J61-J90"]>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        priority: z.ZodEnum<["high", "medium", "low"]>;
        estimatedCost: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodOptional<z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>>;
        successCriteria: z.ZodOptional<z.ZodString>;
        dependencies: z.ZodArray<z.ZodString, "many">;
        isCompleted: z.ZodDefault<z.ZodBoolean>;
        completedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        id: string;
        phase: "J1-J30" | "J31-J60" | "J61-J90";
        priority: "low" | "medium" | "high";
        dependencies: string[];
        isCompleted: boolean;
        description?: string | undefined;
        currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
        estimatedCost?: number | undefined;
        successCriteria?: string | undefined;
        completedAt?: string | undefined;
    }, {
        title: string;
        id: string;
        phase: "J1-J30" | "J31-J60" | "J61-J90";
        priority: "low" | "medium" | "high";
        dependencies: string[];
        description?: string | undefined;
        currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
        estimatedCost?: number | undefined;
        successCriteria?: string | undefined;
        isCompleted?: boolean | undefined;
        completedAt?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    executiveSummary: string;
    problemSolution: string;
    targetMarket: string;
    businessModel: string;
    pricing: string;
    operations: string;
    breakEvenEstimation: string;
    risksMitigation: {
        risk: string;
        mitigation: string;
        severity: "low" | "medium" | "high";
    }[];
    actionPlan90Days: {
        title: string;
        id: string;
        phase: "J1-J30" | "J31-J60" | "J61-J90";
        priority: "low" | "medium" | "high";
        dependencies: string[];
        isCompleted: boolean;
        description?: string | undefined;
        currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
        estimatedCost?: number | undefined;
        successCriteria?: string | undefined;
        completedAt?: string | undefined;
    }[];
}, {
    executiveSummary: string;
    problemSolution: string;
    targetMarket: string;
    businessModel: string;
    pricing: string;
    operations: string;
    breakEvenEstimation: string;
    risksMitigation: {
        risk: string;
        mitigation: string;
        severity: "low" | "medium" | "high";
    }[];
    actionPlan90Days: {
        title: string;
        id: string;
        phase: "J1-J30" | "J31-J60" | "J61-J90";
        priority: "low" | "medium" | "high";
        dependencies: string[];
        description?: string | undefined;
        currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
        estimatedCost?: number | undefined;
        successCriteria?: string | undefined;
        isCompleted?: boolean | undefined;
        completedAt?: string | undefined;
    }[];
}>;
export type BusinessPlan = z.infer<typeof BusinessPlanSchema>;
export declare const AfriBizDossierSchema: z.ZodObject<{
    schemaVersion: z.ZodLiteral<"1.0">;
    projectId: z.ZodString;
    revision: z.ZodNumber;
    generatedAt: z.ZodString;
    locale: z.ZodLiteral<"fr">;
    inputSnapshot: z.ZodObject<{
        mode: z.ZodEnum<["idea", "budget"]>;
        description: z.ZodOptional<z.ZodString>;
        existingName: z.ZodOptional<z.ZodString>;
        country: z.ZodString;
        city: z.ZodString;
        zone: z.ZodOptional<z.ZodString>;
        sector: z.ZodEnum<["agro-business", "fintech-mobile-money", "restauration", "ecommerce-logistique", "beaute-bien-etre", "education-formation", "services-b2b", "artisanat-mode", "sante", "immobilier", "tourisme", "tech-digital", "autre"]>;
        targetAudience: z.ZodString;
        budget: z.ZodNumber;
        currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
        timeAvailablePerWeek: z.ZodNumber;
        skills: z.ZodOptional<z.ZodString>;
        hasPhysicalLocation: z.ZodBoolean;
        isRemoteManaged: z.ZodBoolean;
        ambition: z.ZodEnum<["complementary", "main", "scale", "franchise"]>;
    }, "strip", z.ZodTypeAny, {
        mode: "idea" | "budget";
        country: string;
        budget: number;
        city: string;
        sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
        targetAudience: string;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        timeAvailablePerWeek: number;
        hasPhysicalLocation: boolean;
        isRemoteManaged: boolean;
        ambition: "main" | "scale" | "complementary" | "franchise";
        description?: string | undefined;
        existingName?: string | undefined;
        zone?: string | undefined;
        skills?: string | undefined;
    }, {
        mode: "idea" | "budget";
        country: string;
        budget: number;
        city: string;
        sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
        targetAudience: string;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        timeAvailablePerWeek: number;
        hasPhysicalLocation: boolean;
        isRemoteManaged: boolean;
        ambition: "main" | "scale" | "complementary" | "franchise";
        description?: string | undefined;
        existingName?: string | undefined;
        zone?: string | undefined;
        skills?: string | undefined;
    }>;
    selectedConceptId: z.ZodOptional<z.ZodString>;
    concept: z.ZodObject<{
        recommendedIdea: z.ZodString;
        justification: z.ZodString;
        rankings: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            idea: z.ZodString;
            description: z.ZodString;
            estimatedProfitability: z.ZodEnum<["low", "medium", "high"]>;
            startupSpeed: z.ZodEnum<["slow", "medium", "fast"]>;
            risk: z.ZodEnum<["low", "medium", "high"]>;
            score: z.ZodNumber;
            scoreExplanation: z.ZodString;
            confidenceLevel: z.ZodEnum<["low", "medium", "high"]>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            idea: string;
            description: string;
            estimatedProfitability: "low" | "medium" | "high";
            startupSpeed: "medium" | "slow" | "fast";
            risk: "low" | "medium" | "high";
            score: number;
            scoreExplanation: string;
            confidenceLevel: "low" | "medium" | "high";
        }, {
            id: string;
            idea: string;
            description: string;
            estimatedProfitability: "low" | "medium" | "high";
            startupSpeed: "medium" | "slow" | "fast";
            risk: "low" | "medium" | "high";
            score: number;
            scoreExplanation: string;
            confidenceLevel: "low" | "medium" | "high";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        recommendedIdea: string;
        justification: string;
        rankings: {
            id: string;
            idea: string;
            description: string;
            estimatedProfitability: "low" | "medium" | "high";
            startupSpeed: "medium" | "slow" | "fast";
            risk: "low" | "medium" | "high";
            score: number;
            scoreExplanation: string;
            confidenceLevel: "low" | "medium" | "high";
        }[];
    }, {
        recommendedIdea: string;
        justification: string;
        rankings: {
            id: string;
            idea: string;
            description: string;
            estimatedProfitability: "low" | "medium" | "high";
            startupSpeed: "medium" | "slow" | "fast";
            risk: "low" | "medium" | "high";
            score: number;
            scoreExplanation: string;
            confidenceLevel: "low" | "medium" | "high";
        }[];
    }>;
    branding: z.ZodObject<{
        recommendedName: z.ZodString;
        tagline: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            meaning: z.ZodString;
            positioning: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            meaning: string;
            positioning: string;
        }, {
            name: string;
            meaning: string;
            positioning: string;
        }>, "many">;
        logoPrompt: z.ZodString;
        palette: z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            accent: z.ZodString;
            background: z.ZodString;
            usageGuide: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            background: string;
            primary: string;
            secondary: string;
            accent: string;
            usageGuide: string;
        }, {
            background: string;
            primary: string;
            secondary: string;
            accent: string;
            usageGuide: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        options: {
            name: string;
            meaning: string;
            positioning: string;
        }[];
        recommendedName: string;
        tagline: string;
        logoPrompt: string;
        palette: {
            background: string;
            primary: string;
            secondary: string;
            accent: string;
            usageGuide: string;
        };
    }, {
        options: {
            name: string;
            meaning: string;
            positioning: string;
        }[];
        recommendedName: string;
        tagline: string;
        logoPrompt: string;
        palette: {
            background: string;
            primary: string;
            secondary: string;
            accent: string;
            usageGuide: string;
        };
    }>;
    marketingPrompts: z.ZodObject<{
        tiktok: z.ZodObject<{
            aiPrompt: z.ZodString;
            description: z.ZodString;
            caption: z.ZodString;
            cta: z.ZodString;
            visualStyle: z.ZodString;
            styleVariations: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                aiPrompt: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                label: string;
                description: string;
                aiPrompt: string;
            }, {
                label: string;
                description: string;
                aiPrompt: string;
            }>, "many">;
            aspectRatio: z.ZodString;
            assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
            assetUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }>;
        instagramFeed: z.ZodObject<{
            aiPrompt: z.ZodString;
            description: z.ZodString;
            caption: z.ZodString;
            cta: z.ZodString;
            visualStyle: z.ZodString;
            styleVariations: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                aiPrompt: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                label: string;
                description: string;
                aiPrompt: string;
            }, {
                label: string;
                description: string;
                aiPrompt: string;
            }>, "many">;
            aspectRatio: z.ZodString;
            assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
            assetUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }>;
        instagramStory: z.ZodObject<{
            aiPrompt: z.ZodString;
            description: z.ZodString;
            caption: z.ZodString;
            cta: z.ZodString;
            visualStyle: z.ZodString;
            styleVariations: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                aiPrompt: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                label: string;
                description: string;
                aiPrompt: string;
            }, {
                label: string;
                description: string;
                aiPrompt: string;
            }>, "many">;
            aspectRatio: z.ZodString;
            assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
            assetUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }>;
        whatsappFlyer: z.ZodObject<{
            aiPrompt: z.ZodString;
            description: z.ZodString;
            caption: z.ZodString;
            cta: z.ZodString;
            visualStyle: z.ZodString;
            styleVariations: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                aiPrompt: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                label: string;
                description: string;
                aiPrompt: string;
            }, {
                label: string;
                description: string;
                aiPrompt: string;
            }>, "many">;
            aspectRatio: z.ZodString;
            assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
            assetUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }>;
        facebook: z.ZodObject<{
            aiPrompt: z.ZodString;
            description: z.ZodString;
            caption: z.ZodString;
            cta: z.ZodString;
            visualStyle: z.ZodString;
            styleVariations: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                aiPrompt: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                label: string;
                description: string;
                aiPrompt: string;
            }, {
                label: string;
                description: string;
                aiPrompt: string;
            }>, "many">;
            aspectRatio: z.ZodString;
            assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
            assetUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }>;
        billboard: z.ZodObject<{
            aiPrompt: z.ZodString;
            description: z.ZodString;
            caption: z.ZodString;
            cta: z.ZodString;
            visualStyle: z.ZodString;
            styleVariations: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                aiPrompt: z.ZodString;
                description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                label: string;
                description: string;
                aiPrompt: string;
            }, {
                label: string;
                description: string;
                aiPrompt: string;
            }>, "many">;
            aspectRatio: z.ZodString;
            assetStatus: z.ZodOptional<z.ZodEnum<["queued", "running", "succeeded", "failed", "cancelled"]>>;
            assetUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }, {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        tiktok: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        instagramFeed: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        instagramStory: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        whatsappFlyer: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        facebook: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        billboard: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
    }, {
        tiktok: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        instagramFeed: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        instagramStory: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        whatsappFlyer: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        facebook: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        billboard: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
    }>;
    locationStrategy: z.ZodObject<{
        bestZone: z.ZodNullable<z.ZodString>;
        strategicValue: z.ZodString;
        customerBehavior: z.ZodString;
        lowBudgetAlternative: z.ZodString;
        channelRecommendation: z.ZodString;
        otherZones: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            strategicValue: z.ZodString;
            customerBehavior: z.ZodString;
            pros: z.ZodArray<z.ZodString, "many">;
            cons: z.ZodArray<z.ZodString, "many">;
            estimatedRent: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            strategicValue: string;
            customerBehavior: string;
            pros: string[];
            cons: string[];
            estimatedRent?: string | undefined;
        }, {
            name: string;
            strategicValue: string;
            customerBehavior: string;
            pros: string[];
            cons: string[];
            estimatedRent?: string | undefined;
        }>, "many">;
        evidenceIds: z.ZodArray<z.ZodString, "many">;
        terrainValidations: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        strategicValue: string;
        customerBehavior: string;
        bestZone: string | null;
        lowBudgetAlternative: string;
        channelRecommendation: string;
        otherZones: {
            name: string;
            strategicValue: string;
            customerBehavior: string;
            pros: string[];
            cons: string[];
            estimatedRent?: string | undefined;
        }[];
        evidenceIds: string[];
        terrainValidations: string[];
    }, {
        strategicValue: string;
        customerBehavior: string;
        bestZone: string | null;
        lowBudgetAlternative: string;
        channelRecommendation: string;
        otherZones: {
            name: string;
            strategicValue: string;
            customerBehavior: string;
            pros: string[];
            cons: string[];
            estimatedRent?: string | undefined;
        }[];
        evidenceIds: string[];
        terrainValidations: string[];
    }>;
    businessPlan: z.ZodObject<{
        executiveSummary: z.ZodString;
        problemSolution: z.ZodString;
        targetMarket: z.ZodString;
        businessModel: z.ZodString;
        pricing: z.ZodString;
        operations: z.ZodString;
        breakEvenEstimation: z.ZodString;
        risksMitigation: z.ZodArray<z.ZodObject<{
            risk: z.ZodString;
            mitigation: z.ZodString;
            severity: z.ZodEnum<["low", "medium", "high"]>;
        }, "strip", z.ZodTypeAny, {
            risk: string;
            mitigation: string;
            severity: "low" | "medium" | "high";
        }, {
            risk: string;
            mitigation: string;
            severity: "low" | "medium" | "high";
        }>, "many">;
        actionPlan90Days: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            phase: z.ZodEnum<["J1-J30", "J31-J60", "J61-J90"]>;
            title: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            priority: z.ZodEnum<["high", "medium", "low"]>;
            estimatedCost: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodOptional<z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>>;
            successCriteria: z.ZodOptional<z.ZodString>;
            dependencies: z.ZodArray<z.ZodString, "many">;
            isCompleted: z.ZodDefault<z.ZodBoolean>;
            completedAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            id: string;
            phase: "J1-J30" | "J31-J60" | "J61-J90";
            priority: "low" | "medium" | "high";
            dependencies: string[];
            isCompleted: boolean;
            description?: string | undefined;
            currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
            estimatedCost?: number | undefined;
            successCriteria?: string | undefined;
            completedAt?: string | undefined;
        }, {
            title: string;
            id: string;
            phase: "J1-J30" | "J31-J60" | "J61-J90";
            priority: "low" | "medium" | "high";
            dependencies: string[];
            description?: string | undefined;
            currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
            estimatedCost?: number | undefined;
            successCriteria?: string | undefined;
            isCompleted?: boolean | undefined;
            completedAt?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        executiveSummary: string;
        problemSolution: string;
        targetMarket: string;
        businessModel: string;
        pricing: string;
        operations: string;
        breakEvenEstimation: string;
        risksMitigation: {
            risk: string;
            mitigation: string;
            severity: "low" | "medium" | "high";
        }[];
        actionPlan90Days: {
            title: string;
            id: string;
            phase: "J1-J30" | "J31-J60" | "J61-J90";
            priority: "low" | "medium" | "high";
            dependencies: string[];
            isCompleted: boolean;
            description?: string | undefined;
            currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
            estimatedCost?: number | undefined;
            successCriteria?: string | undefined;
            completedAt?: string | undefined;
        }[];
    }, {
        executiveSummary: string;
        problemSolution: string;
        targetMarket: string;
        businessModel: string;
        pricing: string;
        operations: string;
        breakEvenEstimation: string;
        risksMitigation: {
            risk: string;
            mitigation: string;
            severity: "low" | "medium" | "high";
        }[];
        actionPlan90Days: {
            title: string;
            id: string;
            phase: "J1-J30" | "J31-J60" | "J61-J90";
            priority: "low" | "medium" | "high";
            dependencies: string[];
            description?: string | undefined;
            currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
            estimatedCost?: number | undefined;
            successCriteria?: string | undefined;
            isCompleted?: boolean | undefined;
            completedAt?: string | undefined;
        }[];
    }>;
    financialLogic: z.ZodObject<{
        currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
        hypotheses: z.ZodObject<{
            unitPrice: z.ZodNumber;
            unitPriceCurrency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
            monthlyVolume: z.ZodNumber;
            activeDaysPerMonth: z.ZodNumber;
            unitVariableCost: z.ZodNumber;
            deliveryCostPerUnit: z.ZodNumber;
            paymentFeeRate: z.ZodNumber;
            monthlyRent: z.ZodNumber;
            monthlyLabor: z.ZodNumber;
            monthlyUtilities: z.ZodNumber;
            monthlyMarketing: z.ZodNumber;
            otherMonthlyFixed: z.ZodNumber;
            equipmentCost: z.ZodNumber;
            initialStock: z.ZodNumber;
            launchExpenses: z.ZodNumber;
            cashReserve: z.ZodNumber;
            currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
        }, "strip", z.ZodTypeAny, {
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            unitPrice: number;
            unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            monthlyVolume: number;
            activeDaysPerMonth: number;
            unitVariableCost: number;
            deliveryCostPerUnit: number;
            paymentFeeRate: number;
            monthlyRent: number;
            monthlyLabor: number;
            monthlyUtilities: number;
            monthlyMarketing: number;
            otherMonthlyFixed: number;
            equipmentCost: number;
            initialStock: number;
            launchExpenses: number;
            cashReserve: number;
        }, {
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            unitPrice: number;
            unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            monthlyVolume: number;
            activeDaysPerMonth: number;
            unitVariableCost: number;
            deliveryCostPerUnit: number;
            paymentFeeRate: number;
            monthlyRent: number;
            monthlyLabor: number;
            monthlyUtilities: number;
            monthlyMarketing: number;
            otherMonthlyFixed: number;
            equipmentCost: number;
            initialStock: number;
            launchExpenses: number;
            cashReserve: number;
        }>;
        hypothesesSource: z.ZodString;
        roundingRule: z.ZodString;
        scenarios: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["conservative", "central", "ambitious"]>;
            label: z.ZodString;
            hypotheses: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            projections: z.ZodArray<z.ZodObject<{
                month: z.ZodNumber;
                revenue: z.ZodNumber;
                variableCosts: z.ZodNumber;
                grossMargin: z.ZodNumber;
                fixedCosts: z.ZodNumber;
                operatingResult: z.ZodNumber;
                profit: z.ZodNumber;
                openingCash: z.ZodNumber;
                closingCash: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                month: number;
                revenue: number;
                variableCosts: number;
                grossMargin: number;
                fixedCosts: number;
                operatingResult: number;
                profit: number;
                openingCash: number;
                closingCash: number;
            }, {
                month: number;
                revenue: number;
                variableCosts: number;
                grossMargin: number;
                fixedCosts: number;
                operatingResult: number;
                profit: number;
                openingCash: number;
                closingCash: number;
            }>, "many">;
            breakEvenMonth: z.ZodNullable<z.ZodNumber>;
            initialInvestmentRecovery: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            label: string;
            type: "conservative" | "central" | "ambitious";
            hypotheses: Record<string, string | number>;
            projections: {
                month: number;
                revenue: number;
                variableCosts: number;
                grossMargin: number;
                fixedCosts: number;
                operatingResult: number;
                profit: number;
                openingCash: number;
                closingCash: number;
            }[];
            breakEvenMonth: number | null;
            initialInvestmentRecovery: number | null;
        }, {
            label: string;
            type: "conservative" | "central" | "ambitious";
            hypotheses: Record<string, string | number>;
            projections: {
                month: number;
                revenue: number;
                variableCosts: number;
                grossMargin: number;
                fixedCosts: number;
                operatingResult: number;
                profit: number;
                openingCash: number;
                closingCash: number;
            }[];
            breakEvenMonth: number | null;
            initialInvestmentRecovery: number | null;
        }>, "many">;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        hypotheses: {
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            unitPrice: number;
            unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            monthlyVolume: number;
            activeDaysPerMonth: number;
            unitVariableCost: number;
            deliveryCostPerUnit: number;
            paymentFeeRate: number;
            monthlyRent: number;
            monthlyLabor: number;
            monthlyUtilities: number;
            monthlyMarketing: number;
            otherMonthlyFixed: number;
            equipmentCost: number;
            initialStock: number;
            launchExpenses: number;
            cashReserve: number;
        };
        hypothesesSource: string;
        roundingRule: string;
        scenarios: {
            label: string;
            type: "conservative" | "central" | "ambitious";
            hypotheses: Record<string, string | number>;
            projections: {
                month: number;
                revenue: number;
                variableCosts: number;
                grossMargin: number;
                fixedCosts: number;
                operatingResult: number;
                profit: number;
                openingCash: number;
                closingCash: number;
            }[];
            breakEvenMonth: number | null;
            initialInvestmentRecovery: number | null;
        }[];
        notes?: string | undefined;
    }, {
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        hypotheses: {
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            unitPrice: number;
            unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            monthlyVolume: number;
            activeDaysPerMonth: number;
            unitVariableCost: number;
            deliveryCostPerUnit: number;
            paymentFeeRate: number;
            monthlyRent: number;
            monthlyLabor: number;
            monthlyUtilities: number;
            monthlyMarketing: number;
            otherMonthlyFixed: number;
            equipmentCost: number;
            initialStock: number;
            launchExpenses: number;
            cashReserve: number;
        };
        hypothesesSource: string;
        roundingRule: string;
        scenarios: {
            label: string;
            type: "conservative" | "central" | "ambitious";
            hypotheses: Record<string, string | number>;
            projections: {
                month: number;
                revenue: number;
                variableCosts: number;
                grossMargin: number;
                fixedCosts: number;
                operatingResult: number;
                profit: number;
                openingCash: number;
                closingCash: number;
            }[];
            breakEvenMonth: number | null;
            initialInvestmentRecovery: number | null;
        }[];
        notes?: string | undefined;
    }>;
    evidence: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        source: z.ZodString;
        title: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        consultedAt: z.ZodOptional<z.ZodString>;
        periodCovered: z.ZodOptional<z.ZodString>;
        territory: z.ZodOptional<z.ZodString>;
        supports: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        source: string;
        title: string;
        id: string;
        supports: string[];
        url?: string | undefined;
        consultedAt?: string | undefined;
        periodCovered?: string | undefined;
        territory?: string | undefined;
    }, {
        source: string;
        title: string;
        id: string;
        supports: string[];
        url?: string | undefined;
        consultedAt?: string | undefined;
        periodCovered?: string | undefined;
        territory?: string | undefined;
    }>, "many">;
    warnings: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    projectId: string;
    generatedAt: string;
    schemaVersion: "1.0";
    revision: number;
    locale: "fr";
    inputSnapshot: {
        mode: "idea" | "budget";
        country: string;
        budget: number;
        city: string;
        sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
        targetAudience: string;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        timeAvailablePerWeek: number;
        hasPhysicalLocation: boolean;
        isRemoteManaged: boolean;
        ambition: "main" | "scale" | "complementary" | "franchise";
        description?: string | undefined;
        existingName?: string | undefined;
        zone?: string | undefined;
        skills?: string | undefined;
    };
    concept: {
        recommendedIdea: string;
        justification: string;
        rankings: {
            id: string;
            idea: string;
            description: string;
            estimatedProfitability: "low" | "medium" | "high";
            startupSpeed: "medium" | "slow" | "fast";
            risk: "low" | "medium" | "high";
            score: number;
            scoreExplanation: string;
            confidenceLevel: "low" | "medium" | "high";
        }[];
    };
    branding: {
        options: {
            name: string;
            meaning: string;
            positioning: string;
        }[];
        recommendedName: string;
        tagline: string;
        logoPrompt: string;
        palette: {
            background: string;
            primary: string;
            secondary: string;
            accent: string;
            usageGuide: string;
        };
    };
    marketingPrompts: {
        tiktok: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        instagramFeed: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        instagramStory: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        whatsappFlyer: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        facebook: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        billboard: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
    };
    locationStrategy: {
        strategicValue: string;
        customerBehavior: string;
        bestZone: string | null;
        lowBudgetAlternative: string;
        channelRecommendation: string;
        otherZones: {
            name: string;
            strategicValue: string;
            customerBehavior: string;
            pros: string[];
            cons: string[];
            estimatedRent?: string | undefined;
        }[];
        evidenceIds: string[];
        terrainValidations: string[];
    };
    businessPlan: {
        executiveSummary: string;
        problemSolution: string;
        targetMarket: string;
        businessModel: string;
        pricing: string;
        operations: string;
        breakEvenEstimation: string;
        risksMitigation: {
            risk: string;
            mitigation: string;
            severity: "low" | "medium" | "high";
        }[];
        actionPlan90Days: {
            title: string;
            id: string;
            phase: "J1-J30" | "J31-J60" | "J61-J90";
            priority: "low" | "medium" | "high";
            dependencies: string[];
            isCompleted: boolean;
            description?: string | undefined;
            currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
            estimatedCost?: number | undefined;
            successCriteria?: string | undefined;
            completedAt?: string | undefined;
        }[];
    };
    financialLogic: {
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        hypotheses: {
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            unitPrice: number;
            unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            monthlyVolume: number;
            activeDaysPerMonth: number;
            unitVariableCost: number;
            deliveryCostPerUnit: number;
            paymentFeeRate: number;
            monthlyRent: number;
            monthlyLabor: number;
            monthlyUtilities: number;
            monthlyMarketing: number;
            otherMonthlyFixed: number;
            equipmentCost: number;
            initialStock: number;
            launchExpenses: number;
            cashReserve: number;
        };
        hypothesesSource: string;
        roundingRule: string;
        scenarios: {
            label: string;
            type: "conservative" | "central" | "ambitious";
            hypotheses: Record<string, string | number>;
            projections: {
                month: number;
                revenue: number;
                variableCosts: number;
                grossMargin: number;
                fixedCosts: number;
                operatingResult: number;
                profit: number;
                openingCash: number;
                closingCash: number;
            }[];
            breakEvenMonth: number | null;
            initialInvestmentRecovery: number | null;
        }[];
        notes?: string | undefined;
    };
    evidence: {
        source: string;
        title: string;
        id: string;
        supports: string[];
        url?: string | undefined;
        consultedAt?: string | undefined;
        periodCovered?: string | undefined;
        territory?: string | undefined;
    }[];
    warnings: string[];
    selectedConceptId?: string | undefined;
}, {
    projectId: string;
    generatedAt: string;
    schemaVersion: "1.0";
    revision: number;
    locale: "fr";
    inputSnapshot: {
        mode: "idea" | "budget";
        country: string;
        budget: number;
        city: string;
        sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
        targetAudience: string;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        timeAvailablePerWeek: number;
        hasPhysicalLocation: boolean;
        isRemoteManaged: boolean;
        ambition: "main" | "scale" | "complementary" | "franchise";
        description?: string | undefined;
        existingName?: string | undefined;
        zone?: string | undefined;
        skills?: string | undefined;
    };
    concept: {
        recommendedIdea: string;
        justification: string;
        rankings: {
            id: string;
            idea: string;
            description: string;
            estimatedProfitability: "low" | "medium" | "high";
            startupSpeed: "medium" | "slow" | "fast";
            risk: "low" | "medium" | "high";
            score: number;
            scoreExplanation: string;
            confidenceLevel: "low" | "medium" | "high";
        }[];
    };
    branding: {
        options: {
            name: string;
            meaning: string;
            positioning: string;
        }[];
        recommendedName: string;
        tagline: string;
        logoPrompt: string;
        palette: {
            background: string;
            primary: string;
            secondary: string;
            accent: string;
            usageGuide: string;
        };
    };
    marketingPrompts: {
        tiktok: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        instagramFeed: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        instagramStory: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        whatsappFlyer: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        facebook: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
        billboard: {
            caption: string;
            description: string;
            aiPrompt: string;
            cta: string;
            visualStyle: string;
            styleVariations: {
                label: string;
                description: string;
                aiPrompt: string;
            }[];
            aspectRatio: string;
            assetStatus?: "failed" | "queued" | "running" | "succeeded" | "cancelled" | undefined;
            assetUrl?: string | undefined;
        };
    };
    locationStrategy: {
        strategicValue: string;
        customerBehavior: string;
        bestZone: string | null;
        lowBudgetAlternative: string;
        channelRecommendation: string;
        otherZones: {
            name: string;
            strategicValue: string;
            customerBehavior: string;
            pros: string[];
            cons: string[];
            estimatedRent?: string | undefined;
        }[];
        evidenceIds: string[];
        terrainValidations: string[];
    };
    businessPlan: {
        executiveSummary: string;
        problemSolution: string;
        targetMarket: string;
        businessModel: string;
        pricing: string;
        operations: string;
        breakEvenEstimation: string;
        risksMitigation: {
            risk: string;
            mitigation: string;
            severity: "low" | "medium" | "high";
        }[];
        actionPlan90Days: {
            title: string;
            id: string;
            phase: "J1-J30" | "J31-J60" | "J61-J90";
            priority: "low" | "medium" | "high";
            dependencies: string[];
            description?: string | undefined;
            currency?: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP" | undefined;
            estimatedCost?: number | undefined;
            successCriteria?: string | undefined;
            isCompleted?: boolean | undefined;
            completedAt?: string | undefined;
        }[];
    };
    financialLogic: {
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        hypotheses: {
            currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            unitPrice: number;
            unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
            monthlyVolume: number;
            activeDaysPerMonth: number;
            unitVariableCost: number;
            deliveryCostPerUnit: number;
            paymentFeeRate: number;
            monthlyRent: number;
            monthlyLabor: number;
            monthlyUtilities: number;
            monthlyMarketing: number;
            otherMonthlyFixed: number;
            equipmentCost: number;
            initialStock: number;
            launchExpenses: number;
            cashReserve: number;
        };
        hypothesesSource: string;
        roundingRule: string;
        scenarios: {
            label: string;
            type: "conservative" | "central" | "ambitious";
            hypotheses: Record<string, string | number>;
            projections: {
                month: number;
                revenue: number;
                variableCosts: number;
                grossMargin: number;
                fixedCosts: number;
                operatingResult: number;
                profit: number;
                openingCash: number;
                closingCash: number;
            }[];
            breakEvenMonth: number | null;
            initialInvestmentRecovery: number | null;
        }[];
        notes?: string | undefined;
    };
    evidence: {
        source: string;
        title: string;
        id: string;
        supports: string[];
        url?: string | undefined;
        consultedAt?: string | undefined;
        periodCovered?: string | undefined;
        territory?: string | undefined;
    }[];
    warnings: string[];
    selectedConceptId?: string | undefined;
}>;
export type AfriBizDossier = z.infer<typeof AfriBizDossierSchema>;
export declare const CreateProjectRequestSchema: z.ZodObject<{
    name: z.ZodString;
    input: z.ZodObject<{
        mode: z.ZodEnum<["idea", "budget"]>;
        description: z.ZodOptional<z.ZodString>;
        existingName: z.ZodOptional<z.ZodString>;
        country: z.ZodString;
        city: z.ZodString;
        zone: z.ZodOptional<z.ZodString>;
        sector: z.ZodEnum<["agro-business", "fintech-mobile-money", "restauration", "ecommerce-logistique", "beaute-bien-etre", "education-formation", "services-b2b", "artisanat-mode", "sante", "immobilier", "tourisme", "tech-digital", "autre"]>;
        targetAudience: z.ZodString;
        budget: z.ZodNumber;
        currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
        timeAvailablePerWeek: z.ZodNumber;
        skills: z.ZodOptional<z.ZodString>;
        hasPhysicalLocation: z.ZodBoolean;
        isRemoteManaged: z.ZodBoolean;
        ambition: z.ZodEnum<["complementary", "main", "scale", "franchise"]>;
    }, "strip", z.ZodTypeAny, {
        mode: "idea" | "budget";
        country: string;
        budget: number;
        city: string;
        sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
        targetAudience: string;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        timeAvailablePerWeek: number;
        hasPhysicalLocation: boolean;
        isRemoteManaged: boolean;
        ambition: "main" | "scale" | "complementary" | "franchise";
        description?: string | undefined;
        existingName?: string | undefined;
        zone?: string | undefined;
        skills?: string | undefined;
    }, {
        mode: "idea" | "budget";
        country: string;
        budget: number;
        city: string;
        sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
        targetAudience: string;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        timeAvailablePerWeek: number;
        hasPhysicalLocation: boolean;
        isRemoteManaged: boolean;
        ambition: "main" | "scale" | "complementary" | "franchise";
        description?: string | undefined;
        existingName?: string | undefined;
        zone?: string | undefined;
        skills?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    input: {
        mode: "idea" | "budget";
        country: string;
        budget: number;
        city: string;
        sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
        targetAudience: string;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        timeAvailablePerWeek: number;
        hasPhysicalLocation: boolean;
        isRemoteManaged: boolean;
        ambition: "main" | "scale" | "complementary" | "franchise";
        description?: string | undefined;
        existingName?: string | undefined;
        zone?: string | undefined;
        skills?: string | undefined;
    };
    name: string;
}, {
    input: {
        mode: "idea" | "budget";
        country: string;
        budget: number;
        city: string;
        sector: "restauration" | "agro-business" | "fintech-mobile-money" | "ecommerce-logistique" | "beaute-bien-etre" | "education-formation" | "services-b2b" | "artisanat-mode" | "sante" | "immobilier" | "tourisme" | "tech-digital" | "autre";
        targetAudience: string;
        currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
        timeAvailablePerWeek: number;
        hasPhysicalLocation: boolean;
        isRemoteManaged: boolean;
        ambition: "main" | "scale" | "complementary" | "franchise";
        description?: string | undefined;
        existingName?: string | undefined;
        zone?: string | undefined;
        skills?: string | undefined;
    };
    name: string;
}>;
export declare const UpdateProjectNameSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const SelectConceptSchema: z.ZodObject<{
    conceptId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conceptId: string;
}, {
    conceptId: string;
}>;
export declare const UpdateFinancialHypothesisSchema: z.ZodObject<{
    unitPrice: z.ZodNumber;
    unitPriceCurrency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
    monthlyVolume: z.ZodNumber;
    activeDaysPerMonth: z.ZodNumber;
    unitVariableCost: z.ZodNumber;
    deliveryCostPerUnit: z.ZodNumber;
    paymentFeeRate: z.ZodNumber;
    monthlyRent: z.ZodNumber;
    monthlyLabor: z.ZodNumber;
    monthlyUtilities: z.ZodNumber;
    monthlyMarketing: z.ZodNumber;
    otherMonthlyFixed: z.ZodNumber;
    equipmentCost: z.ZodNumber;
    initialStock: z.ZodNumber;
    launchExpenses: z.ZodNumber;
    cashReserve: z.ZodNumber;
    currency: z.ZodEnum<["XOF", "XAF", "NGN", "KES", "GHS", "CDF", "MAD", "EUR", "USD", "GBP"]>;
}, "strip", z.ZodTypeAny, {
    currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    unitPrice: number;
    unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    monthlyVolume: number;
    activeDaysPerMonth: number;
    unitVariableCost: number;
    deliveryCostPerUnit: number;
    paymentFeeRate: number;
    monthlyRent: number;
    monthlyLabor: number;
    monthlyUtilities: number;
    monthlyMarketing: number;
    otherMonthlyFixed: number;
    equipmentCost: number;
    initialStock: number;
    launchExpenses: number;
    cashReserve: number;
}, {
    currency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    unitPrice: number;
    unitPriceCurrency: "XOF" | "XAF" | "NGN" | "KES" | "GHS" | "MAD" | "CDF" | "EUR" | "USD" | "GBP";
    monthlyVolume: number;
    activeDaysPerMonth: number;
    unitVariableCost: number;
    deliveryCostPerUnit: number;
    paymentFeeRate: number;
    monthlyRent: number;
    monthlyLabor: number;
    monthlyUtilities: number;
    monthlyMarketing: number;
    otherMonthlyFixed: number;
    equipmentCost: number;
    initialStock: number;
    launchExpenses: number;
    cashReserve: number;
}>;
export declare const UpdateActionTaskSchema: z.ZodObject<{
    isCompleted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    isCompleted: boolean;
}, {
    isCompleted: boolean;
}>;
export declare const ContactInfoSchema: z.ZodObject<{
    whatsapp: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    socialHandle: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address?: string | undefined;
    whatsapp?: string | undefined;
    phone?: string | undefined;
    socialHandle?: string | undefined;
}, {
    address?: string | undefined;
    whatsapp?: string | undefined;
    phone?: string | undefined;
    socialHandle?: string | undefined;
}>;
export type ContactInfo = z.infer<typeof ContactInfoSchema>;
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
export declare function formatCurrency(amount: number, currency: CurrencyCode, locale?: string): string;
export declare function formatCurrencyCompact(amount: number, currency: CurrencyCode, locale?: string): string;
//# sourceMappingURL=schemas.d.ts.map