import crypto from 'crypto'
import { pipeline, redis } from '@/lib/store'

export interface Lead {
  id: string
  createdAt: string
  name: string
  phone: string
  email: string
  company: string
  service: string
  message: string
  status: 'new' | 'done'
  emailSent: boolean
}

const DATA_KEY = 'leads'
const INDEX_KEY = 'leads:index'

export async function saveLead(input: Omit<Lead, 'id' | 'createdAt' | 'status' | 'emailSent'>) {
  const now = new Date()
  const lead: Lead = {
    id: `${now.getTime()}-${crypto.randomBytes(3).toString('hex')}`,
    createdAt: now.toISOString(),
    status: 'new',
    emailSent: false,
    ...input,
  }
  await pipeline([
    ['HSET', DATA_KEY, lead.id, JSON.stringify(lead)],
    ['ZADD', INDEX_KEY, now.getTime(), lead.id],
  ])
  return lead
}

export async function updateLead(id: string, changes: Partial<Pick<Lead, 'status' | 'emailSent'>>) {
  const raw = await redis<string | null>(['HGET', DATA_KEY, id])
  if (!raw) return null
  const lead = { ...(JSON.parse(raw) as Lead), ...changes }
  await redis(['HSET', DATA_KEY, id, JSON.stringify(lead)])
  return lead
}

export async function deleteLead(id: string) {
  await pipeline([
    ['HDEL', DATA_KEY, id],
    ['ZREM', INDEX_KEY, id],
  ])
}

export async function listLeads(limit = 1000): Promise<Lead[]> {
  const ids = await redis<string[]>(['ZREVRANGE', INDEX_KEY, 0, limit - 1])
  if (!ids.length) return []
  const rows = await redis<(string | null)[]>(['HMGET', DATA_KEY, ...ids])
  return rows.filter((r): r is string => Boolean(r)).map((r) => JSON.parse(r) as Lead)
}
