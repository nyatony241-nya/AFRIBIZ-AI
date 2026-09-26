"use strict";
/**
 * Benchmarks sectoriels africains — données réelles pour valider et enrichir les sorties IA
 * Injectés dans les prompts et utilisés pour la validation post-génération
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECTOR_BENCHMARKS = void 0;
exports.getSectorBenchmark = getSectorBenchmark;
exports.buildSectorContextBlock = buildSectorContextBlock;
exports.SECTOR_BENCHMARKS = {
    'restauration': {
        label: 'Restauration & food service',
        grossMarginRange: [0.50, 0.68],
        breakEvenMonths: [3, 8],
        avgTicketXOF: [1_000, 8_000],
        staffMin: 1,
        keyRisks: [
            'Coût du gaz GPL en hausse constante',
            'Perte alimentaire (gaspillage matière)',
            'Dépendance fournisseurs informels',
            'Absentéisme du personnel',
            'Saisonnalité (Ramadan, Tabaski modifient les habitudes)',
            'Concurrence du secteur informel très forte',
        ],
        keySuccessFactors: [
            'Localisation à fort passage ou livraison bien organisée',
            'Rapport qualité/prix perçu clairement supérieur',
            'Système de contrôle des stocks rigoureux',
            'Fidélisation via WhatsApp Business et carte de fidélité simple',
        ],
        localNuances: 'Le midi (11h30-14h) représente 60-70% du CA journalier en Afrique de l\'Ouest. La livraison via plateformes (Yango Food, Glovo selon ville) peut multiplier le CA ×1.5. Les formules à prix fixe (ex: 2000 FCFA le plat complet) rassurent la clientèle populaire.',
        typicalCosts: 'Matières premières : 30-35%, Loyer : 10-15%, Main d\'œuvre : 15-20%, Énergie (gaz+élec) : 5-10%, Divers : 5%',
        digitalReadiness: 'medium',
        regulatoryComplexity: 'low',
    },
    'agro-business': {
        label: 'Agro-business & alimentation',
        grossMarginRange: [0.25, 0.55],
        breakEvenMonths: [4, 12],
        avgTicketXOF: [5_000, 200_000],
        staffMin: 1,
        keyRisks: [
            'Pertes post-récolte (30-40% sans infrastructure froide)',
            'Saisonnalité des productions',
            'Dépendance météo et intrants importés',
            'Accès au foncier agricole complexe',
            'Circuit de distribution fragile',
        ],
        keySuccessFactors: [
            'Maîtrise de la chaîne froide ou séchage',
            'Contrats d\'approvisionnement avec groupements',
            'Transformation à valeur ajoutée (éviter le produit brut)',
            'Certification qualité (même informelle) pour la restauration/export',
        ],
        localNuances: 'La transformation (jus, chips, farine, conserves) multiplie la marge ×3 à ×8 par rapport au produit brut. Les paniers de légumes livrés en abonnement hebdomadaire connaissent une forte croissance dans les villes africaines (classe moyenne).',
        typicalCosts: 'Matières premières : 40-55%, Transport : 10-15%, Conditionnement : 5-10%, Stockage/énergie : 5-10%',
        digitalReadiness: 'low',
        regulatoryComplexity: 'medium',
    },
    'fintech-mobile-money': {
        label: 'FinTech & Mobile Money',
        grossMarginRange: [0.60, 0.85],
        breakEvenMonths: [8, 24],
        staffMin: 2,
        keyRisks: [
            'Réglementation BCEAO/banque centrale stricte et évolutive',
            'Agrément obligatoire (long et coûteux)',
            'Confiance utilisateurs difficile à construire',
            'Risque fraude et cybersécurité',
            'Concurrence des opérateurs télécoms (Wave, Orange Money, MTN)',
        ],
        keySuccessFactors: [
            'Niche ultra-spécifique (ne pas concurrencer Wave frontalement)',
            'Partenariat bancaire dès le départ',
            'Conformité réglementaire impeccable',
            'UX mobile irréprochable (connexion 3G, petits écrans)',
        ],
        localNuances: 'Ne PAS viser à remplacer Wave ou Orange Money — impossible. Viser des niches : micro-assurance, crédit scoring, paiement B2B, épargne tontine digitale. L\'interopérabilité est clé depuis les directives BCEAO 2022.',
        typicalCosts: 'Développement tech : 40-60%, Conformité/légal : 10-20%, Marketing acquisition : 20-30%, Infrastructure cloud : 5-10%',
        digitalReadiness: 'high',
        regulatoryComplexity: 'high',
    },
    'ecommerce-logistique': {
        label: 'E-commerce & logistique',
        grossMarginRange: [0.20, 0.45],
        breakEvenMonths: [6, 18],
        staffMin: 2,
        keyRisks: [
            'Coûts de livraison dernier kilomètre très élevés',
            'Taux de retour et fraude élevés (COD non reçu)',
            'Confiance consommateur encore fragile',
            'Gestion des stocks = immobilisation de capital',
            'Concurrence Jumia, Glovo et acteurs informels',
        ],
        keySuccessFactors: [
            'Niche produit précise (ne pas être un généraliste)',
            'Partenariat avec livreurs locaux fiables',
            'Preuve sociale forte (avis WhatsApp, témoignages)',
            'Paiement à la livraison (COD) indispensable + Mobile Money',
        ],
        localNuances: 'Le paiement à la livraison (Cash on Delivery) reste dominant (~70% des commandes en Afrique de l\'Ouest). Instagram et WhatsApp sont les premiers canaux de vente, souvent avant un site web. Les groupes WhatsApp de clients fidèles génèrent plus de ventes qu\'une boutique en ligne classique.',
        typicalCosts: 'Produits/stock : 50-65%, Livraison : 10-20%, Marketing : 10-15%, Plateforme : 3-5%',
        digitalReadiness: 'high',
        regulatoryComplexity: 'low',
    },
    'beaute-bien-etre': {
        label: 'Beauté & bien-être',
        grossMarginRange: [0.55, 0.80],
        breakEvenMonths: [2, 6],
        avgTicketXOF: [3_000, 50_000],
        staffMin: 1,
        keyRisks: [
            'Saisonnalité (fêtes = pic, autres mois = creux)',
            'Fidélisation difficile (clients multi-salons)',
            'Contrefaçon produits cosmétiques',
            'Formation continue des coiffeuses/esthéticiennes',
        ],
        keySuccessFactors: [
            'Instagram + TikTok comme vitrine principale',
            'Réservation WhatsApp efficace',
            'Produits locaux ou africains (tendance forte)',
            'Zone résidentielle aisée ou centre commercial',
        ],
        localNuances: 'La beauté africaine est un secteur en boom exponentiel. Les tresses, soins naturels cheveux afro, produits au karité/coco connaissent une croissance mondiale. Le marché des extensions capillaires et de la perruque est énorme. TikTok est le principal canal d\'acquisition clientèle pour ce secteur.',
        typicalCosts: 'Produits cosmétiques : 25-35%, Loyer : 15-20%, Main d\'œuvre : 20-30%, Marketing digital : 5-10%',
        digitalReadiness: 'high',
        regulatoryComplexity: 'low',
    },
    'education-formation': {
        label: 'Éducation & formation',
        grossMarginRange: [0.55, 0.80],
        breakEvenMonths: [2, 6],
        avgTicketXOF: [15_000, 300_000],
        staffMin: 1,
        keyRisks: [
            'Saisonnalité très marquée (rentrée vs vacances)',
            'Recrutement formateurs qualifiés difficile',
            'Copie des programmes par concurrents',
            'Préférence culturelle pour les diplômes officiels',
        ],
        keySuccessFactors: [
            'Certifications reconnues ou partenariats institutionnels',
            'Résultats mesurables et affichés (taux de placement)',
            'Financement échelonné ou Mobile Money mensuel',
            'Format hybride (présentiel + WhatsApp/Zoom)',
        ],
        localNuances: 'La formation professionnelle courte (1-6 mois) a un fort potentiel car les diplômes universitaires classiques sont perçus comme insuffisants pour l\'emploi. Les certifications tech (développement, marketing digital, comptabilité) ont la cote. Les formations WhatsApp (cours envoyés par messages) ont émergé comme format ultra-accessible.',
        typicalCosts: 'Formateurs : 30-45%, Locaux : 10-20%, Marketing : 10-15%, Matériel pédagogique : 5-10%',
        digitalReadiness: 'high',
        regulatoryComplexity: 'medium',
    },
    'services-b2b': {
        label: 'Services B2B professionnels',
        grossMarginRange: [0.50, 0.85],
        breakEvenMonths: [1, 4],
        staffMin: 1,
        keyRisks: [
            'Délais de paiement des entreprises très longs (30-90j)',
            'Dépendance à 1-2 gros clients',
            'Réseautage = condition de survie',
            'Sous-évaluation des prestations par les clients',
        ],
        keySuccessFactors: [
            'Spécialisation sectorielle forte (ne pas être généraliste)',
            'Portfolio de réalisations dès le départ',
            'Facturation ferme avec acompte (30-50%)',
            'Réseau professionnel comme canal d\'acquisition principal',
        ],
        localNuances: 'En Afrique, le B2B fonctionne énormément par recommandation directe. LinkedIn est peu utilisé, contrairement à WhatsApp professionnel. Les entreprises formelles paient mieux mais plus lentement. Les ONG et bailleurs internationaux ont des budgets élevés mais des processus longs.',
        typicalCosts: 'Salaires : 50-65%, Bureaux (si nécessaires) : 10-15%, Prospection/déplacements : 10-15%, Outils : 5%',
        digitalReadiness: 'medium',
        regulatoryComplexity: 'low',
    },
    'artisanat-mode': {
        label: 'Artisanat & mode africaine',
        grossMarginRange: [0.55, 0.80],
        breakEvenMonths: [3, 9],
        avgTicketXOF: [10_000, 150_000],
        staffMin: 1,
        keyRisks: [
            'Temps de production élevé = capacité limitée',
            'Accès aux matières premières locales de qualité',
            'Copie et contrefaçon des designs',
            'Export compliqué sans intermédiaires',
        ],
        keySuccessFactors: [
            'Identité visuelle forte et cohérente',
            'Instagram/Pinterest comme catalogue vivant',
            'Made in Africa = différenciateur premium',
            'Collaboration avec designers internationaux pour export',
        ],
        localNuances: 'Le wax, le bogolan, le batik, le raphia ont une valeur culturelle et internationale croissante. La diaspora africaine en Europe/Amérique est un marché premium à fort pouvoir d\'achat pour la mode africaine authentique. TikTok et Instagram permettent une exposition globale sans budget.',
        typicalCosts: 'Matières premières : 25-40%, Main d\'œuvre artisanale : 20-35%, Marketing digital : 10-15%, Logistique : 5-10%',
        digitalReadiness: 'medium',
        regulatoryComplexity: 'low',
    },
    'sante': {
        label: 'Santé',
        grossMarginRange: [0.40, 0.70],
        breakEvenMonths: [6, 18],
        staffMin: 2,
        keyRisks: [
            'Agrément ministère de la Santé obligatoire',
            'Recrutement personnel qualifié difficile et coûteux',
            'Responsabilité légale importante',
            'Médicaments : circuit règlementé strict',
        ],
        keySuccessFactors: [
            'Conformité réglementaire impeccable dès le départ',
            'Partenariat avec assurances maladies locales',
            'Équipements de base fiables (électricité de secours)',
            'Confiance communautaire = temps long à construire',
        ],
        localNuances: 'La santé reste un secteur sensible mais sous-équipé en Afrique subsaharienne. Les cliniques privées, pharmacies et télémédecine ont un potentiel immense. La médecine préventive (dépistage, vaccination) est une niche sous-exploitée. WhatsApp Doctor (consultation payante via message) émerge.',
        typicalCosts: 'Personnel médical : 40-55%, Équipements/consommables : 20-30%, Loyer : 10-15%, Assurances : 5%',
        digitalReadiness: 'low',
        regulatoryComplexity: 'high',
    },
    'immobilier': {
        label: 'Immobilier',
        grossMarginRange: [0.15, 0.40],
        breakEvenMonths: [3, 12],
        staffMin: 1,
        keyRisks: [
            'Capital initial très élevé pour l\'achat',
            'Litiges fonciers courants dans certains pays',
            'Marché informel dominant = opacité des prix',
            'Dépendance taux d\'intérêt et accès crédit clientèle',
        ],
        keySuccessFactors: [
            'Expertise juridique locale indispensable',
            'Réseau de propriétaires et promoteurs',
            'Spécialisation géographique ou type de bien',
            'Service complet (location + gestion + rénovation)',
        ],
        localNuances: 'L\'agence immobilière en Afrique peut se lancer avec très peu de capital (simple intermédiaire). La gestion locative est un service à forte valeur récurrente. Les villes africaines connaissent un fort déficit de logements → demande structurelle.',
        typicalCosts: 'Marketing/annonces : 20-30%, Déplacements : 15-20%, Bureaux (si) : 10-15%, Juridique : 10%',
        digitalReadiness: 'medium',
        regulatoryComplexity: 'medium',
    },
    'tourisme': {
        label: 'Tourisme',
        grossMarginRange: [0.30, 0.60],
        breakEvenMonths: [4, 12],
        staffMin: 1,
        keyRisks: [
            'Forte saisonnalité',
            'Dépendance au contexte sécuritaire régional',
            'Concurrence agences internationales',
            'Impact crises sanitaires (COVID, etc.)',
        ],
        keySuccessFactors: [
            'Niche ciblée : tourisme local, afro-tourisme diaspora, écotourisme',
            'Présence Google Maps + TripAdvisor indispensable',
            'Partenariats hôtels + transport locaux',
            'Instagram pour la découvrabilité',
        ],
        localNuances: 'L\'afro-tourisme (diaspora africaine qui "retourne aux sources") est un segment premium en forte croissance. Le tourisme intérieur africain (Africains qui voyagent en Afrique) est sous-estimé et en boom. Les circuits authentiques, loin du tourisme de masse, ont une forte demande.',
        typicalCosts: 'Partenaires hébergement/transport : 40-60%, Marketing : 15-25%, Personnel guide : 15%, Assurances : 5%',
        digitalReadiness: 'medium',
        regulatoryComplexity: 'low',
    },
    'tech-digital': {
        label: 'Tech & services digitaux',
        grossMarginRange: [0.60, 0.90],
        breakEvenMonths: [2, 8],
        staffMin: 1,
        keyRisks: [
            'Concurrence internationale directe (freelances Upwork)',
            'Sous-évaluation des prestations tech par les clients locaux',
            'Turnover développeurs élevé (demande internationale forte)',
            'Dépendance aux outils et APIs tiers',
        ],
        keySuccessFactors: [
            'Spécialisation sectorielle (fintech, agritech, edtech) plutôt que généraliste',
            'Portfolio visible et crédible (GitHub, site)',
            'Clients internationaux = marges ×3 à ×10 vs marché local',
            'Formation et montée en compétences continue',
        ],
        localNuances: 'Le développement logiciel en Afrique est en boom mais sous-valorisé localement. Les agences tech africaines travaillent de plus en plus pour des clients européens et américains (tarifs ×3-5 plus élevés). Le "Build in Africa, Sell to the World" est une stratégie gagnante.',
        typicalCosts: 'Salaires développeurs : 50-70%, Abonnements outils : 10-15%, Marketing : 10-15%, Formation : 5%',
        digitalReadiness: 'high',
        regulatoryComplexity: 'low',
    },
    'autre': {
        label: 'Autre secteur',
        grossMarginRange: [0.30, 0.60],
        breakEvenMonths: [3, 12],
        staffMin: 1,
        keyRisks: ['Variable selon le secteur', 'Manque de données sectorielles spécifiques'],
        keySuccessFactors: ['Validation terrain impérative', 'Étude de marché locale recommandée'],
        localNuances: 'Secteur non-standard. L\'analyse sera basée sur les principes généraux du marché local.',
        typicalCosts: 'Variable selon nature du business',
        digitalReadiness: 'medium',
        regulatoryComplexity: 'medium',
    },
};
/** Retourne le benchmark pour un secteur */
function getSectorBenchmark(sector) {
    return exports.SECTOR_BENCHMARKS[sector] ?? exports.SECTOR_BENCHMARKS['autre'] ?? null;
}
/** Construit le bloc de contexte sectoriel à injecter dans un prompt */
function buildSectorContextBlock(sector) {
    const bench = getSectorBenchmark(sector);
    if (!bench)
        return '';
    return `
BENCHMARKS SECTEUR — ${bench.label}
${'━'.repeat(50)}
• Marge brute typique : ${Math.round(bench.grossMarginRange[0] * 100)}% – ${Math.round(bench.grossMarginRange[1] * 100)}%
• Seuil de rentabilité attendu : ${bench.breakEvenMonths[0]} à ${bench.breakEvenMonths[1]} mois
• Ticket moyen (si applicable) : ${bench.avgTicketXOF ? `${bench.avgTicketXOF[0].toLocaleString('fr-FR')} – ${bench.avgTicketXOF[1].toLocaleString('fr-FR')} FCFA` : 'variable'}
• Personnel minimum pour démarrer : ${bench.staffMin} personne(s)
• Principaux postes de coûts : ${bench.typicalCosts}
• Maturité digitale du secteur : ${bench.digitalReadiness === 'high' ? 'Élevée' : bench.digitalReadiness === 'medium' ? 'Moyenne' : 'Faible'}
• Complexité réglementaire : ${bench.regulatoryComplexity === 'high' ? 'Élevée' : bench.regulatoryComplexity === 'medium' ? 'Moyenne' : 'Faible'}
• Risques clés : ${bench.keyRisks.join(' | ')}
• Facteurs de succès : ${bench.keySuccessFactors.join(' | ')}
• Nuances locales africaines : ${bench.localNuances}
`.trim();
}
//# sourceMappingURL=sector-benchmarks.js.map