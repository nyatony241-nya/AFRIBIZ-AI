"use strict";
/**
 * Données de contexte marché africain — injectées dans les prompts IA
 * Sources : Banque Mondiale, OHADA, banques centrales BCEAO/BEAC, terrain
 * Mise à jour : 2026
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MARKET_CONTEXTS = void 0;
exports.getMarketContext = getMarketContext;
exports.buildMarketContextBlock = buildMarketContextBlock;
exports.MARKET_CONTEXTS = {
    SN: {
        default: {
            country: 'Sénégal',
            currency: 'XOF',
            eurRate: 655,
            usdRate: 605,
            minWage: 100_000,
            informalDailyWage: 3_000,
            dominantPayments: ['Wave (dominant, ~60% transactions mobiles)', 'Orange Money (~25%)', 'Espèces', 'Carte bancaire (classe aisée)'],
            logistics: 'Trafic dense à Dakar. Motos Jakarta pour dernier kilomètre. DHL/UPS présents. Routes inter-villes correctes. Mbour/Thiès accessibles en 1h.',
            regulation: 'OHADA. Immatriculation RCCM + NINEA obligatoires. Impôt synthétique pour petites structures (<= 50M FCFA CA).',
            regCost: 15_000,
            regDays: '3 à 5 jours ouvrés',
            internetPenetration: '65% smartphones, 45% internet fixe, 4G large couverture Dakar/Saint-Louis/Thiès',
            mobileMoneyUsage: 'Wave leader absolu. Orange Money solide. MTN absent au Sénégal.',
            keyChallenge: 'Pouvoir d\'achat limité de la classe moyenne. Saisonnalité marquée (Tabaski, Tamkharit). Accès au financement difficile pour PME.',
            opportunities: 'Classe moyenne jeune en expansion. Forte diaspora (transferts >2 500 Mds FCFA/an). E-commerce naissant. Agritech et logistique urbaine sous-développés.',
            rentRange: { min: 60_000, max: 700_000, unit: 'FCFA/mois selon zone et surface' },
            zones: {
                'Plateau': { name: 'Plateau (Centre d\'affaires)', profile: 'Bureaux, administrations, restaurants premium. Loyer élevé. Trafic international.', avgRent: 400_000 },
                'Médina': { name: 'Médina', profile: 'Commerce populaire dense. Fort achalandage. Clientèle locale massive.', avgRent: 120_000 },
                'Almadies': { name: 'Almadies / Ngor', profile: 'Classe aisée, expatriés. Pouvoir d\'achat élevé. Moins de volume, marges plus fortes.', avgRent: 500_000 },
                'Pikine': { name: 'Pikine / Guédiawaye', profile: 'Banlieue populaire. Volume massif. Prix compétitifs obligatoires.', avgRent: 70_000 },
                'Yoff': { name: 'Yoff / Grand-Yoff', profile: 'Résidentiel mixte. Restauration, services. Bonne croissance.', avgRent: 150_000 },
                'Parcelles': { name: 'Parcelles Assainies', profile: 'Zone résidentielle populaire. Fort potentiel B2C.', avgRent: 90_000 },
            }
        }
    },
    CI: {
        default: {
            country: 'Côte d\'Ivoire',
            currency: 'XOF',
            eurRate: 655,
            usdRate: 605,
            minWage: 75_000,
            informalDailyWage: 4_000,
            dominantPayments: ['Orange Money (leader, >50%)', 'MTN MoMo (~30%)', 'Wave (en croissance)', 'Espèces', 'Carte Visa'],
            logistics: 'Abidjan : trafic très difficile, axes saturés. Bateaux-bus (Lagune). Motos interdites en centre-ville. Livraison via motos en banlieue.',
            regulation: 'OHADA. CEPICI (Centre de Promotion des Investissements). Délai réduit, guichet unique opérationnel.',
            regCost: 25_000,
            regDays: '1 à 3 jours (CEPICI)',
            internetPenetration: '70% smartphones. Forte pénétration 4G Abidjan/Bouaké.',
            mobileMoneyUsage: 'Orange Money dominant. MTN solide. Wave en forte croissance depuis 2024.',
            keyChallenge: 'Embouteillages d\'Abidjan = coûts logistiques élevés. Marché très concurrentiel. Accès terrain coûteux.',
            opportunities: 'PIB le plus fort de l\'Afrique de l\'Ouest francophone. Classe moyenne en forte expansion. Diaspora active. Hub régional.',
            rentRange: { min: 100_000, max: 1_500_000, unit: 'XOF/mois selon commune et surface' },
            zones: {
                'Plateau': { name: 'Plateau (CBD)', profile: 'Centre d\'affaires, banques, multinationales. Loyer très élevé. B2B privilégié.', avgRent: 800_000 },
                'Cocody': { name: 'Cocody / Riviera', profile: 'Résidentiel aisé, ambassades. Restaurants premium, services haut de gamme.', avgRent: 600_000 },
                'Yopougon': { name: 'Yopougon', profile: 'Commune la plus peuplée d\'Abidjan (~4M hab). Commerce populaire massif.', avgRent: 120_000 },
                'Adjamé': { name: 'Adjamé / Abobo', profile: 'Marché central d\'Abidjan. Volume maximal. Prix très bas, marges faibles.', avgRent: 150_000 },
                'Marcory': { name: 'Marcory / Treichville', profile: 'Commerce mixte. Tissu industriel. Bonne accessibilité.', avgRent: 200_000 },
            }
        }
    },
    CM: {
        default: {
            country: 'Cameroun',
            currency: 'XAF',
            eurRate: 655,
            usdRate: 605,
            minWage: 62_000,
            informalDailyWage: 3_500,
            dominantPayments: ['Orange Money (~55%)', 'MTN MoMo (~40%)', 'Express Union', 'Espèces'],
            logistics: 'Routes variables. Douala port principal, hub régional CEMAC. Yaoundé administratif. Axes Douala-Yaoundé (250km) bien desservis.',
            regulation: 'OHADA. Centre de Formalités (CFCE). Bilinguisme officiel (français/anglais). Fiscalité complexe.',
            regCost: 50_000,
            regDays: '3 à 7 jours',
            internetPenetration: '60% smartphones. 4G en extension dans les grandes villes.',
            mobileMoneyUsage: 'Orange Money et MTN MoMo à parité. Express Union pour transferts informels.',
            keyChallenge: 'Bureaucratie importante. Coupures d\'électricité. Corruption perçue élevée. Marché anglophone/francophone à gérer.',
            opportunities: 'Hub CEMAC. Ressources naturelles. Classe moyenne Douala/Yaoundé stable. Agritech forte opportunité.',
            rentRange: { min: 50_000, max: 500_000, unit: 'XAF/mois' },
            zones: {
                'Akwa': { name: 'Akwa (Douala CBD)', profile: 'Centre d\'affaires de Douala. Banques, commerce formel.', avgRent: 300_000 },
                'Bonanjo': { name: 'Bonanjo', profile: 'Administrations, ambassades. B2B et services professionnels.', avgRent: 400_000 },
                'Bonabéri': { name: 'Bonabéri', profile: 'Zone industrielle et commerciale. Logistique et gros volumes.', avgRent: 100_000 },
                'Bastos': { name: 'Bastos (Yaoundé)', profile: 'Zone aisée de Yaoundé. Expatriés, diplomates. Services premium.', avgRent: 350_000 },
            }
        }
    },
    NG: {
        default: {
            country: 'Nigéria',
            currency: 'NGN',
            eurRate: 1_700,
            usdRate: 1_570,
            minWage: 70_000,
            informalDailyWage: 3_500,
            dominantPayments: ['Opay', 'Palmpay', 'GTBank', 'Virement bancaire instantané (NIP)', 'Espèces'],
            logistics: 'Lagos : embouteillages extrêmes. Okada (motos) partiellement interdites. Danfo et BRT. Logistique complexe mais en amélioration.',
            regulation: 'CAC (Corporate Affairs Commission). Naira volatile. Contrôle des changes variable.',
            regCost: 25_000,
            regDays: '2 à 5 jours (en ligne)',
            internetPenetration: '55% smartphones. 4G Lagos/Abuja/PH. Marché digital le plus actif d\'Afrique.',
            mobileMoneyUsage: 'Opay et Palmpay ont révolutionné le marché. Moins de Mobile Money USSD, plus d\'apps.',
            keyChallenge: 'Inflation élevée. Dévaluation Naira. Insécurité électrique (groupes électrogènes obligatoires). Marché complexe mais immense.',
            opportunities: 'Économie n°1 Afrique. 220M habitants. Classe moyenne tech-savvy. FinTech la plus avancée du continent.',
            rentRange: { min: 500_000, max: 5_000_000, unit: 'NGN/mois' },
        }
    },
    KE: {
        default: {
            country: 'Kenya',
            currency: 'KES',
            eurRate: 145,
            usdRate: 134,
            minWage: 15_000,
            informalDailyWage: 600,
            dominantPayments: ['M-Pesa (dominant absolu, ~90% transactions)', 'Airtel Money', 'Carte Visa', 'Espèces'],
            logistics: 'Nairobi : trafic dense. SGR (train Nairobi-Mombasa). Port Mombasa = hub est-africain. Boda-bodas pour dernier kilomètre.',
            regulation: 'Companies Act. Registrar of Companies. Procédure digitalisée (eCitizen).',
            regCost: 10_000,
            regDays: '1 à 2 jours (en ligne)',
            internetPenetration: '75% smartphones. 4G large couverture. Hub tech est-africain (Silicon Savannah).',
            mobileMoneyUsage: 'M-Pesa = pionnier mondial du mobile money. Utilisé par quasi 100% de la population adulte.',
            keyChallenge: 'Concurrence intense dans la tech. Shilling volatile. Inégalités Nairobi/campagne importantes.',
            opportunities: 'Hub est-africain. Diaspora forte. AgriTech en plein essor. FinTech mature. Tourisme.',
            rentRange: { min: 30_000, max: 500_000, unit: 'KES/mois' },
        }
    },
    GH: {
        default: {
            country: 'Ghana',
            currency: 'GHS',
            eurRate: 17,
            usdRate: 15.5,
            minWage: 1_800,
            informalDailyWage: 60,
            dominantPayments: ['MTN Mobile Money (~60%)', 'Vodafone Cash', 'AirtelTigo Money', 'Carte Visa', 'Espèces'],
            logistics: 'Accra : trafic dense. Port de Tema. Tro-tros pour transport local. Réseau routier correct.',
            regulation: 'Companies Act 2019. Registrar General\'s Department. Procédure relativement rapide.',
            regCost: 500,
            regDays: '3 à 5 jours',
            internetPenetration: '70% smartphones. 4G bonne couverture Accra/Kumasi.',
            mobileMoneyUsage: 'MTN MoMo dominant. Interopérabilité avancée entre opérateurs (depuis 2018).',
            keyChallenge: 'Dépréciation Cedi. Inflation. Coûts imports élevés.',
            opportunities: 'Pays stable politiquement. Hub Afrique de l\'Ouest anglophone. Secteur cacao/agri. Classe moyenne éduquée.',
            rentRange: { min: 2_000, max: 20_000, unit: 'GHS/mois' },
        }
    },
    MA: {
        default: {
            country: 'Maroc',
            currency: 'MAD',
            eurRate: 10.9,
            usdRate: 10.1,
            minWage: 3_000,
            informalDailyWage: 120,
            dominantPayments: ['Carte bancaire (taux de bancarisation élevé)', 'Virement', 'Cash', 'CMI', 'PayDunya naissant'],
            logistics: 'Infrastructure moderne. Autoroutes. Port Tanger Med (n°1 Afrique et Méditerranée). TGV Casablanca-Rabat.',
            regulation: 'Tribunal de commerce. RC. CRI (Centre Régional d\'Investissement). Auto-entrepreneur depuis 2015.',
            regCost: 1_000,
            regDays: '24h à 48h (CRI)',
            internetPenetration: '85% smartphones. 4G/5G large couverture. E-commerce en forte croissance.',
            mobileMoneyUsage: 'Moins développé que l\'Afrique subsaharienne. Bancarisation élevée. Maroc Telecommerce en développement.',
            keyChallenge: 'Marché mature = concurrence établie. Barrières à l\'entrée plus hautes. Formalisme administratif.',
            opportunities: 'Hub Europe-Afrique. Tourisme. Offshoring. Immobilier. Agroalimentaire export. Classe moyenne solide.',
            rentRange: { min: 3_000, max: 30_000, unit: 'MAD/mois' },
        }
    },
    BJ: {
        default: {
            country: 'Bénin',
            currency: 'XOF',
            eurRate: 655,
            usdRate: 605,
            minWage: 52_000,
            informalDailyWage: 2_500,
            dominantPayments: ['MTN Mobile Money (~60%)', 'Moov Money (~30%)', 'Espèces'],
            logistics: 'Port autonome de Cotonou (hub régional pour Niger, Burkina). Zemidjan (motos-taxis) = transport de masse.',
            regulation: 'OHADA. Agence de Promotion des Investissements (APIEx). Guichet unique.',
            regCost: 10_000,
            regDays: '3 à 5 jours',
            internetPenetration: '55% smartphones. 4G Cotonou. Réseau 3G en extension.',
            mobileMoneyUsage: 'MTN dominant. Moov solide. Wave en phase de lancement.',
            keyChallenge: 'Marché plus petit. Revenus plus faibles. Infrastructure électrique fragile.',
            opportunities: 'Hub transit sous-régional. Porte d\'entrée vers Niger/Burkina. Réformes business-friendly depuis 2016.',
            rentRange: { min: 40_000, max: 300_000, unit: 'XOF/mois' },
        }
    },
    TG: {
        default: {
            country: 'Togo',
            currency: 'XOF',
            eurRate: 655,
            usdRate: 605,
            minWage: 61_000,
            informalDailyWage: 2_500,
            dominantPayments: ['Flooz (Moov, dominant)', 'T-Money (Togocel)', 'Espèces'],
            logistics: 'Port de Lomé (seul port en eaux profondes de la région). Hub régional. Motos-taxis.',
            regulation: 'OHADA. API-Togo. Réformes en cours pour améliorer le climat des affaires.',
            regCost: 15_000,
            regDays: '48h à 72h',
            internetPenetration: '50% smartphones. 4G à Lomé.',
            mobileMoneyUsage: 'Flooz (Moov Money) dominant. T-Money en 2ème position.',
            keyChallenge: 'Marché de 8M habitants. Tensions politiques historiques. Accès financement difficile.',
            opportunities: 'Port de Lomé = avantage logistique. Hub financement UEMOA naissant. Zone franche.',
            rentRange: { min: 40_000, max: 250_000, unit: 'XOF/mois' },
        }
    },
    CD: {
        default: {
            country: 'RD Congo',
            currency: 'CDF',
            eurRate: 3_000,
            usdRate: 2_780,
            minWage: 400_000,
            informalDailyWage: 10_000,
            dominantPayments: ['M-Pesa (Vodacom)', 'Orange Money', 'Airtel Money', 'USD cash (très courant)'],
            logistics: 'Kinshasa : 17M+ habitants. Embouteillages massifs. Transport fluvial (Congo). Infrastructure routière déficiente hors capitale.',
            regulation: 'OHADA. ANAPI. Procédures complexes. Environnement des affaires difficile mais en amélioration.',
            regCost: 200_000,
            regDays: '7 à 15 jours',
            internetPenetration: '45% smartphones. 4G Kinshasa/Lubumbashi.',
            mobileMoneyUsage: 'M-Pesa Vodacom pionnier. Marché en forte croissance. USD utilisé en parallèle.',
            keyChallenge: 'Instabilité. Dollar biface. Infrastructure. Corruption. Mais marché immense.',
            opportunities: '100M+ habitants, marché le plus grand d\'Afrique centrale. Ressources minières. Secteur informel massif à structurer.',
            rentRange: { min: 200_000, max: 2_000_000, unit: 'CDF/mois' },
        }
    },
    GA: {
        default: {
            country: 'Gabon',
            currency: 'XAF',
            eurRate: 655,
            usdRate: 605,
            minWage: 150_000,
            informalDailyWage: 6_000,
            dominantPayments: ['Airtel Money', 'Moov Money', 'Carte bancaire (taux bancarisation ~40%)', 'Espèces'],
            logistics: 'Libreville : ville côtière compacte. Port d\'Owendo. Réseau routier correct en ville.',
            regulation: 'OHADA. ANPI-Gabon. Transition politique 2023 en cours.',
            regCost: 40_000,
            regDays: '5 à 10 jours',
            internetPenetration: '70% smartphones. 4G bonne couverture Libreville.',
            mobileMoneyUsage: 'Airtel Money et Moov Money. Taux de bancarisation plus élevé que la moyenne subsaharienne.',
            keyChallenge: 'Population faible (~2.3M). Économie dépendante du pétrole. Transition politique post-coup 2023.',
            opportunities: 'Revenu par tête le plus élevé d\'Afrique centrale. Classe moyenne importante. Secteur forêt/bois. Tourisme écologique.',
            rentRange: { min: 100_000, max: 600_000, unit: 'XAF/mois' },
        }
    },
};
/** Retourne le contexte marché pour un pays et une ville donnés */
function getMarketContext(countryCode, city) {
    const countryData = exports.MARKET_CONTEXTS[countryCode];
    if (!countryData)
        return null;
    // Cherche d'abord une entrée spécifique à la ville, sinon utilise 'default'
    return countryData[city.toLowerCase()] ?? countryData['default'] ?? null;
}
/** Construit le bloc de contexte marché à injecter dans un prompt */
function buildMarketContextBlock(countryCode, city, zone) {
    const ctx = getMarketContext(countryCode, city);
    if (!ctx)
        return '';
    const zoneInfo = zone && ctx.zones?.[zone]
        ? `\n• Zone visée : ${zoneInfo?.name} — ${ctx.zones[zone].profile}`
        : '';
    return `
CONTEXTE MARCHÉ — ${city}, ${ctx.country}
${'━'.repeat(50)}
• Devise : ${ctx.currency} (1 EUR ≈ ${ctx.eurRate.toLocaleString('fr-FR')} ${ctx.currency})
• Salaire minimum légal : ${ctx.minWage.toLocaleString('fr-FR')} ${ctx.currency}/mois
• Salaire journalier informel : ~${ctx.informalDailyWage.toLocaleString('fr-FR')} ${ctx.currency}/jour
• Paiements dominants : ${ctx.dominantPayments.join(', ')}
• Loyer commercial : ${ctx.rentRange?.min.toLocaleString('fr-FR')} – ${ctx.rentRange?.max.toLocaleString('fr-FR')} ${ctx.currency}/${ctx.rentRange?.unit.split('/')[1] ?? 'mois'} selon zone${zoneInfo}
• Logistique : ${ctx.logistics}
• Réglementation : ${ctx.regulation} | Coût RCCM/équivalent : ~${ctx.regCost.toLocaleString('fr-FR')} ${ctx.currency} | Délai : ${ctx.regDays}
• Internet & Mobile : ${ctx.internetPenetration} | Mobile Money : ${ctx.mobileMoneyUsage}
• Défis clés : ${ctx.keyChallenge}
• Opportunités : ${ctx.opportunities}
`.trim();
}
//# sourceMappingURL=market-context.js.map