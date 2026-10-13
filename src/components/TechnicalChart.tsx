import React, { useState, useMemo, useRef } from 'react';
import { HistoricalCandle, FibonacciLevels } from '../types';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  BarChart2,
  TrendingUp,
  Maximize2,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Info,
  Flame
} from 'lucide-react';

interface TechnicalChartProps {
  candles: HistoricalCandle[];
  fibonacci: FibonacciLevels;
  ticker: string;
  timeframe: string;
  onChangeTimeframe: (tf: string) => void;
  currency?: string;
}

export const TechnicalChart: React.FC<TechnicalChartProps> = ({
  candles,
  fibonacci,
  ticker,
  timeframe,
  onChangeTimeframe,
  currency = 'USD',
}) => {
  const [chartMode, setChartMode] = useState<'candle' | 'line'>('candle');
  const [rangeFilter, setRangeFilter] = useState<'all' | '6m' | '3m' | '1m' | '15d'>('3m');
  const [showEMA20, setShowEMA20] = useState(true);
  const [showEMA50, setShowEMA50] = useState(true);
  const [showEMA200, setShowEMA200] = useState(true);
  const [showBollinger, setShowBollinger] = useState(true);
  const [showFibonacci, setShowFibonacci] = useState(true);
  const [showConfirmationMarkers, setShowConfirmationMarkers] = useState(true);
  const [showVisualGuide, setShowVisualGuide] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Filter candles based on range
  const visibleCandles = useMemo(() => {
    if (!candles || !Array.isArray(candles) || candles.length === 0) return [];
    if (rangeFilter === '15d') return candles.slice(-15);
    if (rangeFilter === '1m') return candles.slice(-22);
    if (rangeFilter === '3m') return candles.slice(-66);
    if (rangeFilter === '6m') return candles.slice(-130);
    return candles;
  }, [candles, rangeFilter]);

  // Dimensions
  const width = 800;
  const heightMain = 340;
  const heightSub = 80;
  const padding = { top: 20, right: 65, bottom: 25, left: 15 };

  // Calculate scales with safe bounds
  const n = visibleCandles.length;

  const { yMin, yMax, maxVol } = useMemo(() => {
    if (n === 0) {
      return { yMin: 10, yMax: 20, maxVol: 1000 };
    }
    const prices: number[] = [];
    const vols: number[] = [];

    visibleCandles.forEach(c => {
      if (typeof c.low === 'number' && !isNaN(c.low) && isFinite(c.low)) prices.push(c.low);
      if (typeof c.high === 'number' && !isNaN(c.high) && isFinite(c.high)) prices.push(c.high);
      if (typeof c.open === 'number' && !isNaN(c.open) && isFinite(c.open)) prices.push(c.open);
      if (typeof c.close === 'number' && !isNaN(c.close) && isFinite(c.close)) prices.push(c.close);
      if (typeof c.volume === 'number' && !isNaN(c.volume) && isFinite(c.volume) && c.volume > 0) vols.push(c.volume);
    });

    const minP = prices.length > 0 ? Math.min(...prices) : 10;
    const maxP = prices.length > 0 ? Math.max(...prices) : 20;
    const priceMargin = (maxP - minP) * 0.08 || 1;
    const computedYMin = Math.max(0, minP - priceMargin);
    const computedYMax = Math.max(computedYMin + 0.5, maxP + priceMargin);
    const computedMaxVol = vols.length > 0 ? Math.max(...vols) : 1000;

    return {
      yMin: isNaN(computedYMin) || !isFinite(computedYMin) ? 10 : computedYMin,
      yMax: isNaN(computedYMax) || !isFinite(computedYMax) ? 20 : computedYMax,
      maxVol: isNaN(computedMaxVol) || !isFinite(computedMaxVol) ? 1000 : computedMaxVol
    };
  }, [visibleCandles, n]);

  const getX = (index: number) => {
    if (n <= 1) return padding.left + (width - padding.left - padding.right) / 2;
    const chartW = width - padding.left - padding.right;
    const safeIdx = Math.max(0, Math.min(n - 1, index));
    const val = padding.left + (safeIdx / (n - 1)) * chartW;
    return isNaN(val) || !isFinite(val) ? padding.left : val;
  };

  const getYPrice = (price: number | undefined | null) => {
    const chartH = heightMain - padding.top - padding.bottom;
    if (price === undefined || price === null || isNaN(price) || !isFinite(price) || yMax <= yMin) {
      return padding.top + chartH / 2;
    }
    const clamped = Math.max(yMin, Math.min(yMax, price));
    const val = padding.top + (1 - (clamped - yMin) / (yMax - yMin)) * chartH;
    return isNaN(val) || !isFinite(val) ? padding.top + chartH / 2 : val;
  };

  // Helper currency formatter
  const formatVal = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return '-';
    const sym = currency === 'BRL' ? 'R$' : '$';
    return `${sym} ${val.toFixed(2)}`;
  };

  // Candlestick Pattern & Confirmation Analysis
  const candleAnalysis = useMemo(() => {
    if (!visibleCandles || visibleCandles.length === 0) {
      return {
        latestStatus: 'WAITING' as const,
        title: 'Espere o Candlestick de Confirmação',
        message: 'Nunca compre uma faca caindo sem reação. Procure por candles com sombras inferiores longas (martelo, pinbar) ou fechamentos positivos testando o suporte.',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        annotatedCandles: []
      };
    }

    const annotated = visibleCandles.map((c, idx) => {
      const open = typeof c.open === 'number' && !isNaN(c.open) ? c.open : (c.close || 0);
      const close = typeof c.close === 'number' && !isNaN(c.close) ? c.close : open;
      const high = typeof c.high === 'number' && !isNaN(c.high) ? c.high : Math.max(open, close);
      const low = typeof c.low === 'number' && !isNaN(c.low) ? c.low : Math.min(open, close);
      const range = Math.max(0.001, high - low);
      const body = Math.abs(close - open);
      const isUp = close >= open;
      const upperShadow = Math.max(0, high - Math.max(open, close));
      const lowerShadow = Math.max(0, Math.min(open, close) - low);

      const lowerShadowPercent = range > 0 ? (lowerShadow / range) * 100 : 0;
      const upperShadowPercent = range > 0 ? (upperShadow / range) * 100 : 0;
      const bodyPercent = range > 0 ? (body / range) * 100 : 0;

      // Suporte: Proximidade a Fibonacci (61.8%, 50%, 38.2%) ou EMA 200
      const nearFib618 = fibonacci?.fib618 ? Math.abs(low - fibonacci.fib618) / fibonacci.fib618 < 0.03 : false;
      const nearFib500 = fibonacci?.fib500 ? Math.abs(low - fibonacci.fib500) / fibonacci.fib500 < 0.03 : false;
      const nearFib382 = fibonacci?.fib382 ? Math.abs(low - fibonacci.fib382) / fibonacci.fib382 < 0.03 : false;
      const nearEMA200 = c.ema200 ? Math.abs(low - c.ema200) / c.ema200 < 0.03 : false;
      const nearSupport = nearFib618 || nearFib500 || nearFib382 || nearEMA200;
      const supportName = nearFib618 ? 'Fibo 61.8%' : nearFib500 ? 'Fibo 50%' : nearFib382 ? 'Fibo 38.2%' : nearEMA200 ? 'EMA 200' : null;

      // 1. Hammer / Pinbar (Sombra inferior longa >= 40% da amplitude e >= 1.5x o corpo)
      const isHammer = range > 0 && lowerShadow >= Math.max(0.01, body * 1.5) && lowerShadow >= range * 0.40 && upperShadow <= range * 0.30;

      // 2. Faca Caindo (Forte baixa fechando na mínima sem sombra inferior: corpo >= 60% e sombra inferior <= 15%)
      const isFallingKnife = range > 0 && !isUp && body >= range * 0.60 && lowerShadow <= range * 0.15;

      // 3. Fechamento Positivo no Suporte (Candle de alta confirmando reação compradora)
      const prev = idx > 0 ? visibleCandles[idx - 1] : null;
      const prevClose = prev ? (prev.close || prev.open) : open;
      const isPositiveReaction = isUp && close > prevClose && body >= range * 0.30 && lowerShadow > 0;

      return {
        ...c,
        open,
        close,
        high,
        low,
        range,
        body,
        isUp,
        upperShadow,
        lowerShadow,
        lowerShadowPercent,
        upperShadowPercent,
        bodyPercent,
        nearSupport,
        supportName,
        isHammer,
        isFallingKnife,
        isPositiveReaction
      };
    });

    // Check latest candles
    const last = annotated[annotated.length - 1];
    const prev = annotated.length > 1 ? annotated[annotated.length - 2] : null;

    let latestStatus: 'CONFIRMED' | 'FALLING_KNIFE' | 'WAITING' = 'WAITING';
    let title = 'Espere o Candlestick de Confirmação';
    let message = 'Nunca compre uma faca caindo sem reação. Procure por candles com sombras inferiores longas (martelo, pinbar) ou fechamentos positivos testando o suporte.';
    let badge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';

    if (last?.isHammer || (prev && prev.isHammer)) {
      latestStatus = 'CONFIRMED';
      title = 'Gatilho Detectado: Martelo / Pinbar no Suporte!';
      message = 'Forte sombra inferior identificada (rejeição de mínimas). Os compradores defenderam o suporte. O gatilho de entrada ocorre no rompimento da máxima do candle.';
      badge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    } else if (last?.isPositiveReaction) {
      latestStatus = 'CONFIRMED';
      title = 'Confirmação Detectada: Fechamento Positivo no Suporte!';
      message = 'Candle de alta confirmando a reação compradora após testar níveis de suporte/Fibonacci. Estrutura pronta para swing trade.';
      badge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    } else if (last?.isFallingKnife) {
      latestStatus = 'FALLING_KNIFE';
      title = 'Alerta de Risco: Faca Caindo sem Reação!';
      message = 'Candle de forte baixa fechando na mínima sem sombra inferior. Não compre antes do candle fechar e mostrar reação com sombra inferior ou alta!';
      badge = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    }

    return {
      latestStatus,
      title,
      message,
      badge,
      annotatedCandles: annotated
    };
  }, [visibleCandles, fibonacci]);

  const activeCandle = hoverIndex !== null && candleAnalysis.annotatedCandles[hoverIndex]
    ? candleAnalysis.annotatedCandles[hoverIndex]
    : candleAnalysis.annotatedCandles.length > 0
    ? candleAnalysis.annotatedCandles[candleAnalysis.annotatedCandles.length - 1]
    : null;

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 lg:p-5 shadow-2xl">
      {/* Alerta Estratégico: Espere o Candlestick de Confirmação */}
      <div className="mb-4 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-emerald-950/30 border border-amber-500/40 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
              candleAnalysis.latestStatus === 'CONFIRMED'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : candleAnalysis.latestStatus === 'FALLING_KNIFE'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              {candleAnalysis.latestStatus === 'CONFIRMED' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : candleAnalysis.latestStatus === 'FALLING_KNIFE' ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-sm md:text-base text-amber-300 tracking-tight flex items-center gap-1.5">
                  <span>⚠️ Espere o Candlestick de Confirmação</span>
                </h3>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${candleAnalysis.badge}`}>
                  {candleAnalysis.title}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                <strong className="text-amber-200">Regra de Ouro:</strong> Nunca compre uma faca caindo sem reação. Procure por candles com sombras inferiores longas (martelo, pinbar) ou fechamentos positivos testando o suporte.
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {candleAnalysis.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              type="button"
              onClick={() => setShowConfirmationMarkers(!showConfirmationMarkers)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                showConfirmationMarkers
                  ? 'bg-blue-600/30 border-blue-400 text-blue-200'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Mostrar marcadores de martelo e faca caindo diretamente nos candles"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Marcadores no Gráfico</span>
            </button>

            <button
              type="button"
              onClick={() => setShowVisualGuide(!showVisualGuide)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Guia Visual</span>
              {showVisualGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Guia Didático Visual Expansível */}
        {showVisualGuide && (
          <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Modelo 1: Martelo / Pinbar */}
            <div className="bg-slate-950/60 border border-emerald-500/30 rounded-xl p-3 flex items-start gap-3">
              <div className="w-8 h-12 bg-slate-900 border border-slate-700 rounded flex flex-col items-center justify-between py-1 shrink-0">
                <div className="w-4 h-3 bg-emerald-500 rounded-sm"></div>
                <div className="w-0.5 h-6 bg-emerald-400"></div>
              </div>
              <div>
                <strong className="text-emerald-300 font-bold block text-[13px]">1. Martelo / Pinbar</strong>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                  Pavio inferior longo (2x a 3x o corpo). Vendedores tentaram afundar o preço, mas compradores defenderam o suporte.
                </p>
                <span className="text-[10px] text-emerald-400 font-mono font-bold mt-1 inline-block">✓ COMPRA NO ROMPIMENTO</span>
              </div>
            </div>

            {/* Modelo 2: Fechamento Positivo */}
            <div className="bg-slate-950/60 border border-blue-500/30 rounded-xl p-3 flex items-start gap-3">
              <div className="w-8 h-12 bg-slate-900 border border-slate-700 rounded flex flex-col items-center justify-between py-1 shrink-0">
                <div className="w-0.5 h-1.5 bg-blue-400"></div>
                <div className="w-4 h-6 bg-blue-500 rounded-sm"></div>
                <div className="w-0.5 h-1.5 bg-blue-400"></div>
              </div>
              <div>
                <strong className="text-blue-300 font-bold block text-[13px]">2. Fechamento Positivo</strong>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                  Corpo verde fechando acima da abertura após testar suporte (Fibo 50% ou 61.8%). Confirma que o fundo segurou.
                </p>
                <span className="text-[10px] text-blue-400 font-mono font-bold mt-1 inline-block">✓ CONFIRMAÇÃO DE FUNDO</span>
              </div>
            </div>

            {/* Modelo 3: Faca Caindo (Evite) */}
            <div className="bg-slate-950/60 border border-rose-500/30 rounded-xl p-3 flex items-start gap-3">
              <div className="w-8 h-12 bg-slate-900 border border-slate-700 rounded flex flex-col items-center justify-between py-1 shrink-0">
                <div className="w-0.5 h-1.5 bg-rose-400"></div>
                <div className="w-4 h-8 bg-rose-500 rounded-sm"></div>
                <div className="w-0.5 h-0.5 bg-rose-400"></div>
              </div>
              <div>
                <strong className="text-rose-300 font-bold block text-[13px]">3. Faca Caindo (EVITE!)</strong>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                  Barra vermelha cheia fechando na mínima sem pavio inferior. Pressão vendedora ainda total. Não tente adivinhar o fundo!
                </p>
                <span className="text-[10px] text-rose-400 font-mono font-bold mt-1 inline-block">✗ NÃO COMPRE SEM REAÇÃO</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        {/* Timeframe & Mode */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            {['60m', '1d', '1wk', '1mo'].map((tf) => (
              <button
                key={tf}
                id={`btn-tf-${tf}`}
                onClick={() => onChangeTimeframe(tf)}
                className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                  timeframe === tf ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf === '60m' ? '60m' : tf === '1d' ? 'Diário' : tf === '1wk' ? 'Semanal' : 'Mensal'}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => setChartMode('candle')}
              className={`px-2 py-1 rounded-md font-semibold transition cursor-pointer ${
                chartMode === 'candle' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartMode('line')}
              className={`px-2 py-1 rounded-md font-semibold transition cursor-pointer ${
                chartMode === 'line' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Linha
            </button>
          </div>
        </div>

        {/* Overlays Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setShowEMA20(!showEMA20)}
            className={`px-2 py-1 rounded border text-[11px] font-mono font-bold cursor-pointer transition ${
              showEMA20 ? 'bg-blue-500/20 border-blue-400 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            EMA20
          </button>
          <button
            onClick={() => setShowEMA50(!showEMA50)}
            className={`px-2 py-1 rounded border text-[11px] font-mono font-bold cursor-pointer transition ${
              showEMA50 ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            EMA50
          </button>
          <button
            onClick={() => setShowEMA200(!showEMA200)}
            className={`px-2 py-1 rounded border text-[11px] font-mono font-bold cursor-pointer transition ${
              showEMA200 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            EMA200
          </button>
          <button
            onClick={() => setShowBollinger(!showBollinger)}
            className={`px-2 py-1 rounded border text-[11px] font-mono font-bold cursor-pointer transition ${
              showBollinger ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            Bollinger
          </button>
          <button
            onClick={() => setShowFibonacci(!showFibonacci)}
            className={`px-2 py-1 rounded border text-[11px] font-mono font-bold cursor-pointer transition ${
              showFibonacci ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            Fibo 61.8%
          </button>
        </div>

        {/* Range Filters */}
        <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
          {(['15d', '1m', '3m', '6m', 'all'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRangeFilter(r)}
              className={`px-2 py-1 rounded-md font-medium uppercase transition cursor-pointer ${
                rangeFilter === r ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Info Bar with Candlestick Confirmation Diagnostic & Active Hover Data */}
      {activeCandle && (
        <div className="mb-3 space-y-2">
          {/* Diagnostic Card for Active / Hovered Candle */}
          <div className={`p-2.5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs transition-all ${
            activeCandle.isHammer
              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200 shadow-lg shadow-emerald-950/40'
              : activeCandle.isFallingKnife
              ? 'bg-rose-950/70 border-rose-500/50 text-rose-200 shadow-lg shadow-rose-950/40'
              : activeCandle.isPositiveReaction
              ? 'bg-sky-950/70 border-sky-500/50 text-sky-200 shadow-lg shadow-sky-950/40'
              : 'bg-slate-800/90 border-slate-700/80 text-slate-300'
          }`}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold flex items-center gap-1.5">
                {activeCandle.isHammer ? (
                  <>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 flex items-center gap-1">
                      🔨 MARTELO / PINBAR
                    </span>
                    <span className="text-emerald-300 font-semibold">
                      Sombra inferior longa ({activeCandle.lowerShadowPercent.toFixed(0)}% do candle). Rejeição de mínimas e suporte defendido!
                    </span>
                  </>
                ) : activeCandle.isFallingKnife ? (
                  <>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 flex items-center gap-1">
                      🔪 FACA CAINDO SEM REAÇÃO
                    </span>
                    <span className="text-rose-300 font-semibold">
                      Corpo de queda forte ({activeCandle.bodyPercent.toFixed(0)}%) fechando na mínima sem sombra. NUNCA COMPRE ANTES DA REAÇÃO!
                    </span>
                  </>
                ) : activeCandle.isPositiveReaction ? (
                  <>
                    <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 flex items-center gap-1">
                      ⚡ FECHAMENTO POSITIVO
                    </span>
                    <span className="text-sky-300 font-semibold">
                      Reação compradora validada no suporte. Entrada no rompimento da máxima!
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 flex items-center gap-1">
                      ⏳ AGUARDANDO CONFIRMAÇÃO
                    </span>
                    <span className="text-slate-300">
                      Espere o Candlestick de Confirmação: Nunca compre faca caindo sem reação (procure martelo/pinbar ou fechamento positivo).
                    </span>
                  </>
                )}
              </span>

              {activeCandle.supportName && (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[11px] font-bold">
                  Testando {activeCandle.supportName}
                </span>
              )}
            </div>

            <div className="text-[11px] font-mono text-slate-300 shrink-0 flex items-center gap-3">
              <span>Sombra Inf: <strong className={activeCandle.lowerShadowPercent >= 40 ? 'text-emerald-400 font-bold' : 'text-slate-300'}>{activeCandle.lowerShadowPercent.toFixed(1)}%</strong></span>
              <span>Corpo: <strong className="text-slate-300">{activeCandle.bodyPercent.toFixed(1)}%</strong></span>
              <span>Sombra Sup: <strong className="text-slate-300">{activeCandle.upperShadowPercent.toFixed(1)}%</strong></span>
            </div>
          </div>

          {/* OHLCV Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 text-xs font-mono">
            <div><span className="text-slate-400">Data:</span> <strong className="text-white">{activeCandle.date}</strong></div>
            <div><span className="text-slate-400">Abertura:</span> <strong className="text-slate-200">{formatVal(activeCandle.open)}</strong></div>
            <div><span className="text-slate-400">Máx:</span> <strong className="text-emerald-400">{formatVal(activeCandle.high)}</strong></div>
            <div><span className="text-slate-400">Mín:</span> <strong className="text-rose-400">{formatVal(activeCandle.low)}</strong></div>
            <div><span className="text-slate-400">Fechamento:</span> <strong className="text-white font-bold">{formatVal(activeCandle.close)}</strong></div>
            <div><span className="text-slate-400">RSI:</span> <strong className={`${(activeCandle.rsi14 || 50) < 30 ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>{activeCandle.rsi14?.toFixed(1) || '-'}</strong></div>
            <div><span className="text-slate-400">Vol:</span> <strong className="text-cyan-400">{((activeCandle.volume || 0) / 1e6).toFixed(1)}M</strong></div>
          </div>
        </div>
      )}

      {/* SVG Multi-Panel Chart */}
      <div className="relative w-full overflow-hidden select-none bg-slate-950 rounded-xl border border-slate-800">
        <svg
          viewBox={`0 0 ${width} ${heightMain + heightSub * 3}`}
          className="w-full h-auto cursor-crosshair block"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width) * width;
            const chartW = width - padding.left - padding.right;
            const rawIdx = Math.round(((mouseX - padding.left) / chartW) * (n - 1));
            const clampedIdx = Math.max(0, Math.min(n - 1, rawIdx));
            setHoverIndex(clampedIdx);
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="priceLineAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
            <filter id="priceLineGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#38bdf8" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Background Grid */}
          <rect x={0} y={0} width={width} height={heightMain + heightSub * 3} fill="#0b0f19" />

          {/* ── PANEL 1: MAIN PRICE PANEL ── */}
          <g>
            {/* Horizontal Grid lines & Price axis */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const price = yMin + ratio * (yMax - yMin);
              const y = getYPrice(price);
              return (
                <g key={ratio}>
                  <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                  <text x={width - padding.right + 6} y={y + 3} fill="#64748b" fontSize="9" fontFamily="monospace">
                    {formatVal(price)}
                  </text>
                </g>
              );
            })}

            {/* On-Chart HUD Alert: Espere o Candlestick de Confirmação */}
            <g transform={`translate(${padding.left + 10}, ${padding.top + 5})`} className="pointer-events-none select-none">
              <rect
                x="0"
                y="0"
                width="390"
                height="34"
                rx="8"
                fill={
                  candleAnalysis.latestStatus === 'CONFIRMED'
                    ? '#022c22'
                    : candleAnalysis.latestStatus === 'FALLING_KNIFE'
                    ? '#450a0a'
                    : '#1c1917'
                }
                stroke={
                  candleAnalysis.latestStatus === 'CONFIRMED'
                    ? '#10b981'
                    : candleAnalysis.latestStatus === 'FALLING_KNIFE'
                    ? '#ef4444'
                    : '#f59e0b'
                }
                strokeWidth="1.2"
                opacity="0.92"
              />
              <circle
                cx="15"
                cy="17"
                r="4.5"
                fill={
                  candleAnalysis.latestStatus === 'CONFIRMED'
                    ? '#34d399'
                    : candleAnalysis.latestStatus === 'FALLING_KNIFE'
                    ? '#f87171'
                    : '#fbbf24'
                }
              />
              <text
                x="28"
                y="15"
                fill="#ffffff"
                fontSize="9.5"
                fontWeight="900"
                fontFamily="sans-serif"
                letterSpacing="0.2"
              >
                {candleAnalysis.latestStatus === 'CONFIRMED'
                  ? '✓ CONFIRMAÇÃO DETECTADA NO SUPORTE'
                  : candleAnalysis.latestStatus === 'FALLING_KNIFE'
                  ? '🔪 ALERTA DE RISCO: FACA CAINDO SEM REAÇÃO'
                  : '⚠️ ESPERE O CANDLESTICK DE CONFIRMAÇÃO'}
              </text>
              <text
                x="28"
                y="27"
                fill={
                  candleAnalysis.latestStatus === 'CONFIRMED'
                    ? '#6ee7b7'
                    : candleAnalysis.latestStatus === 'FALLING_KNIFE'
                    ? '#fca5a5'
                    : '#fde68a'
                }
                fontSize="7.5"
                fontFamily="sans-serif"
              >
                {candleAnalysis.latestStatus === 'CONFIRMED'
                  ? 'Sombra longa/martelo testando suporte. Gatilho no rompimento da máxima!'
                  : candleAnalysis.latestStatus === 'FALLING_KNIFE'
                  ? 'Nunca compre uma faca caindo sem reação. Aguarde o fechamento do candle!'
                  : 'Nunca compre sem reação: procure sombras inferiores longas ou fechamentos positivos.'}
              </text>
            </g>

            {/* Fibonacci Retracement Levels */}
            {showFibonacci && fibonacci && typeof fibonacci.high === 'number' && fibonacci.high > 0 && typeof fibonacci.fib618 === 'number' && !isNaN(fibonacci.fib618) && (
              <g opacity={0.85}>
                {/* 61.8% Golden Zone Highlight */}
                <line
                  x1={padding.left}
                  y1={getYPrice(fibonacci.fib618)}
                  x2={width - padding.right}
                  y2={getYPrice(fibonacci.fib618)}
                  stroke="#eab308"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text x={width - padding.right + 6} y={getYPrice(fibonacci.fib618) + 3} fill="#eab308" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  Fibo 61.8%
                </text>

                {/* 50% Level */}
                {typeof fibonacci.fib500 === 'number' && !isNaN(fibonacci.fib500) && (
                  <>
                    <line
                      x1={padding.left}
                      y1={getYPrice(fibonacci.fib500)}
                      x2={width - padding.right}
                      y2={getYPrice(fibonacci.fib500)}
                      stroke="#94a3b8"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <text x={width - padding.right + 6} y={getYPrice(fibonacci.fib500) + 3} fill="#94a3b8" fontSize="8" fontFamily="monospace">
                      50.0%
                    </text>
                  </>
                )}
              </g>
            )}

            {/* Bollinger Bands Shaded Area */}
            {showBollinger && n > 1 && (
              <g opacity={0.15}>
                {visibleCandles.map((c, i) => {
                  if (i === 0 || c.bbUpper == null || c.bbLower == null || isNaN(c.bbUpper) || isNaN(c.bbLower)) return null;
                  const prev = visibleCandles[i - 1];
                  if (!prev || prev.bbUpper == null || prev.bbLower == null || isNaN(prev.bbUpper) || isNaN(prev.bbLower)) return null;
                  const x1 = getX(i - 1);
                  const x2 = getX(i);
                  const yU1 = getYPrice(prev.bbUpper);
                  const yU2 = getYPrice(c.bbUpper);
                  const yL1 = getYPrice(prev.bbLower);
                  const yL2 = getYPrice(c.bbLower);
                  return (
                    <polygon
                      key={i}
                      points={`${x1},${yU1} ${x2},${yU2} ${x2},${yL2} ${x1},${yL1}`}
                      fill="#a855f7"
                    />
                  );
                })}
              </g>
            )}

            {/* Bollinger Bands Lines */}
            {showBollinger && n > 0 && (
              <g fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" opacity={0.6}>
                <path d={visibleCandles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYPrice(c.bbUpper || c.close)}`).join(' ')} />
                <path d={visibleCandles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYPrice(c.bbLower || c.close)}`).join(' ')} />
              </g>
            )}

            {/* Moving Averages: EMA20, EMA50, EMA200 */}
            {showEMA20 && n > 0 && (
              <path
                d={visibleCandles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYPrice(c.ema20 || c.close)}`).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
              />
            )}
            {showEMA50 && n > 0 && (
              <path
                d={visibleCandles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYPrice(c.ema50 || c.close)}`).join(' ')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
            )}
            {showEMA200 && n > 0 && (
              <path
                d={visibleCandles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYPrice(c.ema200 || c.close)}`).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
            )}

            {/* Candlesticks or Line Mode */}
            {chartMode === 'candle' ? (
              candleAnalysis.annotatedCandles.map((c, i) => {
                const x = getX(i);
                const open = c.open;
                const close = c.close;
                const high = c.high;
                const low = c.low;
                const isUp = c.isUp;
                const yHigh = getYPrice(high);
                const yLow = getYPrice(low);
                const bodyTop = getYPrice(Math.max(open, close));
                const bodyBottom = getYPrice(Math.min(open, close));
                const bodyHeight = Math.max(1.5, Math.abs(bodyBottom - bodyTop));
                const candleWidth = Math.max(2, Math.min(10, ((width - padding.left - padding.right) / Math.max(1, n)) * 0.7));
                const color = isUp ? '#22c55e' : '#ef4444';

                return (
                  <g key={i}>
                    {/* Wick */}
                    <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1" />
                    {/* Body */}
                    <rect
                      x={x - candleWidth / 2}
                      y={Math.min(bodyTop, bodyBottom)}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={color}
                      stroke={color}
                      strokeWidth="0.5"
                      rx="1"
                    />

                    {/* Marcadores Visuais de Confirmação & Faca Caindo */}
                    {showConfirmationMarkers && (
                      <>
                        {/* 1. Martelo / Pinbar (Sombra inferior longa) */}
                        {c.isHammer && (
                          <g>
                            <line x1={x} y1={yLow} x2={x} y2={Math.min(heightMain - padding.bottom - 4, yLow + 14)} stroke="#10b981" strokeWidth="1.2" strokeDasharray="2 2" />
                            <circle cx={x} cy={Math.min(heightMain - padding.bottom - 4, yLow + 14)} r="2.5" fill="#10b981" />
                            <g transform={`translate(${x}, ${Math.min(heightMain - padding.bottom - 10, yLow + 25)})`}>
                              <rect x="-30" y="-7" width="60" height="14" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="0.8" opacity="0.95" />
                              <text x="0" y="3" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                                🔨 Martelo
                              </text>
                            </g>
                          </g>
                        )}

                        {/* 2. Faca Caindo (Forte baixa fechando na mínima sem pavio nos últimos 5 candles) */}
                        {c.isFallingKnife && i >= n - 5 && (
                          <g>
                            <line x1={x} y1={yLow} x2={x} y2={Math.min(heightMain - padding.bottom - 4, yLow + 14)} stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
                            <circle cx={x} cy={Math.min(heightMain - padding.bottom - 4, yLow + 14)} r="2.5" fill="#ef4444" />
                            <g transform={`translate(${x}, ${Math.min(heightMain - padding.bottom - 10, yLow + 25)})`}>
                              <rect x="-35" y="-7" width="70" height="14" rx="4" fill="#4c0519" stroke="#ef4444" strokeWidth="0.8" opacity="0.95" />
                              <text x="0" y="3" fill="#fecdd3" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                                🔪 Faca Caindo
                              </text>
                            </g>
                          </g>
                        )}

                        {/* 3. Reação Positiva no Suporte (Últimos 3 candles) */}
                        {c.isPositiveReaction && !c.isHammer && i >= n - 3 && (
                          <g>
                            <line x1={x} y1={yHigh} x2={x} y2={Math.max(padding.top + 14, yHigh - 12)} stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
                            <circle cx={x} cy={Math.max(padding.top + 14, yHigh - 12)} r="2.5" fill="#38bdf8" />
                            <g transform={`translate(${x}, ${Math.max(padding.top + 8, yHigh - 22)})`}>
                              <rect x="-30" y="-7" width="60" height="14" rx="4" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="0.8" opacity="0.95" />
                              <text x="0" y="3" fill="#bae6fd" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                                ⚡ Reação
                              </text>
                            </g>
                          </g>
                        )}
                      </>
                    )}
                  </g>
                );
              })
            ) : (
              n > 0 && (
                <g>
                  {/* Subtle Gradient Area under Price Line */}
                  <path
                    d={`${visibleCandles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYPrice(c.close)}`).join(' ')} L ${getX(n - 1)} ${heightMain - padding.bottom} L ${getX(0)} ${heightMain - padding.bottom} Z`}
                    fill="url(#priceLineAreaGrad)"
                  />
                  {/* Main High-Contrast Asset Price Line (3.5px thickness for clear differentiation) */}
                  <path
                    d={visibleCandles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getYPrice(c.close)}`).join(' ')}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#priceLineGlow)"
                  />
                  {/* Highlight current / hovered price point */}
                  {activeCandle && (
                    <g>
                      <circle
                        cx={getX(hoverIndex !== null ? hoverIndex : n - 1)}
                        cy={getYPrice(activeCandle.close)}
                        r="4.5"
                        fill="#ffffff"
                        stroke="#0284c7"
                        strokeWidth="2.5"
                      />
                    </g>
                  )}
                </g>
              )
            )}

            {/* Interactive Candle Hover Tooltip directly on SVG Chart */}
            {hoverIndex !== null && activeCandle && (() => {
              const hx = getX(hoverIndex);
              const hy = getYPrice(activeCandle.high);
              const tooltipY = Math.max(padding.top + 45, Math.min(heightMain - padding.bottom - 45, hy - 38));
              const tooltipX = Math.max(105, Math.min(width - padding.right - 105, hx));

              return (
                <g transform={`translate(${tooltipX}, ${tooltipY})`} className="pointer-events-none select-none">
                  <rect
                    x="-100"
                    y="-28"
                    width="200"
                    height="38"
                    rx="8"
                    fill="#030712"
                    stroke={
                      activeCandle.isHammer
                        ? '#10b981'
                        : activeCandle.isFallingKnife
                        ? '#ef4444'
                        : activeCandle.isPositiveReaction
                        ? '#38bdf8'
                        : '#64748b'
                    }
                    strokeWidth="1.2"
                    opacity="0.96"
                  />
                  <text x="0" y="-14" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {activeCandle.date} • {formatVal(activeCandle.close)} ({activeCandle.isUp ? '+' : ''}{(((activeCandle.close - activeCandle.open) / (activeCandle.open || 1)) * 100).toFixed(2)}%)
                  </text>
                  <text
                    x="0"
                    y="-2"
                    fill={
                      activeCandle.isHammer
                        ? '#34d399'
                        : activeCandle.isFallingKnife
                        ? '#f87171'
                        : activeCandle.isPositiveReaction
                        ? '#38bdf8'
                        : '#fcd34d'
                    }
                    fontSize="7.8"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {activeCandle.isHammer
                      ? `🔨 Martelo / Pinbar (Sombra Inf: ${activeCandle.lowerShadowPercent.toFixed(0)}%)`
                      : activeCandle.isFallingKnife
                      ? `🔪 Faca Caindo (Corpo: ${activeCandle.bodyPercent.toFixed(0)}%, sem sombra)`
                      : activeCandle.isPositiveReaction
                      ? `⚡ Reação Positiva no Suporte`
                      : `⏳ Sombra Inf: ${activeCandle.lowerShadowPercent.toFixed(0)}% (Aguarde Confirmação)`}
                  </text>
                  <text x="0" y="6" fill="#cbd5e1" fontSize="6.8" textAnchor="middle" fontFamily="sans-serif">
                    {activeCandle.isHammer
                      ? '✓ Compradores defenderam o suporte. Compre no rompimento!'
                      : activeCandle.isFallingKnife
                      ? '✗ Nunca compre faca caindo sem reação!'
                      : activeCandle.isPositiveReaction
                      ? '✓ Reação confirmada. Estrutura pronta para trade.'
                      : 'Espere o Candlestick de Confirmação antes de agir.'}
                  </text>
                </g>
              );
            })()}

            {/* Empty / Loading Message */}
            {n === 0 && (
              <text x={width / 2} y={heightMain / 2} fill="#94a3b8" textAnchor="middle" fontSize="13" fontFamily="sans-serif">
                Carregando candles e indicadores técnicos...
              </text>
            )}
          </g>

          {/* ── PANEL 2: VOLUME PANEL ── */}
          <g transform={`translate(0, ${heightMain})`}>
            <rect x={0} y={0} width={width} height={heightSub} fill="#0d1322" />
            <line x1={padding.left} y1={0} x2={width - padding.right} y2={0} stroke="#334155" />
            <text x={padding.left + 5} y={14} fill="#64748b" fontSize="9" fontWeight="bold">VOLUME &amp; LIQUIDEZ</text>

            {visibleCandles.map((c, i) => {
              const x = getX(i);
              const isUp = (c.close || 0) >= (c.open || c.close || 0);
              const vol = typeof c.volume === 'number' && !isNaN(c.volume) && isFinite(c.volume) ? c.volume : 0;
              const barH = maxVol > 0 ? (vol / maxVol) * (heightSub - 20) : 0;
              const safeBarH = Math.max(0, isNaN(barH) ? 0 : barH);
              const barW = Math.max(1.5, ((width - padding.left - padding.right) / Math.max(1, n)) * 0.6);
              return (
                <rect
                  key={i}
                  x={x - barW / 2}
                  y={Math.max(0, heightSub - safeBarH - 5)}
                  width={barW}
                  height={safeBarH}
                  fill={isUp ? '#22c55e40' : '#ef444440'}
                  stroke={isUp ? '#22c55e' : '#ef4444'}
                  strokeWidth="0.5"
                />
              );
            })}
          </g>

          {/* ── PANEL 3: RSI(14) PANEL ── */}
          <g transform={`translate(0, ${heightMain + heightSub})`}>
            <rect x={0} y={0} width={width} height={heightSub} fill="#0b0f19" />
            <line x1={padding.left} y1={0} x2={width - padding.right} y2={0} stroke="#334155" />
            <text x={padding.left + 5} y={14} fill="#64748b" fontSize="9" fontWeight="bold">RSI (14) — SOBREVENDA &lt; 30</text>

            {/* Threshold lines: 30 & 70 */}
            <line x1={padding.left} y1={heightSub * 0.3} x2={width - padding.right} y2={heightSub * 0.3} stroke="#ef4444" strokeDasharray="3 3" opacity={0.4} />
            <text x={width - padding.right + 6} y={heightSub * 0.3 + 3} fill="#ef4444" fontSize="8">70</text>
            <line x1={padding.left} y1={heightSub * 0.7} x2={width - padding.right} y2={heightSub * 0.7} stroke="#22c55e" strokeDasharray="3 3" opacity={0.6} />
            <text x={width - padding.right + 6} y={heightSub * 0.7 + 3} fill="#22c55e" fontSize="8">30</text>

            {/* RSI Line */}
            {n > 0 && (
              <path
                d={visibleCandles.map((c, i) => {
                  const rsi = typeof c.rsi14 === 'number' && !isNaN(c.rsi14) ? c.rsi14 : 50;
                  const y = (1 - Math.max(0, Math.min(100, rsi)) / 100) * (heightSub - 20) + 10;
                  return `${i === 0 ? 'M' : 'L'} ${getX(i)} ${isNaN(y) ? heightSub / 2 : y}`;
                }).join(' ')}
                fill="none"
                stroke="#eab308"
                strokeWidth="1.5"
              />
            )}
          </g>

          {/* ── PANEL 4: MACD PANEL ── */}
          <g transform={`translate(0, ${heightMain + heightSub * 2})`}>
            <rect x={0} y={0} width={width} height={heightSub} fill="#0d1322" />
            <line x1={padding.left} y1={0} x2={width - padding.right} y2={0} stroke="#334155" />
            <text x={padding.left + 5} y={14} fill="#64748b" fontSize="9" fontWeight="bold">MACD (12, 26, 9) HISTOGRAMA</text>

            {/* Zero Line */}
            <line x1={padding.left} y1={heightSub / 2} x2={width - padding.right} y2={heightSub / 2} stroke="#475569" strokeDasharray="2 2" />

            {visibleCandles.map((c, i) => {
              const x = getX(i);
              const hist = typeof c.macdHist === 'number' && !isNaN(c.macdHist) ? c.macdHist : 0;
              const h = Math.min(heightSub / 2 - 5, Math.abs(hist) * 20);
              const safeH = Math.max(1, isNaN(h) ? 1 : h);
              const isPos = hist >= 0;
              const barW = Math.max(1.5, ((width - padding.left - padding.right) / Math.max(1, n)) * 0.5);
              return (
                <rect
                  key={i}
                  x={x - barW / 2}
                  y={isPos ? heightSub / 2 - safeH : heightSub / 2}
                  width={barW}
                  height={safeH}
                  fill={isPos ? '#22c55e' : '#ef4444'}
                />
              );
            })}
          </g>

          {/* Hover Crosshair vertical line */}
          {hoverIndex !== null && hoverIndex >= 0 && hoverIndex < n && (
            <line
              x1={getX(hoverIndex)}
              y1={0}
              x2={getX(hoverIndex)}
              y2={heightMain + heightSub * 3}
              stroke="#94a3b8"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
