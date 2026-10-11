import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'pt' | 'es' | 'fr' | 'de';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

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
  colPrevClose: string;
  colDrop: string;
  colChange: string;
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
    brasiliaTime: 'UTC-3',
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
    colCompany: 'Company',
    colIndex: 'Class',
    colSector: 'Sector',
    colPrice: 'Price',
    colPrevClose: 'Prev. Close',
    colDrop: 'Drop',
    colChange: 'Change',
    colGap: 'Gap (%)',
    colIS: 'I.S. (Oversold)',
    colRSI: 'RSI(14)',
    colStoch: 'Stoch.',
    colPotential: 'Potential',
    colScore: 'Score',
    colSignals: 'Technical Signals',
    colAction: 'Action',
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
    volume: 'Fin. Vol.',
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
  },
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
    colCompany: 'Empresa',
    colIndex: 'Classe',
    colSector: 'Setor',
    colPrice: 'Preço',
    colPrevClose: 'Fech. Anterior',
    colDrop: 'Queda',
    colChange: 'Variação',
    colGap: 'Gap (%)',
    colIS: 'I.S. (Sobrevenda)',
    colRSI: 'RSI(14)',
    colStoch: 'Estoc.',
    colPotential: 'Potencial',
    colScore: 'Score',
    colSignals: 'Sinais Técnicos',
    colAction: 'Ação',
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
    volume: 'Vol. Fin.',
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
  es: {
    appTitle: 'Wall Street Scanner',
    appSubtitle: 'Swing Trade Pro | Escáner S&P 500, Nasdaq, NYSE y ETFs en US$',
    live: 'En Vivo',
    pro: 'PRO',
    usMarket: 'EE.UU. (Wall Street)',
    b3Market: 'Mercados de EE.UU.',
    marketOpen: 'Mercado Abierto',
    marketClosed: 'Mercado Cerrado',
    preMarket: 'Pre-Apertura (Pre-Market)',
    afterHours: 'Post-Mercado (After-Hours)',
    regularSession: 'Sesión Regular NYSE / NASDAQ (09:30 - 16:00 ET)',
    nyseNasdaqLive: 'NYSE y NASDAQ en tiempo real',
    opensAt: 'Abre a las 09:30 ET',
    closesAt: 'Cierra a las 16:00 ET',
    weekendClosed: 'Fin de semana (Abre lunes 09:30 ET)',
    nyTime: 'Nueva York (ET)',
    brasiliaTime: 'UTC-3',
    strategyLabel: 'Estrategia:',
    strategyValue: 'Reversión Sobrevendida y Swing Trade',
    timeframeLabel: 'Temporalidad:',
    timeframeValue: 'Diario (1D) / 1 Año',
    guideBtn: 'Guía de Indicadores',

    guideTitle: 'Guía de Indicadores y Metodologías Cuantitativas',
    guideDesc: 'Conozca los modelos matemáticos que utiliza el Escáner para detectar compras en caídas técnicas.',
    guideIS: 'Índice de Sobrevenda (IS)',
    guideISDesc: 'Promedio ponderado de RSI(14) y Estocástico(14). Valores mayores a 70 indican agotamiento vendedor y alta probabilidad de rebote.',
    guideRSI: 'RSI y Estocástico Rápido',
    guideRSIDesc: 'RSI < 30 y Estocástico < 20 confirman sobreventa extrema en acciones estadounidenses. Cruces alcistas activan señales de compra.',
    guideFibo: 'Fibonacci (Zona Áurea 61.8%)',
    guideFiboDesc: 'Los retrocesos de 61.8% y 50% son los soportes matemáticos más respetados por algoritmos institucionales en Wall Street.',
    guideTriple: 'Alexander Elder (Triple Pantalla)',
    guideTripleDesc: 'Combina EMA de largo plazo (marea), oscilador EFI/RSI (ola) y orden de compra de ruptura de máximo previo (disparador).',
    guideMethodology: 'Metodologías cuantitativas aplicadas a los mercados estadounidenses (S&P 500, Nasdaq, NYSE, ETFs).',

    marketSelector: 'Mercado:',
    universe: 'Universo:',
    allAssets: 'Todos',
    sp500: 'S&P 500',
    nasdaq: 'Nasdaq 100',
    nyse: 'NYSE',
    etfs: 'ETFs (US$)',
    stocks: 'Acciones EE.UU.',
    trendFilter: 'Tendencia:',
    aboveEma20: '> EMA20',
    aboveEma50: '> EMA50',
    aboveEma200: '> EMA200 (Tendencia Mayor)',
    primaryTrend: 'Tendencia Primaria Alcista',
    liquidity: 'Liquidez Diaria:',
    historicalValidation: 'Validación Histórica',
    showingAssets: 'Mostrando',
    ofTotalDropping: 'de activos en caída técnica',
    scanBtn: 'Actualizar Escáner',
    scanning: 'Escaneando Wall Street...',
    filterBySector: 'Filtrar por Sector:',
    allSectors: 'Todos los Sectores',
    clearFilter: 'Limpiar',

    colTicker: 'Ticker',
    colCompany: 'Empresa',
    colIndex: 'Clase',
    colSector: 'Sector',
    colPrice: 'Precio',
    colPrevClose: 'Cierre Ant.',
    colDrop: 'Caída',
    colChange: 'Variación',
    colGap: 'Gap (%)',
    colIS: 'I.S. (Sobrevendido)',
    colRSI: 'RSI(14)',
    colStoch: 'Estoc.',
    colPotential: 'Potencial',
    colScore: 'Score',
    colSignals: 'Señales Técnicas',
    colAction: 'Acción',
    analyze: 'Analizar',
    closeAnalysis: 'Cerrar',

    potVeryHigh: '🟢 Muy Alta',
    potHigh: '🟢 Alta',
    potMedium: '🟡 Media',
    potLow: '⚪ Baja',

    tabChart: 'Gráfico Técnico y Fibonacci',
    tabTripleScreen: 'Triple Pantalla (3 Temporalidades)',
    tabMinervini: 'Filtro Minervini y Fases',
    tabFlow: 'Flujo Institucional (Flow.AI)',
    tabML: 'Predicción ML (Ensemble)',
    tabRL: 'Agente Q-Learning (RL)',
    tabBacktest: 'Backtest del Escáner',
    tabFundamentals: 'Valoración y Fundamentales',
    tabNews: 'Noticias y Sentimiento',

    price: 'Precio',
    volume: 'Vol. Fin.',
    close: 'Cierre',
    change: 'Variación',
    high: 'Máximo',
    low: 'Mínimo',
    open: 'Apertura',
    disclaimerTitle: 'Descargo de Responsabilidad y Advertencia de Riesgo',
    disclaimerBadge: 'Uso Educativo',
    disclaimerText: 'Este software y todos sus modelos estadísticos, predicciones de inteligencia artificial, backtests y puntuaciones tienen fines estrictamente educativos e informativos. No constituyen asesoramiento financiero ni recomendación de inversión. Operar en Wall Street implica riesgo patrimonial.',
    disclaimerAffiliation: 'Software cuantitativo independiente. Sin afiliación con NYSE, Nasdaq, S&P Global ni SEC.',
    footerRights: 'Todos los derechos reservados. Datos de mercado proporcionados para investigación y seguimiento de Swing Trade.'
  },
  fr: {
    appTitle: 'Wall Street Scanner',
    appSubtitle: 'Swing Trade Pro | Scanner S&P 500, Nasdaq, NYSE & ETFs en US$',
    live: 'En Direct',
    pro: 'PRO',
    usMarket: 'USA (Wall Street)',
    b3Market: 'Marchés Américains',
    marketOpen: 'Marché Ouvert',
    marketClosed: 'Marché Fermé',
    preMarket: 'Pré-Marché (Pre-Market)',
    afterHours: 'Post-Marché (After-Hours)',
    regularSession: 'Session Régulière NYSE / NASDAQ (09h30 - 16h00 ET)',
    nyseNasdaqLive: 'Données en temps réel NYSE & NASDAQ',
    opensAt: 'Ouvre à 09h30 ET',
    closesAt: 'Ferme à 16h00 ET',
    weekendClosed: 'Week-end (Ouverture lundi 09h30 ET)',
    nyTime: 'New York (ET)',
    brasiliaTime: 'UTC-3',
    strategyLabel: 'Stratégie :',
    strategyValue: 'Rebond Survente & Swing Trade',
    timeframeLabel: 'Période :',
    timeframeValue: 'Journalier (1D) / 1 An',
    guideBtn: 'Guide des Indicateurs',

    guideTitle: 'Guide des Indicateurs & Modèles Quantitatifs',
    guideDesc: 'Découvrez les modèles mathématiques utilisés par le Scanner pour repérer les achats à la baisse technique.',
    guideIS: 'Indice de Survente (IS)',
    guideISDesc: 'Moyenne pondérée du RSI(14) et Stochastique(14). Valeurs > 70 indiquent l\'épuisement des vendeurs et un fort potentiel de rebond.',
    guideRSI: 'RSI & Stochastique Rapide',
    guideRSIDesc: 'RSI < 30 et Stochastique < 20 confirment une survente extrême sur les actions US. Les croisements haussiers déclenchent un signal d\'achat.',
    guideFibo: 'Fibonacci (Zone d\'Or 61.8%)',
    guideFiboDesc: 'Les retracements de 61.8% et 50% constituent les supports mathématiques les plus respectés par les algorithmes de Wall Street.',
    guideTriple: 'Alexander Elder (Triple Écran)',
    guideTripleDesc: 'Combine la tendance long terme (marée), l\'oscillateur EFI/RSI (vague) et l\'ordre d\'achat sur cassure du plus haut (déclencheur).',
    guideMethodology: 'Méthodologies quantitatives appliquées aux marchés américains (S&P 500, Nasdaq, NYSE, ETFs).',

    marketSelector: 'Marché :',
    universe: 'Univers :',
    allAssets: 'Tous',
    sp500: 'S&P 500',
    nasdaq: 'Nasdaq 100',
    nyse: 'NYSE',
    etfs: 'ETFs (US$)',
    stocks: 'Actions US',
    trendFilter: 'Tendance :',
    aboveEma20: '> EMA20',
    aboveEma50: '> EMA50',
    aboveEma200: '> EMA200 (Tendance Majeure)',
    primaryTrend: 'Tendance Primaire Haussière',
    liquidity: 'Liquidité Quotidienne :',
    historicalValidation: 'Validation Historique',
    showingAssets: 'Affichage de',
    ofTotalDropping: 'actifs en correction technique',
    scanBtn: 'Actualiser le Scanner',
    scanning: 'Analyse de Wall Street...',
    filterBySector: 'Filtrer par Secteur :',
    allSectors: 'Tous les Secteurs',
    clearFilter: 'Effacer',

    colTicker: 'Ticker',
    colCompany: 'Entreprise',
    colIndex: 'Classe',
    colSector: 'Secteur',
    colPrice: 'Prix',
    colPrevClose: 'Clôture Préc.',
    colDrop: 'Baisse',
    colChange: 'Variation',
    colGap: 'Gap (%)',
    colIS: 'I.S. (Survente)',
    colRSI: 'RSI(14)',
    colStoch: 'Stoch.',
    colPotential: 'Potentiel',
    colScore: 'Score',
    colSignals: 'Signaux Techniques',
    colAction: 'Action',
    analyze: 'Analyser',
    closeAnalysis: 'Fermer',

    potVeryHigh: '🟢 Très Élevé',
    potHigh: '🟢 Élevé',
    potMedium: '🟡 Moyen',
    potLow: '⚪ Faible',

    tabChart: 'Graphique Technique & Fibonacci',
    tabTripleScreen: 'Triple Écran (3 Périodes)',
    tabMinervini: 'Filtre Minervini & 4 Phases',
    tabFlow: 'Flux d\'Ordres Institutionnels (Flow.AI)',
    tabML: 'Prédiction Prix ML (Ensemble)',
    tabRL: 'Agent Q-Learning (RL)',
    tabBacktest: 'Backtest du Scanner',
    tabFundamentals: 'Valorisation & Fondamentaux',
    tabNews: 'Actualités & Sentiment',

    price: 'Prix',
    volume: 'Vol. Fin.',
    close: 'Clôture',
    change: 'Variation',
    high: 'Plus Haut',
    low: 'Plus Bas',
    open: 'Ouverture',
    disclaimerTitle: 'Avertissement Légal & Déclaration de Risque',
    disclaimerBadge: 'Usage Éducatif',
    disclaimerText: 'Ce logiciel et l\'ensemble de ses analyses, modèles prédictifs et simulations sont fournis à des fins purement éducatives et informatives. Ils ne constituent en aucun cas un conseil en investissement. Le trading d\'actions et d\'ETFs comporte un risque de perte en capital.',
    disclaimerAffiliation: 'Logiciel quantitatif indépendant. Aucune affiliation avec NYSE, Nasdaq, S&P Global ou la SEC.',
    footerRights: 'Tous droits réservés. Données fournies pour l\'apprentissage et le suivi du Swing Trade.'
  },
  de: {
    appTitle: 'Wall Street Scanner',
    appSubtitle: 'Swing Trade Pro | S&P 500, Nasdaq, NYSE & ETFs Scanner in US$',
    live: 'Live',
    pro: 'PRO',
    usMarket: 'USA (Wall Street)',
    b3Market: 'US-Märkte',
    marketOpen: 'Markt Geöffnet',
    marketClosed: 'Markt Geschlossen',
    preMarket: 'Vorbörse (Pre-Market)',
    afterHours: 'Nachbörse (After-Hours)',
    regularSession: 'Reguläre NYSE / NASDAQ Sitzung (09:30 - 16:00 ET)',
    nyseNasdaqLive: 'NYSE & NASDAQ Echtzeitdaten',
    opensAt: 'Öffnet um 09:30 ET',
    closesAt: 'Schließt um 16:00 ET',
    weekendClosed: 'Wochenende (Öffnet Montag 09:30 ET)',
    nyTime: 'New York (ET)',
    brasiliaTime: 'UTC-3',
    strategyLabel: 'Strategie:',
    strategyValue: 'Überverkaufter Rebound & Swing Trade',
    timeframeLabel: 'Zeitrahmen:',
    timeframeValue: 'Täglich (1D) / 1 Jahr',
    guideBtn: 'Indikatoren-Leitfaden',

    guideTitle: 'Indikatoren & Quantitative Methodik',
    guideDesc: 'Entdecken Sie die mathematischen Modelle des Scanners zur Identifizierung von Einstiegschancen bei technischen Rücksetzern.',
    guideIS: 'Überverkauft-Index (IS)',
    guideISDesc: 'Gewichteter Mittelwert aus RSI(14) und Stochastik(14). Werte über 70 deuten auf Verkäufererschöpfung und hohe Rebound-Wahrscheinlichkeit hin.',
    guideRSI: 'RSI & Schnelle Stochastik',
    guideRSIDesc: 'RSI < 30 und Stochastik < 20 bestätigen extreme überverkaufte Zustände bei US-Aktien. Bullische Durchkreuzungen aktivieren Kaufsignale.',
    guideFibo: 'Fibonacci (Goldener Schnitt 61.8%)',
    guideFiboDesc: 'Die 61.8% und 50% Retracements stellen die von institutionellen Algorithmen meistbeachteten Unterstützungszonen an der Wall Street dar.',
    guideTriple: 'Alexander Elder (Triple Screen)',
    guideTripleDesc: 'Kombiniert langfristigen Trend (Gezeiten), Oszillator EFI/RSI (Welle) und Buy-Stop-Kauforder über dem Vortageshoch (Auslöser).',
    guideMethodology: 'Quantitative Methoden für alle führenden US-Märkte (S&P 500, Nasdaq, NYSE, ETFs).',

    marketSelector: 'Markt:',
    universe: 'Universum:',
    allAssets: 'Alle',
    sp500: 'S&P 500',
    nasdaq: 'Nasdaq 100',
    nyse: 'NYSE',
    etfs: 'ETFs (US$)',
    stocks: 'US-Aktien',
    trendFilter: 'Trend:',
    aboveEma20: '> EMA20',
    aboveEma50: '> EMA50',
    aboveEma200: '> EMA200 (Haupttrend)',
    primaryTrend: 'Primärer Aufwärtstrend',
    liquidity: 'Tägliche Liquidität:',
    historicalValidation: 'Historische Validierung',
    showingAssets: 'Zeige',
    ofTotalDropping: 'Werte im technischen Rücksetzer',
    scanBtn: 'Scanner Aktualisieren',
    scanning: 'Scanne Wall Street...',
    filterBySector: 'Nach Sektor Filtern:',
    allSectors: 'Alle Sektoren',
    clearFilter: 'Zurücksetzen',

    colTicker: 'Ticker',
    colCompany: 'Unternehmen',
    colIndex: 'Klasse',
    colSector: 'Sektor',
    colPrice: 'Kurs',
    colPrevClose: 'Vortagskurs',
    colDrop: 'Rückgang',
    colChange: 'Veränderung',
    colGap: 'Gap (%)',
    colIS: 'I.S. (Überverkauft)',
    colRSI: 'RSI(14)',
    colStoch: 'Stoch.',
    colPotential: 'Potenzial',
    colScore: 'Score',
    colSignals: 'Technische Signale',
    colAction: 'Aktion',
    analyze: 'Analysieren',
    closeAnalysis: 'Schließen',

    potVeryHigh: '🟢 Sehr Hoch',
    potHigh: '🟢 Hoch',
    potMedium: '🟡 Mittel',
    potLow: '⚪ Niedrig',

    tabChart: 'Chartanalyse & Fibonacci',
    tabTripleScreen: 'Triple Screen (3 Zeitrahmen)',
    tabMinervini: 'Minervini Trend & 4 Phasen',
    tabFlow: 'Institutioneller Auftragsfluss (Flow.AI)',
    tabML: 'ML-Kursprognose (Ensemble)',
    tabRL: 'Q-Learning Agent (RL)',
    tabBacktest: 'Scanner Backtest',
    tabFundamentals: 'Bewertung & Fundamentaldaten',
    tabNews: 'Nachrichten & Sentiment',

    price: 'Kurs',
    volume: 'Fin. Vol.',
    close: 'Schluss',
    change: 'Änderung',
    high: 'Hoch',
    low: 'Tief',
    open: 'Eröffnung',
    disclaimerTitle: 'Rechtlicher Hinweis & Risikoausschluss',
    disclaimerBadge: 'Bildungszweck',
    disclaimerText: 'Diese Software und alle darin enthaltenen mathematischen Modelle, Prognosen und Backtests dienen ausschließlich Informations- und Bildungszwecken. Sie stellen keine Anlageberatung dar. Der Handel mit US-Aktien und ETFs birgt finanzielle Verlustrisiken.',
    disclaimerAffiliation: 'Unabhängige quantitative Software. Keine Verbindung zu NYSE, Nasdaq, S&P Global oder der SEC.',
    footerRights: 'Alle Rechte vorbehalten. Marktdaten bereitgestellt für Swing-Trade-Analyse und Lernzwecke.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => translations.en[key] || String(key),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_language');
      if (saved && (saved === 'en' || saved === 'pt' || saved === 'es' || saved === 'fr' || saved === 'de')) {
        return saved as Language;
      }
      
      // Auto-detect browser/device language for international users
      if (typeof navigator !== 'undefined' && navigator.language) {
        const navLang = navigator.language.toLowerCase();
        if (navLang.startsWith('pt')) return 'pt';
        if (navLang.startsWith('es')) return 'es';
        if (navLang.startsWith('fr')) return 'fr';
        if (navLang.startsWith('de')) return 'de';
      }
      
      // International default is English (en)
      return 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
    } catch {}
  };

  const t = (key: keyof Translations): string => {
    return translations[language]?.[key] || translations.en[key] || translations.pt[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
