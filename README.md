# Monitor Swing Trade Pro - ScienceBit Computer

Scanner quantitativo, rastreador técnico e plataforma de inteligência para Swing Trade no **Mercado Americano (Wall Street: S&P 500, Nasdaq, NYSE, ETFs em US$)** e **Mercado Brasileiro (B3)** com suporte bilíngue (Português / Inglês).

Desenvolvido por **ScienceBit Computer** ([sciencebit.com.br](https://sciencebit.com.br)).

## 🌐 Universo de Ativos

### 1. Mercado Americano (Wall Street - US$)
- **S&P 500**: Gigantes globais como Apple (`AAPL`), Microsoft (`MSFT`), Nvidia (`NVDA`), Amazon (`AMZN`), Alphabet (`GOOGL`), Meta (`META`), Tesla (`TSLA`), etc.
- **Nasdaq 100**: Foco em tecnologia, semicondutores e inovação.
- **NYSE**: Blue chips e conglomerados globais (Berkshire Hathaway, JPMorgan, ExxonMobil, Walmart).
- **ETFs Setoriais e Globais**: SPY, QQQ, DIA, IWM, SMH, XLF, XLE, XLK, VOO, ARKK, entre outros.

### 2. Mercado Brasileiro (B3 - R$)
- **Ações, BDRs e ETFs**: Acompanhamento de papéis da B3 com cotações em Reais.

## 🚀 Recursos Principais

- **Scanner Multimercado em Tempo Real**: Varredura de ativos com filtros de sobrevenda técnica (RSI, Estocástico, Índice de Sobrevenda - IS), volume relativo e médias móveis (EMA 20, 50, 200).
- **Metodologia Triple Screen (Alexander Elder)**: Análise de tendência macro e micro com validação de maré e onda.
- **Trend Template Minervini & Stan Weinstein**: Identificação de ativos em Fase 2 (Uptrend) e checklist quantitativo.
- **Inteligência Artificial & Machine Learning**: Modelos preditivos de projeção de preços com horizonte de 5 dias e intervalos de confiança.
- **Agente de Aprendizado por Reforço (RL)**: Simulação de tomada de decisão com Q-Learning (Comprar / Manter / Vender).
- **Backtesting Integrado**: Avaliação histórica de taxa de acerto, fator de lucro (Profit Factor) e retorno médio dos sinais de sobrevenda.
- **Internacionalização Completa**: Alternância instantânea entre Português (PT-BR) e Inglês (EN-US).

### 5. `ml.py` (Previsão via Machine Learning - Ensemble)
Aplica técnicas clássicas de Machine Learning para predição direcional e variação do preço nos próximos dias úteis.
- **Modelos treinados em tempo real:** Gradient Boosting, Random Forest, Extra Trees, Elastic Net, e Regressão Linear.
- Engenharia de features: retornos multi-período (1d, 5d, 15d), volatilidade realizada, e distâncias das EMAs.
- O modelo com o melhor R² no conjunto de teste é automaticamente selecionado para a predição.

### 6. `rl.py` (Agente de Reinforcement Learning - Deep Q-Learning)
Implementa um agente autônomo baseado em Deep Q-Learning (DQN) que simula compras e vendas.
- O agente aprende uma política de trading maximizando os lucros (PnL) baseando-se em diferenças de preços em uma janela deslizante.
- Inclui uma interface (painel) para visualizar os sinais do agente (Buy / Hold / Sell) no conjunto de teste recente.

### 7. `tradingview.py` (TradingView Screener & Dados ao Vivo)
Integra-se com a API oficial do TradingView Screener (sem web scraping) para capturar dezenas de indicadores técnicos simultâneos.
- Gera sinais agregados de "Compra Forte", "Venda", etc., baseados na ponderação do TV para RSI, MACD, EMAs.
- Coleta também informações dos principais pares/concorrentes (peers) do mesmo setor.

### 8. `news.py` (Agregador de Notícias & Análise de Sentimento com IA)
Busca, filtra e traduz notícias em tempo real de várias fontes globais.
- **Fontes Suportadas:** Yahoo Finance, Google News, Seeking Alpha, GuruFocus, MarketWatch e Finviz.
- **Tradução:** As notícias são automaticamente traduzidas para português.
- **Sentimento com IA (Claude):** Através de prompts para a API da Anthropic, gera um sumário executivo, destacando fatores de alta, fatores de baixa e dando um "score" geral para o sentimento do mercado sobre a empresa.

### 9. `styles.py` (Estilos & UI)
Isola as configurações de formatação visual (CSS in-line ou helpers Streamlit) e esquemas de cores.
- Contém funções que colorem tabelas e métricas baseadas no Índice de Sobrevenda, Pontuação Fundamentalista e níveis de liquidez.

## 🚀 Como Executar o App

Para inicializar a aplicação principal, certifique-se de instalar as dependências e então execute:

```bash
pip install -r requirements.txt
streamlit run app.py
```
