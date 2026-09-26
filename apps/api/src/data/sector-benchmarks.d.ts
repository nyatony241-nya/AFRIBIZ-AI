/**
 * Benchmarks sectoriels africains — données réelles pour valider et enrichir les sorties IA
 * Injectés dans les prompts et utilisés pour la validation post-génération
 */
export interface SectorBenchmark {
    label: string;
    grossMarginRange: [number, number];
    breakEvenMonths: [number, number];
    avgTicketXOF?: [number, number];
    staffMin: number;
    keyRisks: string[];
    keySuccessFactors: string[];
    localNuances: string;
    typicalCosts: string;
    digitalReadiness: 'low' | 'medium' | 'high';
    regulatoryComplexity: 'low' | 'medium' | 'high';
}
export declare const SECTOR_BENCHMARKS: Record<string, SectorBenchmark>;
/** Retourne le benchmark pour un secteur */
export declare function getSectorBenchmark(sector: string): SectorBenchmark | null;
/** Construit le bloc de contexte sectoriel à injecter dans un prompt */
export declare function buildSectorContextBlock(sector: string): string;
//# sourceMappingURL=sector-benchmarks.d.ts.map