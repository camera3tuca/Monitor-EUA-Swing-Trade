import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, ChevronDown, ChevronUp, BookOpen, Sparkles, Globe, DollarSign, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { MarketUniverse } from '../types';
import { ScienceBitLogo } from './ScienceBitLogo';

interface MarketStatus {
  status: 'aberta' | 'pre-abertura' | 'leilao' | 'fechada';
  label: string;
  sublabel: string;
  badgeClass: string;
  dotClass: string;
}

interface HeaderProps {
  market?: MarketUniverse;
  onMarketChange?: (m: MarketUniverse) => void;
  onSelectMarket?: (m: MarketUniverse) => void;
  onOpenPlayStoreKit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPlayStoreKit }) => {
  const { language, setLanguage, t } = useLanguage();
  const [timeStr, setTimeStr] = useState<string>('');
  const [marketStatus, setMarketStatus] = useState<MarketStatus>({
    status: 'fechada',
    label: 'Market Closed',
    sublabel: 'Opens at 09:30 ET',
    badgeClass: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    dotClass: 'bg-rose-500',
  });
  const [guiaAberto, setGuiaAberto] = useState<boolean>(false);

  useEffect(() => {
    const updateTimeAndMarket = () => {
      try {
        const now = new Date();
        const timeZone = 'America/New_York';
        const str = now.toLocaleTimeString(language === 'pt' ? 'pt-BR' : 'en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setTimeStr(str);

        // Get local time in New York (ET)
        const dateInTz = new Date(now.toLocaleString('en-US', { timeZone }));
        const dayOfWeek = dateInTz.getDay(); // 0 = Sun, 6 = Sat
        const hours = dateInTz.getHours();
        const minutes = dateInTz.getMinutes();
        const totalMinutes = hours * 60 + minutes;

        if (dayOfWeek === 0 || dayOfWeek === 6) {
          setMarketStatus({
            status: 'fechada',
            label: t('marketClosed'),
            sublabel: t('weekendClosed'),
            badgeClass: 'bg-slate-700/50 border-slate-600/60 text-slate-300',
            dotClass: 'bg-slate-500',
          });
        } else {
          // US Market Hours (ET):
          // Pre-Market: 04:00 (240) - 09:30 (570)
          // Regular Session: 09:30 (570) - 16:00 (960)
          // After-Hours: 16:00 (960) - 20:00 (1200)
          if (totalMinutes >= 570 && totalMinutes < 960) {
            setMarketStatus({
              status: 'aberta',
              label: t('marketOpen'),
              sublabel: t('regularSession'),
              badgeClass: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
              dotClass: 'bg-emerald-400 animate-pulse',
            });
          } else if (totalMinutes >= 240 && totalMinutes < 570) {
            setMarketStatus({
              status: 'pre-abertura',
              label: t('preMarket'),
              sublabel: 'Pre-Market (NYSE/Nasdaq)',
              badgeClass: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
              dotClass: 'bg-amber-400 animate-ping',
            });
          } else if (totalMinutes >= 960 && totalMinutes < 1200) {
            setMarketStatus({
              status: 'leilao',
              label: t('afterHours'),
              sublabel: 'Post-market until 20:00 ET',
              badgeClass: 'bg-blue-500/15 border-blue-500/40 text-blue-300',
              dotClass: 'bg-blue-400',
            });
          } else {
            setMarketStatus({
              status: 'fechada',
              label: t('marketClosed'),
              sublabel: t('opensAt'),
              badgeClass: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
              dotClass: 'bg-rose-400',
            });
          }
        }
      } catch {
        setTimeStr(new Date().toLocaleTimeString());
      }
    };
    updateTimeAndMarket();
    const interval = setInterval(updateTimeAndMarket, 1000);
    return () => clearInterval(interval);
  }, [language, t]);

  return (
    <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/70 sticky top-0 z-30 px-4 lg:px-8 py-3.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title & Brand */}
        <div className="flex items-center gap-3.5">
          {/* Brand Logo Group */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative group flex items-center justify-center">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 rounded-xl blur opacity-50 group-hover:opacity-80 transition duration-300"></div>
              <img
                src="/icon.svg"
                alt="Wall Street Scanner"
                className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl border border-blue-400/50 bg-slate-950 p-1 shadow-lg object-contain"
              />
            </div>
            <ScienceBitLogo variant="badge" size="sm" className="hidden sm:inline-flex" />
          </div>

          <div className="hidden sm:block h-8 w-px bg-slate-700/70" />

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                Wall Street Scanner <span className="text-blue-400 font-medium text-lg">Swing Trade Pro</span>
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                {t('live')}
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                US$ • S&P 500 / NASDAQ / NYSE / ETFs
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-2 flex-wrap">
              <span>
                {language === 'pt' ? 'Rastreamento em tempo real de ações e ETFs americanos em sobrevenda técnica' : 'Real-time technical screening for oversold US stocks and ETFs'}
              </span>
              <span className="text-slate-600 hidden md:inline">•</span>
              <span className="text-slate-400 hidden md:inline">por ScienceBit Computer</span>
            </p>
          </div>
        </div>

        {/* Right Status Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* US Markets Badge */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-blue-500/30 px-2.5 py-1.5 rounded-xl text-blue-300 font-semibold shadow-inner">
            <span className="text-sm">🇺🇸</span>
            <span>Wall Street (US$)</span>
          </div>

          {/* Language Switcher: PT / EN */}
          <div className="flex items-center bg-slate-900/90 border border-slate-700/80 p-0.5 rounded-xl shadow-inner">
            <button
              id="btn-lang-pt"
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-2.5 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                language === 'pt'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Português"
            >
              PT
            </button>
            <button
              id="btn-lang-en"
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Market Status (Bolsa Aberta / Fechada) */}
          <div
            id="market-status-badge"
            title={`${marketStatus.label} - ${marketStatus.sublabel}`}
            className={`flex items-center gap-2 border px-3 py-1.5 rounded-lg font-medium shadow-sm transition ${marketStatus.badgeClass}`}
          >
            <span className={`w-2 h-2 rounded-full ${marketStatus.dotClass}`}></span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5 leading-tight">
              <span className="font-bold">{marketStatus.label}</span>
              <span className="text-[10px] opacity-75 font-normal">(NYSE/Nasdaq)</span>
            </div>
          </div>

          {/* Local Market Clock */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-lg text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-emerald-400 font-semibold">{timeStr || '--:--:--'}</span>
            <span className="text-[10px] text-slate-500">NY (ET)</span>
          </div>

          {/* Guide toggle button */}
          <button
            id="btn-toggle-guide"
            onClick={() => setGuiaAberto(!guiaAberto)}
            className="flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-blue-200 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer text-xs sm:text-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('guideBtn')}</span>
            {guiaAberto ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Download Play Store Assets Pack */}
          <button
            id="btn-download-assets-zip"
            type="button"
            onClick={onOpenPlayStoreKit}
            className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer text-xs sm:text-sm"
            title="Abrir Kit com todos os ícones (512x512), gráfico de recursos (1024x500), screenshots e links para Play Store"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Kit Google Play (.ZIP)</span>
            <span className="sm:hidden">Kit Play</span>
          </button>
        </div>
      </div>

      {/* Expandable Guide */}
      <AnimatePresence>
        {guiaAberto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-700/60 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pb-2 text-xs">
              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                <h4 className="font-bold text-blue-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  {t('guideIS')}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('guideISDesc')}
                </p>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                <h4 className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {t('guideRSI')}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('guideRSIDesc')}
                </p>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                <h4 className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {t('guideFibo')}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('guideFiboDesc')}
                </p>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                <h4 className="font-bold text-purple-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  {t('guideTriple')}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('guideTripleDesc')}
                </p>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] text-slate-400 px-1">
              <span>{t('guideMethodology')}</span>
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Wall Street Quantitative Swing Trade Engine</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
