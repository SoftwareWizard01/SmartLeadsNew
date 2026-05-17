export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'lost'] as const;
export const LEAD_SOURCES = ['website', 'instagram', 'referral'] as const;

export const STATUS_COLORS = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  qualified: 'bg-green-500/20 text-green-400 border-green-500/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
} as const;

export const SOURCE_COLORS = {
  website: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  instagram: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  referral: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
} as const;
