import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function buildAllAssets() {
  const publicDir = path.join(process.cwd(), 'public');

  // 1. Feature Graphic (1024 x 500)
  const fgWidth = 1024;
  const fgHeight = 500;
  const fgSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fgWidth} ${fgHeight}" width="${fgWidth}" height="${fgHeight}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070b14"/>
      <stop offset="50%" stop-color="#0b1324"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>

    <linearGradient id="bearCandle" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="100%" stop-color="#e11d48"/>
    </linearGradient>

    <linearGradient id="bullCandle" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.98"/>
    </linearGradient>

    <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="40" result="blur"/>
    </filter>
    <filter id="glowEmerald" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="40" result="blur"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${fgWidth}" height="${fgHeight}" fill="url(#bgGrad)"/>
  <circle cx="850" cy="120" r="180" fill="#2563eb" opacity="0.18" filter="url(#glowBlue)"/>
  <circle cx="200" cy="420" r="160" fill="#10b981" opacity="0.12" filter="url(#glowEmerald)"/>

  <!-- Subtle Financial Grid Lines -->
  <g opacity="0.08" stroke="#94a3b8" stroke-width="1">
    <line x1="0" y1="80" x2="${fgWidth}" y2="80"/>
    <line x1="0" y1="160" x2="${fgWidth}" y2="160"/>
    <line x1="0" y1="240" x2="${fgWidth}" y2="240"/>
    <line x1="0" y1="320" x2="${fgWidth}" y2="320"/>
    <line x1="0" y1="400" x2="${fgWidth}" y2="400"/>
    <line x1="120" y1="0" x2="120" y2="${fgHeight}"/>
    <line x1="280" y1="0" x2="280" y2="${fgHeight}"/>
    <line x1="440" y1="0" x2="440" y2="${fgHeight}"/>
    <line x1="600" y1="0" x2="600" y2="${fgHeight}"/>
    <line x1="760" y1="0" x2="760" y2="${fgHeight}"/>
    <line x1="920" y1="0" x2="920" y2="${fgHeight}"/>
  </g>

  <!-- Decorative dynamic trend waves -->
  <path d="M -50 380 Q 200 450 450 320 T 800 240 T 1100 90" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.25" stroke-dasharray="8,6"/>
  <path d="M -50 430 Q 300 490 600 370 T 1050 150" fill="none" stroke="#10b981" stroke-width="2.5" opacity="0.3"/>

  <!-- LEFT HERO SECTION -->
  <g transform="translate(50, 42)">
    <rect width="265" height="32" rx="16" fill="#1e293b" stroke="#3b82f6" stroke-width="1.2" opacity="0.95"/>
    <circle cx="18" cy="16" r="5" fill="#38bdf8"/>
    <text x="32" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#e2e8f0" letter-spacing="1.2">WALL STREET • NYSE &amp; NASDAQ</text>
  </g>

  <g transform="translate(50, 130)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="#ffffff" letter-spacing="-1">WALL STREET</text>
    <text x="0" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="url(#cyanGrad)" letter-spacing="-1">SCANNER</text>
  </g>

  <g transform="translate(52, 210)">
    <rect x="-4" y="-15" width="410" height="24" rx="4" fill="#1e293b" opacity="0.6"/>
    <text x="6" y="2" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="800" fill="#38bdf8" letter-spacing="1.5">SWING TRADE PRO • S&amp;P 500, NASDAQ &amp; ETFS</text>
  </g>

  <g transform="translate(50, 245)">
    <g transform="translate(0, 0)">
      <rect width="24" height="24" rx="6" fill="#2563eb" opacity="0.3"/>
      <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#60a5fa" text-anchor="middle">✓</text>
      <text x="34" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        Rastreamento de <tspan font-weight="800" fill="#38bdf8">Sobrevenda Extrema</tspan> em Tempo Real
      </text>
    </g>
    <g transform="translate(0, 36)">
      <rect width="24" height="24" rx="6" fill="#10b981" opacity="0.3"/>
      <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#34d399" text-anchor="middle">✓</text>
      <text x="34" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        <tspan font-weight="800" fill="#34d399">Índice I.S.</tspan> &amp; Score Quantitativo (0 a 10)
      </text>
    </g>
    <g transform="translate(0, 72)">
      <rect width="24" height="24" rx="6" fill="#8b5cf6" opacity="0.3"/>
      <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#a78bfa" text-anchor="middle">✓</text>
      <text x="34" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        Modelos <tspan font-weight="800" fill="#a78bfa">Flow.AI, Triple Screen &amp; Fibonacci</tspan>
      </text>
    </g>
    <g transform="translate(0, 108)">
      <rect width="24" height="24" rx="6" fill="#f59e0b" opacity="0.3"/>
      <text x="12" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#fbbf24" text-anchor="middle">✓</text>
      <text x="34" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">
        Cotações e Dados Institucionais em <tspan font-weight="800" fill="#fbbf24">Dólares (US$)</tspan>
      </text>
    </g>
  </g>

  <!-- Bottom Brand -->
  <g transform="translate(50, 435)">
    <rect width="400" height="34" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
    <text x="16" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#ffffff">Science<tspan fill="#3b82f6">Bit</tspan></text>
    <text x="82" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#94a3b8">COMPUTER • sciencebit.com.br</text>
    <line x1="280" y1="10" x2="280" y2="24" stroke="#334155" stroke-width="1"/>
    <text x="292" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#34d399">● Real-Time Scanner</text>
  </g>

  <!-- RIGHT CARD -->
  <g transform="translate(480, 36)">
    <rect width="495" height="428" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.6"/>
    
    <rect width="495" height="42" rx="20" fill="#0b1324" opacity="0.9"/>
    <rect y="22" width="495" height="20" fill="#0b1324" opacity="0.9"/>
    <line x1="0" y1="42" x2="495" y2="42" stroke="#1e293b" stroke-width="1.2"/>

    <circle cx="24" cy="21" r="5" fill="#f43f5e"/>
    <circle cx="40" cy="21" r="5" fill="#fbbf24"/>
    <circle cx="56" cy="21" r="5" fill="#10b981"/>

    <text x="247" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8" text-anchor="middle" letter-spacing="1">WALL STREET QUANT DASHBOARD</text>
    
    <g transform="translate(415, 12)">
      <rect width="66" height="19" rx="9" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1"/>
      <circle cx="10" cy="9.5" r="3.5" fill="#10b981"/>
      <text x="20" y="13.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="900" fill="#34d399" letter-spacing="0.5">AO VIVO</text>
    </g>

    <g transform="translate(18, 54)">
      <g transform="translate(0, 0)">
        <rect width="108" height="28" rx="7" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="12" font-weight="900" fill="#ffffff">NVDA</text>
        <text x="50" y="18" font-family="monospace" font-size="11" font-weight="700" fill="#34d399">+3.8%</text>
      </g>
      <g transform="translate(116, 0)">
        <rect width="108" height="28" rx="7" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="12" font-weight="900" fill="#ffffff">AAPL</text>
        <text x="50" y="18" font-family="monospace" font-size="11" font-weight="700" fill="#34d399">+1.4%</text>
      </g>
      <g transform="translate(232, 0)">
        <rect width="108" height="28" rx="7" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="12" font-weight="900" fill="#ffffff">TSLA</text>
        <text x="50" y="18" font-family="monospace" font-size="11" font-weight="700" fill="#34d399">+4.2%</text>
      </g>
      <g transform="translate(348, 0)">
        <rect width="110" height="28" rx="7" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="10" y="18" font-family="monospace" font-size="12" font-weight="900" fill="#ffffff">QQQ</text>
        <text x="46" y="18" font-family="monospace" font-size="11" font-weight="700" fill="#34d399">+2.1%</text>
      </g>
    </g>

    <!-- Main Spotlight NVDA -->
    <g transform="translate(18, 94)">
      <rect width="458" height="152" rx="14" fill="#0b1324" stroke="#2563eb" stroke-width="1.2"/>

      <g transform="translate(14, 16)">
        <text x="0" y="14" font-family="monospace" font-size="18" font-weight="900" fill="#ffffff">NVDA</text>
        <rect x="58" y="1" width="60" height="17" rx="4" fill="#2563eb" fill-opacity="0.2" stroke="#3b82f6" stroke-width="0.8"/>
        <text x="88" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#60a5fa" text-anchor="middle">NASDAQ</text>
        <text x="126" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">NVIDIA Corp. • Tecnologia</text>
      </g>

      <g transform="translate(330, 16)">
        <text x="114" y="14" font-family="monospace" font-size="17" font-weight="900" fill="#ffffff" text-anchor="end">$230.36</text>
        <text x="114" y="28" font-family="monospace" font-size="11" font-weight="800" fill="#34d399" text-anchor="end">+3.82% ▲</text>
      </g>

      <g transform="translate(14, 52)">
        <line x1="0" y1="20" x2="290" y2="20" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="0" y1="50" x2="290" y2="50" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="0" y1="80" x2="290" y2="80" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3"/>

        <line x1="0" y1="18" x2="290" y2="18" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.8"/>
        <text x="286" y="14" font-family="monospace" font-size="8.5" font-weight="800" fill="#fbbf24" text-anchor="end">Fibo 61.8% ($248.50)</text>

        <line x1="20" y1="15" x2="20" y2="65" stroke="#f43f5e" stroke-width="2"/>
        <rect x="14" y="22" width="12" height="34" rx="2" fill="url(#bearCandle)"/>

        <line x1="50" y1="28" x2="50" y2="78" stroke="#f43f5e" stroke-width="2"/>
        <rect x="44" y="38" width="12" height="32" rx="2" fill="url(#bearCandle)"/>

        <line x1="80" y1="45" x2="80" y2="92" stroke="#f43f5e" stroke-width="2"/>
        <rect x="74" y="52" width="12" height="34" rx="2" fill="url(#bearCandle)"/>

        <line x1="110" y1="50" x2="110" y2="96" stroke="#38bdf8" stroke-width="2.2"/>
        <rect x="104" y="52" width="12" height="15" rx="2" fill="#38bdf8"/>

        <line x1="140" y1="36" x2="140" y2="80" stroke="#10b981" stroke-width="2"/>
        <rect x="134" y="42" width="12" height="30" rx="2" fill="url(#bullCandle)"/>

        <line x1="170" y1="20" x2="170" y2="65" stroke="#10b981" stroke-width="2"/>
        <rect x="164" y="25" width="12" height="32" rx="2" fill="url(#bullCandle)"/>

        <line x1="200" y1="10" x2="200" y2="52" stroke="#10b981" stroke-width="2.2"/>
        <rect x="194" y="14" width="12" height="30" rx="2" fill="url(#bullCandle)"/>

        <path d="M 10 48 Q 110 88 230 18" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
        <circle cx="230" cy="18" r="4.5" fill="#38bdf8"/>
      </g>

      <g transform="translate(320, 52)">
        <rect width="124" height="88" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
        <text x="12" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#94a3b8">QUANT SCORE</text>
        <text x="12" y="42" font-family="monospace" font-size="20" font-weight="900" fill="#fbbf24">9.8<tspan font-size="12" fill="#94a3b8">/10</tspan></text>

        <rect x="12" y="52" width="100" height="24" rx="6" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
        <text x="62" y="68" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" fill="#34d399" text-anchor="middle">🟢 ALTA ASIMETRIA</text>
      </g>
    </g>

    <!-- Indicators Grid -->
    <g transform="translate(18, 258)">
      <g transform="translate(0, 0)">
        <rect width="108" height="66" rx="10" fill="#0b1324" stroke="#334155" stroke-width="1"/>
        <text x="10" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">I.S. SOBREVENDA</text>
        <text x="10" y="44" font-family="monospace" font-size="18" font-weight="900" fill="#34d399">88.4</text>
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#10b981">Exaustão de Baixa</text>
      </g>
      <g transform="translate(116, 0)">
        <rect width="108" height="66" rx="10" fill="#0b1324" stroke="#334155" stroke-width="1"/>
        <text x="10" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">RSI(14)</text>
        <text x="10" y="44" font-family="monospace" font-size="18" font-weight="900" fill="#38bdf8">26.8</text>
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#60a5fa">&lt; 30 Sobrevendido</text>
      </g>
      <g transform="translate(232, 0)">
        <rect width="108" height="66" rx="10" fill="#0b1324" stroke="#334155" stroke-width="1"/>
        <text x="10" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">LIQUIDEZ</text>
        <text x="10" y="44" font-family="monospace" font-size="18" font-weight="900" fill="#38bdf8">💧 10/10</text>
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#60a5fa">$36.7 Bi / dia</text>
      </g>
      <g transform="translate(348, 0)">
        <rect width="110" height="66" rx="10" fill="#0b1324" stroke="#334155" stroke-width="1"/>
        <text x="10" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#94a3b8">3 TELAS (ELDER)</text>
        <text x="10" y="44" font-family="monospace" font-size="16" font-weight="900" fill="#a78bfa">ALINHADO</text>
        <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#c084fc">Semanal + Diário</text>
      </g>
    </g>

    <!-- Opportunity Signals Pill -->
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

  <g transform="translate(820, 20)">
    <rect width="165" height="26" rx="13" fill="#0f172a" stroke="#fbbf24" stroke-width="1.2"/>
    <text x="82" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" fill="#fbbf24" text-anchor="middle" letter-spacing="1">★ 1024 x 500 FEATURE</text>
  </g>
</svg>
`;

  const outFgPng = path.join(publicDir, 'playstore-feature-graphic-1024x500.png');
  await sharp(Buffer.from(fgSvg))
    .resize(1024, 500)
    .png({ quality: 100 })
    .toFile(outFgPng);
  console.log('✓ Feature graphic 1024x500 generated');

  // 2. Icon 512x512
  const iconSvgPath = path.join(publicDir, 'icon.svg');
  const iconSvgBuf = fs.readFileSync(iconSvgPath);
  await sharp(iconSvgBuf).resize(512, 512).png({ quality: 100 }).toFile(path.join(publicDir, 'playstore-icon-512.png'));
  await sharp(iconSvgBuf).resize(512, 512).png({ quality: 100 }).toFile(path.join(publicDir, 'icon-512.png'));
  await sharp(iconSvgBuf).resize(192, 192).png({ quality: 100 }).toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ Icons 512 and 192 updated');

  // 3. Wide Screenshot (1280 x 720) for Manifest / PWA
  const wideSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <rect width="1280" height="720" fill="#0b0f19"/>
  <!-- Top bar -->
  <rect width="1280" height="56" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <circle cx="30" cy="28" r="14" fill="#2563eb"/>
  <text x="56" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" fill="#ffffff">Wall Street Scanner</text>
  <rect x="235" y="19" width="46" height="18" rx="4" fill="#10b981" fill-opacity="0.2"/>
  <text x="258" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" fill="#34d399" text-anchor="middle">LIVE</text>
  <text x="1250" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#94a3b8" text-anchor="end">S&amp;P 500 • NASDAQ • NYSE • US$</text>

  <!-- Filter Bar -->
  <g transform="translate(40, 75)">
    <rect width="1200" height="60" rx="12" fill="#111827" stroke="#1f2937" stroke-width="1"/>
    <text x="20" y="35" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#9ca3af">Mercado: <tspan fill="#60a5fa" font-weight="800">Wall Street (US)</tspan></text>
    <text x="260" y="35" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#9ca3af">Tendência: <tspan fill="#34d399" font-weight="800">Preço &gt; EMA 200</tspan></text>
    <text x="500" y="35" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#9ca3af">Mín. Liquidez: <tspan fill="#fbbf24" font-weight="800">5/10</tspan></text>
    <rect x="1040" y="12" width="140" height="36" rx="8" fill="#2563eb"/>
    <text x="1110" y="35" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">Escanear Ativos</text>
  </g>

  <!-- Table Header -->
  <g transform="translate(40, 155)">
    <rect width="1200" height="40" rx="8" fill="#1e293b"/>
    <text x="20" y="25" font-family="monospace" font-size="12" font-weight="800" fill="#94a3b8">Ticker</text>
    <text x="110" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Classe</text>
    <text x="220" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Setor</text>
    <text x="350" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Empresa</text>
    <text x="520" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Liq.</text>
    <text x="600" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Preço</text>
    <text x="690" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Queda</text>
    <text x="770" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">I.S. (Sobrevenda)</text>
    <text x="910" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Vol. Fin.</text>
    <text x="1000" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Score</text>
    <text x="1100" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#94a3b8">Ação</text>
  </g>

  <!-- Table Rows -->
  ${[
    { ticker: 'NVDA', class: 'NASDAQ', sector: 'Tecnologia', name: 'NVIDIA Corporation', liq: '10/10', price: '$230.36', drop: '-2.8%', is: '88.4', vol: '$36.7B', score: '9.8' },
    { ticker: 'AAPL', class: 'NASDAQ', sector: 'Eletrônicos', name: 'Apple Inc.', liq: '10/10', price: '$319.97', drop: '-1.9%', is: '84.2', vol: '$12.4B', score: '9.4' },
    { ticker: 'TSLA', class: 'NASDAQ', sector: 'Automóveis', name: 'Tesla Inc.', liq: '10/10', price: '$354.08', drop: '-3.5%', is: '86.1', vol: '$18.9B', score: '9.5' },
    { ticker: 'MSFT', class: 'NASDAQ', sector: 'Software', name: 'Microsoft Corporation', liq: '10/10', price: '$512.20', drop: '-1.4%', is: '79.5', vol: '$9.2B', score: '9.1' },
    { ticker: 'ADSK', class: 'NASDAQ', sector: 'Software', name: 'Autodesk Inc.', liq: '9/10', price: '$217.90', drop: '-3.1%', is: '82.0', vol: '$519M', score: '8.9' },
    { ticker: 'MDLZ', class: 'NASDAQ', sector: 'Consumo', name: 'Mondelez International', liq: '8/10', price: '$61.28', drop: '-2.2%', is: '77.8', vol: '$461M', score: '8.6' },
    { ticker: 'PTC', class: 'NASDAQ', sector: 'Software', name: 'PTC Inc.', liq: '7/10', price: '$141.02', drop: '-2.9%', is: '76.4', vol: '$177M', score: '8.4' },
    { ticker: 'MUZ', class: 'NYSE', sector: 'Finanças', name: 'Muzinich Dynamic Fund', liq: '6/10', price: '$8.01', drop: '-1.8%', is: '71.2', vol: '$72M', score: '8.0' },
  ].map((row, i) => `
    <g transform="translate(40, ${205 + i * 55})">
      <rect width="1200" height="48" rx="6" fill="${i % 2 === 0 ? '#0f172a' : '#131d33'}" stroke="#1e293b" stroke-width="0.8"/>
      <text x="20" y="30" font-family="monospace" font-size="14" font-weight="900" fill="#60a5fa">${row.ticker}</text>
      <text x="110" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#94a3b8">${row.class}</text>
      <text x="220" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">${row.sector}</text>
      <text x="350" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">${row.name}</text>
      <text x="520" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#38bdf8">${row.liq}</text>
      <text x="600" y="30" font-family="monospace" font-size="13" font-weight="800" fill="#ffffff">${row.price}</text>
      <text x="690" y="30" font-family="monospace" font-size="13" font-weight="800" fill="#f43f5e">${row.drop}</text>
      <g transform="translate(770, 16)">
        <rect width="90" height="14" rx="7" fill="#1e293b"/>
        <rect width="${parseFloat(row.is) * 0.9}" height="14" rx="7" fill="#10b981"/>
        <text x="100" y="12" font-family="monospace" font-size="11" font-weight="800" fill="#34d399">${row.is}</text>
      </g>
      <text x="910" y="30" font-family="monospace" font-size="12" font-weight="700" fill="#94a3b8">${row.vol}</text>
      <text x="1000" y="30" font-family="monospace" font-size="13" font-weight="900" fill="#fbbf24">${row.score}</text>
      <rect x="1090" y="14" width="70" height="24" rx="6" fill="#2563eb" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1"/>
      <text x="1125" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#60a5fa" text-anchor="middle">Analisar</text>
    </g>
  `).join('')}
</svg>
`;

  await sharp(Buffer.from(wideSvg)).resize(1280, 720).png({ quality: 100 }).toFile(path.join(publicDir, 'screenshot-wide.png'));
  console.log('✓ screenshot-wide.png generated');

  // 4. Mobile Screenshot (720 x 1280)
  const mobileSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1280" width="720" height="1280">
  <rect width="720" height="1280" fill="#0b0f19"/>
  <!-- Header -->
  <rect width="720" height="70" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
  <circle cx="45" cy="35" r="16" fill="#2563eb"/>
  <text x="75" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" fill="#ffffff">Wall Street Scanner</text>
  <rect x="290" y="24" width="55" height="22" rx="5" fill="#10b981" fill-opacity="0.2"/>
  <text x="317" y="39" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" fill="#34d399" text-anchor="middle">LIVE</text>

  <!-- Market Card -->
  <g transform="translate(30, 95)">
    <rect width="660" height="200" rx="16" fill="#0f172a" stroke="#2563eb" stroke-width="1.5"/>
    <text x="25" y="38" font-family="monospace" font-size="22" font-weight="900" fill="#ffffff">NVDA • NVIDIA Corp.</text>
    <text x="635" y="38" font-family="monospace" font-size="22" font-weight="900" fill="#ffffff" text-anchor="end">$230.36</text>
    <text x="635" y="60" font-family="monospace" font-size="14" font-weight="800" fill="#34d399" text-anchor="end">+3.82% ▲</text>

    <text x="25" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#94a3b8">I.S. (Sobrevenda): <tspan fill="#34d399" font-weight="900">88.4 / 100</tspan></text>
    <text x="25" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#94a3b8">Score Quant: <tspan fill="#fbbf24" font-weight="900">9.8 / 10</tspan></text>
    <text x="25" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#94a3b8">Volume Diário: <tspan fill="#38bdf8" font-weight="900">$36.7 Bilhões</tspan></text>
    <text x="25" y="155" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#94a3b8">Tendência Primária: <tspan fill="#34d399" font-weight="900">Alta (Preço &gt; EMA 200)</tspan></text>
  </g>

  <!-- Technical Chart -->
  <g transform="translate(30, 320)">
    <rect width="660" height="340" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
    <text x="25" y="35" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#ffffff">Gráfico Técnico Diário &amp; Fibonacci</text>
    <!-- Fibo line -->
    <line x1="25" y1="90" x2="635" y2="90" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text x="630" y="85" font-family="monospace" font-size="11" font-weight="800" fill="#fbbf24" text-anchor="end">Fibo 61.8% ($248.50)</text>

    <!-- Candlesticks -->
    <line x1="120" y1="120" x2="120" y2="240" stroke="#f43f5e" stroke-width="3"/>
    <rect x="108" y="140" width="24" height="70" rx="3" fill="#e11d48"/>

    <line x1="220" y1="160" x2="220" y2="280" stroke="#f43f5e" stroke-width="3"/>
    <rect x="208" y="180" width="24" height="65" rx="3" fill="#e11d48"/>

    <!-- Hammer reversal -->
    <line x1="320" y1="180" x2="320" y2="300" stroke="#38bdf8" stroke-width="3.5"/>
    <rect x="308" y="190" width="24" height="30" rx="3" fill="#38bdf8"/>

    <line x1="420" y1="140" x2="420" y2="250" stroke="#10b981" stroke-width="3"/>
    <rect x="408" y="150" width="24" height="70" rx="3" fill="#10b981"/>

    <line x1="520" y1="80" x2="520" y2="210" stroke="#10b981" stroke-width="3.5"/>
    <rect x="508" y="90" width="24" height="80" rx="3" fill="#10b981"/>

    <!-- Trajectory line -->
    <path d="M 80 200 Q 320 290 560 100" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- Indicators Grid -->
  <g transform="translate(30, 680)">
    <rect width="660" height="280" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
    <text x="25" y="35" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#ffffff">Indicadores &amp; Modelos Quantitativos</text>

    <!-- 4 cards -->
    <g transform="translate(25, 55)">
      <rect width="285" height="90" rx="10" fill="#111827" stroke="#1f2937" stroke-width="1"/>
      <text x="15" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#9ca3af">RSI(14)</text>
      <text x="15" y="60" font-family="monospace" font-size="24" font-weight="900" fill="#38bdf8">26.8</text>
      <text x="15" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#60a5fa">&lt; 30 Sobrevendido</text>
    </g>

    <g transform="translate(350, 55)">
      <rect width="285" height="90" rx="10" fill="#111827" stroke="#1f2937" stroke-width="1"/>
      <text x="15" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#9ca3af">Estocástico Lento</text>
      <text x="15" y="60" font-family="monospace" font-size="24" font-weight="900" fill="#34d399">18.4</text>
      <text x="15" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#10b981">Gatilho %K &gt; %D</text>
    </g>

    <g transform="translate(25, 165)">
      <rect width="285" height="90" rx="10" fill="#111827" stroke="#1f2937" stroke-width="1"/>
      <text x="15" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#9ca3af">Triple Screen (Elder)</text>
      <text x="15" y="60" font-family="monospace" font-size="20" font-weight="900" fill="#a78bfa">ALINHADO</text>
      <text x="15" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#c084fc">Maré Alta + Onda Baixa</text>
    </g>

    <g transform="translate(350, 165)">
      <rect width="285" height="90" rx="10" fill="#111827" stroke="#1f2937" stroke-width="1"/>
      <text x="15" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#9ca3af">Predição ML Ensemble</text>
      <text x="15" y="60" font-family="monospace" font-size="24" font-weight="900" fill="#fbbf24">+5.4%</text>
      <text x="15" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#f59e0b">Probabilidade 82%</text>
    </g>
  </g>

  <!-- Bottom Brand -->
  <g transform="translate(30, 980)">
    <rect width="660" height="50" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
    <text x="330" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#94a3b8" text-anchor="middle">Desenvolvido por ScienceBit Computer • sciencebit.com.br</text>
  </g>
</svg>
`;

  await sharp(Buffer.from(mobileSvg)).resize(720, 1280).png({ quality: 100 }).toFile(path.join(publicDir, 'screenshot-mobile.png'));
  console.log('✓ screenshot-mobile.png generated');

  // Re-build wallstreet-scanner-playstore-assets.zip cleanly from inside public folder
  console.log('Rebuilding zip archive cleanly using python3...');
  execSync('python3 zip-assets.py', { cwd: process.cwd(), stdio: 'inherit' });
  console.log('✓ Clean zip archive built successfully');
}

buildAllAssets().catch(console.error);
