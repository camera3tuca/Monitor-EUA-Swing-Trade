# Wall Street Scanner Pro - ScienceBit Computer

Scanner quantitativo em tempo real, rastreador técnico e plataforma de inteligência para Swing Trade no **Mercado Americano (Wall Street: S&P 500, Nasdaq, NYSE, ETFs em US$)** e **Mercado Brasileiro (B3)** com suporte internacional multilíngue (Inglês, Português, Espanhol, Francês e Alemão).

Desenvolvido por **ScienceBit Computer** ([sciencebit.com.br](https://sciencebit.com.br)).

---

## 🌐 Universo de Ativos Rastreados

### 1. Mercado Americano (Wall Street - US$)
- **S&P 500 & Mega-Caps**: Apple (`AAPL`), Microsoft (`MSFT`), Nvidia (`NVDA`), Amazon (`AMZN`), Alphabet (`GOOGL`), Meta (`META`), Tesla (`TSLA`), etc.
- **Nasdaq 100**: Foco em tecnologia, semicondutores e inovação.
- **NYSE**: Blue chips e conglomerados globais (Berkshire Hathaway, JPMorgan, ExxonMobil, Walmart).
- **ETFs Setoriais e Globais**: SPY, QQQ, DIA, IWM, SMH, XLF, XLE, XLK, VOO, ARKK, entre outros.

### 2. Mercado Brasileiro (B3 - R$)
- **Ações, BDRs e ETFs**: Acompanhamento de papéis da B3 com cotações em Reais (PETR4, VALE3, ITUB4, etc.).

---

## 🚀 Principais Módulos & Recursos

- **Scanner Multimercado em Tempo Real**: Varredura contínua de ativos com filtros de sobrevenda técnica (RSI, Estocástico, Índice de Sobrevenda - IS), volume relativo e médias móveis (EMA 20, 50, 200).
- **Metodologia Triple Screen (Alexander Elder)**: Análise de tendência macro e micro com validação de maré e onda (EMA 13 semanas + Estocástico/Força).
- **Trend Template Minervini & Stan Weinstein**: Identificação de ativos em Fase 2 (Uptrend) e checklist quantitativo de 8 critérios.
- **Inteligência Artificial & Machine Learning (Ensemble)**: Projeções de preços com horizonte de 5 dias e intervalos de confiança (Gradient Boosting, Random Forest, Extra Trees, Elastic Net).
- **Agente de Aprendizado por Reforço (RL - Q-Learning)**: Simulação de tomada de decisão com Q-Learning (Comprar / Manter / Vender) e simulação de PnL.
- **Backtesting Quantitativo Integrado**: Avaliação histórica de taxa de acerto (Win Rate), Fator de Lucro (Profit Factor) e retorno médio com alvo técnico de 3% a 7%.
- **Análise Fundamentalista & Fluxo Institucional**: Métricas de múltiplos (P/L, P/VP, EV/EBITDA, Margem Líquida, ROE) e monitoramento de saldo em bloco e fluxo de grandes players.
- **Notícias em Tempo Real & Sentimento**: Agregação de notícias financeiras globais com score quantitativo de sentimento (Yahoo Finance, Finviz, Seeking Alpha, Google News).
- **Gráficos Interativos**: Velas/Candlestick, Bandas de Bollinger, Médias Móveis Exponenciais, Projeção de Fibonacci e canais de volatilidade.
- **Internacionalização Multilíngue (i18n)**: Suporte completo e dinâmico com seletor de idiomas:
  - 🇺🇸 English (Default internacional)
  - 🇧🇷 Português (Brasil)
  - 🇪🇸 Español
  - 🇫🇷 Français
  - 🇩🇪 Deutsch
- **PWA & Mobile Native Ready (Capacitor)**: Aplicativo 100% responsivo, instalável como PWA e empacotado para Android via Capacitor com Kit completo para publicação na Google Play Store.

---

## 🛠️ Arquitetura Tecnológica

A plataforma é construída sobre uma stack moderna, veloz e escalável:

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Recharts, D3.js.
- **Backend**: Node.js com Express e TypeScript (`tsx`), proxy reverso e engine de simulação financeira.
- **Mobile & Store**: Capacitor 8 (Android SDK), Web Manifest com suporte offline PWA, gerador de ícones e assets.
- **Build & Dev**: Vite 8, esbuild.

---

## 💻 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ (recomendado Node 20+)
- npm ou yarn

### Instalação das dependências
```bash
npm install
```

### Modo de Desenvolvimento
Inicia o servidor backend Express integrado com o Vite middleware na porta 3000:
```bash
npm run dev
```
Acesse no navegador: `http://localhost:3000`

### Validação de Tipos & Lint
```bash
npm run lint
```

### Build de Produção
Compila o bundle frontend via Vite e o servidor backend via esbuild:
```bash
npm run build
npm start
```

---

## 📱 Publicação no Google Play Store (Android)

O app conta com o modal **Play Store Kit** diretamente na interface para facilitar a publicação:
- **ID do Pacote (Package ID)**: `br.com.sciencebit.wallstreetscanner`
- **Nome na Loja**: `Wall Street Scanner Pro`
- **Textos da Ficha**: Textos prontos em Inglês e Português (Título, Breve Descrição e Descrição Completa) disponíveis no app.
- **Sincronização Capacitor**:
```bash
npx cap sync android
npx cap open android
```

---

## ⚠️ Isenção de Responsabilidade (Disclaimer)

O **Wall Street Scanner Pro** é uma ferramenta estritamente analítica e educacional voltada ao auxílio no estudo quantitativo e técnico de mercado. Ela não constitui recomendação de investimento ou garantia de retorno financeiro. A gestão responsável de risco é de inteira responsabilidade do operador.
