import React, { useState, useEffect, useMemo } from 'react';
import { Download, FileText, BookOpen, ChevronDown, ChevronUp, CheckCircle2, Lightbulb, HelpCircle } from 'lucide-react';
import { Header } from './components/Header';
import { ScannerFilters } from './components/ScannerFilters';
import { OpportunitiesTable } from './components/OpportunitiesTable';
import { AssetDetailPanel, TabType } from './components/AssetDetailPanel';
import { ScienceBitLogo } from './components/ScienceBitLogo';
import { PlayStoreKitModal } from './components/PlayStoreKitModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { DidacticTutorialModal } from './components/DidacticTutorialModal';
import { useLanguage } from './i18n/LanguageContext';

import {
  AssetClass,
  AssetOpportunity,
  HistoricalCandle,
  FibonacciLevels,
  TripleScreenResult,
  MinerviniResult,
  MLPredictionResult,
  RLAgentResult,
  FlowResult,
  FundamentalsData,
  NewsArticle,
  BacktestResult,
  MarketType,
  MarketUniverse,
  USUniverse
} from './types';

import {
  enrichCandles,
  calculateFibonacci,
  calculateTripleScreen,
  calculateMinervini,
  calculateFlow,
  calculateMLPrediction,
  calculateRLAgent,
  runScannerBacktest
} from './utils/indicators';
import { getSectorStyle } from './utils/sectorUtils';
import { getApiUrl } from './utils/api';

import {
  Activity,
  Award,
  BarChart2,
  Bot,
  Brain,
  ChevronRight,
  Compass,
  History,
  Info,
  Landmark,
  Layers,
  Newspaper,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
  Globe,
  ExternalLink
} from 'lucide-react';

export const App: React.FC = () => {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';

  // Market Selection (USA is the only market)
  const [market] = useState<MarketType>('usa');
  const [selectedUSUniverse, setSelectedUSUniverse] = useState<USUniverse>('all');
  const [showDidacticBanner, setShowDidacticBanner] = useState<boolean>(true);

  // Filters State
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [filterEMA20, setFilterEMA20] = useState<boolean>(false);
  const [filterEMA50, setFilterEMA50] = useState<boolean>(false);
  const [filterEMA200, setFilterEMA200] = useState<boolean>(false);
  const [minLiquidez, setMinLiquidez] = useState<number>(1);
  const [showBacktests, setShowBacktests] = useState<boolean>(false);

  // Scanner Data State
  const [opportunities, setOpportunities] = useState<AssetOpportunity[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedTicker, setSelectedTicker] = useState<string | null>('NVDA');
  const [isKitModalOpen, setIsKitModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);

  // Active Asset Analysis State
  const [timeframe, setTimeframe] = useState<string>('1d');
  const [activeTab, setActiveTab] = useState<
    'grafico' | 'triplescreen' | 'minervini' | 'flow' | 'ml' | 'rl' | 'backtest' | 'fundamentalista' | 'noticias'
  >('grafico');

  const [candles, setCandles] = useState<HistoricalCandle[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [fundamentals, setFundamentals] = useState<FundamentalsData | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);

  // Fetch opportunities scanner
  const fetchScanner = async () => {
    setIsScanning(true);
    try {
      const res = await fetch(getApiUrl('/api/scan'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          market: 'usa',
          universe: selectedUSUniverse
        })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          setOpportunities(json.data);
          if (json.data.length > 0) {
            const hasCurrent = json.data.some((d: AssetOpportunity) => d.Ticker === selectedTicker);
            if (!hasCurrent) {
              setSelectedTicker(json.data[0].Ticker);
            }
          }
        }
      }
    } catch (err) {
      console.error('Erro ao buscar scanner:', err);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    fetchScanner();
  }, [selectedUSUniverse]);

  // Fetch selected ticker historical candles and details
  useEffect(() => {
    if (!selectedTicker) return;

    let isMounted = true;
    setIsLoadingHistory(true);

    const loadData = async () => {
      try {
        // Fetch historical candles with market param
        const histRes = await fetch(
          getApiUrl(`/api/history/${selectedTicker}?timeframe=${timeframe}&range=1y&market=${market}`)
        );
        if (histRes.ok && isMounted) {
          const histJson = await histRes.json();
          if (histJson.candles && Array.isArray(histJson.candles)) {
            const enriched = enrichCandles(histJson.candles);
            setCandles(enriched);
          }
        }

        // Fetch fundamentals
        const fundRes = await fetch(getApiUrl(`/api/fundamentals/${selectedTicker}?market=${market}`));
        if (fundRes.ok && isMounted) {
          const fundJson = await fundRes.json();
          setFundamentals(fundJson);
        }

        // Fetch news
        const newsRes = await fetch(getApiUrl(`/api/news/${selectedTicker}?market=${market}`));
        if (newsRes.ok && isMounted) {
          const newsJson = await newsRes.json();
          if (newsJson.artigos) {
            setNews(newsJson.artigos);
          }
        }
      } catch (err) {
        console.error(`Erro ao carregar dados de ${selectedTicker}:`, err);
      } finally {
        if (isMounted) setIsLoadingHistory(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [selectedTicker, timeframe, market]);

  // Available Sectors with counts
  const availableSectors = useMemo(() => {
    const counts: Record<string, number> = {};
    opportunities.forEach((op) => {
      const s = op.Setor || 'Outros';
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [opportunities]);

  // Filtered Opportunities List
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((op) => {
      if (selectedSector !== 'all' && (op.Setor || 'Outros') !== selectedSector) return false;
      if (op.Liquidez < minLiquidez) return false;
      if (filterEMA20 && (!op.EMA20 || typeof op.EMA20 !== 'number' || isNaN(op.EMA20) || op.Preco <= op.EMA20)) return false;
      if (filterEMA50 && (!op.EMA50 || typeof op.EMA50 !== 'number' || isNaN(op.EMA50) || op.Preco <= op.EMA50)) return false;
      if (filterEMA200 && (!op.EMA200 || typeof op.EMA200 !== 'number' || isNaN(op.EMA200) || op.Preco <= op.EMA200)) return false;
      return true;
    });
  }, [opportunities, selectedSector, minLiquidez, filterEMA20, filterEMA50, filterEMA200]);

  // Selected Opportunity Object
  const selectedOpp = useMemo(() => {
    return filteredOpportunities.find((o) => o.Ticker === selectedTicker) || filteredOpportunities[0] || null;
  }, [filteredOpportunities, selectedTicker]);

  // Computed Indicators for Active Asset
  const fibonacci: FibonacciLevels = useMemo(() => {
    return calculateFibonacci(candles);
  }, [candles]);

  const tripleScreen: TripleScreenResult = useMemo(() => {
    return calculateTripleScreen(candles);
  }, [candles]);

  const minervini: MinerviniResult = useMemo(() => {
    return calculateMinervini(candles);
  }, [candles]);

  const flowResult: FlowResult = useMemo(() => {
    return calculateFlow(candles);
  }, [candles]);

  const mlPrediction: MLPredictionResult = useMemo(() => {
    return calculateMLPrediction(candles, selectedTicker || 'ATIVO', 5);
  }, [candles, selectedTicker]);

  const rlAgent: RLAgentResult = useMemo(() => {
    return calculateRLAgent(candles, selectedTicker || 'ATIVO');
  }, [candles, selectedTicker]);

  const backtestData: BacktestResult = useMemo(() => {
    return runScannerBacktest(candles);
  }, [candles]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Header */}
      <Header
        onOpenPlayStoreKit={() => setIsKitModalOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Scanner Filters */}
        <ScannerFilters
          selectedUSUniverse={selectedUSUniverse}
          onSelectUSUniverse={setSelectedUSUniverse}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          availableSectors={availableSectors}
          filterEMA20={filterEMA20}
          setFilterEMA20={setFilterEMA20}
          filterEMA50={filterEMA50}
          setFilterEMA50={setFilterEMA50}
          filterEMA200={filterEMA200}
          setFilterEMA200={setFilterEMA200}
          minLiquidez={minLiquidez}
          setMinLiquidez={setMinLiquidez}
          showBacktests={showBacktests}
          setShowBacktests={setShowBacktests}
          isScanning={isScanning}
          onRefresh={fetchScanner}
          totalFiltered={filteredOpportunities.length}
          totalTotal={opportunities.length}
        />

        {/* Didactic Quick-Guide & Educational Instruction Banner */}
        {showDidacticBanner ? (
          <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>{isPt ? 'Instruções Didáticas: Como Usar o Scanner em 3 Passos' : 'Didactic Guide: How to Use the Scanner in 3 Steps'}</span>
                    </h3>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {isPt ? 'Guia Prático' : 'Quick Guide'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {isPt
                      ? 'Dicas práticas para identificar repiques de alta probabilidade e operar com gestão de risco'
                      : 'Practical tips to spot high-probability swing trade bounces with solid risk control'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <button
                  type="button"
                  id="btn-banner-open-tutorial"
                  onClick={() => setIsTutorialOpen(true)}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-md transition cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isPt ? 'Abrir Tutorial Completo' : 'Open Full Tutorial'}</span>
                </button>
                <button
                  type="button"
                  id="btn-banner-dismiss"
                  onClick={() => setShowDidacticBanner(false)}
                  className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  title={isPt ? 'Minimizar Dicas' : 'Minimize Tips'}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3 Didactic Steps Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3.5 text-xs">
              <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 hover:border-blue-500/40 transition">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[11px] font-mono font-bold">1</span>
                  <span>{isPt ? 'Filtrar Sobrevenda (IS)' : 'Filter Oversold (IS)'}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {isPt
                    ? 'Observe a coluna IS (Índice de Sobrevenda). Valores > 70 ou IFR(14) < 30 indicam ativos excessivamente descontados com alta pressão de repique comprador.'
                    : 'Watch the IS (Oversold Index) column. Scores > 70 or RSI(14) < 30 indicate heavily discounted assets primed for a technical bounce.'}
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 hover:border-emerald-500/40 transition">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[11px] font-mono font-bold">2</span>
                  <span>{isPt ? 'Validar Suporte & Fibonacci' : 'Validate Support & Fibonacci'}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {isPt
                    ? 'Clique no ativo para abrir o gráfico. Verifique se o preço repousa sobre a EMA 20/50/200 ou retração de 61.8% de Fibonacci, criando uma barreira de proteção.'
                    : 'Click any asset to open chart analysis. Confirm if the price rests near EMA 20/50/200 or 61.8% Fibonacci, forming a solid technical floor.'}
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 hover:border-amber-500/40 transition">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[11px] font-mono font-bold">3</span>
                  <span>{isPt ? 'Triple Screen de Elder' : 'Triple Screen Strategy'}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {isPt
                    ? 'Acesse a aba Triple Screen: só compre quando a maré semanal for de alta (EMA semanal subindo) e a onda diária estiver em sobrevenda com gatilho de entrada.'
                    : 'Access the Triple Screen tab: enter long only when weekly tide is bullish (rising EMA) and daily wave reaches oversold with an entry trigger.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowDidacticBanner(true)}
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{isPt ? 'Mostrar Instruções Didáticas Rápidas' : 'Show Quick Didactic Guide'}</span>
            </button>
          </div>
        )}

        {/* Tabela de Oportunidades (Lista de Seleção de Ativos) */}
        <OpportunitiesTable
          opportunities={filteredOpportunities}
          selectedTicker={selectedTicker}
          onSelectTicker={(t) => setSelectedTicker(t)}
          selectedSector={selectedSector}
          onSelectSector={setSelectedSector}
          availableSectors={availableSectors}
        />

        {/* Painel Completo de Análise Técnica do Ativo Selecionado */}
        {selectedOpp && (
          <div id="selected-asset-analysis">
            <AssetDetailPanel
              selectedOpp={selectedOpp}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              candles={candles}
              fibonacci={fibonacci}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
              tripleScreen={tripleScreen}
              minervini={minervini}
              flowResult={flowResult}
              mlPrediction={mlPrediction}
              rlAgent={rlAgent}
              backtestData={backtestData}
              fundamentals={fundamentals}
              news={news}
              onClose={() => setSelectedTicker(null)}
            />
          </div>
        )}
      </main>

      {/* Footer & Regulatory / Educational Disclaimer */}
      <footer className="mt-12 border-t border-slate-800 bg-slate-900/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-2.5">
              <img
                src="/bull-emblem.png"
                alt="Wall Street Scanner"
                className="w-6 h-6 object-contain flex-shrink-0"
              />
              <span className="font-semibold text-slate-200">
                Wall Street Scanner Pro (S&P 500, Nasdaq, NYSE, ETFs)
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{t('appSubtitle')}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <ScienceBitLogo variant="badge" size="sm" />
              <span className="bg-slate-800/80 border border-slate-750 text-slate-300 px-2.5 py-1 rounded-lg font-medium text-[11px]">
                Versão 2.0 Wall Street Pro
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <button
                id="footer-btn-tutorial"
                type="button"
                onClick={() => setIsTutorialOpen(true)}
                className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white transition text-[11px] font-bold bg-blue-900/30 hover:bg-blue-800/50 border border-blue-500/40 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                <BookOpen className="w-3 h-3 text-blue-400" />
                <span>Instruções Didáticas</span>
              </button>
              <button
                id="footer-btn-download-assets"
                type="button"
                onClick={() => setIsKitModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition text-[11px] font-medium bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Kit Google Play (Fotos &amp; Assets)</span>
              </button>
              <button
                id="footer-btn-privacy"
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition text-[11px] font-medium bg-slate-800 hover:bg-slate-750 border border-slate-700 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                <FileText className="w-3 h-3 text-blue-400" />
                <span>Política de Privacidade</span>
              </button>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-400">
                © {new Date().getFullYear()} ScienceBit Computer. Todos os direitos reservados.
              </span>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-[11px] leading-relaxed text-slate-400">
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-750">
              <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                <span>⚠️ {t('disclaimerTitle')}</span>
              </p>
              <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded">
                Finalidade Educacional
              </span>
            </div>
            <p>
              {t('disclaimerText')}
            </p>
            <p className="mt-1.5">
              <strong>Fontes de Dados &amp; Moedas:</strong> Cotações em dólares (US$) com dados de Wall Street (S&P 500, Nasdaq 100, Dow Jones, Russell 2000 e ETFs setoriais).
            </p>
          </div>
        </div>
      </footer>

      {/* Didactic Tutorial Modal */}
      <DidacticTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {/* Play Store Assets Modal */}
      <PlayStoreKitModal
        isOpen={isKitModalOpen}
        onClose={() => setIsKitModalOpen(false)}
        appUrl={typeof window !== 'undefined' ? window.location.origin : ''}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};
