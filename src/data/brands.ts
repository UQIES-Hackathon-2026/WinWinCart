import type { Chain } from './stores'

export type Brand = {
  label: string
  short: string
  bg: string
  fg: string
  emoji: string
}

export const brands: Record<Chain, Brand> = {
  aldi: {
    label: 'ALDI',
    short: 'ALDI',
    bg: '#001E5E',
    fg: '#FFFFFF',
    emoji: '🛒',
  },
  coles: {
    label: 'Coles',
    short: 'Coles',
    bg: '#E01A22',
    fg: '#FFFFFF',
    emoji: '🛒',
  },
  woolworths: {
    label: 'Woolworths',
    short: 'Woolies',
    bg: '#178841',
    fg: '#FFFFFF',
    emoji: '🍏',
  },
  iga: {
    label: 'IGA',
    short: 'IGA',
    bg: '#C8102E',
    fg: '#FFFFFF',
    emoji: '🏪',
  },
  independent: {
    label: 'Sunlit Asian Supermarket',
    short: 'Sunlit',
    bg: '#F5A623',
    fg: '#1A1A1A',
    emoji: '🏮',
  },
}

export function brandForChain(chain: Chain): Brand {
  return brands[chain]
}
