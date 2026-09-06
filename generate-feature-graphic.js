import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function generateFeatureGraphic() {
  const width = 1024;
  const height = 500;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070b14"/>
      <stop offset="50%" stop-color="#0b1324"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <!-- Electric Cyan/Blue Gradient -->
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>

    <!-- Glowing Bullish Emerald Gradient -->
    <linearGradient id="bullGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>

    <!-- Glowing Accent Gold Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>

    <!-- Candle Bearish Gradient -->
    <linearGradient id="bearCandle" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="100%" stop-color="#e11d48"/>
    </linearGradient>

    <!-- Candle Bullish Gradient -->
    <linearGradient id="bullCandle" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>

    <!-- Glass Card Gradient -->
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.98"/>
    </linearGradient>

    <!-- Ambient Glow Filter -->
    <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="40" result="blur"/>
    </filter>
    <filter id="glowEmerald" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="40" result="blur"/>
    </filter>
  </defs>

  <!-- 1. Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>

  <!-- Glowing background orbs for depth -->
  <circle cx="850" cy="120" r="180" fill="#2563eb" opacity="0.18" filter="url(#glowBlue)"/>
  <circle cx="200" cy="420" r="160" fill="#10b981" opacity="0.12" filter="url(#glowEmerald)"/>
  <circle cx="500" cy="250" r="220" fill="#3b82f6" opacity="0.08" filter="url(#glowBlue)"/>

  <!-- Subtle Financial Grid Lines -->
  <g opacity="0.08" stroke="#94a3b8" stroke-width="1">
    <line x1="0" y1="80" x2="${width}" y2="80"/>
    <line x1="0" y1="160" x2="${width}" y2="160"/>
    <line x1="0" y1="240" x2="${width}" y2="240"/>
    <line x1="0" y1="320" x2="${width}" y2="320"/>
    <line x1="0" y1="400" x2="${width}" y2="400"/>
    <line x1="120" y1="0" x2="120" y2="${height}"/>
    <line x1="280" y1="0" x2="280" y2="${height}"/>
    <line x1="440" y1="0" x2="440" y2="${height}"/>
    <line x1="600" y1="0" x2="600" y2="${height}"/>
    <line x1="760" y1="0" x2="760" y2="${height}"/>
    <line x1="920" y1="0" x2="920" y2="${height}"/>
  </g>

  <!-- Decorative dynamic trend waves in the background -->
  <path d="M -50 380 Q 200 450 450 320 T 800 240 T 1100 90" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.25" stroke-dasharray="8,6"/>
  <path d="M -50 430 Q 300 490 600 370 T 1050 150" fill="none" stroke="#10b981" stroke-width="2.5" opacity="0.3"/>

  <!-- ================= LEFT COLUMN: HERO CONTENT ================= -->

  <!-- Market Category Pill Badge -->
  <g transform="translate(50, 42)">
    <rect width="265" height="32" rx="16" fill="#1e293b" stroke="#3b82f6" stroke-width="1.2" opacity="0.95"/>
    <circle cx="18" cy="16" r="5" fill="#38bdf8"/>
    <text x="32" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#e2e8f0" letter-spacing="1.2">WALL STREET • NYSE &amp; NASDAQ</text>
  </g>

  <!-- Main Headline -->
  <g transform="translate(50, 130)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="#ffffff" letter-spacing="-1">WALL STREET</text>
    <text x="0" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="url(#cyanGrad)" letter-spacing="-1">SCANNER</text>
  </g>

  <!-- Subtitle -->
  <g transform="translate(52, 210)">
    <rect x="-4" y="-15" width="410" height="24" rx="4" fill="#1e293b" opacity="0.6"/>
    <text x="6" y="2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="800" fill="#38bdf8" letter-spacing="1.5">SWING TRADE PRO • S&amp;P 500, NASDAQ &amp; ETFS</text>
  </g>

  <!-- Value Propositions List -->
  <g transform="translate(50, 245)">
    <!-- Feature 1 -->
    <g transform="translate(0, 0)">
      <rect width="24" height="24" rx="6" fill="#2563eb" opacity="0.3"/>
      <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#60a5fa" text-anchor="middle">✓</text>
      <text x="34" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        Rastreamento de <tspan font-weight="800" fill="#38bdf8">Sobrevenda Extrema</tspan> em Tempo Real
      </text>
    </g>

    <!-- Feature 2 -->
    <g transform="translate(0, 36)">
      <rect width="24" height="24" rx="6" fill="#10b981" opacity="0.3"/>
      <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#34d399" text-anchor="middle">✓</text>
      <text x="34" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        <tspan font-weight="800" fill="#34d399">Índice I.S.</tspan> &amp; Score Quantitativo (0 a 10)
      </text>
    </g>

    <!-- Feature 3 -->
    <g transform="translate(0, 72)">
      <rect width="24" height="24" rx="6" fill="#8b5cf6" opacity="0.3"/>
      <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#a78bfa" text-anchor="middle">✓</text>
      <text x="34" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        Modelos <tspan font-weight="800" fill="#a78bfa">Flow.AI, Triple Screen &amp; Fibonacci</tspan>
      </text>
    </g>

    <!-- Feature 4 -->
    <g transform="translate(0, 108)">
      <rect width="24" height="24" rx="6" fill="#f59e0b" opacity="0.3"/>
      <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#fbbf24" text-anchor="middle">✓</text>
      <text x="34" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        Cotações e Dados Institucionais em <tspan font-weight="800" fill="#fbbf24">Dólares (US$)</tspan>
      </text>
    </g>
  </g>

  <!-- Bottom Left: ScienceBit Branding Footer -->
  <g transform="translate(50, 435)">
    <rect width="400" height="34" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
    <!-- ScienceBit wordmark mini -->
    <text x="16" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#ffffff">Science<tspan fill="#3b82f6">Bit</tspan></text>
    <text x="82" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#94a3b8">COMPUTER • sciencebit.com.br</text>
    <line x1="280" y1="10" x2="280" y2="24" stroke="#334155" stroke-width="1"/>
    <text x="292" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#34d399">● Real-Time Scanner</text>
  </g>

  <!-- ================= RIGHT COLUMN: INTERACTIVE SCANNER CARD ================= -->
  <g transform="translate(480, 36)">
    <!-- Card Container Shadow & Border -->
    <rect width="495" height="428" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.6"/>
    
    <!-- Top Window Titlebar -->
    <rect width="495" height="42" rx="20" fill="#0b1324" opacity="0.9"/>
    <rect y="22" width="495" height="20" fill="#0b1324" opacity="0.9"/>
    <line x1="0" y1="42" x2="495" y2="42" stroke="#1e293b" stroke-width="1.2"/>

    <!-- Window Dots -->
    <circle cx="24" cy="21" r="5" fill="#f43f5e"/>
    <circle cx="40" cy="21" r="5" fill="#fbbf24"/>
    <circle cx="56" cy="21" r="5" fill="#10b981"/>

    <!-- Window Title -->
    <text x="247" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8" text-anchor="middle" letter-spacing="1">WALL STREET QUANT DASHBOARD</text>
    
    <!-- Live Status -->
    <g transform="translate(415, 12)">
      <rect width="66" height="19" rx="9" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1"/>
      <circle cx="10" cy="9.5" r="3.5" fill="#10b981"/>
      <text x="20" y="13.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="900" fill="#34d399" letter-spacing="0.5">AO VIVO</text>
    </g>

    <!-- Ticker Tape Row -->
    <g transform="translate(18, 54)">
      <!-- Ticker 1: NVDA -->
      <g transform="translate(0, 0)">
        <rect width="108" height="28" rx="7" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="12" font-weight="900" fill="#ffffff">NVDA</text>
        <text x="50" y="18" font-family="monospace" font-size="11" font-weight="700" fill="#34d399">+3.8%</text>
      </g>
      <!-- Ticker 2: AAPL -->
      <g transform="translate(116, 0)">
        <rect width="108" height="28" rx="7" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="12" font-weight="900" fill="#ffffff">AAPL</text>
        <text x="50" y="18" font-family="monospace" font-size="11" font-weight="700" fill="#34d399">+1.4%</text>
      </g>
      <!-- Ticker 3: TSLA -->
      <g transform="translate(232, 0)">
        <rect width="108" height="28" rx="7" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="12" font-weight="900" fill="#ffffff">TSLA</text>
        <text x="50" y="18" font-family="monospace" font-size="11" font-weight="700" fill="#34d399">+4.2%</text>
      </g>
      <!-- Ticker 4: QQQ -->
      <g transform="translate(348, 0)">
        <rect width="110" height="28" rx="7" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="12" font-weight="900" fill="#ffffff">QQQ</text>
        <text x="46" y="18" font-family="monospace" font-size="11" font-weight="700" fill="#34d399">+2.1%</text>
      </g>
    </g>

    <!-- Main Active Opportunity Spotlight: NVDA -->
    <g transform="translate(18, 94)">
      <rect width="458" height="152" rx="14" fill="#0b1324" stroke="#2563eb" stroke-width="1.2"/>

      <!-- Asset Title & Class -->
      <g transform="translate(14, 16)">
        <text x="0" y="14" font-family="monospace" font-size="18" font-weight="900" fill="#ffffff">NVDA</text>
        <rect x="58" y="1" width="60" height="17" rx="4" fill="#2563eb" fill-opacity="0.2" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="88" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#60a5fa" text-anchor="middle">NASDAQ</text>
        <text x="126" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">NVIDIA Corp. • Tecnologia</text>
      </g>

      <!-- Current Price and Opportunity Rating -->
      <g transform="translate(330, 16)">
        <text x="114" y="14" font-family="monospace" font-size="17" font-weight="900" fill="#ffffff" text-anchor="end">$230.36</text>
        <text x="114" y="28" font-family="monospace" font-size="11" font-weight="800" fill="#34d399" text-anchor="end">+3.82% ▲</text>
      </g>

      <!-- Mini Candlestick Chart Simulation -->
      <g transform="translate(14, 52)">
        <!-- Chart Grid Lines -->
        <line x1="0" y1="20" x2="290" y2="20" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="0" y1="50" x2="290" y2="50" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="0" y1="80" x2="290" y2="80" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>

        <!-- Fibo Target Line -->
        <line x1="0" y1="18" x2="290" y2="18" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.8"/>
        <text x="286" y="14" font-family="monospace" font-size="8.5" font-weight="800" fill="#fbbf24" text-anchor="end">Fibo 61.8% ($248.50)</text>

        <!-- Dynamic Candle Series (Oversold Dip to Bullish Reversal) -->
        <!-- Candle 1 (Drop) -->
        <line x1="20" y1="15" x2="20" y2="65" stroke="#f43f5e" stroke-width="2"/>
        <rect x="14" y="22" width="12" height="34" rx="2" fill="url(#bearCandle)"/>

        <!-- Candle 2 (Drop) -->
        <line x1="50" y1="28" x2="50" y2="78" stroke="#f43f5e" stroke-width="2"/>
        <rect x="44" y="38" width="12" height="32" rx="2" fill="url(#bearCandle)"/>

        <!-- Candle 3 (Deep Oversold Dip) -->
        <line x1="80" y1="45" x2="80" y2="92" stroke="#f43f5e" stroke-width="2"/>
        <rect x="74" y="52" width="12" height="34" rx="2" fill="url(#bearCandle)"/>

        <!-- Candle 4 (Hammer / Reversal Point) -->
        <line x1="110" y1="50" x2="110" y2="96" stroke="#38bdf8" stroke-width="2.2"/>
        <rect x="104" y="52" width="12" height="15" rx="2" fill="#38bdf8"/>

        <!-- Candle 5 (Bull Rebound) -->
        <line x1="140" y1="36" x2="140" y2="80" stroke="#10b981" stroke-width="2"/>
        <rect x="134" y="42" width="12" height="30" rx="2" fill="url(#bullCandle)"/>

        <!-- Candle 6 (Bull Breakout) -->
        <line x1="170" y1="20" x2="170" y2="65" stroke="#10b981" stroke-width="2"/>
        <rect x="164" y="25" width="12" height="32" rx="2" fill="url(#bullCandle)"/>

        <!-- Candle 7 (Strong Bull Rally) -->
        <line x1="200" y1="10" x2="200" y2="52" stroke="#10b981" stroke-width="2.2"/>
        <rect x="194" y="14" width="12" height="30" rx="2" fill="url(#bullCandle)"/>

        <!-- EMA 20 Trajectory curve -->
        <path d="M 10 48 Q 110 88 230 18" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
        <circle cx="230" cy="18" r="4.5" fill="#38bdf8"/>
      </g>

      <!-- Side Quantitative Snapshot Box -->
      <g transform="translate(320, 52)">
        <rect width="124" height="88" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        
        <!-- Score -->
        <text x="12" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#94a3b8">QUANT SCORE</text>
        <text x="12" y="42" font-family="monospace" font-size="20" font-weight="900" fill="#fbbf24">9.8<tspan font-size="12" fill="#94a3b8">/10</tspan></text>

        <!-- Potencial Badge -->
        <rect x="12" y="52" width="100" height="24" rx="6" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
        <text x="62" y="68" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" fill="#34d399" text-anchor="middle">🟢 ALTA ASIMETRIA</text>
      </g>
    </g>

    <!-- Real Technical Indicators Grid -->
    <g transform="translate(18, 258)">
      <!-- Metric 1: I.S. -->
      <g transform="translate(0, 0)">
        <rect width="108" height="66" rx="10" fill="#0b1324" stroke="#334155" stroke-width="1"/>
        <text x="10" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">I.S. SOBREVENDA</text>
        <text x="10" y="44" font-family="monospace" font-size="18" font-weight="900" fill="#34d399">88.4</text>
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#10b981">Exaustão de Baixa</text>
      </g>

      <!-- Metric 2: RSI(14) -->
      <g transform="translate(116, 0)">
        <rect width="108" height="66" rx="10" fill="#0b1324" stroke="#334155" stroke-width="1"/>
        <text x="10" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">RSI(14)</text>
        <text x="10" y="44" font-family="monospace" font-size="18" font-weight="900" fill="#38bdf8">26.8</text>
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#60a5fa">&lt; 30 Sobrevendido</text>
      </g>

      <!-- Metric 3: Liquidez -->
      <g transform="translate(232, 0)">
        <rect width="108" height="66" rx="10" fill="#0b1324" stroke="#334155" stroke-width="1"/>
        <text x="10" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">LIQUIDEZ</text>
        <text x="10" y="44" font-family="monospace" font-size="18" font-weight="900" fill="#38bdf8">💧 10/10</text>
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#60a5fa">$36.7 Bi / dia</text>
      </g>

      <!-- Metric 4: Triple Screen -->
      <g transform="translate(348, 0)">
        <rect width="110" height="66" rx="10" fill="#0b1324" stroke="#334155" stroke-width="1"/>
        <text x="10" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">3 TELAS (ELDER)</text>
        <text x="10" y="44" font-family="monospace" font-size="16" font-weight="900" fill="#a78bfa">ALINHADO</text>
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#c084fc">Semanal + Diário</text>
      </g>
    </g>

    <!-- Bottom Opportunity Signals Pill -->
    <g transform="translate(18, 336)">
      <rect width="458" height="42" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <g transform="translate(14, 25)">
        <circle cx="6" cy="-4" r="4" fill="#34d399"/>
        <text x="18" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="700" fill="#e2e8f0">
          Sinais: <tspan fill="#34d399" font-weight="800">RSI Sobrevendido</tspan> • <tspan fill="#60a5fa" font-weight="800">Estocástico Gatilho</tspan> • <tspan fill="#fbbf24" font-weight="800">Suporte Fibonacci 61.8%</tspan>
        </text>
      </g>
    </g>
  </g>

  <!-- Golden Top Right Badge: Official Google Play Kit -->
  <g transform="translate(820, 20)">
    <rect width="165" height="26" rx="13" fill="#0f172a" stroke="#fbbf24" stroke-width="1.2"/>
    <text x="82" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" fill="#fbbf24" text-anchor="middle" letter-spacing="1">★ 1024 x 500 FEATURE</text>
  </g>
</svg>
`;

  const outSvg = path.join(process.cwd(), 'public', 'playstore-feature-graphic-1024x500.svg');
  const outPng = path.join(process.cwd(), 'public', 'playstore-feature-graphic-1024x500.png');

  fs.writeFileSync(outSvg, svg);

  await sharp(Buffer.from(svg))
    .resize(1024, 500)
    .png({ quality: 100, compressionLevel: 8 })
    .toFile(outPng);

  console.log('Successfully rendered playstore-feature-graphic-1024x500.png');

  // Also update playstore-icon-512.png from public/icon.svg to ensure complete consistency
  const iconSvgPath = path.join(process.cwd(), 'public', 'icon.svg');
  if (fs.existsSync(iconSvgPath)) {
    const iconSvgBuf = fs.readFileSync(iconSvgPath);
    const outPlayIcon = path.join(process.cwd(), 'public', 'playstore-icon-512.png');
    await sharp(iconSvgBuf)
      .resize(512, 512)
      .png({ quality: 100 })
      .toFile(outPlayIcon);
    console.log('Successfully refreshed playstore-icon-512.png');
  }

  // Update wallstreet-scanner-playstore-assets.zip
  const zipPath = path.join(process.cwd(), 'public', 'wallstreet-scanner-playstore-assets.zip');
  try {
    execSync('zip -u public/wallstreet-scanner-playstore-assets.zip public/playstore-feature-graphic-1024x500.png public/playstore-icon-512.png', { cwd: process.cwd() });
    console.log('Successfully updated assets zip archive');
  } catch (err) {
    console.warn('Zip update notice:', err.message);
  }
}

generateFeatureGraphic().catch(console.error);
