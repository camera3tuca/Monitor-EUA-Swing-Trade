import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

async function generateNewIcon() {
  const publicDir = path.join(process.cwd(), 'public');

  // New Differentiated Wall Street Icon SVG (512x512)
  // Features:
  // 1. Distinctive Charging Wall Street Bull silhouette in polished gold & cyan
  // 2. High-tech Radar / Sonar Scanner Reticle (symbolizing the algorithmic scanner)
  // 3. Dynamic Oversold-to-Breakout Candlestick foundation with glowing EMA trend curve
  // 4. Prominent "WALL ST" top crest and high-contrast sapphire dark background
  const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Radial Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#141f3d"/>
      <stop offset="45%" stop-color="#0b1226"/>
      <stop offset="100%" stop-color="#050813"/>
    </radialGradient>

    <!-- Metallic Gold Bull Gradient -->
    <linearGradient id="goldBull" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="35%" stop-color="#f59e0b"/>
      <stop offset="70%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>

    <!-- Electric Cyan to Emerald Trajectory -->
    <linearGradient id="trendGlow" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>

    <!-- Bull Horns Glow -->
    <linearGradient id="hornGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Candlestick Gradients -->
    <linearGradient id="candleBull" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="candleBear" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="100%" stop-color="#e11d48"/>
    </linearGradient>

    <!-- Ambient Glow Filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <filter id="radarBloom" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
    </filter>
  </defs>

  <!-- 1. Background Container -->
  <rect width="512" height="512" rx="108" fill="url(#bgGrad)"/>

  <!-- Inner Bezel Ring -->
  <rect width="504" height="504" x="4" y="4" rx="104" fill="none" stroke="#1e293b" stroke-width="4"/>
  <rect width="496" height="496" x="8" y="8" rx="100" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Ambient Light Orbs -->
  <circle cx="256" cy="220" r="160" fill="#2563eb" opacity="0.12" filter="url(#glow)"/>
  <circle cx="380" cy="140" r="100" fill="#10b981" opacity="0.1" filter="url(#glow)"/>
  <circle cx="120" cy="360" r="110" fill="#e11d48" opacity="0.08" filter="url(#glow)"/>

  <!-- 2. SCANNER RADAR SCOPE (Represents the "Scanner" function) -->
  <g transform="translate(256, 250)" opacity="0.28">
    <!-- Concentric radar range rings -->
    <circle r="75" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="6,4"/>
    <circle r="135" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8,6"/>
    <circle r="195" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4,4"/>

    <!-- Radar Crosshairs & Axis Reticle -->
    <line x1="-205" y1="0" x2="205" y2="0" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4,4"/>
    <line x1="0" y1="-205" x2="0" y2="205" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4,4"/>

    <!-- Reticle Ticks -->
    <circle cx="0" cy="0" r="3" fill="#38bdf8"/>
    <circle cx="0" cy="-135" r="3" fill="#38bdf8"/>
    <circle cx="0" cy="135" r="3" fill="#38bdf8"/>
    <circle cx="-135" cy="0" r="3" fill="#38bdf8"/>
    <circle cx="135" cy="0" r="3" fill="#38bdf8"/>

    <!-- Radar Target Ping in Top-Right Quadrant (Target Found!) -->
    <circle cx="100" cy="-95" r="14" fill="#10b981" fill-opacity="0.25" stroke="#34d399" stroke-width="2"/>
    <circle cx="100" cy="-95" r="4" fill="#34d399"/>
  </g>

  <!-- 3. DYNAMIC CANDLESTICK PILLARS (Ascending Swing Trade Setup) -->
  <g transform="translate(0, 50)">
    <!-- Candle 1: Drop (Far Left) -->
    <line x1="86" y1="260" x2="86" y2="385" stroke="#f43f5e" stroke-width="3" opacity="0.6"/>
    <rect x="74" y="280" width="24" height="75" rx="3" fill="url(#candleBear)" opacity="0.85"/>

    <!-- Candle 2: Deep Oversold Drop -->
    <line x1="146" y1="290" x2="146" y2="425" stroke="#f43f5e" stroke-width="3.5"/>
    <rect x="134" y="315" width="24" height="85" rx="3" fill="url(#candleBear)"/>

    <!-- Candle 3: Reversal Hammer / Pinbar (The Turnaround Signal) -->
    <line x1="210" y1="310" x2="210" y2="445" stroke="#38bdf8" stroke-width="4"/>
    <rect x="198" y="315" width="24" height="40" rx="3" fill="#38bdf8"/>
    <!-- Glowing Hammer Pivot Dot -->
    <circle cx="210" cy="445" r="4" fill="#38bdf8" filter="url(#glow)"/>

    <!-- Candle 4: Bullish Breakout Candle -->
    <line x1="290" y1="220" x2="290" y2="370" stroke="#10b981" stroke-width="3.5"/>
    <rect x="278" y="245" width="24" height="95" rx="3" fill="url(#candleBull)"/>

    <!-- Candle 5: Powerful Expansion Candle -->
    <line x1="365" y1="150" x2="365" y2="300" stroke="#10b981" stroke-width="4"/>
    <rect x="353" y="170" width="24" height="105" rx="3" fill="url(#candleBull)"/>

    <!-- Candle 6: Massive Gap-Up Bull Candle (Far Right) -->
    <line x1="435" y1="95" x2="435" y2="235" stroke="#34d399" stroke-width="3.5" opacity="0.75"/>
    <rect x="423" y="110" width="24" height="100" rx="3" fill="url(#candleBull)" opacity="0.9"/>
  </g>

  <!-- 4. CHARGING WALL STREET BULL SILHOUETTE (Iconic Centerpiece) -->
  <!-- A sleek, powerful geometric charging bull leaping up and to the right -->
  <g transform="translate(145, 125)">
    <!-- Bull Body Shadow / Glow Silhouette for Depth -->
    <path d="M 45,135 C 30,115 40,85 70,75 C 95,65 125,55 155,50 C 180,45 205,30 220,10 C 223,5 228,8 226,14 C 220,32 225,48 245,55 C 255,58 260,65 252,72 C 238,82 225,95 215,115 C 205,135 185,150 160,155 C 130,160 100,165 75,175 C 60,180 50,160 45,135 Z"
          fill="#000000" opacity="0.4" transform="translate(4, 6)"/>

    <!-- Main Metallic Golden Bull Charging Body -->
    <path d="
      M 45,135
      C 30,115 40,85 70,75
      C 95,65 125,55 155,50
      C 180,45 205,30 220,10
      C 223,5 228,8 226,14
      C 220,32 225,48 245,55
      C 255,58 260,65 252,72
      C 238,82 225,95 215,115
      C 205,135 185,150 160,155
      C 130,160 100,165 75,175
      C 60,180 50,160 45,135 Z"
      fill="url(#goldBull)"/>

    <!-- Sharp Charging Horn (Curving Forward & Upward) -->
    <path d="
      M 215,28
      C 225,12 242,-2 260,-12
      C 263,-14 265,-10 263,-8
      C 252,7 242,25 235,42
      Z"
      fill="url(#hornGrad)" filter="url(#glow)"/>

    <!-- Secondary Left Horn (Perspective) -->
    <path d="
      M 200,32
      C 208,20 222,8 238,0
      C 240,-1 241,1 239,3
      C 232,15 224,28 218,40
      Z"
      fill="#d97706" opacity="0.8"/>

    <!-- Bull Head & Snout Geometry -->
    <polygon points="220,42 248,58 238,78 215,68" fill="#fef08a" opacity="0.6"/>
    <!-- Bull Eye (Glowing Emerald / Determined) -->
    <circle cx="218" cy="52" r="3.5" fill="#10b981"/>
    <circle cx="218" cy="52" r="1.5" fill="#ffffff"/>

    <!-- Powerful Muscular Shoulder / Flank Highlights -->
    <path d="M 145,58 C 175,65 195,90 190,125 C 170,120 155,100 145,75 Z" fill="#ffffff" opacity="0.22"/>
    <path d="M 75,80 C 105,75 130,85 140,115 C 115,115 90,105 75,80 Z" fill="#fef08a" opacity="0.28"/>

    <!-- Raised Bull Tail (Charging Momentum) -->
    <path d="M 48,135 C 35,140 20,135 12,120 C 10,116 14,114 16,117 C 24,128 35,130 46,128 Z" fill="url(#goldBull)"/>
  </g>

  <!-- 5. EXPONENTIAL SWING MOMENTUM TRAJECTORY BEAM -->
  <!-- Sweeps under the oversold dip and launches past the bull's horns -->
  <path d="M 80,390 Q 205,480 340,240 T 455,90"
        fill="none" stroke="url(#trendGlow)" stroke-width="10" stroke-linecap="round"/>
  <!-- Glowing Trail Duplicate -->
  <path d="M 80,390 Q 205,480 340,240 T 455,90"
        fill="none" stroke="#34d399" stroke-width="3" stroke-linecap="round" opacity="0.8"/>

  <!-- Explosive Trajectory Arrowhead -->
  <polygon points="475,70 435,88 454,116" fill="#10b981" filter="url(#glow)"/>
  <polygon points="470,74 440,90 452,110" fill="#ffffff" opacity="0.85"/>

  <!-- 6. TOP BRAND CREST: "WALL ST" -->
  <g transform="translate(42, 42)">
    <!-- Pill Container with Blue/Navy Depth -->
    <rect width="168" height="42" rx="14" fill="#0b1329" stroke="#3b82f6" stroke-width="1.8" opacity="0.95"/>
    <!-- Glowing Accent Bar -->
    <rect x="12" y="11" width="6" height="20" rx="3" fill="#38bdf8"/>
    <!-- Bold Typography -->
    <text x="28" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#ffffff" letter-spacing="2">WALL ST</text>
    <!-- US Flag Mini Accent (Stars/Stripes hint) -->
    <circle cx="145" cy="21" r="5" fill="#f43f5e"/>
    <circle cx="145" cy="21" r="2.5" fill="#ffffff"/>
  </g>

  <!-- 7. BOTTOM RIGHT "PRO SCANNER" PILL -->
  <g transform="translate(295, 428)">
    <rect width="175" height="38" rx="12" fill="#0b1329" stroke="#10b981" stroke-width="1.6" opacity="0.95"/>
    <circle cx="20" cy="19" r="4" fill="#34d399" filter="url(#glow)"/>
    <text x="32" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" fill="#34d399" letter-spacing="1.5">SCANNER PRO</text>
    <text x="150" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#fbbf24">★</text>
  </g>
</svg>
`;

  const outSvg = path.join(publicDir, 'icon.svg');
  fs.writeFileSync(outSvg, iconSvg);
  console.log('✓ icon.svg written successfully');

  // Generate icon-512.png, playstore-icon-512.png, icon-192.png
  const iconBuf = Buffer.from(iconSvg);
  await sharp(iconBuf)
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'playstore-icon-512.png'));
  console.log('✓ playstore-icon-512.png generated (512x512)');

  await sharp(iconBuf)
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✓ icon-512.png generated (512x512)');

  await sharp(iconBuf)
    .resize(192, 192)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ icon-192.png generated (192x192)');

  // Also update generate-all-assets.js to run and refresh the zip archive and feature graphic
  console.log('Updating assets pack...');
  execSync('node generate-all-assets.js', { cwd: process.cwd(), stdio: 'inherit' });
  console.log('✓ All assets and zip package updated with the new distinct Wall Street Bull icon!');
}

generateNewIcon().catch(console.error);
