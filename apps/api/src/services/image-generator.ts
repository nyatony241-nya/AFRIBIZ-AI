import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GeneratedImages {
  logo: string;
  product: string;
  marketing: string;
}

/**
 * Service de génération d'images avec DALL-E 3
 * Fallback sur des placeholders Unsplash si la clé API n'est pas configurée
 */
export async function generateStudioImages(idea: string, sector: string): Promise<GeneratedImages> {
  const useMock = !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here';

  if (useMock) {
    console.log('[Studio] Mocking images since no OPENAI_API_KEY was found.');
    // Delai artificiel pour simuler la génération (3 secondes)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mots clés pour Unsplash selon le secteur
    const query = encodeURIComponent(sector);
    
    return {
      logo: `https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=1000&auto=format&fit=crop&text=Logo`,
      product: `https://source.unsplash.com/800x600/?product,\${query}`,
      marketing: `https://source.unsplash.com/1200x800/?marketing,\${query}`,
    };
  }

  console.log(`[Studio] Génération d'images via DALL-E 3 pour: \${idea}`);

  try {
    // Exécution en parallèle pour gagner du temps
    const [logoRes, productRes, marketingRes] = await Promise.all([
      openai.images.generate({
        model: "dall-e-3",
        prompt: `A minimalist, professional flat design logo for a modern African business in the \${sector} sector. The business concept is: \${idea}. Vector style, clean white background, vibrant colors.`,
        n: 1,
        size: "1024x1024",
      }),
      openai.images.generate({
        model: "dall-e-3",
        prompt: `A high-quality realistic product photography or service mockup for an African business in the \${sector} sector. The business concept is: \${idea}. Professional lighting, 4k resolution, highly detailed.`,
        n: 1,
        size: "1024x1024",
      }),
      openai.images.generate({
        model: "dall-e-3",
        prompt: `A vibrant and engaging Instagram social media advertisement graphic for an African business in the \${sector} sector. The business concept is: \${idea}. Energetic colors, modern typography style layout, professional marketing appeal.`,
        n: 1,
        size: "1024x1024",
      })
    ]);

    return {
      logo: logoRes.data[0].url || '',
      product: productRes.data[0].url || '',
      marketing: marketingRes.data[0].url || '',
    };
  } catch (error) {
    console.error('[Studio] DALL-E 3 Error:', error);
    throw new Error('Erreur lors de la génération des images avec DALL-E 3');
  }
}
