import React from 'react';
import {
  AssetOpportunity,
  HistoricalCandle,
  FibonacciLevels,
  TripleScreenResult,
  MinerviniResult,
  FlowResult,
  MLPredictionResult,
  RLAgentResult,
  BacktestResult,
  FundamentalsData,
  NewsArticle
} from '../types';
import { TechnicalChart } from './TechnicalChart';
import { TripleScreenPanel } from './panels/TripleScreenPanel';
import { MinerviniPanel } from './panels/MinerviniPanel';
import { FlowPanel } from './panels/FlowPanel';
import { MLPredictionPanel } from './panels/MLPredictionPanel';
import { RLAgentPanel } from './panels/RLAgentPanel';
import { BacktestPanel } from './panels/BacktestPanel';
import { FundamentalsPanel } from './panels/FundamentalsPanel';
import { NewsSentimentPanel } from './panels/NewsSentimentPanel';
import { getSectorStyle } from '../utils/sectorUtils';
import { useLanguage } from '../i18n/LanguageContext';
import { formatCurrency } from '../utils/currencyUtils';
import {
  BarChart2,
  Compass,
  Award,
  Activity,
  Brain,
  Bot,
  History,
  Landmark,
  Newspaper,
  Lightbulb,
  BookOpen,
  X
} from 'lucide-react';

export type TabType = 'grafico' | 'triplescreen' | 'minervini' | 'flow' | 'ml' | 'rl' | 'backtest' | 'fundamentalista' | 'noticias';

interface AssetDetailPanelProps {
  selectedOpp: AssetOpportunity;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  candles: HistoricalCandle[];
  fibonacci: FibonacciLevels;
  timeframe: string;
  setTimeframe: (tf: string) => void;
  tripleScreen: TripleScreenResult;
  minervini: MinerviniResult;
  flowResult: FlowResult;
  mlPrediction: MLPredictionResult;
  rlAgent: RLAgentResult;
  backtestData: BacktestResult;
  fundamentals: FundamentalsData | null;
  news: NewsArticle[];
  onClose?: () => void;
}

export const AssetDetailPanel: React.FC<AssetDetailPanelProps> = ({
  selectedOpp,
  activeTab,
  setActiveTab,
  candles,
  fibonacci,
  timeframe,
  setTimeframe,
  tripleScreen,
  minervini,
  flowResult,
  mlPrediction,
  rlAgent,
  backtestData,
  fundamentals,
  news,
  onClose
}) => {
  const { t } = useLanguage();
  const currency = selectedOpp.currency || 'USD';

  return (
    <div id="asset-detail-section" className="space-y-4 p-2 sm:p-4 bg-slate-900/95 border border-blue-500/40 rounded-xl shadow-xl w-full max-w-full overflow-hidden transition-all duration-300">
      {/* Asset Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-850 to-slate-800 border border-slate-700/90 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-mono font-extrabold text-blue-300 text-lg shadow-inner shrink-0">
            {selectedOpp.Ticker.slice(0, 4)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-extrabold text-white font-mono">{selectedOpp.Ticker}</h2>
              {selectedOpp.exchange && (
                <span className="bg-blue-600/30 text-blue-200 border border-blue-500/40 text-xs px-2 py-0.5 rounded font-bold">
                  {selectedOpp.exchange}
                </span>
              )}
              <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded font-semibold">
                {selectedOpp.Classe}
              </span>
              {selectedOpp.Setor && (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getSectorStyle(selectedOpp.Setor).badgeClass}`}>
                  <span className={`w-2 h-2 rounded-full ${getSectorStyle(selectedOpp.Setor).dotColor}`} />
                  {selectedOpp.Setor}
                </span>
              )}
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold px-2 py-0.5 rounded">
                {selectedOpp.Queda_Dia.toFixed(2)}%
              </span>
              {selectedOpp.Gap !== 0 && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono px-2 py-0.5 rounded">
                  Gap: {selectedOpp.Gap > 0 ? '+' : ''}{selectedOpp.Gap.toFixed(2)}%
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5">{selectedOpp.Empresa}</p>
          </div>
        </div>

        {/* Fast Stats Bar & Close Button */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
          <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl">
            <span className="text-slate-400">{t('price')}:</span> <strong className="text-white">{formatCurrency(selectedOpp.Preco, currency)}</strong>
          </div>
          <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl">
            <span className="text-slate-400">{t('colIS')}:</span> <strong className="text-emerald-400">{selectedOpp.IS}</strong>
          </div>
          <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl">
            <span className="text-slate-400">RSI(14):</span> <strong className={selectedOpp.RSI14 < 30 ? 'text-emerald-400' : 'text-slate-300'}>{selectedOpp.RSI14}</strong>
          </div>
          <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl">
            <span className="text-slate-400">Score:</span> <strong className="text-amber-400">{selectedOpp.Score}/10</strong>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="ml-auto md:ml-2 p-1.5 bg-slate-700/60 hover:bg-rose-600/80 hover:text-white text-slate-300 rounded-xl transition cursor-pointer flex items-center gap-1 text-xs font-sans font-semibold"
              title={t('closeAnalysis')}
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">{t('closeAnalysis')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Analysis Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 scrollbar-none text-xs select-none">
        <button
          id="tab-chart"
          type="button"
          onClick={() => setActiveTab('grafico')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'grafico'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>{t('tabChart')}</span>
        </button>

        <button
          id="tab-triplescreen"
          type="button"
          onClick={() => setActiveTab('triplescreen')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'triplescreen'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{t('tabTripleScreen')}</span>
        </button>

        <button
          id="tab-minervini"
          type="button"
          onClick={() => setActiveTab('minervini')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'minervini'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{t('tabMinervini')}</span>
        </button>

        <button
          id="tab-flow"
          type="button"
          onClick={() => setActiveTab('flow')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'flow'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{t('tabFlow')}</span>
        </button>

        <button
          id="tab-ml"
          type="button"
          onClick={() => setActiveTab('ml')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'ml'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>{t('tabML')}</span>
        </button>

        <button
          id="tab-rl"
          type="button"
          onClick={() => setActiveTab('rl')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'rl'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>{t('tabRL')}</span>
        </button>

        <button
          id="tab-backtest"
          type="button"
          onClick={() => setActiveTab('backtest')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'backtest'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{t('tabBacktest')}</span>
        </button>

        <button
          id="tab-fundamentalista"
          type="button"
          onClick={() => setActiveTab('fundamentalista')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'fundamentalista'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>{t('tabFundamentals')}</span>
        </button>

        <button
          id="tab-noticias"
          type="button"
          onClick={() => setActiveTab('noticias')}
          className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'noticias'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>{t('tabNews')}</span>
        </button>
      </div>

      {/* Didactic Instruction Banner for the Active Tab */}
      {(() => {
        const isPt = (t('live') === 'AO VIVO' || t('scanBtn') === 'Escanear Mercado' || !t('live'));
        const tips: Record<TabType, { title: string; desc: string }> = {
          grafico: {
            title: isPt ? 'Como interpretar o Gráfico & Suportes:' : 'How to interpret Chart & Fibonacci Supports:',
            desc: isPt
              ? 'Observe se o preço recente tocou os suportes de Fibonacci (38.2%, 50% ou 61.8%) e se formou um candle com pavio inferior (rejeição de mínimas). É esse o gatilho clássico do repique de Swing Trade.'
              : 'Check if recent price touches key Fibonacci supports (38.2%, 50% or 61.8%) with lower-wick rejection candles. This is the classic swing trade rebound trigger.',
          },
          triplescreen: {
            title: isPt ? 'Como interpretar o Triple Screen de Alexander Elder:' : 'How to interpret Alexander Elder Triple Screen:',
            desc: isPt
              ? 'A Tela 1 (Semanal) define a tendência maior (maré). A Tela 2 (Diária) detecta a onda contrária (recuo). A Tela 3 aciona a compra quando a onda diária se realinha à maré semanal.'
              : 'Screen 1 (Weekly) defines the macro tide trend. Screen 2 (Daily) spots counter-trend pullbacks. Screen 3 triggers entry when the daily wave aligns with the weekly tide.',
          },
          minervini: {
            title: isPt ? 'Como interpretar o Template de Tendência Minervini (SEPA):' : 'How to interpret Minervini Trend Template (SEPA):',
            desc: isPt
              ? 'Pontuações de 7/8 ou 8/8 confirmam que o ativo é um líder institucional com todas as médias móveis alinhadas para cima e espaço para valorização rápida.'
              : 'Scores of 7/8 or 8/8 confirm the asset is an institutional market leader with aligned moving averages and room for swift momentum expansion.',
          },
          flow: {
            title: isPt ? 'Como interpretar o Fluxo Institucional (Money Flow):' : 'How to interpret Institutional Money Flow (MFI):',
            desc: isPt
              ? 'Se o preço caiu mas o MFI e o saldo de volume mostram acumulação ou divergência de alta, grandes investidores institucionais estão absorvendo a venda no desconto.'
              : 'If price pulled back while MFI shows divergence or positive volume accumulation, large institutions are quietly accumulating on the dip.',
          },
          ml: {
            title: isPt ? 'Como interpretar a Previsão de Machine Learning:' : 'How to interpret Machine Learning AI Predictions:',
            desc: isPt
              ? 'O modelo ensemble calcula a probabilidade estatística de retorno positivo nos próximos 5 a 10 dias. Probabilidades acima de 65% representam forte assimetria a favor do comprador.'
              : 'The ensemble model computes statistical odds of positive returns over the next 5 to 10 trading sessions. Odds > 65% represent favorable upside asymmetry.',
          },
          rl: {
            title: isPt ? 'Como interpretar a Recomendação do Agente RL:' : 'How to interpret the Reinforcement Learning Agent:',
            desc: isPt
              ? 'O agente treinado por reforço simula as decisões de um gestor quantitativo, ponderando volatilidade, distância para o alvo e risco de perda antes de recomendar COMPRA.'
              : 'The reinforcement learning agent acts as an autonomous quant portfolio manager, balancing volatility, target distance, and drawdown risk before recommending BUY.',
          },
          backtest: {
            title: isPt ? 'Como interpretar o Backtest Histórico:' : 'How to interpret Historical Backtest Statistics:',
            desc: isPt
              ? 'Mostra o resultado real das últimas operações disparadas com estes mesmos critérios neste ativo. Taxas de acerto acima de 65% e Payoff > 1.5 validam a vantagem estatística.'
              : 'Shows empirical results of past signals on this specific ticker. Win rates > 65% and Payoff > 1.5 confirm a mathematically robust edge.',
          },
          fundamentalista: {
            title: isPt ? 'Como interpretar os Indicadores Fundamentalistas:' : 'How to interpret Fundamental Ratios:',
            desc: isPt
              ? 'Empresas com boa lucratividade (ROE > 15%, margens saudáveis e P/L equilibrado) tendem a se recuperar muito mais rápido após correções do mercado.'
              : 'Companies with solid earnings power (ROE > 15%, healthy margins, fair P/E) recover substantially faster and safer following market dips.',
          },
          noticias: {
            title: isPt ? 'Como interpretar o Sentimento das Notícias:' : 'How to interpret News Sentiment:',
            desc: isPt
              ? 'Quedas causadas por ruídos macroeconômicos passageiros geram excelentes compras de repique. Já quedas com escândalos ou fraudes graves devem ser evitadas.'
              : 'Dips sparked by transient macro headlines yield high-reward swing setups, whereas structural corporate scandals should be avoided.',
          },
        };
        const currentTip = tips[activeTab] || tips.grafico;

        return (
          <div className="bg-gradient-to-r from-blue-950/30 via-slate-900 to-indigo-950/30 border border-blue-500/30 rounded-xl p-3 flex items-start gap-2.5 text-xs">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-blue-300 font-bold mr-1.5">{currentTip.title}</strong>
              <span className="text-slate-300">{currentTip.desc}</span>
            </div>
          </div>
        );
      })()}

      {/* Tab View Content */}
      <div className="pt-2">
        {activeTab === 'grafico' && (
          <div className="space-y-4">
            <TechnicalChart
              candles={candles}
              fibonacci={fibonacci}
              ticker={selectedOpp.Ticker}
              timeframe={timeframe}
              onChangeTimeframe={(tf) => setTimeframe(tf)}
              currency={currency}
            />

            {/* Fibonacci Summary Bar */}
            {fibonacci && fibonacci.high > 0 && (
              <div className="bg-slate-850 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold uppercase">Posição Fibonacci:</span>
                  <span className="text-yellow-400 font-bold bg-yellow-500/10 px-2.5 py-1 rounded-lg border border-yellow-500/20">
                    {fibonacci.currentNear}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-slate-300">
                  <div>Topo 100%: <strong className="text-white">{formatCurrency(fibonacci.fib0, currency)}</strong></div>
                  <div>Fibo 38.2%: <strong className="text-slate-200">{formatCurrency(fibonacci.fib382, currency)}</strong></div>
                  <div>Fibo 50.0%: <strong className="text-slate-200">{formatCurrency(fibonacci.fib500, currency)}</strong></div>
                  <div>Fibo 61.8% (Golden Zone): <strong className="text-yellow-400 font-bold">{formatCurrency(fibonacci.fib618, currency)}</strong></div>
                  <div>Fundo 0%: <strong className="text-white">{formatCurrency(fibonacci.fib100, currency)}</strong></div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'triplescreen' && (
          <TripleScreenPanel data={tripleScreen} ticker={selectedOpp.Ticker} />
        )}

        {activeTab === 'minervini' && (
          <MinerviniPanel data={minervini} ticker={selectedOpp.Ticker} />
        )}

        {activeTab === 'flow' && (
          <FlowPanel data={flowResult} ticker={selectedOpp.Ticker} />
        )}

        {activeTab === 'ml' && (
          <MLPredictionPanel data={mlPrediction} ticker={selectedOpp.Ticker} />
        )}

        {activeTab === 'rl' && (
          <RLAgentPanel data={rlAgent} ticker={selectedOpp.Ticker} />
        )}

        {activeTab === 'backtest' && (
          <BacktestPanel data={backtestData} ticker={selectedOpp.Ticker} />
        )}

        {activeTab === 'fundamentalista' && fundamentals && (
          <FundamentalsPanel data={fundamentals} ticker={selectedOpp.Ticker} />
        )}

        {activeTab === 'noticias' && (
          <NewsSentimentPanel articles={news} ticker={selectedOpp.Ticker} />
        )}
      </div>
    </div>
  );
};
