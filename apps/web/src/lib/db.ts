import Dexie, { type Table } from 'dexie'
import { type AfriBizDossier } from '@afribiz/shared'

export interface LocalProject {
  id: string // dossier.projectId
  dossier: AfriBizDossier
  updatedAt: number
  synced: boolean
}

export class AfriBizDatabase extends Dexie {
  projects!: Table<LocalProject, string>

  constructor() {
    super('AfriBizDB')
    // Définition du schéma (seuls les index sont déclarés ici)
    this.version(1).stores({
      projects: 'id, updatedAt, synced'
    })
  }
}

export const db = new AfriBizDatabase()

/**
 * Sauvegarde un dossier généré dans la base locale (IndexedDB)
 */
export async function saveProjectLocally(dossier: AfriBizDossier) {
  try {
    await db.projects.put({
      id: dossier.projectId,
      dossier,
      updatedAt: Date.now(),
      synced: false
    })
    console.log('[DB] Projet sauvegardé localement:', dossier.projectId)
  } catch (error) {
    console.error('[DB] Erreur lors de la sauvegarde locale:', error)
  }
}

/**
 * Récupère un dossier local par son ID
 */
export async function getLocalProject(id: string): Promise<AfriBizDossier | null> {
  try {
    const project = await db.projects.get(id)
    return project?.dossier || null
  } catch (error) {
    console.error('[DB] Erreur lors de la récupération locale:', error)
    return null
  }
}

/**
 * Liste tous les projets locaux (triés par date de mise à jour)
 */
export async function listLocalProjects(): Promise<AfriBizDossier[]> {
  try {
    const projects = await db.projects.orderBy('updatedAt').reverse().toArray()
    return projects.map(p => p.dossier)
  } catch (error) {
    console.error('[DB] Erreur lors du listing des projets:', error)
    return []
  }
}
