-- ============================================================
-- AfriBiz Architect — Migration Supabase complète
-- Tarification par crédits (Pay-as-you-go)
-- ============================================================

-- 1. PROFILS UTILISATEURS (avec solde de crédits)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email TEXT NOT NULL,
  avatar_url TEXT,
  locale TEXT NOT NULL DEFAULT 'fr',
  default_currency TEXT NOT NULL DEFAULT 'XOF',
  -- SYSTÈME DE CRÉDITS
  credits_balance INTEGER NOT NULL DEFAULT 1 CHECK (credits_balance >= 0), -- 1 crédit offert à l'inscription
  total_credits_purchased INTEGER NOT NULL DEFAULT 0,
  total_dossiers_generated INTEGER NOT NULL DEFAULT 0,
  -- PRÉFÉRENCES
  demo_mode BOOLEAN NOT NULL DEFAULT false,
  -- TIMESTAMPS
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PROJETS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (
    status IN ('draft', 'generating', 'available', 'partial', 'failed', 'locked')
  ),
  -- Statut freemium : le dossier est "locked" = généré mais flouté
  is_unlocked BOOLEAN NOT NULL DEFAULT false,
  unlock_credit_tx_id UUID, -- référence à la transaction qui a débloqué
  -- Données d'entrée
  input_snapshot JSONB,
  sector TEXT,
  city TEXT,
  country TEXT,
  budget BIGINT,
  currency TEXT DEFAULT 'XOF',
  -- Méta
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. RÉVISIONS DU DOSSIER
CREATE TABLE IF NOT EXISTS public.dossier_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  revision_number INTEGER NOT NULL DEFAULT 1,
  content JSONB NOT NULL, -- AfriBizDossier complet
  generated_by TEXT NOT NULL DEFAULT 'gemini', -- 'gemini' | 'demo'
  is_current BOOLEAN NOT NULL DEFAULT true,
  generation_cost_usd NUMERIC(10, 6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(project_id, revision_number)
);

-- 4. HYPOTHÈSES FINANCIÈRES (éditables par l'utilisateur)
CREATE TABLE IF NOT EXISTS public.financial_assumptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  assumptions JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TÂCHES DU PLAN D'ACTION (cochables)
CREATE TABLE IF NOT EXISTS public.action_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 13),
  position INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  description TEXT,
  estimated_cost BIGINT DEFAULT 0,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('high', 'normal', 'low')),
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. JOBS DE GÉNÉRATION IA (trace de chaque appel)
CREATE TABLE IF NOT EXISTS public.generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  job_type TEXT NOT NULL CHECK (job_type IN ('full_dossier', 'section', 'concept_shortlist', 'visual')),
  section_key TEXT, -- null si full_dossier
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'processing', 'done', 'failed', 'cancelled')
  ),
  error_message TEXT,
  -- Métriques
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_usd NUMERIC(10, 6),
  duration_ms INTEGER,
  -- Résultat
  result_snapshot JSONB,
  -- Timestamps
  queued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- 7. ASSETS VISUELS (logos, visuels marketing)
CREATE TABLE IF NOT EXISTS public.visual_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL CHECK (
    asset_type IN ('logo', 'tiktok', 'instagram_square', 'instagram_story', 'whatsapp', 'facebook', 'billboard')
  ),
  storage_path TEXT NOT NULL, -- chemin dans Supabase Storage
  signed_url TEXT,
  signed_url_expires_at TIMESTAMPTZ,
  width INTEGER,
  height INTEGER,
  format TEXT DEFAULT 'webp',
  generation_prompt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SYSTÈME DE CRÉDITS ET PAIEMENTS
-- ============================================================

-- 8. PACKS DE CRÉDITS (configuration produit)
CREATE TABLE IF NOT EXISTS public.credit_packs (
  id TEXT PRIMARY KEY, -- 'starter', 'explorer', 'builder', 'founder'
  label TEXT NOT NULL,
  description TEXT,
  credits INTEGER NOT NULL CHECK (credits > 0),
  price_fcfa INTEGER NOT NULL CHECK (price_fcfa > 0),
  price_eur NUMERIC(8, 2),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  discount_percent INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Données initiales des packs
INSERT INTO public.credit_packs (id, label, description, credits, price_fcfa, price_eur, is_active, is_featured, discount_percent, position) VALUES
  ('starter',  '🔑 Starter',  'Idéal pour comparer plusieurs concepts (3 dossiers complets)',     3,  2500,   3.80, true, false,  0, 1),
  ('explorer', '⭐ Explorer', 'Pour les porteurs de projet qui pivotent souvent (10 dossiers)',  10,  6000,   9.10, true, true,  28, 2),
  ('builder',  '🚀 Builder',  'Parfait pour tester de multiples marchés (25 dossiers)', 25, 12000,  18.30, true, false, 42, 3),
  ('founder',  '💎 Founder',  'Pour les coachs, incubateurs et entrepreneurs en série (50 dossiers)',   50, 20000,  30.50, true, false, 52, 4)
ON CONFLICT (id) DO NOTHING;

-- 9. TRANSACTIONS DE CRÉDITS (historique complet)
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (
    type IN (
      'signup_bonus',      -- crédit offert à l'inscription
      'purchase',          -- achat d'un pack
      'debit_generation',  -- débit lors d'une génération
      'debit_regeneration',-- débit lors d'une régénération de section
      'refund',            -- remboursement (génération échouée)
      'gift',              -- crédit offert manuellement (admin)
      'promo'              -- code promo
    )
  ),
  amount INTEGER NOT NULL, -- positif = crédit, négatif = débit
  balance_after INTEGER NOT NULL CHECK (balance_after >= 0),
  -- Référence optionnelle
  project_id UUID REFERENCES public.projects(id),
  -- Pour les achats
  pack_id TEXT REFERENCES public.credit_packs(id),
  payment_id TEXT,        -- ID transaction Chariow
  payment_provider TEXT,  -- 'chariow'
  payment_status TEXT,    -- 'pending', 'completed', 'failed', 'refunded'
  payment_method TEXT,    -- 'wave', 'orange_money', 'mtn_momo', 'card'
  amount_paid_fcfa INTEGER,
  -- Description lisible
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. SESSIONS DE PAIEMENT CHARIOW (pending payments)
CREATE TABLE IF NOT EXISTS public.payment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  pack_id TEXT NOT NULL REFERENCES public.credit_packs(id),
  chariow_session_id TEXT UNIQUE,
  chariow_checkout_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'completed', 'failed', 'expired', 'cancelled')
  ),
  amount_fcfa INTEGER NOT NULL,
  credits_to_add INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 minutes'),
  completed_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_dossier_revisions_project ON public.dossier_revisions(project_id) WHERE is_current = true;
CREATE INDEX IF NOT EXISTS idx_action_tasks_project ON public.action_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_project ON public.generation_jobs(project_id);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_status ON public.generation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_sessions_user ON public.payment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_sessions_chariow ON public.payment_sessions(chariow_session_id);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Création automatique du profil à l'inscription + crédit bonus
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, credits_balance)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    1 -- 1 crédit offert
  );
  
  -- Enregistrer la transaction du crédit bonus
  INSERT INTO public.credit_transactions (user_id, type, amount, balance_after, description)
  VALUES (NEW.id, 'signup_bonus', 1, 1, 'Crédit de bienvenue offert à l''inscription');
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dossier_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_assumptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visual_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_packs ENABLE ROW LEVEL SECURITY;

-- Profils : l'utilisateur ne voit et modifie que son propre profil
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Projets : CRUD propre uniquement
CREATE POLICY "projects_select_own" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "projects_insert_own" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "projects_update_own" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "projects_delete_own" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Révisions dossier : lecture seule côté client (écriture uniquement via service_role)
CREATE POLICY "dossier_revisions_select_own" ON public.dossier_revisions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid()));

-- Hypothèses financières
CREATE POLICY "financial_assumptions_crud_own" ON public.financial_assumptions
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid()));

-- Tâches action
CREATE POLICY "action_tasks_crud_own" ON public.action_tasks
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid()));

-- Jobs de génération : lecture seule client
CREATE POLICY "generation_jobs_select_own" ON public.generation_jobs FOR SELECT USING (auth.uid() = user_id);

-- Visuels
CREATE POLICY "visual_assets_select_own" ON public.visual_assets FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.user_id = auth.uid()));

-- Crédits : lecture seule côté client
CREATE POLICY "credit_transactions_select_own" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "payment_sessions_select_own" ON public.payment_sessions FOR SELECT USING (auth.uid() = user_id);

-- Packs : lecture publique
CREATE POLICY "credit_packs_select_all" ON public.credit_packs FOR SELECT USING (true);
