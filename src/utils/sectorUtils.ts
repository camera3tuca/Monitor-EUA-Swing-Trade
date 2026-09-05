import { KNOWN_US_SECTORS } from '../data/usMarketData';

export interface SectorStyle {
  label: string;
  badgeClass: string;
  dotColor: string;
  pillHoverClass: string;
  bgSolid: string;
  iconName?: string;
}

export const KNOWN_TICKER_SECTORS: Record<string, string> = {
  // US Equities & ETFs fallback
  ...KNOWN_US_SECTORS,
};

export const SECTOR_STYLES: Record<string, SectorStyle> = {
  'Financeiro & Bancos': {
    label: 'Financeiro & Bancos',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    dotColor: 'bg-emerald-400',
    pillHoverClass: 'hover:bg-emerald-500/30 hover:border-emerald-500/60',
    bgSolid: 'bg-emerald-600',
  },
  'Petróleo & Gás': {
    label: 'Petróleo & Gás',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    dotColor: 'bg-amber-400',
    pillHoverClass: 'hover:bg-amber-500/30 hover:border-amber-500/60',
    bgSolid: 'bg-amber-600',
  },
  'Mineração & Materiais': {
    label: 'Mineração & Materiais',
    badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    dotColor: 'bg-orange-400',
    pillHoverClass: 'hover:bg-orange-500/30 hover:border-orange-500/60',
    bgSolid: 'bg-orange-600',
  },
  'Tecnologia': {
    label: 'Tecnologia',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    dotColor: 'bg-indigo-400',
    pillHoverClass: 'hover:bg-indigo-500/30 hover:border-indigo-500/60',
    bgSolid: 'bg-indigo-600',
  },
  'Consumo & Varejo': {
    label: 'Consumo & Varejo',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    dotColor: 'bg-rose-400',
    pillHoverClass: 'hover:bg-rose-500/30 hover:border-rose-500/60',
    bgSolid: 'bg-rose-600',
  },
  'Energia & Saneamento': {
    label: 'Energia & Saneamento',
    badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    dotColor: 'bg-yellow-400',
    pillHoverClass: 'hover:bg-yellow-500/30 hover:border-yellow-500/60',
    bgSolid: 'bg-yellow-600',
  },
  'Saúde': {
    label: 'Saúde',
    badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    dotColor: 'bg-teal-400',
    pillHoverClass: 'hover:bg-teal-500/30 hover:border-teal-500/60',
    bgSolid: 'bg-teal-600',
  },
  'Construção & Imobiliário': {
    label: 'Construção & Imobiliário',
    badgeClass: 'bg-stone-500/25 text-stone-300 border-stone-500/40',
    dotColor: 'bg-stone-400',
    pillHoverClass: 'hover:bg-stone-500/35 hover:border-stone-500/60',
    bgSolid: 'bg-stone-600',
  },
  'Transporte & Indústria': {
    label: 'Transporte & Indústria',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    dotColor: 'bg-sky-400',
    pillHoverClass: 'hover:bg-sky-500/30 hover:border-sky-500/60',
    bgSolid: 'bg-sky-600',
  },
  'Telecom & Mídia': {
    label: 'Telecom & Mídia',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    dotColor: 'bg-purple-400',
    pillHoverClass: 'hover:bg-purple-500/30 hover:border-purple-500/60',
    bgSolid: 'bg-purple-600',
  },
  'Educação': {
    label: 'Educação',
    badgeClass: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    dotColor: 'bg-pink-400',
    pillHoverClass: 'hover:bg-pink-500/30 hover:border-pink-500/60',
    bgSolid: 'bg-pink-600',
  },
  'ETFs & Índices': {
    label: 'ETFs & Índices',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    dotColor: 'bg-blue-400',
    pillHoverClass: 'hover:bg-blue-500/30 hover:border-blue-500/60',
    bgSolid: 'bg-blue-600',
  },
  'Fundos Imobiliários': {
    label: 'Fundos Imobiliários',
    badgeClass: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
    dotColor: 'bg-lime-400',
    pillHoverClass: 'hover:bg-lime-500/30 hover:border-lime-500/60',
    bgSolid: 'bg-lime-600',
  },
  'Outros': {
    label: 'Outros',
    badgeClass: 'bg-slate-700/60 text-slate-300 border-slate-600/50',
    dotColor: 'bg-slate-400',
    pillHoverClass: 'hover:bg-slate-700 hover:border-slate-500',
    bgSolid: 'bg-slate-600',
  },
};

export function resolveSector(ticker: string, rawSector?: string, classe?: string): string {
  const cleanTicker = (ticker || '').toUpperCase().trim();
  if (KNOWN_TICKER_SECTORS[cleanTicker]) {
    return KNOWN_TICKER_SECTORS[cleanTicker];
  }
  if (KNOWN_US_SECTORS[cleanTicker]) {
    return KNOWN_US_SECTORS[cleanTicker];
  }

  if (classe === 'ETF') return 'ETFs & Índices';
  if (classe === 'FII') return 'Fundos Imobiliários';

  const s = (rawSector || '').toLowerCase();
  if (s.includes('finance') || s.includes('bank') || s.includes('insurance')) return 'Financeiro & Bancos';
  if (s.includes('energy') || s.includes('oil') || s.includes('petro') || s.includes('gas')) return 'Petróleo & Gás';
  if (s.includes('mineral') || s.includes('basic material') || s.includes('steel') || s.includes('metal')) return 'Mineração & Materiais';
  if (s.includes('tech') || s.includes('software') || s.includes('electronic') || s.includes('semiconductor')) return 'Tecnologia';
  if (s.includes('retail') || s.includes('consumer') || s.includes('food') || s.includes('beverage') || s.includes('apparel')) return 'Consumo & Varejo';
  if (s.includes('utilit') || s.includes('electric') || s.includes('water') || s.includes('sanitation')) return 'Energia & Saneamento';
  if (s.includes('health') || s.includes('pharma') || s.includes('biotech') || s.includes('medical')) return 'Saúde';
  if (s.includes('real estate') || s.includes('construction') || s.includes('building') || s.includes('property')) return 'Construção & Imobiliário';
  if (s.includes('transport') || s.includes('logistics') || s.includes('airline') || s.includes('industrial') || s.includes('manufacturing')) return 'Transporte & Indústria';
  if (s.includes('telecom') || s.includes('communication') || s.includes('media')) return 'Telecom & Mídia';
  if (s.includes('education') || s.includes('school')) return 'Educação';

  return 'Outros';
}

export function getSectorStyle(sector: string): SectorStyle {
  return SECTOR_STYLES[sector] || SECTOR_STYLES['Outros'];
}
