import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

export interface Translations {
  // App brand & header
  appTitle: string;
  appSubtitle: string;
  live: string;
  pro: string;
  usMarket: string;
  b3Market: string;
  marketOpen: string;
  marketClosed: string;
  preMarket: string;
  afterHours: string;
  regularSession: string;
  nyseNasdaqLive: string;
  opensAt: string;
  closesAt: string;
  weekendClosed: string;
  nyTime: string;
  brasiliaTime: string;
  strategyLabel: string;
  strategyValue: string;
  timeframeLabel: string;
  timeframeValue: string;
  guideBtn: string;
  
  // Guide modal
  guideTitle: string;
  guideDesc: string;
  guideIS: string;
  guideISDesc: string;
  guideRSI: string;
  guideRSIDesc: string;
  guideFibo: string;
  guideFiboDesc: string;
  guideTriple: string;
  guideTripleDesc: string;
  guideMethodology: string;

  // Scanner Filters
  marketSelector: string;
  universe: string;
  allAssets: string;
  sp500: string;
  nasdaq: string;
  nyse: string;
  etfs: string;
  stocks: string;
  trendFilter: string;
  aboveEma20: string;
  aboveEma50: string;
  aboveEma200: string;
  primaryTrend: string;
  liquidity: string;
  historicalValidation: string;
  showingAssets: string;
  ofTotalDropping: string;
  scanBtn: string;
  scanning: string;
  filterBySector: string;
  allSectors: string;
  clearFilter: string;

  // Table Columns & badges
  colTicker: string;
  colCompany: string;
  colIndex: string;
  colSector: string;
  colPrice: string;
  colDrop: string;
  colGap: string;
  colIS: string;
  colRSI: string;
  colStoch: string;
  colPotential: string;
  colScore: string;
  colSignals: string;
  colAction: string;
  analyze: string;
  closeAnalysis: string;

  // Potential badges
  potVeryHigh: string;
  potHigh: string;
  potMedium: string;
  potLow: string;

  // Detail Panel Tabs
  tabChart: string;
  tabTripleScreen: string;
  tabMinervini: string;
  tabFlow: string;
  tabML: string;
  tabRL: string;
  tabBacktest: string;
  tabFundamentals: string;
  tabNews: string;

  // Common terms
  price: string;
  volume: string;
  close: string;
  change: string;
  high: string;
  low: string;
  open: string;
  disclaimerTitle: string;
  disclaimerBadge: string;
  disclaimerText: string;
  disclaimerAffiliation: string;
  footerRights: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    appTitle: 'Wall Street Scanner',
    appSubtitle: 'Swing Trade Pro | Scanner S&P 500, Nasdaq, NYSE & ETFs em US$',
    live: 'Ao Vivo',
    pro: 'PRO',
    usMarket: 'EUA (Wall Street)',
    b3Market: 'Bolsas Americanas',
    marketOpen: 'Mercado Aberto',
    marketClosed: 'Mercado Fechado',
    preMarket: 'Pré-Mercado (Pre-Market)',
    afterHours: 'Pós-Mercado (After-Hours)',
    regularSession: 'Pregão Regular NYSE / NASDAQ (09:30 - 16:00 ET)',
    nyseNasdaqLive: 'NYSE & NASDAQ em tempo real',
    opensAt: 'Abre às 09:30 ET (10:30 Brasília)',
    closesAt: 'Fecha às 16:00 ET (17:00 Brasília)',
    weekendClosed: 'Fim de semana (Abre seg 09:30 ET)',
    nyTime: 'Nova York (ET)',
    brasiliaTime: 'Brasília',
    strategyLabel: 'Estratégia:',
    strategyValue: 'Reversão Sobrevenda & Swing Trade',
    timeframeLabel: 'Timeframe:',
    timeframeValue: 'Diário (1D) / 1 Ano',
    guideBtn: 'Guia de Indicadores',

    guideTitle: 'Guia de Indicadores & Metodologias Quantitativas',
    guideDesc: 'Conheça os principais modelos matemáticos utilizados pelo Scanner para garimpar compras em quedas técnicas.',
    guideIS: 'Índice de Sobrevenda (IS)',
    guideISDesc: 'Média ponderada do RSI(14) e Estocástico(14). Valores acima de 70 indicam exaustão vendedora e alta probabilidade de repique.',
    guideRSI: 'RSI & Estocástico Rápido',
    guideRSIDesc: 'RSI < 30 e Estocástico < 20 confirmam sobrevenda extrema nos ativos americanos. Cruzamentos ascendentes deflagram gatilho de entrada.',
    guideFibo: 'Fibonacci (Golden Zone 61.8%)',
    guideFiboDesc: 'A retração de 61.8% e 50% são os suportes áureos mais respeitados por algoritmos institucionais em Wall Street.',
    guideTriple: 'Alexander Elder (Triple Screen)',
    guideTripleDesc: 'Combina EMA de longo prazo (maré), oscilador EFI/RSI (onda) e Buy Stop de rompimento da máxima anterior (gatilho).',
    guideMethodology: 'Metodologias quantitativas aplicadas aos mercados americanos (S&P 500, Nasdaq, NYSE, ETFs).',

    marketSelector: 'Mercado:',
    universe: 'Universo:',
    allAssets: 'Todos',
    sp500: 'S&P 500',
    nasdaq: 'Nasdaq 100',
    nyse: 'NYSE',
    etfs: 'ETFs (US$)',
    stocks: 'Ações EUA',
    trendFilter: 'Tendência:',
    aboveEma20: '> EMA20',
    aboveEma50: '> EMA50',
    aboveEma200: '> EMA200 (Tendência Maior)',
    primaryTrend: 'Tendência Primária de Alta',
    liquidity: 'Liquidez Diária:',
    historicalValidation: 'Validação Histórica',
    showingAssets: 'Mostrando',
    ofTotalDropping: 'de ativos em queda técnica',
    scanBtn: 'Atualizar Scanner',
    scanning: 'Rastreando Wall Street...',
    filterBySector: 'Filtrar por Setor:',
    allSectors: 'Todos os Setores',
    clearFilter: 'Limpar',

    colTicker: 'Ticker',
    colCompany: 'Empresa / Fundo',
    colIndex: 'Índice / Bolsa',
    colSector: 'Setor',
    colPrice: 'Preço (US$)',
    colDrop: 'Queda (%)',
    colGap: 'Gap (%)',
    colIS: 'I.S.',
    colRSI: 'RSI(14)',
    colStoch: 'Estoc.',
    colPotential: 'Potencial',
    colScore: 'Score',
    colSignals: 'Sinais Técnicos',
    colAction: 'Análise',
    analyze: 'Analisar',
    closeAnalysis: 'Fechar',

    potVeryHigh: '🟢 Muito Alta',
    potHigh: '🟢 Alta',
    potMedium: '🟡 Média',
    potLow: '⚪ Baixa',

    tabChart: 'Gráfico Técnico & Fibonacci',
    tabTripleScreen: 'Multi-Timeframe (3 Telas)',
    tabMinervini: 'Filtro Minervini & Fases',
    tabFlow: 'Fluxo Institucional (Flow.AI)',
    tabML: 'Predição ML (Ensemble)',
    tabRL: 'Agente Q-Learning (RL)',
    tabBacktest: 'Backtest do Scanner',
    tabFundamentals: 'Valuation & Métricas',
    tabNews: 'Notícias & Sentimento',

    price: 'Preço',
    volume: 'Volume',
    close: 'Fechamento',
    change: 'Variação',
    high: 'Máxima',
    low: 'Mínima',
    open: 'Abertura',
    disclaimerTitle: 'Aviso Legal, Isenção & Declaração de Risco (Disclaimer)',
    disclaimerBadge: 'Finalidade Educacional',
    disclaimerText: 'Este software e todas as suas análises, modelos estatísticos, projeções de inteligência artificial, backtests e scores possuem finalidade estritamente informativa e educacional. Não constituem recomendação de investimento ou aconselhamento financeiro. Operações no mercado americano (ações, ETFs, opções) envolvem risco de perda patrimonial.',
    disclaimerAffiliation: 'Software de inteligência quantitativa independente. Não possui vínculo com NYSE, Nasdaq, S&P Global ou SEC.',
    footerRights: 'Todos os direitos reservados. Cotações e dados de mercado fornecidos para estudo e acompanhamento de Swing Trade.'
  },
  en: {
    appTitle: 'Wall Street Scanner',
    appSubtitle: 'Swing Trade Pro | S&P 500, Nasdaq, NYSE & ETFs Scanner in US$',
    live: 'Live',
    pro: 'PRO',
    usMarket: 'US (Wall Street)',
    b3Market: 'US Markets',
    marketOpen: 'Market Open',
    marketClosed: 'Market Closed',
    preMarket: 'Pre-Market Session',
    afterHours: 'After-Hours Session',
    regularSession: 'Regular NYSE / NASDAQ Session (09:30 - 16:00 ET)',
    nyseNasdaqLive: 'NYSE & NASDAQ Real-Time Data',
    opensAt: 'Opens at 09:30 ET',
    closesAt: 'Closes at 16:00 ET',
    weekendClosed: 'Weekend (Opens Monday 09:30 ET)',
    nyTime: 'New York (ET)',
    brasiliaTime: 'Brasilia',
    strategyLabel: 'Strategy:',
    strategyValue: 'Oversold Reversal & Swing Trade',
    timeframeLabel: 'Timeframe:',
    timeframeValue: 'Daily (1D) / 1 Year',
    guideBtn: 'Indicator Guide',

    guideTitle: 'Indicator Guide & Quantitative Methodologies',
    guideDesc: 'Explore the key mathematical models used by the Scanner to uncover dip-buying opportunities in technical pullbacks.',
    guideIS: 'Oversold Index (IS)',
    guideISDesc: 'Harmonic mean of RSI(14) and Stochastic(14). Values above 70 indicate seller exhaustion and high probability of an oversold bounce.',
    guideRSI: 'RSI & Fast Stochastic',
    guideRSIDesc: 'RSI < 30 and Stochastic < 20 confirm extreme technical oversold conditions on US equities. Upward crossovers trigger immediate buy alerts.',
    guideFibo: 'Fibonacci (61.8% Golden Zone)',
    guideFiboDesc: 'The 61.8% and 50% retracements represent the strongest mathematical support zones respected by institutional algorithms on Wall Street.',
    guideTriple: 'Alexander Elder (Triple Screen)',
    guideTripleDesc: 'Combines long-term trend EMA (tide), oscillator EFI/RSI (wave), and breakout Buy Stop above previous high (trigger).',
    guideMethodology: 'Quantitative methodologies applied across US markets (S&P 500, Nasdaq, NYSE, ETFs).',

    marketSelector: 'Market:',
    universe: 'Universe:',
    allAssets: 'All',
    sp500: 'S&P 500',
    nasdaq: 'Nasdaq 100',
    nyse: 'NYSE',
    etfs: 'ETFs (US$)',
    stocks: 'US Stocks',
    trendFilter: 'Trend:',
    aboveEma20: '> EMA20',
    aboveEma50: '> EMA50',
    aboveEma200: '> EMA200 (Major Trend)',
    primaryTrend: 'Primary Bullish Trend',
    liquidity: 'Daily Liquidity:',
    historicalValidation: 'Historical Validation',
    showingAssets: 'Showing',
    ofTotalDropping: 'of dropping assets in pullback',
    scanBtn: 'Refresh Scanner',
    scanning: 'Scanning Wall Street...',
    filterBySector: 'Filter by Sector:',
    allSectors: 'All Sectors',
    clearFilter: 'Clear',

    colTicker: 'Ticker',
    colCompany: 'Company / Fund',
    colIndex: 'Index / Exchange',
    colSector: 'Sector',
    colPrice: 'Price (US$)',
    colDrop: 'Drop (%)',
    colGap: 'Gap (%)',
    colIS: 'O.I.',
    colRSI: 'RSI(14)',
    colStoch: 'Stoch.',
    colPotential: 'Potential',
    colScore: 'Score',
    colSignals: 'Technical Signals',
    colAction: 'Analysis',
    analyze: 'Analyze',
    closeAnalysis: 'Close',

    potVeryHigh: '🟢 Very High',
    potHigh: '🟢 High',
    potMedium: '🟡 Medium',
    potLow: '⚪ Low',

    tabChart: 'Technical Chart & Fibonacci',
    tabTripleScreen: 'Triple Screen (3 Timeframes)',
    tabMinervini: 'Minervini Trend & 4 Phases',
    tabFlow: 'Institutional Order Flow (Flow.AI)',
    tabML: 'ML Price Prediction (Ensemble)',
    tabRL: 'Q-Learning Agent (RL)',
    tabBacktest: 'Scanner Backtest',
    tabFundamentals: 'Valuation & Fundamentals',
    tabNews: 'News & Sentiment',

    price: 'Price',
    volume: 'Volume',
    close: 'Close',
    change: 'Change',
    high: 'High',
    low: 'Low',
    open: 'Open',
    disclaimerTitle: 'Disclaimer & Educational Risk Disclosure',
    disclaimerBadge: 'Educational Use',
    disclaimerText: 'This software and all statistical models, artificial intelligence projections, backtests, and scores are strictly for educational and analytical purposes. Nothing herein constitutes financial or investment advice. Trading US equities, ETFs, and options carries capital risk.',
    disclaimerAffiliation: 'Independent quantitative software. Not affiliated with NYSE, Nasdaq, S&P Global, or SEC.',
    footerRights: 'All rights reserved. Market data and quotes provided for Swing Trade research and educational tracking.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt',
  setLanguage: () => {},
  t: (key) => translations.pt[key] || String(key),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_language');
      if (saved === 'en' || saved === 'pt') return saved;
      // Default to Portuguese since user instructed: "Me responda aqui sempre didaticamente e passo a passo em português"
      return 'pt';
    } catch {
      return 'pt';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
    } catch {}
  };

  const t = (key: keyof Translations): string => {
    return translations[language]?.[key] || translations.pt[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
