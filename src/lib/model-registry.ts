import registryData from './model-registry-data.json'

export type ModelPlatform =
  | 'openai-completions'
  | 'openai-responses'
  | 'anthropic-messages'
  | 'gemini'

export interface ModelRegistryEntry {
  /** Primary model ID (e.g. "claude-sonnet-4-20250514") */
  id: string
  /** Display name (e.g. "Claude Sonnet 4") */
  name: string
  /** Alternative IDs that map to this model */
  aliases: string[]
  /** Default API platform type */
  platform: ModelPlatform
  /** Context window size in tokens */
  contextWindow: number
  /** Maximum output tokens */
  maxOutputTokens?: number
}

const registry: ModelRegistryEntry[] = registryData as ModelRegistryEntry[]

// Build a lookup map: id/alias -> entry
const lookupMap = new Map<string, ModelRegistryEntry>()
for (const entry of registry) {
  lookupMap.set(entry.id, entry)
  for (const alias of entry.aliases) {
    lookupMap.set(alias, entry)
  }
}

/**
 * Find a model by its ID or any of its aliases.
 * Returns undefined if not found.
 */
export function findModelByIdOrAlias(
  id: string
): ModelRegistryEntry | undefined {
  return lookupMap.get(id)
}

/**
 * Get all registered models, sorted alphabetically by ID.
 */
export function getAllRegistryModels(): ModelRegistryEntry[] {
  return [...registry].sort((a, b) => a.id.localeCompare(b.id))
}
