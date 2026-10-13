const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// Helper to render high quality SVG to PNG
function generateScreenshot(svgContent, filename) {
  const resvg = new Resvg(svgContent, {
    fitTo: { mode: 'width', value: 1080 },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'sans-serif'
    }
  });
  const png = resvg.render().asPng();
  const destPath = path.join(__dirname, '../public/' + filename);
  fs.writeFileSync(destPath, png);
  console.log(`✅ Gerado ${filename} (${png.length} bytes)`);
}

const icon512Base64 = fs.readFileSync(path.join(__dirname, '../public/playstore-icon-512.png')).toString('base64');

// Common styles & gradients
const commonDefs = `
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050811"/>
      <stop offset="40%" stop-color="#0a101d"/>
      <stop offset="100%" stop-color="#04060b"/>
    </linearGradient>

    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>

    <linearGradient id="bullGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>

    <linearGradient id="candleGreen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>

    <linearGradient id="candleRed" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="100%" stop-color="#e11d48"/>
    </linearGradient>
  </defs>
`;

// Helper: Top status bar of the phone
const statusBar = `
  <g transform="translate(30, 20)">
    <text x="15" y="24" fill="#94a3b8" font-family="sans-serif" font-size="18" font-weight="600">10:45</text>
    <g transform="translate(830, 8)">
      <path d="M 0 16 A 16 16 0 0 1 24 16 L 12 24 Z" fill="#94a3b8"/>
      <rect x="35" y="4" width="24" height="14" rx="3" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <rect x="38" y="7" width="14" height="8" fill="#94a3b8"/>
      <rect x="60" y="8" width="2" height="6" fill="#94a3b8"/>
    </g>
  </g>
`;

// ============================================================================
// 1. SCREENSHOT 1: SCANNER EM TEMPO REAL (WALL STREET NYSE & NASDAQ)
// ============================================================================
const screenshot1 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  ${commonDefs}

  <!-- Canvas Background -->
  <rect width="1080" height="1920" fill="url(#bgGrad)"/>
  <circle cx="200" cy="180" r="280" fill="#2563eb" opacity="0.15"/>
  <circle cx="880" cy="1200" r="320" fill="#10b981" opacity="0.1"/>

  <!-- Top Marketing Banner Text -->
  <g transform="translate(70, 70)">
    <rect width="320" height="48" rx="24" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="160" y="31" fill="#60a5fa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="2">WALL STREET • NYSE &amp; NASDAQ</text>

    <text x="0" y="115" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">Rastreamento de Sobrevenda</text>
    <text x="0" y="165" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="500">Encontre reversões lucrativas de Swing Trade em ações dos EUA</text>
  </g>

  <!-- Smartphone Mockup -->
  <g transform="translate(60, 250)">
    <rect width="960" height="1630" rx="48" fill="#090d16" stroke="#334155" stroke-width="6"/>
    <rect width="948" height="1618" x="6" y="6" rx="44" fill="#020617"/>

    ${statusBar}

    <!-- Header inside phone (Authentic Wall Street Scanner) -->
    <g transform="translate(24, 60)">
      <rect width="900" height="85" rx="18" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
      
      <!-- New Charging Bull App Icon -->
      <image href="data:image/png;base64,${icon512Base64}" x="18" y="15" width="55" height="55" />

      <text x="86" y="42" fill="#ffffff" font-family="sans-serif" font-size="22" font-weight="900">Wall Street Scanner</text>
      <text x="86" y="62" fill="#38bdf8" font-family="sans-serif" font-size="14" font-weight="700">Swing Trade Pro • S&amp;P 500 &amp; Nasdaq</text>

      <!-- Live Market Pill -->
      <g transform="translate(670, 22)">
        <rect width="210" height="40" rx="20" fill="#022c22" stroke="#059669" stroke-width="1.5"/>
        <circle cx="24" cy="20" r="6" fill="#10b981"/>
        <text x="118" y="26" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">MERCADO ABERTO</text>
      </g>
    </g>

    <!-- Universe Filter Badges -->
    <g transform="translate(24, 160)">
      <rect width="180" height="44" rx="12" fill="#2563eb"/>
      <text x="90" y="28" fill="#ffffff" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">★ Todos (US)</text>

      <rect x="195" width="160" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="275" y="28" fill="#94a3b8" font-family="sans-serif" font-size="15" font-weight="600" text-anchor="middle">S&amp;P 500</text>

      <rect x="370" width="160" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="450" y="28" fill="#94a3b8" font-family="sans-serif" font-size="15" font-weight="600" text-anchor="middle">Nasdaq 100</text>

      <rect x="545" width="140" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="615" y="28" fill="#94a3b8" font-family="sans-serif" font-size="15" font-weight="600" text-anchor="middle">NYSE</text>

      <rect x="700" width="200" height="44" rx="12" fill="#0f172a" stroke="#10b981" stroke-width="1.2"/>
      <text x="800" y="28" fill="#34d399" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Preço &gt; EMA 200</text>
    </g>

    <!-- CARD 1: NVDA -->
    <g transform="translate(24, 225)">
      <rect width="900" height="240" rx="20" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
      
      <g transform="translate(25, 22)">
        <rect width="90" height="38" rx="8" fill="#2563eb"/>
        <text x="45" y="26" fill="#ffffff" font-family="sans-serif" font-size="19" font-weight="900" text-anchor="middle">NVDA</text>
        <text x="105" y="27" fill="#ffffff" font-family="sans-serif" font-size="22" font-weight="bold">NVIDIA Corporation</text>
        
        <rect x="350" width="95" height="26" rx="6" fill="#1e293b"/>
        <text x="397" y="18" fill="#38bdf8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="700">NASDAQ</text>

        <rect x="720" width="150" height="36" rx="10" fill="#022c22" stroke="#059669" stroke-width="1.5"/>
        <text x="795" y="24" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">SCORE 9.8</text>
      </g>

      <g transform="translate(25, 80)">
        <text x="0" y="38" fill="#ffffff" font-family="monospace" font-size="38" font-weight="900">$230.36</text>
        <text x="210" y="34" fill="#34d399" font-family="monospace" font-size="22" font-weight="900">+3.82% ▲</text>
        <text x="360" y="32" fill="#94a3b8" font-family="sans-serif" font-size="15">Vol: <tspan fill="#38bdf8" font-weight="bold">$36.7 Bi</tspan> • Liq: <tspan fill="#fbbf24" font-weight="bold">10/10</tspan></text>
      </g>

      <g transform="translate(25, 140)">
        <rect width="205" height="75" rx="14" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="20" y="30" fill="#94a3b8" font-family="sans-serif" font-size="13">I.S. (Sobrevenda)</text>
        <text x="20" y="60" fill="#fb7185" font-family="monospace" font-size="24" font-weight="900">88.4</text>
        <text x="110" y="60" fill="#f43f5e" font-family="sans-serif" font-size="13" font-weight="bold">SOBREV.</text>

        <rect x="220" width="205" height="75" rx="14" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="240" y="30" fill="#94a3b8" font-family="sans-serif" font-size="13">Alvo EMA 21</text>
        <text x="240" y="60" fill="#38bdf8" font-family="monospace" font-size="24" font-weight="900">$248.50</text>
        <text x="375" y="60" fill="#10b981" font-family="sans-serif" font-size="14" font-weight="bold">+7.8%</text>

        <rect x="440" width="205" height="75" rx="14" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="460" y="30" fill="#94a3b8" font-family="sans-serif" font-size="13">Setup Quant</text>
        <text x="460" y="60" fill="#34d399" font-family="sans-serif" font-size="17" font-weight="bold">Larry Williams 9.1</text>

        <rect x="660" width="200" height="75" rx="14" fill="#022c22" stroke="#059669" stroke-width="1.5"/>
        <text x="680" y="30" fill="#86efac" font-family="sans-serif" font-size="13">Probab. Repique</text>
        <text x="680" y="60" fill="#4ade80" font-family="monospace" font-size="24" font-weight="900">89.4%</text>
      </g>
    </g>

    <!-- CARD 2: AAPL -->
    <g transform="translate(24, 485)">
      <rect width="900" height="215" rx="20" fill="#0b1120" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(25, 20)">
        <rect width="90" height="38" rx="8" fill="#334155"/>
        <text x="45" y="26" fill="#ffffff" font-family="sans-serif" font-size="19" font-weight="bold" text-anchor="middle">AAPL</text>
        <text x="105" y="26" fill="#ffffff" font-family="sans-serif" font-size="21" font-weight="bold">Apple Inc.</text>
        <rect x="235" width="95" height="26" rx="6" fill="#1e293b"/>
        <text x="282" y="18" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">NASDAQ</text>

        <rect x="720" width="150" height="36" rx="10" fill="#022c22" stroke="#059669" stroke-width="1"/>
        <text x="795" y="24" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">SCORE 9.4</text>
      </g>

      <g transform="translate(25, 75)">
        <text x="0" y="35" fill="#ffffff" font-family="monospace" font-size="34" font-weight="bold">$319.97</text>
        <text x="190" y="32" fill="#34d399" font-family="monospace" font-size="20" font-weight="bold">+1.40% ▲</text>
      </g>

      <g transform="translate(25, 130)">
        <rect width="195" height="55" rx="10" fill="#1e293b"/>
        <text x="15" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">I.S. Sobrevenda</text>
        <text x="15" y="47" fill="#fb7185" font-family="monospace" font-size="19" font-weight="bold">84.2 / 100</text>

        <rect x="210" width="220" height="55" rx="10" fill="#1e293b"/>
        <text x="225" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">Alvo EMA 21</text>
        <text x="225" y="47" fill="#38bdf8" font-family="monospace" font-size="19" font-weight="bold">$332.50 (+3.9%)</text>

        <rect x="445" width="230" height="55" rx="10" fill="#1e293b"/>
        <text x="460" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">Gatilho Técnico</text>
        <text x="460" y="47" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="600">Fechou Fora Bollinger</text>

        <rect x="690" width="180" height="55" rx="10" fill="#022c22"/>
        <text x="705" y="24" fill="#86efac" font-family="sans-serif" font-size="12">Taxa Histórica</text>
        <text x="705" y="47" fill="#34d399" font-family="monospace" font-size="18" font-weight="bold">Acerto 86.1%</text>
      </g>
    </g>

    <!-- CARD 3: TSLA -->
    <g transform="translate(24, 720)">
      <rect width="900" height="215" rx="20" fill="#0b1120" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(25, 20)">
        <rect width="90" height="38" rx="8" fill="#334155"/>
        <text x="45" y="26" fill="#ffffff" font-family="sans-serif" font-size="19" font-weight="bold" text-anchor="middle">TSLA</text>
        <text x="105" y="26" fill="#ffffff" font-family="sans-serif" font-size="21" font-weight="bold">Tesla, Inc.</text>
        <rect x="235" width="110" height="26" rx="6" fill="#1e293b"/>
        <text x="290" y="18" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">AUTOMOTIVO</text>

        <rect x="720" width="150" height="36" rx="10" fill="#022c22" stroke="#059669" stroke-width="1"/>
        <text x="795" y="24" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">SCORE 9.5</text>
      </g>

      <g transform="translate(25, 75)">
        <text x="0" y="35" fill="#ffffff" font-family="monospace" font-size="34" font-weight="bold">$354.08</text>
        <text x="190" y="32" fill="#34d399" font-family="monospace" font-size="20" font-weight="bold">+4.20% ▲</text>
      </g>

      <g transform="translate(25, 130)">
        <rect width="195" height="55" rx="10" fill="#1e293b"/>
        <text x="15" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">I.S. Sobrevenda</text>
        <text x="15" y="47" fill="#fb7185" font-family="monospace" font-size="19" font-weight="bold">86.1 / 100</text>

        <rect x="210" width="220" height="55" rx="10" fill="#1e293b"/>
        <text x="225" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">Alvo EMA 21</text>
        <text x="225" y="47" fill="#38bdf8" font-family="monospace" font-size="19" font-weight="bold">$378.00 (+6.8%)</text>

        <rect x="445" width="230" height="55" rx="10" fill="#1e293b"/>
        <text x="460" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">Tendência</text>
        <text x="460" y="47" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="600">Preço &gt; EMA 200 (Alta)</text>

        <rect x="690" width="180" height="55" rx="10" fill="#022c22"/>
        <text x="705" y="24" fill="#86efac" font-family="sans-serif" font-size="12">Taxa Histórica</text>
        <text x="705" y="47" fill="#34d399" font-family="monospace" font-size="18" font-weight="bold">Acerto 84.7%</text>
      </g>
    </g>

    <!-- CARD 4: MSFT -->
    <g transform="translate(24, 955)">
      <rect width="900" height="215" rx="20" fill="#0b1120" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(25, 20)">
        <rect width="90" height="38" rx="8" fill="#334155"/>
        <text x="45" y="26" fill="#ffffff" font-family="sans-serif" font-size="19" font-weight="bold" text-anchor="middle">MSFT</text>
        <text x="105" y="26" fill="#ffffff" font-family="sans-serif" font-size="21" font-weight="bold">Microsoft Corporation</text>
        <rect x="350" width="105" height="26" rx="6" fill="#1e293b"/>
        <text x="402" y="18" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">SOFTWARE</text>

        <rect x="720" width="150" height="36" rx="10" fill="#022c22" stroke="#059669" stroke-width="1"/>
        <text x="795" y="24" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">SCORE 9.1</text>
      </g>

      <g transform="translate(25, 75)">
        <text x="0" y="35" fill="#ffffff" font-family="monospace" font-size="34" font-weight="bold">$512.20</text>
        <text x="190" y="32" fill="#34d399" font-family="monospace" font-size="20" font-weight="bold">+1.15% ▲</text>
      </g>

      <g transform="translate(25, 130)">
        <rect width="195" height="55" rx="10" fill="#1e293b"/>
        <text x="15" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">I.S. Sobrevenda</text>
        <text x="15" y="47" fill="#fb7185" font-family="monospace" font-size="19" font-weight="bold">79.5 / 100</text>

        <rect x="210" width="220" height="55" rx="10" fill="#1e293b"/>
        <text x="225" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">Alvo EMA 21</text>
        <text x="225" y="47" fill="#38bdf8" font-family="monospace" font-size="19" font-weight="bold">$530.00 (+3.5%)</text>

        <rect x="445" width="230" height="55" rx="10" fill="#1e293b"/>
        <text x="460" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">Suporte Chave</text>
        <text x="460" y="47" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="600">Retração Fibo 61.8%</text>

        <rect x="690" width="180" height="55" rx="10" fill="#022c22"/>
        <text x="705" y="24" fill="#86efac" font-family="sans-serif" font-size="12">Taxa Histórica</text>
        <text x="705" y="47" fill="#34d399" font-family="monospace" font-size="18" font-weight="bold">Acerto 82.5%</text>
      </g>
    </g>

    <!-- CARD 5: AMZN -->
    <g transform="translate(24, 1190)">
      <rect width="900" height="215" rx="20" fill="#0b1120" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(25, 20)">
        <rect width="90" height="38" rx="8" fill="#334155"/>
        <text x="45" y="26" fill="#ffffff" font-family="sans-serif" font-size="19" font-weight="bold" text-anchor="middle">AMZN</text>
        <text x="105" y="26" fill="#ffffff" font-family="sans-serif" font-size="21" font-weight="bold">Amazon.com, Inc.</text>
        <rect x="310" width="95" height="26" rx="6" fill="#1e293b"/>
        <text x="357" y="18" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" font-weight="600">E-COMMERCE</text>

        <rect x="720" width="150" height="36" rx="10" fill="#022c22" stroke="#059669" stroke-width="1"/>
        <text x="795" y="24" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">SCORE 8.9</text>
      </g>

      <g transform="translate(25, 75)">
        <text x="0" y="35" fill="#ffffff" font-family="monospace" font-size="34" font-weight="bold">$215.40</text>
        <text x="190" y="32" fill="#34d399" font-family="monospace" font-size="20" font-weight="bold">+2.10% ▲</text>
      </g>

      <g transform="translate(25, 130)">
        <rect width="195" height="55" rx="10" fill="#1e293b"/>
        <text x="15" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">I.S. Sobrevenda</text>
        <text x="15" y="47" fill="#fb7185" font-family="monospace" font-size="19" font-weight="bold">78.0 / 100</text>

        <rect x="210" width="220" height="55" rx="10" fill="#1e293b"/>
        <text x="225" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">Alvo EMA 21</text>
        <text x="225" y="47" fill="#38bdf8" font-family="monospace" font-size="19" font-weight="bold">$228.00 (+5.8%)</text>

        <rect x="445" width="230" height="55" rx="10" fill="#1e293b"/>
        <text x="460" y="24" fill="#94a3b8" font-family="sans-serif" font-size="12">Gatilho Técnico</text>
        <text x="460" y="47" fill="#cbd5e1" font-family="sans-serif" font-size="14" font-weight="600">RSI(14) = 27.5</text>

        <rect x="690" width="180" height="55" rx="10" fill="#022c22"/>
        <text x="705" y="24" fill="#86efac" font-family="sans-serif" font-size="12">Taxa Histórica</text>
        <text x="705" y="47" fill="#34d399" font-family="monospace" font-size="18" font-weight="bold">Acerto 80.2%</text>
      </g>
    </g>

    <!-- Bottom Real Footer inside Phone (matching the real app, no fake bottom tabs) -->
    <g transform="translate(24, 1430)">
      <rect width="900" height="150" rx="18" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(30, 35)">
        <text x="0" y="20" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold">ScienceBit Quantitative Lab</text>
        <text x="0" y="45" fill="#94a3b8" font-family="sans-serif" font-size="14">Análise quantitativa e inteligência computacional para Wall Street</text>
        <text x="0" y="70" fill="#60a5fa" font-family="sans-serif" font-size="14" font-weight="bold">sciencebit.com.br • Wall Street Scanner Pro v1.0</text>
      </g>
      <rect x="710" y="45" width="160" height="50" rx="12" fill="#2563eb"/>
      <text x="790" y="76" fill="#ffffff" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">Atualizar Dados</text>
    </g>
  </g>
</svg>
`;

generateScreenshot(screenshot1, 'screenshot-1-scanner.png');

// ============================================================================
// 2. SCREENSHOT 2: GRÁFICO TÉCNICO INTERATIVO & FIBONACCI
// ============================================================================
const screenshot2 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  ${commonDefs}

  <rect width="1080" height="1920" fill="url(#bgGrad)"/>
  <circle cx="200" cy="180" r="280" fill="#38bdf8" opacity="0.12"/>
  <circle cx="880" cy="1100" r="320" fill="#2563eb" opacity="0.15"/>

  <!-- Top Marketing Banner Text -->
  <g transform="translate(70, 70)">
    <rect width="360" height="48" rx="24" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="180" y="31" fill="#38bdf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="2">GATILHOS DE CONFIRMAÇÃO</text>

    <text x="0" y="115" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="900" letter-spacing="-1">Espere o Candlestick de Confirmação</text>
    <text x="0" y="165" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="25" font-weight="500">Nunca compre faca caindo: detecte Martelos, Pinbars e Fibo 61.8%</text>
  </g>

  <!-- Smartphone Mockup -->
  <g transform="translate(60, 250)">
    <rect width="960" height="1630" rx="48" fill="#090d16" stroke="#334155" stroke-width="6"/>
    <rect width="948" height="1618" x="6" y="6" rx="44" fill="#020617"/>

    ${statusBar}

    <!-- Header inside phone -->
    <g transform="translate(24, 60)">
      <rect width="900" height="95" rx="18" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
      
      <rect x="20" y="18" width="110" height="60" rx="14" fill="#2563eb"/>
      <text x="75" y="55" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="900" text-anchor="middle">NVDA</text>

      <text x="150" y="44" fill="#ffffff" font-family="monospace" font-size="30" font-weight="900">$230.36</text>
      <text x="310" y="42" fill="#34d399" font-family="monospace" font-size="22" font-weight="bold">+3.82% ▲</text>
      <text x="150" y="72" fill="#94a3b8" font-family="sans-serif" font-size="15">NVIDIA Corp. • NASDAQ • I.S.: <tspan fill="#fb7185" font-weight="bold">88.4 (Sobrevendido)</tspan></text>

      <!-- Timeframe Buttons -->
      <g transform="translate(620, 24)">
        <rect width="60" height="46" rx="10" fill="#1e293b"/>
        <text x="30" y="29" fill="#94a3b8" font-family="sans-serif" font-size="15" text-anchor="middle">60m</text>

        <rect x="70" width="60" height="46" rx="10" fill="#2563eb"/>
        <text x="100" y="29" fill="#ffffff" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">1D</text>

        <rect x="140" width="60" height="46" rx="10" fill="#1e293b"/>
        <text x="170" y="29" fill="#94a3b8" font-family="sans-serif" font-size="15" text-anchor="middle">1S</text>
      </g>
    </g>

    <!-- Real App Tabs (Asset Detail Panel Tabs) -->
    <g transform="translate(24, 165)">
      <rect width="210" height="44" rx="12" fill="#2563eb"/>
      <text x="105" y="28" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">📊 Gráfico &amp; Fibo</text>

      <rect x="225" width="210" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="330" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">🧭 3 Telas (Elder)</text>

      <rect x="450" width="210" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="555" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">🏆 Minervini</text>

      <rect x="675" width="225" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="787" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">🤖 IA &amp; Predições</text>
    </g>

    <!-- Alerta Estratégico do Usuário: Espere o Candlestick de Confirmação -->
    <g transform="translate(24, 218)">
      <rect width="900" height="96" rx="16" fill="#1c1608" stroke="#f59e0b" stroke-width="1.8"/>
      <g transform="translate(20, 16)">
        <rect width="40" height="40" rx="10" fill="#78350f" opacity="0.6"/>
        <text x="20" y="28" fill="#fbbf24" font-family="sans-serif" font-size="22" text-anchor="middle">⚠️</text>
        
        <text x="52" y="22" fill="#fbbf24" font-family="sans-serif" font-size="18" font-weight="900">Espere o Candlestick de Confirmação</text>
        <rect x="420" y="4" width="225" height="26" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
        <text x="532" y="21" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">✓ MARTELO NO SUPORTE</text>
        
        <text x="52" y="48" fill="#ffffff" font-family="sans-serif" font-size="13.5" font-weight="bold">Regra de Ouro: <tspan fill="#e2e8f0" font-weight="normal">Nunca compre uma faca caindo sem reação.</tspan></text>
        <text x="52" y="68" fill="#94a3b8" font-family="sans-serif" font-size="12.5">Procure por sombras inferiores longas (martelo, pinbar) ou fechamentos positivos testando suporte.</text>
      </g>
    </g>

    <!-- Main Candlestick Chart Area -->
    <g transform="translate(24, 324)">
      <rect width="900" height="645" rx="22" fill="#080d1a" stroke="#1e293b" stroke-width="2"/>

      <!-- Legend -->
      <g transform="translate(25, 25)">
        <circle cx="10" cy="10" r="5" fill="#38bdf8"/>
        <text x="25" y="15" fill="#94a3b8" font-family="sans-serif" font-size="14">EMA 9: <tspan fill="#38bdf8">$235.10</tspan></text>

        <circle cx="150" cy="10" r="5" fill="#eab308"/>
        <text x="165" y="15" fill="#94a3b8" font-family="sans-serif" font-size="14">EMA 21: <tspan fill="#eab308">$248.50</tspan></text>

        <circle cx="310" cy="10" r="5" fill="#a855f7"/>
        <text x="325" y="15" fill="#94a3b8" font-family="sans-serif" font-size="14">EMA 200: <tspan fill="#a855f7">$212.40</tspan></text>

        <circle cx="480" cy="10" r="5" fill="#06b6d4"/>
        <text x="495" y="15" fill="#94a3b8" font-family="sans-serif" font-size="14">Bollinger (20,2)</text>
      </g>

      <!-- Chart Grid -->
      <g stroke="#1e293b" stroke-width="1.2" stroke-dasharray="4,4">
        <line x1="40" y1="80" x2="860" y2="80"/>
        <line x1="40" y1="180" x2="860" y2="180"/>
        <line x1="40" y1="280" x2="860" y2="280"/>
        <line x1="40" y1="380" x2="860" y2="380"/>
        <line x1="40" y1="480" x2="860" y2="480"/>
        <line x1="40" y1="580" x2="860" y2="580"/>
      </g>

      <!-- Fibonacci Lines -->
      <g stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.8">
        <line x1="40" y1="150" x2="860" y2="150"/>
        <line x1="40" y1="320" x2="860" y2="320"/>
        <line x1="40" y1="520" x2="860" y2="520"/>
      </g>
      <text x="850" y="145" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold" text-anchor="end">Fibo 100% ($268.00)</text>
      <text x="850" y="315" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold" text-anchor="end">Fibo 61.8% ($248.50)</text>
      <text x="850" y="515" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold" text-anchor="end">Fibo 38.2% ($225.20)</text>

      <!-- Candlesticks Sequence -->
      <!-- Candle 1 Bear -->
      <line x1="120" y1="140" x2="120" y2="260" stroke="#f43f5e" stroke-width="2.5"/>
      <rect x="105" y="160" width="30" height="70" rx="3" fill="url(#candleRed)"/>

      <!-- Candle 2 Bear -->
      <line x1="220" y1="200" x2="220" y2="340" stroke="#f43f5e" stroke-width="2.5"/>
      <rect x="205" y="220" width="30" height="90" rx="3" fill="url(#candleRed)"/>

      <!-- Candle 3 Bear -->
      <line x1="320" y1="280" x2="320" y2="440" stroke="#f43f5e" stroke-width="2.5"/>
      <rect x="305" y="300" width="30" height="100" rx="3" fill="url(#candleRed)"/>

      <!-- Candle 4 Reversal Hammer (Sobrevenda) with confirmation pin -->
      <line x1="420" y1="360" x2="420" y2="540" stroke="#10b981" stroke-width="3"/>
      <rect x="405" y="380" width="30" height="40" rx="3" fill="#10b981"/>
      <g transform="translate(420, 560)">
        <rect x="-65" y="-12" width="130" height="24" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.2"/>
        <text x="0" y="4" fill="#a7f3d0" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">🔨 Martelo / Rejeição</text>
      </g>

      <!-- Candle 5 Bullish -->
      <line x1="520" y1="340" x2="520" y2="480" stroke="#10b981" stroke-width="2.5"/>
      <rect x="505" y="360" width="30" height="90" rx="3" fill="url(#candleGreen)"/>

      <!-- Candle 6 Strong Bull -->
      <line x1="620" y1="260" x2="620" y2="410" stroke="#10b981" stroke-width="3"/>
      <rect x="605" y="280" width="30" height="105" rx="3" fill="url(#candleGreen)"/>

      <!-- Candle 7 Current Bull -->
      <line x1="720" y1="210" x2="720" y2="350" stroke="#10b981" stroke-width="3"/>
      <rect x="705" y="230" width="30" height="95" rx="3" fill="url(#candleGreen)"/>

      <!-- Trajectory Glow Line -->
      <path d="M 120 180 Q 420 540 720 250" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
      <circle cx="720" cy="250" r="7" fill="#38bdf8"/>
    </g>

    <!-- Indicators 4-Grid Cards below Chart -->
    <g transform="translate(24, 985)">
      <!-- Card 1: RSI -->
      <g transform="translate(0, 0)">
        <rect width="435" height="180" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
        <g transform="translate(25, 25)">
          <text x="0" y="20" fill="#94a3b8" font-family="sans-serif" font-size="15" font-weight="bold">RSI / IFR (14 PERÍODOS)</text>
          <text x="0" y="65" fill="#38bdf8" font-family="monospace" font-size="38" font-weight="900">26.8</text>
          <rect x="130" y="38" width="130" height="32" rx="8" fill="#1e293b"/>
          <text x="195" y="60" fill="#fb7185" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">&lt; 30 SOBREVENDIDO</text>
          <text x="0" y="110" fill="#64748b" font-family="sans-serif" font-size="14">Zona de exaustão vendedora e reversão estatística</text>
        </g>
      </g>

      <!-- Card 2: Stochastic -->
      <g transform="translate(465, 0)">
        <rect width="435" height="180" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
        <g transform="translate(25, 25)">
          <text x="0" y="20" fill="#94a3b8" font-family="sans-serif" font-size="15" font-weight="bold">ESTOCÁSTICO LENTO (14, 3)</text>
          <text x="0" y="65" fill="#34d399" font-family="monospace" font-size="38" font-weight="900">18.4</text>
          <rect x="130" y="38" width="140" height="32" rx="8" fill="#022c22"/>
          <text x="200" y="60" fill="#4ade80" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">GATILHO %K &gt; %D</text>
          <text x="0" y="110" fill="#64748b" font-family="sans-serif" font-size="14">Cruzamento altista confirmado no diário</text>
        </g>
      </g>

      <!-- Card 3: Distance EMA 21 -->
      <g transform="translate(0, 205)">
        <rect width="435" height="180" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
        <g transform="translate(25, 25)">
          <text x="0" y="20" fill="#94a3b8" font-family="sans-serif" font-size="15" font-weight="bold">DISTÂNCIA ALVO EMA 21</text>
          <text x="0" y="65" fill="#38bdf8" font-family="monospace" font-size="38" font-weight="900">+7.82%</text>
          <text x="190" y="60" fill="#ffffff" font-family="monospace" font-size="22" font-weight="bold">Alvo $248.50</text>
          <text x="0" y="110" fill="#64748b" font-family="sans-serif" font-size="14">Espaço livre de retorno à média exponencial</text>
        </g>
      </g>

      <!-- Card 4: Quant Score -->
      <g transform="translate(465, 205)">
        <rect width="435" height="180" rx="16" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
        <g transform="translate(25, 25)">
          <text x="0" y="20" fill="#86efac" font-family="sans-serif" font-size="15" font-weight="bold">SCORE QUANTITATIVO</text>
          <text x="0" y="65" fill="#34d399" font-family="monospace" font-size="38" font-weight="900">9.8<tspan font-size="22" fill="#94a3b8">/10</tspan></text>
          <rect x="130" y="38" width="150" height="32" rx="8" fill="#022c22"/>
          <text x="205" y="60" fill="#4ade80" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">ALTA ASIMETRIA</text>
          <text x="0" y="110" fill="#64748b" font-family="sans-serif" font-size="14">Excelente relação risco x retorno estatístico</text>
        </g>
      </g>
    </g>

    <!-- ScienceBit Branding Footer -->
    <g transform="translate(24, 1400)">
      <rect width="900" height="180" rx="18" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(30, 40)">
        <text x="0" y="25" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="bold">Simulador de Trade Integrado</text>
        <text x="0" y="55" fill="#94a3b8" font-family="sans-serif" font-size="15">Entrada: $230.36 • Stop Loss: $222.00 (-3.6%) • Alvo Fibo: $248.50 (+7.8%)</text>
        <text x="0" y="85" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">Payoff Risco x Retorno: 1 : 2.16 (Favorável ao Trader)</text>
      </g>
    </g>
  </g>
</svg>
`;

generateScreenshot(screenshot2, 'screenshot-2-indicadores.png');

// ============================================================================
// 3. SCREENSHOT 3: MODELOS PREDITIVOS IA & MACHINE LEARNING
// ============================================================================
const screenshot3 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  ${commonDefs}

  <rect width="1080" height="1920" fill="url(#bgGrad)"/>
  <circle cx="200" cy="180" r="280" fill="#8b5cf6" opacity="0.12"/>
  <circle cx="880" cy="1200" r="320" fill="#2563eb" opacity="0.15"/>

  <!-- Top Marketing Banner Text -->
  <g transform="translate(70, 70)">
    <rect width="330" height="48" rx="24" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
    <text x="165" y="31" fill="#a78bfa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="2">INTELIGÊNCIA ARTIFICIAL QUANT</text>

    <text x="0" y="115" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">Modelos Preditivos de ML</text>
    <text x="0" y="165" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="500">Machine Learning, Fluxo Institucional e Agente Q-Learning</text>
  </g>

  <!-- Smartphone Mockup -->
  <g transform="translate(60, 250)">
    <rect width="960" height="1630" rx="48" fill="#090d16" stroke="#334155" stroke-width="6"/>
    <rect width="948" height="1618" x="6" y="6" rx="44" fill="#020617"/>

    ${statusBar}

    <!-- Header inside phone -->
    <g transform="translate(24, 60)">
      <rect width="900" height="95" rx="18" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
      <rect x="20" y="18" width="110" height="60" rx="14" fill="#2563eb"/>
      <text x="75" y="55" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="900" text-anchor="middle">NVDA</text>
      <text x="150" y="44" fill="#ffffff" font-family="monospace" font-size="30" font-weight="900">$230.36</text>
      <text x="310" y="42" fill="#34d399" font-family="monospace" font-size="22" font-weight="bold">+3.82% ▲</text>
      <text x="150" y="72" fill="#94a3b8" font-family="sans-serif" font-size="15">NVIDIA Corporation • NASDAQ • Tecnologia</text>
    </g>

    <!-- Real App Tabs (Asset Detail Panel Tabs) -->
    <g transform="translate(24, 165)">
      <rect width="210" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="105" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">📊 Gráfico &amp; Fibo</text>

      <rect x="225" width="210" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="330" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">🧭 3 Telas (Elder)</text>

      <rect x="450" width="210" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="555" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">🏆 Minervini</text>

      <!-- Active Tab -->
      <rect x="675" width="225" height="44" rx="12" fill="#8b5cf6"/>
      <text x="787" y="28" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">🤖 IA &amp; Predições</text>
    </g>

    <!-- MAIN AI MODEL 1: MACHINE LEARNING ENSEMBLE -->
    <g transform="translate(24, 225)">
      <rect width="900" height="340" rx="22" fill="#0f172a" stroke="#8b5cf6" stroke-width="2"/>
      <g transform="translate(30, 30)">
        <rect width="180" height="32" rx="8" fill="#8b5cf6" fill-opacity="0.2"/>
        <text x="90" y="22" fill="#c084fc" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">RANDOM FOREST + XGB</text>

        <text x="0" y="80" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold">Predição de Preço para 5 Dias</text>
        <text x="0" y="110" fill="#94a3b8" font-family="sans-serif" font-size="15">Algoritmo supervisionado treinado com 10 anos de histórico de Wall Street</text>

        <g transform="translate(0, 140)">
          <rect width="260" height="110" rx="14" fill="#080d1a" stroke="#1e293b" stroke-width="1"/>
          <text x="20" y="35" fill="#94a3b8" font-family="sans-serif" font-size="13">Retorno Médio Esperado</text>
          <text x="20" y="75" fill="#34d399" font-family="monospace" font-size="34" font-weight="900">+5.42%</text>
          <text x="20" y="98" fill="#10b981" font-family="sans-serif" font-size="12" font-weight="bold">ALVO: $242.85</text>

          <rect x="285" width="260" height="110" rx="14" fill="#080d1a" stroke="#1e293b" stroke-width="1"/>
          <text x="305" y="35" fill="#94a3b8" font-family="sans-serif" font-size="13">Probabilidade de Lucro</text>
          <text x="305" y="75" fill="#38bdf8" font-family="monospace" font-size="34" font-weight="900">82.5%</text>
          <text x="305" y="98" fill="#60a5fa" font-family="sans-serif" font-size="12" font-weight="bold">CONFIANÇA ALTA</text>

          <rect x="570" width="270" height="110" rx="14" fill="#080d1a" stroke="#1e293b" stroke-width="1"/>
          <text x="590" y="35" fill="#94a3b8" font-family="sans-serif" font-size="13">Classificação do Sinal</text>
          <text x="590" y="75" fill="#a78bfa" font-family="sans-serif" font-size="26" font-weight="900">FORTE COMPRA</text>
          <text x="590" y="98" fill="#c084fc" font-family="sans-serif" font-size="12" font-weight="bold">SCORE IA: 9.6 / 10</text>
        </g>
      </g>
    </g>

    <!-- MAIN AI MODEL 2: Q-LEARNING REINFORCEMENT AGENT -->
    <g transform="translate(24, 585)">
      <rect width="900" height="300" rx="22" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(30, 30)">
        <rect width="180" height="32" rx="8" fill="#3b82f6" fill-opacity="0.2"/>
        <text x="90" y="22" fill="#60a5fa" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">REINFORCEMENT LEARNING</text>

        <text x="0" y="80" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold">Agente Inteligente Q-Learning</text>
        <text x="0" y="110" fill="#94a3b8" font-family="sans-serif" font-size="15">Decisão automatizada de trade orientada por maximização de recompensa (Sharpe)</text>

        <g transform="translate(0, 135)">
          <rect width="400" height="95" rx="14" fill="#022c22" stroke="#059669" stroke-width="1.5"/>
          <text x="25" y="38" fill="#86efac" font-family="sans-serif" font-size="14">Decisão do Agente Autônomo:</text>
          <text x="25" y="72" fill="#34d399" font-family="sans-serif" font-size="26" font-weight="900">🟢 EXECUTAR COMPRA (LONG)</text>

          <rect x="430" width="410" height="95" rx="14" fill="#080d1a" stroke="#1e293b" stroke-width="1"/>
          <text x="455" y="38" fill="#94a3b8" font-family="sans-serif" font-size="14">Recompensa Esperada (Q-Value):</text>
          <text x="455" y="72" fill="#fbbf24" font-family="monospace" font-size="26" font-weight="900">+4.85% de Alfa</text>
        </g>
      </g>
    </g>

    <!-- MAIN AI MODEL 3: FLOW & INSTITUTIONAL PRESSURE -->
    <g transform="translate(24, 905)">
      <rect width="900" height="320" rx="22" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(30, 30)">
        <text x="0" y="25" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold">Análise de Fluxo Institucional (Flow.AI)</text>
        <text x="0" y="55" fill="#94a3b8" font-family="sans-serif" font-size="15">Rastreamento de ordens em bloco e pressão compradora</text>

        <g transform="translate(0, 80)">
          <!-- Flow Gauge Bar -->
          <rect width="840" height="24" rx="12" fill="#1e293b"/>
          <rect width="620" height="24" rx="12" fill="#10b981"/>
          
          <g transform="translate(0, 45)">
            <text x="0" y="20" fill="#94a3b8" font-family="sans-serif" font-size="14">Pressão Vendedora (26%)</text>
            <text x="840" y="20" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="end">Pressão Compradora (74%)</text>
          </g>

          <g transform="translate(0, 95)">
            <rect width="260" height="80" rx="12" fill="#080d1a"/>
            <text x="20" y="30" fill="#94a3b8" font-family="sans-serif" font-size="13">Net Flow Institucional</text>
            <text x="20" y="60" fill="#34d399" font-family="monospace" font-size="24" font-weight="900">+$412M</text>

            <rect x="285" width="260" height="80" rx="12" fill="#080d1a"/>
            <text x="305" y="30" fill="#94a3b8" font-family="sans-serif" font-size="13">Volume Delta</text>
            <text x="305" y="60" fill="#38bdf8" font-family="monospace" font-size="24" font-weight="900">+64.8% Comprador</text>

            <rect x="570" width="270" height="80" rx="12" fill="#080d1a"/>
            <text x="590" y="30" fill="#94a3b8" font-family="sans-serif" font-size="13">Status de Acumulação</text>
            <text x="590" y="60" fill="#a78bfa" font-family="sans-serif" font-size="20" font-weight="bold">Acumulação Forte</text>
          </g>
        </g>
      </g>
    </g>

    <!-- Bottom Summary Box -->
    <g transform="translate(24, 1245)">
      <rect width="900" height="330" rx="22" fill="#022c22" stroke="#059669" stroke-width="2"/>
      <g transform="translate(30, 35)">
        <text x="0" y="25" fill="#34d399" font-family="sans-serif" font-size="24" font-weight="900">CONFLUÊNCIA DE MODELOS QUANTITATIVOS</text>
        <text x="0" y="60" fill="#cbd5e1" font-family="sans-serif" font-size="16">Todos os 3 motores quantitativos (ML + RL + Flow) indicam momento propício para Swing Trade.</text>
        
        <g transform="translate(0, 95)">
          <rect width="840" height="50" rx="10" fill="#0f172a"/>
          <text x="20" y="32" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="bold">✓ Modelo Supervisionado:</text>
          <text x="250" y="32" fill="#ffffff" font-family="sans-serif" font-size="15">Previsão de alta de +5.42% com 82.5% de probabilidade</text>

          <rect y="65" width="840" height="50" rx="10" fill="#0f172a"/>
          <text x="20" y="97" fill="#38bdf8" font-family="sans-serif" font-size="16" font-weight="bold">✓ Modelo por Reforço:</text>
          <text x="250" y="97" fill="#ffffff" font-family="sans-serif" font-size="15">Recompensa positiva esperada com baixo drawdown simulado</text>

          <rect y="130" width="840" height="50" rx="10" fill="#0f172a"/>
          <text x="20" y="162" fill="#a78bfa" font-family="sans-serif" font-size="16" font-weight="bold">✓ Rastreamento de Fluxo:</text>
          <text x="250" y="162" fill="#ffffff" font-family="sans-serif" font-size="15">Grandes investidores institucionais comprando agressivamente</text>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

generateScreenshot(screenshot3, 'screenshot-3-ia-modelos.png');

// ============================================================================
// 4. SCREENSHOT 4: TRIPLE SCREEN (ELDER) & MINERVINI TREND
// ============================================================================
const screenshot4 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  ${commonDefs}

  <rect width="1080" height="1920" fill="url(#bgGrad)"/>
  <circle cx="200" cy="180" r="280" fill="#10b981" opacity="0.12"/>
  <circle cx="880" cy="1200" r="320" fill="#2563eb" opacity="0.15"/>

  <!-- Top Marketing Banner Text -->
  <g transform="translate(70, 70)">
    <rect width="330" height="48" rx="24" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="165" y="31" fill="#34d399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="2">ESTRATÉGIAS CLÁSSICAS</text>

    <text x="0" y="115" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">Triple Screen &amp; Minervini</text>
    <text x="0" y="165" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="500">Confluência de múltiplos timeframes e Trend Template de 8 etapas</text>
  </g>

  <!-- Smartphone Mockup -->
  <g transform="translate(60, 250)">
    <rect width="960" height="1630" rx="48" fill="#090d16" stroke="#334155" stroke-width="6"/>
    <rect width="948" height="1618" x="6" y="6" rx="44" fill="#020617"/>

    ${statusBar}

    <!-- Header inside phone -->
    <g transform="translate(24, 60)">
      <rect width="900" height="95" rx="18" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
      <rect x="20" y="18" width="110" height="60" rx="14" fill="#2563eb"/>
      <text x="75" y="55" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="900" text-anchor="middle">NVDA</text>
      <text x="150" y="44" fill="#ffffff" font-family="monospace" font-size="30" font-weight="900">$230.36</text>
      <text x="310" y="42" fill="#34d399" font-family="monospace" font-size="22" font-weight="bold">+3.82% ▲</text>
      <text x="150" y="72" fill="#94a3b8" font-family="sans-serif" font-size="15">NVIDIA Corporation • NASDAQ • Score: 9.8/10</text>
    </g>

    <!-- Real App Tabs (Asset Detail Panel Tabs) -->
    <g transform="translate(24, 165)">
      <rect width="210" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="105" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">📊 Gráfico &amp; Fibo</text>

      <!-- Active Tab -->
      <rect x="225" width="210" height="44" rx="12" fill="#2563eb"/>
      <text x="330" y="28" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">🧭 3 Telas (Elder)</text>

      <rect x="450" width="210" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="555" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">🏆 Minervini</text>

      <rect x="675" width="225" height="44" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <text x="787" y="28" fill="#94a3b8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">🤖 IA &amp; Predições</text>
    </g>

    <!-- TRIPLE SCREEN (ELDER) CONTAINER -->
    <g transform="translate(24, 225)">
      <rect width="900" height="440" rx="22" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
      <g transform="translate(30, 30)">
        <text x="0" y="25" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold">Sistema de 3 Telas (Dr. Alexander Elder)</text>
        <text x="0" y="55" fill="#94a3b8" font-family="sans-serif" font-size="15">Filtro de maré de longo prazo, onda intermediária e gatilho operacional</text>

        <!-- SCREEN 1: WEEKLY TIDE -->
        <g transform="translate(0, 80)">
          <rect width="840" height="90" rx="14" fill="#080d1a" stroke="#10b981" stroke-width="1.5"/>
          <g transform="translate(25, 20)">
            <rect width="90" height="28" rx="6" fill="#10b981" fill-opacity="0.2"/>
            <text x="45" y="19" fill="#34d399" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">TELA 1</text>
            <text x="110" y="20" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold">Maré de Mercado (Semanal): Tendência de Alta</text>
            <text x="110" y="45" fill="#94a3b8" font-family="sans-serif" font-size="14">EMA 13 Semanal em inclinação positiva. Apenas compras são autorizadas.</text>
            <text x="790" y="35" fill="#34d399" font-family="sans-serif" font-size="24" font-weight="900" text-anchor="end">✓ APROVADO</text>
          </g>
        </g>

        <!-- SCREEN 2: DAILY WAVE -->
        <g transform="translate(0, 185)">
          <rect width="840" height="90" rx="14" fill="#080d1a" stroke="#38bdf8" stroke-width="1.5"/>
          <g transform="translate(25, 20)">
            <rect width="90" height="28" rx="6" fill="#38bdf8" fill-opacity="0.2"/>
            <text x="45" y="19" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">TELA 2</text>
            <text x="110" y="20" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold">Onda de Correção (Diário): Sobrevenda</text>
            <text x="110" y="45" fill="#94a3b8" font-family="sans-serif" font-size="14">Oscilador Estocástico &lt; 20 e RSI em sobrevenda extrema contra a maré.</text>
            <text x="790" y="35" fill="#38bdf8" font-family="sans-serif" font-size="24" font-weight="900" text-anchor="end">✓ GATILHO</text>
          </g>
        </g>

        <!-- SCREEN 3: INTRADAY TRIGGER -->
        <g transform="translate(0, 290)">
          <rect width="840" height="90" rx="14" fill="#080d1a" stroke="#a855f7" stroke-width="1.5"/>
          <g transform="translate(25, 20)">
            <rect width="90" height="28" rx="6" fill="#a855f7" fill-opacity="0.2"/>
            <text x="45" y="19" fill="#c084fc" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">TELA 3</text>
            <text x="110" y="20" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold">Disparo Operacional: Trailing Stop de Compra</text>
            <text x="110" y="45" fill="#94a3b8" font-family="sans-serif" font-size="14">Superação da máxima do candle anterior ($231.50) ativa ordem de entrada.</text>
            <text x="790" y="35" fill="#a855f7" font-family="sans-serif" font-size="24" font-weight="900" text-anchor="end">✓ PRONTO</text>
          </g>
        </g>
      </g>
    </g>

    <!-- MINERVINI TREND TEMPLATE -->
    <g transform="translate(24, 685)">
      <rect width="900" height="490" rx="22" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
      <g transform="translate(30, 30)">
        <text x="0" y="25" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold">Trend Template de Mark Minervini</text>
        <text x="0" y="55" fill="#94a3b8" font-family="sans-serif" font-size="15">8 critérios quantitativos para identificação de Superperformance</text>

        <rect x="710" y="10" width="130" height="36" rx="10" fill="#022c22" stroke="#059669" stroke-width="1.5"/>
        <text x="775" y="34" fill="#34d399" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">8 / 8 PASSOU</text>

        <g transform="translate(0, 80)">
          <!-- Items 1 to 8 -->
          <rect y="0" width="840" height="40" rx="8" fill="#080d1a"/>
          <text x="20" y="26" fill="#cbd5e1" font-family="sans-serif" font-size="14">1. Preço atual acima das médias de 150 e 200 dias ($212.40)</text>
          <text x="800" y="26" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">✓ Sim</text>

          <rect y="46" width="840" height="40" rx="8" fill="#080d1a"/>
          <text x="20" y="72" fill="#cbd5e1" font-family="sans-serif" font-size="14">2. Média de 150 dias acima da média de 200 dias</text>
          <text x="800" y="72" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">✓ Sim</text>

          <rect y="92" width="840" height="40" rx="8" fill="#080d1a"/>
          <text x="20" y="118" fill="#cbd5e1" font-family="sans-serif" font-size="14">3. Média de 200 dias inclinada para cima (há mais de 1 mês)</text>
          <text x="800" y="118" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">✓ Sim</text>

          <rect y="138" width="840" height="40" rx="8" fill="#080d1a"/>
          <text x="20" y="164" fill="#cbd5e1" font-family="sans-serif" font-size="14">4. Média de 50 dias acima das médias de 150 e 200 dias</text>
          <text x="800" y="164" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">✓ Sim</text>

          <rect y="184" width="840" height="40" rx="8" fill="#080d1a"/>
          <text x="20" y="210" fill="#cbd5e1" font-family="sans-serif" font-size="14">5. Preço atual acima da média móvel de 50 dias ($224.10)</text>
          <text x="800" y="210" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">✓ Sim</text>

          <rect y="230" width="840" height="40" rx="8" fill="#080d1a"/>
          <text x="20" y="256" fill="#cbd5e1" font-family="sans-serif" font-size="14">6. Preço pelo menos 30% acima da mínima de 52 semanas</text>
          <text x="800" y="256" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">✓ Sim</text>

          <rect y="276" width="840" height="40" rx="8" fill="#080d1a"/>
          <text x="20" y="302" fill="#cbd5e1" font-family="sans-serif" font-size="14">7. Preço a menos de 25% da máxima histórica de 52 semanas</text>
          <text x="800" y="302" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">✓ Sim</text>

          <rect y="322" width="840" height="40" rx="8" fill="#080d1a"/>
          <text x="20" y="348" fill="#cbd5e1" font-family="sans-serif" font-size="14">8. Força Relativa IBD (RS Rating) &gt; 70 (Atual: 92)</text>
          <text x="800" y="348" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">✓ Sim</text>
        </g>
      </g>
    </g>

    <!-- BACKTEST SIMULATION RESULT -->
    <g transform="translate(24, 1195)">
      <rect width="900" height="380" rx="22" fill="#022c22" stroke="#059669" stroke-width="2"/>
      <g transform="translate(30, 35)">
        <text x="0" y="25" fill="#34d399" font-family="sans-serif" font-size="24" font-weight="900">SIMULAÇÃO DE BACKTEST HISTÓRICO (5 ANOS)</text>
        <text x="0" y="60" fill="#cbd5e1" font-family="sans-serif" font-size="16">Performance combinada aplicando regras de sobrevenda em ações do S&amp;P 500 e Nasdaq</text>
        
        <g transform="translate(0, 95)">
          <rect width="260" height="110" rx="14" fill="#0f172a"/>
          <text x="20" y="35" fill="#94a3b8" font-family="sans-serif" font-size="14">Retorno Acumulado</text>
          <text x="20" y="75" fill="#34d399" font-family="monospace" font-size="32" font-weight="900">+142.8%</text>
          <text x="20" y="98" fill="#10b981" font-family="sans-serif" font-size="12">vs +58.2% do S&amp;P 500</text>

          <rect x="285" width="260" height="110" rx="14" fill="#0f172a"/>
          <text x="305" y="35" fill="#94a3b8" font-family="sans-serif" font-size="14">Taxa de Acerto (Win)</text>
          <text x="305" y="75" fill="#38bdf8" font-family="monospace" font-size="32" font-weight="900">86.2%</text>
          <text x="305" y="98" fill="#60a5fa" font-family="sans-serif" font-size="12">188 Trades com Lucro</text>

          <rect x="570" width="270" height="110" rx="14" fill="#0f172a"/>
          <text x="590" y="35" fill="#94a3b8" font-family="sans-serif" font-size="14">Profit Factor</text>
          <text x="590" y="75" fill="#a855f7" font-family="monospace" font-size="32" font-weight="900">3.45</text>
          <text x="590" y="98" fill="#c084fc" font-family="sans-serif" font-size="12">Alta expectativa matemática</text>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

generateScreenshot(screenshot4, 'screenshot-4-triple-screen.png');

console.log('🎉 Todas as 4 novas screenshots do Wall Street Scanner foram geradas com sucesso!');
