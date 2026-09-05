export function formatCurrency(
  value: number,
  currency: string = 'USD',
  language: 'pt' | 'en' = 'pt'
): string {
  const num = Number(value) || 0;
  return `$ ${num.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatVolume(
  value: number,
  currency: string = 'USD',
  language: 'pt' | 'en' = 'pt'
): string {
  const v = Math.abs(Number(value) || 0);
  const prefix = '$ ';

  if (v >= 1e12) {
    const scale = (v / 1e12).toFixed(2);
    return `${prefix}${scale} ${language === 'pt' ? 'Tri' : 'T'}`;
  }
  if (v >= 1e9) {
    const scale = (v / 1e9).toFixed(1);
    return `${prefix}${scale} ${language === 'pt' ? 'Bi' : 'B'}`;
  }
  if (v >= 1e6) {
    const scale = (v / 1e6).toFixed(1);
    return `${prefix}${scale} ${language === 'pt' ? 'Mi' : 'M'}`;
  }
  if (v >= 1e3) {
    const scale = (v / 1e3).toFixed(0);
    return `${prefix}${scale}k`;
  }
  return `${prefix}${v.toFixed(0)}`;
}

export function formatMarketCap(
  value?: number,
  currency: string = 'USD',
  language: 'pt' | 'en' = 'pt'
): string {
  if (!value) return 'N/A';
  return formatVolume(value, currency, language);
}

export const formatCompactVolume = formatVolume;
