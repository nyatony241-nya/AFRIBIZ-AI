import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { buildFullDossier } from './services/dossier-builder.js';
import { createChariowPaymentIntent, handleChariowWebhook, checkPaymentStatus } from './services/payment.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Limiteur pour la génération IA (ex: 5 requêtes par heure par IP)
const aiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5,
  message: { success: false, error: 'Trop de requêtes générées. Veuillez patienter.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'afribiz-api' });
});

// Applique le rate limiting uniquement sur la génération
app.post('/api/generate/dossier', aiRateLimiter, async (req, res) => {
  try {
    const input = req.body;
    
    // Validation de base
    if (!input.idea && !input.sector) {
      return res.status(400).json({ error: 'idea or sector is required' });
    }

    const dossier = await buildFullDossier(input);
    res.json({ success: true, data: dossier });
  } catch (error) {
    console.error('Error in /api/generate/dossier:', error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Génération des images du Studio Visuel (DALL-E 3)
app.post('/api/generate/images', aiRateLimiter, async (req, res) => {
  try {
    const { idea, sector } = req.body;
    if (!idea || !sector) {
      return res.status(400).json({ error: 'idea and sector are required' });
    }
    
    // Import dynamique pour éviter de ralentir le démarrage
    const { generateStudioImages } = await import('./services/image-generator.js');
    const images = await generateStudioImages(idea, sector);
    
    res.json({ success: true, data: images });
  } catch (error) {
    console.error('Error in /api/generate/images:', error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

// === ROUTES PAIEMENT CHARIOW ===

// Initialisation du paiement
app.post('/api/payment/create', async (req, res) => {
  try {
    const { projectId, amount, currency } = req.body;
    if (!projectId || !amount || !currency) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    const payment = await createChariowPaymentIntent(projectId, amount, currency);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Vérification manuelle du statut (Polling par le frontend)
app.get('/api/payment/status/:txnId', async (req, res) => {
  try {
    const status = await checkPaymentStatus(req.params.txnId);
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(404).json({ success: false, error: String(error) });
  }
});

// Webhook de confirmation (Appelé par les serveurs de Chariow)
app.post('/api/webhooks/chariow', async (req, res) => {
  try {
    const result = await handleChariowWebhook(req.body);
    res.json(result);
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(400).send('Webhook Error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 AfriBiz API running on http://localhost:${PORT}`);
});
