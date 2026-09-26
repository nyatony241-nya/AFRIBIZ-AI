import { v4 as uuidv4 } from 'uuid';

/**
 * Service Mock pour l'intégration de Chariow (Paiement Mobile)
 * À remplacer par les vrais appels API (fetch) vers Chariow quand les clés seront disponibles.
 */

// Simule une base de données en mémoire pour le statut des paiements
// En production, utiliser Supabase, PostgreSQL ou Redis.
const paymentDB = new Map<string, { status: 'pending' | 'success' | 'failed', projectId: string }>();

export async function createChariowPaymentIntent(projectId: string, amount: number, currency: string) {
  // 1. Appel HTTP théorique vers l'API Chariow
  // const res = await fetch('https://api.chariow.com/v1/checkout', { ... })
  
  // 2. Simulation de la réponse Chariow
  const transactionId = `chariow_txn_\${uuidv4().substring(0, 8)}`;
  
  // Enregistre l'intention de paiement en base
  paymentDB.set(transactionId, { status: 'pending', projectId });

  return {
    success: true,
    transactionId,
    // URL de paiement simulée. En réalité, Chariow renvoie un checkoutUrl.
    checkoutUrl: `/payment-simulation?txn=\${transactionId}&amount=\${amount}&currency=\${currency}`,
  };
}

export async function handleChariowWebhook(payload: any) {
  // 1. Vérification de la signature du webhook (CRUCIAL en production)
  // const isValid = verifySignature(payload.signature, process.env.CHARIOW_WEBHOOK_SECRET);
  
  const { transactionId, status } = payload;
  
  if (paymentDB.has(transactionId)) {
    const record = paymentDB.get(transactionId)!;
    
    // Si le paiement est réussi via Mobile Money
    if (status === 'SUCCESS') {
      record.status = 'success';
      console.log(`[Webhook] Paiement validé pour le projet \${record.projectId}`);
      // TODO: Mettre à jour Supabase : UPDATE projects SET is_unlocked = true WHERE id = record.projectId
    } else {
      record.status = 'failed';
    }
  }

  return { received: true };
}

export async function checkPaymentStatus(transactionId: string) {
  const record = paymentDB.get(transactionId);
  if (!record) {
    throw new Error('Transaction introuvable');
  }
  return {
    status: record.status,
    projectId: record.projectId
  };
}
