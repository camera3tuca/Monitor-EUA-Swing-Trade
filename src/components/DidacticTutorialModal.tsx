import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Brain,
  ShieldCheck,
  Compass,
  Award,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Flame,
  Info
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface DidacticTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TutorialTab = 'introducao' | 'tabela' | 'modelos' | 'checklist' | 'risco';

export const DidacticTutorialModal: React.FC<DidacticTutorialModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TutorialTab>('introducao');
  const isPt = language === 'pt';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-blue-500/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 px-5 py-4 border-b border-slate-700/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isPt ? 'Instruções Didáticas do Scanner' : 'Didactic Guide & Tutorial'}
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {isPt ? 'Fácil de Entender' : 'Beginner Friendly'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isPt
                  ? 'Aprenda como interpretar os dados, identificar repiques e operar com segurança'
                  : 'Learn how to interpret signals, spot technical bounces, and trade safely'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title={isPt ? 'Fechar Guia' : 'Close Guide'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/70 border-b border-slate-800 overflow-x-auto shrink-0 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('introducao')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'introducao'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>{isPt ? '1. Como Funciona' : '1. How It Works'}</span>
          </button>

          <button
            onClick={() => setActiveTab('tabela')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'tabela'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>{isPt ? '2. Lendo a Tabela' : '2. Reading Table'}</span>
          </button>

          <button
            onClick={() => setActiveTab('modelos')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'modelos'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Brain className="w-4 h-4 text-purple-400" />
            <span>{isPt ? '3. Modelos Avançados' : '3. Advanced Models'}</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isPt ? '4. Passo a Passo do Trader' : '4. 5-Step Checklist'}</span>
          </button>

          <button
            onClick={() => setActiveTab('risco')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'risco'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>{isPt ? '5. Gestão de Risco' : '5. Risk Management'}</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-300 text-xs sm:text-sm">
          {/* TAB 1: INTRODUCAO */}
          {activeTab === 'introducao' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 p-4 sm:p-5 rounded-2xl border border-blue-500/30 space-y-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  {isPt ? 'Qual é o Objetivo do Wall Street Scanner?' : 'What is the Goal of the Wall Street Scanner?'}
                </h4>
                <p className="leading-relaxed text-slate-300">
                  {isPt
                    ? 'O aplicativo monitora continuamente centenas de ações e ETFs do mercado americano (S&P 500, Nasdaq 100, NYSE e Dow Jones) procurando um cenário muito específico e lucrativo: empresas de excelente qualidade que sofreram uma queda rápida e exagerada (sobrevenda técnica).'
                    : 'The application continuously monitors hundreds of US stocks and ETFs (S&P 500, Nasdaq 100, NYSE, and Dow Jones) searching for a specific and profitable scenario: high-quality companies experiencing a rapid, exaggerated technical oversold dip.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-emerald-400 font-bold block mb-1">
                      {isPt ? '📉 1. A Queda Exagerada' : '📉 1. The Oversold Dip'}
                    </span>
                    <span className="text-[11px] text-slate-400 leading-tight block">
                      {isPt
                        ? 'O preço cai rápido devido a ruídos momentâneos de mercado, atingindo níveis extremos de exaustão vendedora.'
                        : 'Price drops quickly due to short-term market noise, hitting extreme selling exhaustion levels.'}
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-blue-400 font-bold block mb-1">
                      {isPt ? '⚡ 2. O Scanner Detecta' : '⚡ 2. Scanner Detects'}
                    </span>
                    <span className="text-[11px] text-slate-400 leading-tight block">
                      {isPt
                        ? 'Algoritmos quantitativos combinam RSI, Suportes de Fibonacci e Médias Móveis para ranquear as melhores chances.'
                        : 'Quantitative algorithms combine RSI, Fibonacci Supports, and Moving Averages to rank the highest-probability setups.'}
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-amber-400 font-bold block mb-1">
                      {isPt ? '🚀 3. O Repique (Swing Trade)' : '🚀 3. Technical Bounce'}
                    </span>
                    <span className="text-[11px] text-slate-400 leading-tight block">
                      {isPt
                        ? 'O investidor entra na reversão para capturar a recuperação nos dias ou semanas seguintes com alvo definido.'
                        : 'Traders enter on the reversal to capture the bounce over the next days or weeks toward pre-calculated targets.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Core Rules */}
              <div className="space-y-3">
                <h5 className="font-bold text-white text-sm flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  {isPt ? 'As 3 Regras Fundamentais para Não Errar:' : '3 Fundamental Golden Rules:'}
                </h5>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">
                        {isPt ? 'Opere a Favor da Tendência Maior (EMA 200)' : 'Trade With The Primary Trend (EMA 200)'}
                      </strong>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {isPt
                          ? 'Dê preferência para ações cujo preço ainda esteja ACIMA da Média Móvel de 200 períodos. Quando uma ação em tendência de alta sofre um recuo, a chance de repique positivo é muito maior do que em uma empresa falindo.'
                          : 'Prioritize stocks whose price is ABOVE the 200-day EMA. When an uptrending stock pulls back, bounce probabilities are vastly higher than in a crumbling stock.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">
                        {isPt ? 'Espere o Candlestick de Confirmação' : 'Wait for the Reversal Candlestick'}
                      </strong>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {isPt
                          ? 'Nunca compre uma faca caindo sem reação. Procure por candles com sombras inferiores longas (martelo, pinbar) ou fechamentos positivos testando o suporte.'
                          : 'Never catch a falling knife blindly. Look for lower-wick rejections (hammer, pinbar) or a green day testing support.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">
                        {isPt ? 'Respeite Sempre o Stop Loss' : 'Always Respect Your Stop Loss'}
                      </strong>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {isPt
                          ? 'Se o mercado romper a mínima do suporte, saia da operação. O segredo da consistência é perder pouco nas operações erradas e lucrar bem nas certas.'
                          : 'If market breaks below support lows, exit immediately. Long-term success is keeping losses small and letting winners run to targets.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TABELA DE OPORTUNIDADES */}
          {activeTab === 'tabela' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h4 className="text-base font-bold text-white mb-2">
                  {isPt ? 'O que Significa Cada Coluna da Tabela?' : 'Understanding Every Column in the Table'}
                </h4>
                <p className="text-slate-400 text-xs mb-4">
                  {isPt
                    ? 'A tabela classifica os ativos em tempo real do maior para o menor potencial de repique.'
                    : 'The opportunities table ranks assets in real-time from highest to lowest rebound potential.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      {isPt ? 'Índice de Sobrevenda (IS)' : 'Oversold Index (IS)'}
                    </span>
                    <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                      0 a 100 pts
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isPt
                      ? 'É a métrica principal do scanner. Combina a velocidade da queda, distância das médias e múltiplos osciladores.'
                      : 'The primary scanner score. Combines drop velocity, distance from moving averages, and multiple oscillators.'}
                  </p>
                  <div className="bg-slate-950/60 p-2 rounded-lg text-[11px] font-mono space-y-1 text-slate-400">
                    <div>• <span className="text-emerald-400">&gt; 70 pts:</span> {isPt ? 'Sobrevenda Extrema (Forte Potencial)' : 'Extreme Oversold (High Potential)'}</div>
                    <div>• <span className="text-amber-400">50 - 70 pts:</span> {isPt ? 'Correção Saudável (Em Monitoramento)' : 'Healthy Pullback (Watchlist)'}</div>
                    <div>• <span className="text-slate-500">&lt; 50 pts:</span> {isPt ? 'Zona Neutra' : 'Neutral Zone'}</div>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      {isPt ? 'RSI / IFR (14 períodos)' : 'RSI (14 periods)'}
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                      0 a 100
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isPt
                      ? 'Índice de Força Relativa de J. Welles Wilder. Mede o momentum e esgotamento da pressão vendedora.'
                      : 'Relative Strength Index. Measures momentum and exhaustion of selling pressure.'}
                  </p>
                  <div className="bg-slate-950/60 p-2 rounded-lg text-[11px] font-mono space-y-1 text-slate-400">
                    <div>• <span className="text-emerald-400">&lt; 30:</span> {isPt ? 'Sobrevenda Técnica Clássica (Gatilho)' : 'Classic Oversold (Trigger Zone)'}</div>
                    <div>• <span className="text-cyan-400">30 a 40:</span> {isPt ? 'Zona de Oportunidade em Formação' : 'Forming Opportunity Zone'}</div>
                    <div>• <span className="text-rose-400">&gt; 70:</span> {isPt ? 'Sobrecompra (Não Comprar)' : 'Overbought (Do Not Buy)'}</div>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      {isPt ? 'Médias Móveis (EMA 20, 50, 200)' : 'Moving Averages (EMA 20, 50, 200)'}
                    </span>
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                      Tendência
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isPt
                      ? 'A EMA 20 indica o curto prazo; a EMA 50 o médio prazo; e a EMA 200 é o divisor de águas institucional entre mercado em alta (Bull Market) e baixa (Bear Market).'
                      : 'EMA 20 shows short term; EMA 50 medium term; EMA 200 is institutional divider between Bull and Bear markets.'}
                  </p>
                  <div className="bg-slate-950/60 p-2 rounded-lg text-[11px] font-mono text-slate-400">
                    💡 <span className="text-amber-300">{isPt ? 'Dica de ouro:' : 'Golden tip:'}</span> {isPt ? 'Ative o filtro "Acima EMA 200" para operar apenas ativos institucionalmente fortes.' : 'Enable "Above EMA 200" filter to focus only on fundamentally sound leaders.'}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      {isPt ? 'Alvos de Fibonacci' : 'Fibonacci Targets'}
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                      38.2% | 50% | 61.8%
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isPt
                      ? 'Calcula matematicamente onde o repique deve encontrar as primeiras resistências para você realizar o lucro sem precisar adivinhar o topo.'
                      : 'Mathematically calculates where rebounds encounter initial resistances so you can take profit systematically.'}
                  </p>
                  <div className="bg-slate-950/60 p-2 rounded-lg text-[11px] font-mono text-slate-400">
                    🎯 <span className="text-purple-300">{isPt ? 'Alvo 1 (38.2%):' : 'Target 1 (38.2%):'}</span> {isPt ? 'Primeira realização parcial recomendada.' : 'Recommended first partial exit.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MODELOS AVANCADOS */}
          {activeTab === 'modelos' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  {isPt ? 'Como Interpretar os Modelos Analíticos do Painel' : 'How to Interpret the Analytical Panel Models'}
                </h4>
                <p className="text-slate-400 text-xs">
                  {isPt
                    ? 'Ao clicar em qualquer ação da tabela, o painel inferior exibe 8 ferramentas de validação:'
                    : 'Clicking any stock in the table unlocks 8 advanced institutional validation tools:'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white text-xs font-bold block">
                      {isPt ? 'Triple Screen de Alexander Elder' : "Alexander Elder's Triple Screen"}
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isPt
                        ? 'Baseia-se em 3 telas temporais: Tela 1 (Gráfico Semanal) define a maré da tendência; Tela 2 (Gráfico Diário) identifica a onda contrária (recuo); Tela 3 (Gatilho) define o ponto exato de entrada quando a onda se alinha à maré.'
                        : 'Uses 3 timeframes: Screen 1 (Weekly) defines tide trend; Screen 2 (Daily) spots counter-wave pullbacks; Screen 3 (Trigger) executes entry as the wave re-aligns with tide.'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white text-xs font-bold block">
                      {isPt ? 'Template de Tendência Mark Minervini (SEPA)' : 'Mark Minervini Trend Template (SEPA)'}
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isPt
                        ? 'Testa as 8 condições estritas do lendário campeão de trading americano (preço acima de EMA 50 e 200, médias alinhadas, mínima do ano superada em 30%). Se o ativo tiver 7/8 ou 8/8, o ativo é uma superação institucional.'
                        : 'Tests 8 strict criteria of the US investing champion (price above 50 & 200 EMA, aligned moving averages, >30% off 52-week low). Scores of 7/8 or 8/8 signal high-conviction institutional leadership.'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white text-xs font-bold block">
                      {isPt ? 'Análise de Fluxo (Flow & Money Flow Index)' : 'Institutional Flow & MFI'}
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isPt
                        ? 'Rastreia a movimentação do dinheiro inteligente (Smart Money). Se o preço caiu mas o MFI e o volume mostram acumulação silenciosa, indica que os grandes fundos estão comprando no desconto.'
                        : 'Tracks smart money institutional footprints. If price drops while MFI shows divergence or quiet accumulation, large funds are buying the dip.'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-bold">
                    4
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white text-xs font-bold block">
                      {isPt ? 'Modelos de Inteligência Artificial (ML & RL Agent)' : 'AI Machine Learning & RL Agent'}
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isPt
                        ? 'O modelo ensemble prevê a probabilidade estatística de valorização nos próximos 5 a 10 dias úteis, enquanto o agente de aprendizado por reforço simula a decisão de um gestor quantitativo (Comprar, Manter ou Aguardar).'
                        : 'Ensemble ML predicts statistical odds of positive performance over 5-10 trading days, while Reinforcement Learning agent acts like an autonomous quant portfolio manager.'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                    5
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white text-xs font-bold block">
                      {isPt ? 'Backtest Histórico Real' : 'Historical Real Backtest'}
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isPt
                        ? 'Mostra a taxa de acerto histórica (% Win Rate) e o Payoff das últimas vezes que essa mesma regra disparou no ativo selecionado. Se o histórico teve > 70% de acerto, sua confiança estatística aumenta.'
                        : 'Displays real historical win rates and payoff ratios whenever this setup triggered on this specific ticker. Win rates > 70% provide empirical edge.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHECKLIST DO TRADER */}
          {activeTab === 'checklist' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850">
                <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  {isPt ? 'Checklist de 5 Minutos Antes de Fazer uma Operação' : '5-Minute Trader Checklist Before Executing'}
                </h4>
                <p className="text-slate-400 text-xs">
                  {isPt
                    ? 'Siga esta sequência prática simples toda vez que abrir o scanner:'
                    : 'Follow this exact, step-by-step checklist whenever you use the scanner:'}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-emerald-500/30">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    1
                  </span>
                  <div>
                    <h5 className="font-bold text-white">
                      {isPt ? 'Passo 1: Selecione o Universo e Filtro EMA 200' : 'Step 1: Choose Universe & EMA 200 Filter'}
                    </h5>
                    <p className="text-slate-400 mt-0.5">
                      {isPt
                        ? 'No topo do app, escolha S&P 500 ou Nasdaq e marque a caixinha "Acima EMA 200". Isso garante que você só operará ações fortes em tendência primária.'
                        : 'Select S&P 500 or Nasdaq 100, then check "Above EMA 200" to filter exclusively for resilient leaders in secular uptrends.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-emerald-500/30">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    2
                  </span>
                  <div>
                    <h5 className="font-bold text-white">
                      {isPt ? 'Passo 2: Escolha um Ativo com Alto Índice de Sobrevenda' : 'Step 2: Pick Assets with IS > 70 & RSI < 35'}
                    </h5>
                    <p className="text-slate-400 mt-0.5">
                      {isPt
                        ? 'Na tabela, clique nas primeiras posições com IS > 70 e RSI abaixo de 35. Esses ativos já esgotaram a força de queda.'
                        : 'Click top rows featuring IS > 70 and RSI < 35. These tickers are at technical exhaustion.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-emerald-500/30">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    3
                  </span>
                  <div>
                    <h5 className="font-bold text-white">
                      {isPt ? 'Passo 3: Abra o Gráfico e Localize o Suporte de Fibonacci' : 'Step 3: Check Chart & Fibonacci Support'}
                    </h5>
                    <p className="text-slate-400 mt-0.5">
                      {isPt
                        ? 'Verifique se o preço atual está encostando em um suporte relevante (Fibonacci 50% ou 61.8%) e se formou um candle de rejeição (sombra inferior).'
                        : 'Verify if current price is testing key Fibonacci levels (50% or 61.8%) and showing rejection wicks.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-emerald-500/30">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    4
                  </span>
                  <div>
                    <h5 className="font-bold text-white">
                      {isPt ? 'Passo 4: Verifique a IA e os Modelos de Validação' : 'Step 4: Check AI Probability & Validation Tabs'}
                    </h5>
                    <p className="text-slate-400 mt-0.5">
                      {isPt
                        ? 'Nas abas do painel, veja se a IA indica probabilidade > 65% de repique e se o modelo Triple Screen não está em veto semanal.'
                        : 'Check if ML predicts > 65% probability and Triple Screen confirms weekly macro support.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-emerald-500/30">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    5
                  </span>
                  <div>
                    <h5 className="font-bold text-white">
                      {isPt ? 'Passo 5: Calcule o Stop Loss Antes de Entrar na Corretora' : 'Step 5: Pre-set Stop Loss in Your Brokerage'}
                    </h5>
                    <p className="text-slate-400 mt-0.5">
                      {isPt
                        ? 'Abra sua corretora (Avenue, Nomad, Interactive Brokers, Charles Schwab, etc.), defina a ordem de compra e posicione a ordem Stop Loss logo abaixo da mínima do suporte.'
                        : 'Open your brokerage, submit your buy limit/market order, and immediately set your stop-loss below support.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GESTAO DE RISCO */}
          {activeTab === 'risco' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-500/30 space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-rose-400" />
                  {isPt ? 'A Chave da Sobrevivência e Lucro no Mercado Financeiro' : 'The Key to Long-Term Trading Survival & Profit'}
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {isPt
                    ? 'No Swing Trade, o trader vencedor não é quem acerta 100% das vezes, mas quem perde pouco nas operações ruins e ganha muito nas operações boas (Risco/Retorno positivo de 1 para 2 ou 1 para 3).'
                    : 'Successful swing trading is not about 100% win rate; it is about keeping inevitable losses tiny and letting winners expand to full targets (1:2 or 1:3 risk-to-reward ratio).'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">📏</span>
                    {isPt ? 'Regra de Ouro do 1% a 2%' : 'The 1% - 2% Risk Rule'}
                  </h5>
                  <p className="text-slate-400 leading-relaxed">
                    {isPt
                      ? 'Nunca arrisque perder mais de 1% a 2% do seu patrimônio total em um único trade se o Stop Loss for acionado. Por exemplo: se você tem US$ 5.000, sua perda máxima tolerada em uma operação deve ser de US$ 50 a US$ 100.'
                      : 'Never risk losing more than 1% to 2% of total capital on a single stopped trade. With a $5,000 portfolio, maximum acceptable loss per trade is $50 - $100.'}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">💰</span>
                    {isPt ? 'Realização Parcial de Lucro (Alvo 1)' : 'Partial Profit Taking (Target 1)'}
                  </h5>
                  <p className="text-slate-400 leading-relaxed">
                    {isPt
                      ? 'Quando a ação atingir o primeiro alvo de Fibonacci (38.2%), venda metade da posição e garanta o lucro. Em seguida, mova seu Stop Loss para o preço de entrada (Breakeven). Assim, a operação torna-se livre de risco!'
                      : 'When the stock hits Target 1 (38.2% Fibo), sell half and lock in gains. Move your stop to breakeven so the trade is 100% risk-free!'}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-blue-400 font-bold">📅</span>
                    {isPt ? 'Atenção ao Calendário de Balanços (Earnings)' : 'Beware of Earnings Releases'}
                  </h5>
                  <p className="text-slate-400 leading-relaxed">
                    {isPt
                      ? 'Evite abrir operações de Swing Trade exatamente no dia da divulgação dos resultados trimestrais (Earnings), pois os gaps podem pular o Stop Loss. Opere após a divulgação e o repique técnico.'
                      : 'Avoid opening positions right on the quarterly earnings release date to prevent overnight gap risks. Trade the post-earnings technical rebound instead.'}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-purple-400 font-bold">🧠</span>
                    {isPt ? 'Disciplina Psicológica' : 'Psychological Discipline'}
                  </h5>
                  <p className="text-slate-400 leading-relaxed">
                    {isPt
                      ? 'Não corra atrás de ativos que já subiram muito. O scanner existe especificamente para encontrar as ações quando ninguém quer olhar (no desconto), permitindo comprar barato e vender na alta.'
                      : 'Never chase stocks after they already ran up. The scanner exists to spot opportunities when prices are on sale, letting you buy low and sell high.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3.5 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {isPt
                ? 'Wall Street Scanner • Metodologia quantitativa para o investidor moderno'
                : 'Wall Street Scanner • Quantitative methodology for modern traders'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-lg shadow-blue-900/30"
          >
            {isPt ? 'Entendi, Vamos Operar!' : 'Got It, Let’s Trade!'}
          </button>
        </div>
      </div>
    </div>
  );
};
