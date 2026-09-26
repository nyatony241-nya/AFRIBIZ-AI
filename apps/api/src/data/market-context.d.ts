/**
 * Données de contexte marché africain — injectées dans les prompts IA
 * Sources : Banque Mondiale, OHADA, banques centrales BCEAO/BEAC, terrain
 * Mise à jour : 2026
 */
export interface ZoneInfo {
    name: string;
    profile: string;
    avgRent?: number;
    notes?: string;
}
export interface MarketContext {
    country: string;
    currency: string;
    eurRate: number;
    usdRate: number;
    minWage: number;
    informalDailyWage: number;
    dominantPayments: string[];
    logistics: string;
    regulation: string;
    regCost: number;
    regDays: string;
    internetPenetration: string;
    mobileMoneyUsage: string;
    keyChallenge: string;
    opportunities: string;
    zones?: Record<string, ZoneInfo>;
    rentRange?: {
        min: number;
        max: number;
        unit: string;
    };
}
export declare const MARKET_CONTEXTS: Record<string, Record<string, MarketContext>>;
/** Retourne le contexte marché pour un pays et une ville donnés */
export declare function getMarketContext(countryCode: string, city: string): MarketContext | null;
/** Construit le bloc de contexte marché à injecter dans un prompt */
export declare function buildMarketContextBlock(countryCode: string, city: string, zone?: string): string;
//# sourceMappingURL=market-context.d.ts.map