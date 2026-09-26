import type { ReactNode } from 'react';
interface FreemiumGateProps {
    children: ReactNode;
    isUnlocked: boolean;
    sectionLabel: string;
    ctaText?: string;
    /** 0 à 1 — pourcentage du contenu visible avant le flou */
    previewRatio?: number;
}
export declare function FreemiumGate({ children, isUnlocked, sectionLabel, ctaText, previewRatio, }: FreemiumGateProps): import("react").JSX.Element;
interface UnlockBannerProps {
    projectId: string;
    creditsBalance: number;
}
export declare function UnlockBanner({ projectId, creditsBalance }: UnlockBannerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=FreemiumGate.d.ts.map