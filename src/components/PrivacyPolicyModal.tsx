import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Copy, Check, Download, ExternalLink, Globe, AlertTriangle, FileText } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<'text' | 'html' | null>(null);

  if (!isOpen) return null;

  const handleCopy = (type: 'text' | 'html') => {
    let content = '';
    if (type === 'html') {
      content = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Política de Privacidade - Wall Street Scanner</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b0f19; color: #cbd5e1; padding: 24px 16px; line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 32px 24px; }
    h1 { color: #f8fafc; font-size: 1.8rem; border-bottom: 1px solid #1f2937; padding-bottom: 12px; }
    h2 { color: #f8fafc; font-size: 1.25rem; margin-top: 24px; }
    p, li { font-size: 0.95rem; color: #94a3b8; }
    ul { padding-left: 20px; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); border-radius: 9999px; font-size: 0.8rem; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">Privacidade &amp; Conformidade Google Play</span>
    <h1>Política de Privacidade</h1>
    <p><strong>Aplicativo:</strong> Wall Street Scanner - Swing Trade Pro</p>
    <p><strong>Desenvolvedor:</strong> ScienceBit Computer</p>
    <p><strong>Última atualização:</strong> Setembro de 2026</p>
    <h2>1. Visão Geral</h2>
    <p>O aplicativo Wall Street Scanner foi desenvolvido como uma ferramenta educacional e analítica quantitativa para visualização de dados públicos do mercado financeiro norte-americano (S&amp;P 500, Nasdaq, NYSE e ETFs em US$). Respeitamos integralmente a sua privacidade e temos o compromisso intransigente de proteger os usuários.</p>
    <h2>2. Coleta e Uso de Informações</h2>
    <p>O aplicativo NÃO coleta, não armazena e não compartilha nenhum dado pessoal identificável, documentos, senhas ou dados bancários.</p>
    <ul>
      <li><strong>Dados de Acesso:</strong> O app consome apenas cotações públicas e indicadores técnicos abertos de mercado.</li>
      <li><strong>Armazenamento Local:</strong> Preferências (como filtros e visualizações) são salvas exclusivamente no próprio dispositivo do usuário.</li>
      <li><strong>Sem rastreamento publicitário:</strong> Não utilizamos identificadores invasivos de publicidade.</li>
    </ul>
    <h2>3. Permissões</h2>
    <p>Solicita apenas permissão de Internet (android.permission.INTERNET e android.permission.ACCESS_NETWORK_STATE) para consulta de cotações em tempo real.</p>
    <h2>4. Contato</h2>
    <p>Dúvidas: camera3.tuca@gmail.com / contato@sciencebit.com.br</p>
  </div>
</body>
</html>`;
    } else {
      content = `POLÍTICA DE PRIVACIDADE - WALL STREET SCANNER: SWING TRADE PRO
Desenvolvedor: ScienceBit Computer
Última Atualização: Setembro de 2026

1. VISÃO GERAL
O aplicativo Wall Street Scanner é uma ferramenta analítica quantitativa voltada ao escaneamento de dados públicos do mercado financeiro norte-americano (S&P 500, Nasdaq, NYSE, ETFs em US$).

2. COLETA E USO DE DADOS
O aplicativo NÃO coleta, não armazena e não compartilha nenhum dado pessoal identificável, documentos, senhas ou dados bancários de seus usuários.
- Cotações e Indicadores: Consumo estrito de dados públicos de mercado.
- Armazenamento Local: As preferências de filtros ficam salvas apenas no aparelho do usuário (Local Storage).
- Sem rastreadores comerciais ou venda de dados a terceiros.

3. PERMISSÕES SOLICITADAS
Requer apenas permissão de Internet (android.permission.INTERNET) para carregar as cotações financeiras em tempo real.

4. CONTATO DO DESENVOLVEDOR
Email: camera3.tuca@gmail.com / contato@sciencebit.com.br
Website: https://sciencebit.com.br`;
    }

    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Política de Privacidade</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Google Play Ativa
                </span>
              </h2>
              <p className="text-xs text-slate-400">Wall Street Scanner • Conformidade Legal &amp; LGPD</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Important Alert Box for Google Play Console */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Por que a Google Play deu erro "Página não encontrada"?</span>
            </div>
            <p className="text-slate-300">
              O link que estava no seu console (<code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">ais-pre-...run.app</code>) é um endereço de <strong>preview interno com cookies de desenvolvimento</strong>. O robô automatizado da Google Play tenta acessar a página anonimamente de fora e é bloqueado por cookies, gerando a recusa.
            </p>
            <div className="pt-2 border-t border-amber-500/20 text-slate-200">
              <strong>Soluções recomendadas (100% aceitas pelo Google Play):</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-300">
                <li>
                  <strong>GitHub Pages (Grátis e Imediato):</strong> Crie um repositório no seu GitHub (<code className="text-blue-300">camera3</code>), suba o arquivo <code className="text-blue-300">privacy.html</code> ou ative o GitHub Pages. O link fica público para sempre (ex: <code className="text-emerald-300">https://camera3.github.io/...</code>).
                </li>
                <li>
                  <strong>Seu domínio:</strong> Suba o arquivo <code className="text-blue-300">privacy.html</code> para o seu site <code className="text-blue-300">https://sciencebit.com.br/privacy.html</code>.
                </li>
                <li>
                  <strong>Google Sites / Notion:</strong> Crie uma página pública no Google Sites (<code className="text-blue-300">sites.google.com</code>) com o texto abaixo e cole o link no console.
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => handleCopy('text')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-medium transition cursor-pointer"
            >
              {copiedType === 'text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'text' ? 'Texto Copiado!' : 'Copiar Texto da Política'}</span>
            </button>

            <button
              onClick={() => handleCopy('html')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-medium transition cursor-pointer"
            >
              {copiedType === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copiedType === 'html' ? 'HTML Copiado!' : 'Copiar Código HTML'}</span>
            </button>

            <a
              href="/privacy.html"
              download="privacy.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar privacy.html</span>
            </a>

            <a
              href="/privacy.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition cursor-pointer ml-auto"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Abrir no Navegador</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          {/* Policy Text Render */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white mb-1">1. Visão Geral</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                O aplicativo <strong>Wall Street Scanner - Swing Trade Pro</strong> foi desenvolvido como uma ferramenta educacional e analítica quantitativa para visualização e escaneamento de dados públicos do mercado financeiro norte-americano (S&amp;P 500, Nasdaq, NYSE e ETFs em dólares US$). Respeitamos integralmente a sua privacidade e temos o compromisso intransigente de proteger os usuários.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1">2. Coleta e Uso de Informações</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-2">
                O aplicativo <strong>NÃO coleta, não armazena e não compartilha nenhum dado pessoal identificável</strong>, números de documentos, dados bancários, senhas de corretoras ou localização geográfica precisa.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs sm:text-sm">
                <li><strong>Dados de Acesso:</strong> O app consome apenas cotações públicas e indicadores técnicos abertos de mercado.</li>
                <li><strong>Armazenamento Local:</strong> Preferências de visualização (como idioma, filtros e classes) são salvas exclusivamente no próprio dispositivo do usuário (Local Storage do dispositivo), nunca sendo transmitidas para servidores externos.</li>
                <li><strong>Sem Rastreamento Publicitário:</strong> Não utilizamos identificadores de publicidade (GAID) nem rastreadores invasivos entre apps.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1">3. Permissões Solicitadas</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                O aplicativo solicita apenas permissões básicas de acesso à Internet (<code className="text-blue-400">android.permission.INTERNET</code> e <code className="text-blue-400">android.permission.ACCESS_NETWORK_STATE</code>) com a finalidade exclusiva de carregar as cotações financeiras em tempo real e gráficos técnicos das bolsas americanas.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1">4. Segurança das Informações</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Todas as conexões para carregamento de dados utilizam criptografia de ponta a ponta padrão da indústria (HTTPS / TLS 1.3), garantindo total integridade e segurança de rede.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1">5. Contato do Desenvolvedor</h3>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs space-y-1 text-slate-300">
                <p><strong>Desenvolvedor Responsável:</strong> ScienceBit Computer</p>
                <p><strong>E-mail de Suporte:</strong> camera3.tuca@gmail.com / contato@sciencebit.com.br</p>
                <p><strong>Website Oficial:</strong> https://sciencebit.com.br</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/90 text-xs text-slate-400">
          <span>Acessível diretamente no aplicativo conforme diretriz Google Play.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </div>
  );
};
