import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { getOpportunityPrompt } from '../prompts/opportunity.js';
import { getBrandingPrompt } from '../prompts/branding.js';
import { getMarketingPrompt } from '../prompts/marketing.js';
import { getLocationPrompt } from '../prompts/location.js';
import { getFinancePrompt } from '../prompts/finance-hypotheses.js';
import { getBusinessPlanPrompt } from '../prompts/business-plan.js';
import { ProjectInput } from '@afribiz/shared';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// --- SCHEMAS GEMINI ---
const opportunitySchema = {
  type: SchemaType.OBJECT,
  properties: {
    recommendedIdea: { type: SchemaType.STRING },
    justification: { type: SchemaType.STRING },
    rankings: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          idea: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          estimatedProfitability: { type: SchemaType.STRING },
          startupSpeed: { type: SchemaType.STRING },
          risk: { type: SchemaType.STRING },
          score: { type: SchemaType.NUMBER },
          scoreExplanation: { type: SchemaType.STRING },
          confidenceLevel: { type: SchemaType.STRING },
        },
      }
    }
  },
};

const brandingSchema = {
  type: SchemaType.OBJECT,
  properties: {
    recommendedName: { type: SchemaType.STRING },
    tagline: { type: SchemaType.STRING },
    options: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          meaning: { type: SchemaType.STRING },
          positioning: { type: SchemaType.STRING },
        }
      }
    },
    logoPrompt: { type: SchemaType.STRING },
    palette: {
      type: SchemaType.OBJECT,
      properties: {
        primary: { type: SchemaType.STRING },
        secondary: { type: SchemaType.STRING },
        accent: { type: SchemaType.STRING },
        background: { type: SchemaType.STRING },
        usageGuide: { type: SchemaType.STRING },
      }
    }
  }
};

const marketingFormatSchema = {
  type: SchemaType.OBJECT,
  properties: {
    aiPrompt: { type: SchemaType.STRING },
    description: { type: SchemaType.STRING },
    caption: { type: SchemaType.STRING },
    cta: { type: SchemaType.STRING },
    visualStyle: { type: SchemaType.STRING },
    aspectRatio: { type: SchemaType.STRING },
    styleVariations: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          label: { type: SchemaType.STRING },
          aiPrompt: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
        }
      }
    }
  }
};

const marketingSchema = {
  type: SchemaType.OBJECT,
  properties: {
    tiktok: marketingFormatSchema,
    instagramFeed: marketingFormatSchema,
    instagramStory: marketingFormatSchema,
    whatsappFlyer: marketingFormatSchema,
    facebook: marketingFormatSchema,
    billboard: marketingFormatSchema,
  }
};

const locationSchema = {
  type: SchemaType.OBJECT,
  properties: {
    bestZone: { type: SchemaType.STRING },
    strategicValue: { type: SchemaType.STRING },
    customerBehavior: { type: SchemaType.STRING },
    lowBudgetAlternative: { type: SchemaType.STRING },
    channelRecommendation: { type: SchemaType.STRING },
    otherZones: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          strategicValue: { type: SchemaType.STRING },
          customerBehavior: { type: SchemaType.STRING },
          pros: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          cons: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          estimatedRent: { type: SchemaType.STRING },
        }
      }
    },
    evidenceIds: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    terrainValidations: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
  }
};

const financeSchema = {
  type: SchemaType.OBJECT,
  properties: {
    unitPrice: { type: SchemaType.NUMBER },
    monthlyVolume: { type: SchemaType.NUMBER },
    activeDaysPerMonth: { type: SchemaType.NUMBER },
    unitVariableCost: { type: SchemaType.NUMBER },
    deliveryCostPerUnit: { type: SchemaType.NUMBER },
    paymentFeeRate: { type: SchemaType.NUMBER },
    monthlyRent: { type: SchemaType.NUMBER },
    monthlyLabor: { type: SchemaType.NUMBER },
    monthlyUtilities: { type: SchemaType.NUMBER },
    monthlyMarketing: { type: SchemaType.NUMBER },
    otherMonthlyFixed: { type: SchemaType.NUMBER },
    equipmentCost: { type: SchemaType.NUMBER },
    initialStock: { type: SchemaType.NUMBER },
    launchExpenses: { type: SchemaType.NUMBER },
    cashReserve: { type: SchemaType.NUMBER },
  }
};

const businessPlanSchema = {
  type: SchemaType.OBJECT,
  properties: {
    executiveSummary: { type: SchemaType.STRING },
    problemSolution: { type: SchemaType.STRING },
    targetMarket: { type: SchemaType.STRING },
    businessModel: { type: SchemaType.STRING },
    pricing: { type: SchemaType.STRING },
    operations: { type: SchemaType.STRING },
    breakEvenEstimation: { type: SchemaType.STRING },
    risksMitigation: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          risk: { type: SchemaType.STRING },
          mitigation: { type: SchemaType.STRING },
          severity: { type: SchemaType.STRING },
        }
      }
    },
    actionPlan90Days: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          phase: { type: SchemaType.STRING },
          title: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          priority: { type: SchemaType.STRING },
          estimatedCost: { type: SchemaType.NUMBER },
          successCriteria: { type: SchemaType.STRING },
          dependencies: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        }
      }
    }
  }
};

// --- HELPER DE GENERATION ---
async function generate(prompt: string, schema: any, modelName = 'gemini-2.5-flash') {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY missing');
  
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.4,
      responseMimeType: 'application/json',
      responseSchema: schema,
    }
  });

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Gemini generation error:', err);
    throw err;
  }
}

// --- FONCTIONS EXPORTEES ---
export async function generateOpportunity(params: any) {
  return generate(getOpportunityPrompt(params), opportunitySchema);
}

export async function generateBranding(params: ProjectInput) {
  return generate(getBrandingPrompt(params), brandingSchema);
}

export async function generateMarketing(params: ProjectInput, brandName: string) {
  return generate(getMarketingPrompt(params, brandName), marketingSchema);
}

export async function generateLocation(params: ProjectInput) {
  return generate(getLocationPrompt(params), locationSchema);
}

export async function generateFinanceHypotheses(params: ProjectInput) {
  return generate(getFinancePrompt(params), financeSchema);
}

export async function generateBusinessPlan(params: ProjectInput, brandName: string) {
  return generate(getBusinessPlanPrompt(params, brandName), businessPlanSchema);
}
