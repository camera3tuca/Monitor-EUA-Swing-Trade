import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, ShieldCheck, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface PlayStoreKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const PlayStoreKitModal: React.FC<PlayStoreKitModalProps> = ({
  isOpen,
  onClose,
  appUrl
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const privacyUrl = `${appUrl}/privacy.html`;
  const zipUrl = `${appUrl}/api/download-assets`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const assets = [
    {
      id: 'icon',
      title: 'Ícone Oficial (512x512)',
      desc: 'Formato PNG exigido pela Google Play e WebIntoApp',
      src: '/playstore-icon-512.png',
      aspect: 'aspect-square',
      dims: '512x512 px'
    },
    {
      id: 'feature',
      title: 'Gráfico de Recursos (Feature Graphic)',
      desc: 'Banner de destaque obrigatório na Ficha da Loja (1024x500)',
      src: '/playstore-feature-graphic-1024x500.png',
      aspect: 'aspect-[1024/500]',
      dims: '1024x500 px'
    },
    {
      id: 'screen-wide',
      title: 'Screenshot Panorâmico (Desktop/Tablet)',
      desc: 'Tabela quantitativa completa com cotações e rankings de Wall Street',
      src: '/screenshot-wide.png',
      aspect: 'aspect-[16/9]',
      dims: '1280x720 px'
    },
    {
      id: 'screen-mobile',
      title: 'Screenshot Vertical (Mobile)',
      desc: 'Gráficos técnicos, Fibonacci áureo e indicadores de sobrevenda',
      src: '/screenshot-mobile.png',
      aspect: 'aspect-[9/16]',
      dims: '720x1280 px'
    },
    {
      id: 'screen1',
      title: 'Screenshot 1 - Scanner de Sobrevenda',
      desc: 'Tela principal com tabela quantitativa e ranking de oportunidades',
      src: '/screenshot-1-scanner.png',
      aspect: 'aspect-[9/16]',
      dims: '1080x1920 px'
    },
    {
      id: 'screen2',
      title: 'Screenshot 2 - Indicadores Técnicos',
      desc: 'Gráficos de RSI(14), Estocástico, MACD e Médias Móveis',
      src: '/screenshot-2-indicadores.png',
      aspect: 'aspect-[9/16]',
      dims: '1080x1920 px'
    },
    {
      id: 'screen3',
      title: 'Screenshot 3 - Modelos IA Preditivos',
      desc: 'Projeções de retorno, probabilidade e stops automatizados',
      src: '/screenshot-3-ia-modelos.png',
      aspect: 'aspect-[9/16]',
      dims: '1080x1920 px'
    },
    {
      id: 'screen4',
      title: 'Screenshot 4 - Triple Screen & Fibonacci',
      desc: 'Análise de múltiplos tempos gráficos e zonas áureas de retração',
      src: '/screenshot-4-triple-screen.png',
      aspect: 'aspect-[9/16]',
      dims: '1080x1920 px'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Kit de Fotos &amp; Assets para Google Play Store
              </h3>
              <p className="text-xs text-slate-400">
                Baixe todas as imagens para usar no WebIntoApp e na Ficha da Loja
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Main Download Callout */}
          <div className="bg-gradient-to-r from-emerald-950/50 via-slate-850 to-blue-950/50 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Opção Recomendada (Download Completo)
              </span>
              <h4 className="text-base font-bold text-white">
                Pacote ZIP com Todos os Ícones e Fotos em Alta Resolução
              </h4>
              <p className="text-xs text-slate-300">
                Inclui o ícone 512x512, gráfico 1024x500, 6 screenshots e guia de preenchimento.
              </p>
            </div>

            <a
              href={zipUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="wallstreet-scanner-playstore-assets.zip"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition hover:scale-[1.02] shrink-0 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Pacote .ZIP (1.2 MB)</span>
            </a>
          </div>

          {/* Mobile tip */}
          <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-3.5 flex items-start gap-3 text-xs text-blue-200">
            <span className="text-base">📱</span>
            <div>
              <strong className="text-white block font-semibold mb-0.5">Dica para celular/tablet:</strong>
              Você pode tocar no botão <strong>"Abrir Imagem"</strong> de qualquer item abaixo e, ao abrir, tocar e segurar o dedo sobre ela para escolher <strong>"Fazer download da imagem"</strong>.
            </div>
          </div>

          {/* Individual Assets Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-blue-400" />
              Imagens Individuais para Visualização e Download
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5 flex flex-col justify-between gap-3 hover:border-slate-600 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white text-xs sm:text-sm">{item.title}</span>
                      <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-750">
                        {item.dims}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative rounded-lg overflow-hidden bg-slate-950 border border-slate-750 flex items-center justify-center p-2 group">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="max-h-36 w-auto object-contain rounded group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-700/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium py-1.5 px-3 rounded-lg transition border border-slate-600/50"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir Imagem</span>
                    </a>
                    <a
                      href={item.src}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 text-xs font-medium py-1.5 px-3 rounded-lg transition border border-blue-500/40"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Copy Inputs for Store Listing */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Textos e URLs Obrigatórias para WebIntoApp &amp; Google Play
            </h4>

            {/* App URL */}
            <div className="bg-slate-800/50 border border-slate-750 rounded-xl p-2.5 flex items-center justify-between gap-3">
              <div className="truncate text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">App URL (WebIntoApp):</span>
                <span className="font-mono text-emerald-400 truncate select-all">{appUrl}</span>
              </div>
              <button
                onClick={() => handleCopy(appUrl, 'appUrl')}
                className="shrink-0 flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1.5 rounded-lg transition"
              >
                {copiedKey === 'appUrl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'appUrl' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            {/* Privacy Policy URL */}
            <div className="bg-slate-800/50 border border-slate-750 rounded-xl p-2.5 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="truncate text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Política de Privacidade (URL no app):</span>
                  <span className="font-mono text-blue-400 truncate select-all">{privacyUrl}</span>
                </div>
                <button
                  onClick={() => handleCopy(privacyUrl, 'privacy')}
                  className="shrink-0 flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                >
                  {copiedKey === 'privacy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'privacy' ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-[10px] text-amber-300/90 leading-tight bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg">
                💡 <strong>Dica para o Google Play Console:</strong> Como os robôs da Google Play não aceitam links com autenticação ou cookies de preview, você também pode hospedar o arquivo <code className="text-white">privacy.html</code> gratuitamente no <strong>GitHub Pages</strong> ou no seu domínio <code className="text-white">sciencebit.com.br/privacy.html</code>.
              </p>
            </div>

            {/* Package Name */}
            <div className="bg-slate-800/50 border border-slate-750 rounded-xl p-2.5 flex items-center justify-between gap-3">
              <div className="truncate text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Package Name (ID único):</span>
                <span className="font-mono text-purple-400 truncate select-all">com.sciencebit.wallstreetscanner</span>
              </div>
              <button
                onClick={() => handleCopy('com.sciencebit.wallstreetscanner', 'pkg')}
                className="shrink-0 flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1.5 rounded-lg transition"
              >
                {copiedKey === 'pkg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'pkg' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-850 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-750 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition"
          >
            Fechar Janela
          </button>
        </div>
      </motion.div>
    </div>
  );
};
