const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateExactBullAssets() {
  console.log('🚀 Starting Exact User Bull Asset Generator...');

  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const androidResDir = path.join(rootDir, 'android/app/src/main/res');
  const androidAssetsPublicDir = path.join(rootDir, 'android/app/src/main/assets/public');

  // 1. Load public/bull-emblem.png raw data
  const rawEmblem = await sharp(path.join(publicDir, 'bull-emblem.png'))
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = rawEmblem;
  const { width, height } = info;

  // Clear the snout box (x: 306..558, y: 517..590) to transparent
  for (let y = 517; y <= 590; y++) {
    for (let x = 306; x <= 558; x++) {
      const idx = (y * width + x) * 4;
      data[idx+3] = 0; // transparent
    }
  }

  // Draw 4 ascending chart bars inside the snout, matching the authentic vector logo
  const bars = [
    { x1: 332, x2: 354, yTop: 562 },
    { x1: 387, x2: 409, yTop: 546 },
    { x1: 442, x2: 464, yTop: 530 },
    { x1: 497, x2: 519, yTop: 518 }
  ];

  for (const bar of bars) {
    for (let y = bar.yTop; y <= 590; y++) {
      const t = (y - 518) / (590 - 518);
      // Subtle gradient matching the bull's gold/amber tones
      const r = Math.round(245 - t * 25);
      const g = Math.round(175 - t * 20);
      const b = Math.round(45 - t * 15);

      for (let x = bar.x1; x <= bar.x2; x++) {
        const idx = (y * width + x) * 4;
        data[idx] = r;
        data[idx+1] = g;
        data[idx+2] = b;
        data[idx+3] = 255;
      }
    }
  }

  // Save the pristine authentic bull emblem (854 x 825)
  const cleanBullPng = await sharp(data, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'bull-emblem.png'), cleanBullPng);
  console.log('✅ 1. Saved public/bull-emblem.png (854x825 transparent PNG)');

  // 2. Create 512x512 App Icon for Google Play and Web
  // Safe area for Play Store: emblem sized 410x396, centered on 512x512
  const emblemForIcon = await sharp(cleanBullPng)
    .resize(410, 396, { fit: 'contain' })
    .toBuffer();

  // Clean, dark luxury background (solid 512x512 for Google Play Store compliance)
  const bg512Svg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b1220"/>
          <stop offset="50%" stop-color="#070b14"/>
          <stop offset="100%" stop-color="#03060c"/>
        </linearGradient>
        <radialGradient id="centerGlow" cx="50%" cy="48%" r="48%">
          <stop offset="0%" stop-color="#d97706" stop-opacity="0.12"/>
          <stop offset="60%" stop-color="#d97706" stop-opacity="0.03"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bgGrad)"/>
      <rect width="512" height="512" fill="url(#centerGlow)"/>
    </svg>
  `);

  const icon512Png = await sharp(bg512Svg)
    .composite([{ input: emblemForIcon, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'playstore-icon-512.png'), icon512Png);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512Png);
  fs.writeFileSync(path.join(publicDir, 'developer-icon.png'), icon512Png);
  console.log('✅ 2. Saved playstore-icon-512.png, icon-512.png, developer-icon.png (512x512)');

  // 3. Create 192x192 Icon
  const icon192Png = await sharp(icon512Png)
    .resize(192, 192)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192Png);
  console.log('✅ 3. Saved icon-192.png (192x192)');

  // 4. Create public/icon.svg (clean 512x512 vector container embedding the clean emblem)
  const base64CleanBull = cleanBullPng.toString('base64');
  const iconSvgContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="50%" stop-color="#070b14"/>
      <stop offset="100%" stop-color="#03060c"/>
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="48%" r="48%">
      <stop offset="0%" stop-color="#d97706" stop-opacity="0.14"/>
      <stop offset="70%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Background with smooth rounded edges -->
  <rect width="512" height="512" rx="104" fill="url(#bgGrad)"/>
  <rect width="512" height="512" rx="104" fill="url(#centerGlow)"/>
  <rect x="3" y="3" width="506" height="506" rx="101" fill="none" stroke="#1e293b" stroke-width="2" stroke-opacity="0.6"/>

  <!-- Authentic Bull Emblem (centered 410x396) -->
  <image href="data:image/png;base64,${base64CleanBull}" x="51" y="58" width="410" height="396" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvgContent);
  console.log('✅ 4. Saved public/icon.svg (512x512)');

  // 5. Create Feature Graphic 1024x500 for Google Play Store
  const emblemForFg = await sharp(cleanBullPng)
    .resize(380, 367, { fit: 'contain' })
    .toBuffer();

  const fgSvg = Buffer.from(`
    <svg width="1024" height="500" viewBox="0 0 1024 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fgBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#070c18"/>
          <stop offset="50%" stop-color="#0a1224"/>
          <stop offset="100%" stop-color="#04070e"/>
        </linearGradient>
        <radialGradient id="glowLeft" cx="240" cy="250" r="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.18"/>
          <stop offset="60%" stop-color="#d97706" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glowRight" cx="800" cy="250" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Background -->
      <rect width="1024" height="500" fill="url(#fgBg)"/>
      <rect width="1024" height="500" fill="url(#glowLeft)"/>
      <rect width="1024" height="500" fill="url(#glowRight)"/>

      <!-- Clean Accent Grid Lines -->
      <g opacity="0.08" stroke="#94a3b8" stroke-width="1">
        <line x1="0" y1="125" x2="1024" y2="125"/>
        <line x1="0" y1="250" x2="1024" y2="250"/>
        <line x1="0" y1="375" x2="1024" y2="375"/>
      </g>

      <!-- Typography -->
      <text x="470" y="190" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" letter-spacing="-0.5">WALL STREET SCANNER</text>
      <text x="470" y="240" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" letter-spacing="1.5">SWING TRADE PRO</text>
      <text x="470" y="290" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400">Scanner Quantitativo de Ações Americanas</text>

      <!-- Feature Badges -->
      <g transform="translate(470, 330)">
        <rect x="0" y="0" width="130" height="38" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
        <text x="65" y="24" fill="#34d399" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" text-anchor="middle">S&amp;P 500 &amp; TECH</text>

        <rect x="145" y="0" width="135" height="38" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
        <text x="212" y="24" fill="#60a5fa" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" text-anchor="middle">TRIPLE SCREEN</text>

        <rect x="295" y="0" width="125" height="38" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
        <text x="357" y="24" fill="#fbbf24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" text-anchor="middle">IA &amp; FILTROS</text>
      </g>
    </svg>
  `);

  const fgPng = await sharp(fgSvg)
    .composite([{ input: emblemForFg, left: 60, top: 66 }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'playstore-feature-graphic-1024x500.png'), fgPng);

  // English version
  const fgSvgEn = Buffer.from(`
    <svg width="1024" height="500" viewBox="0 0 1024 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fgBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#070c18"/>
          <stop offset="50%" stop-color="#0a1224"/>
          <stop offset="100%" stop-color="#04070e"/>
        </linearGradient>
        <radialGradient id="glowLeft" cx="240" cy="250" r="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.18"/>
          <stop offset="60%" stop-color="#d97706" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glowRight" cx="800" cy="250" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Background -->
      <rect width="1024" height="500" fill="url(#fgBg)"/>
      <rect width="1024" height="500" fill="url(#glowLeft)"/>
      <rect width="1024" height="500" fill="url(#glowRight)"/>

      <!-- Clean Accent Grid Lines -->
      <g opacity="0.08" stroke="#94a3b8" stroke-width="1">
        <line x1="0" y1="125" x2="1024" y2="125"/>
        <line x1="0" y1="250" x2="1024" y2="250"/>
        <line x1="0" y1="375" x2="1024" y2="375"/>
      </g>

      <!-- Typography -->
      <text x="470" y="190" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" letter-spacing="-0.5">WALL STREET SCANNER</text>
      <text x="470" y="240" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" letter-spacing="1.5">SWING TRADE PRO</text>
      <text x="470" y="290" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400">Quantitative US Equities Swing Scanner</text>

      <!-- Feature Badges -->
      <g transform="translate(470, 330)">
        <rect x="0" y="0" width="130" height="38" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
        <text x="65" y="24" fill="#34d399" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" text-anchor="middle">S&amp;P 500 &amp; TECH</text>

        <rect x="145" y="0" width="135" height="38" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
        <text x="212" y="24" fill="#60a5fa" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" text-anchor="middle">TRIPLE SCREEN</text>

        <rect x="295" y="0" width="125" height="38" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.2"/>
        <text x="357" y="24" fill="#fbbf24" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" text-anchor="middle">AI &amp; FILTERS</text>
      </g>
    </svg>
  `);

  const fgPngEn = await sharp(fgSvgEn)
    .composite([{ input: emblemForFg, left: 60, top: 66 }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'playstore-feature-graphic-1024x500-en.png'), fgPngEn);
  console.log('✅ 5. Saved playstore-feature-graphic-1024x500.png and -en.png (1024x500)');

  // 6. Copy to android/app/src/main/assets/public/
  if (fs.existsSync(androidAssetsPublicDir)) {
    fs.writeFileSync(path.join(androidAssetsPublicDir, 'bull-emblem.png'), cleanBullPng);
    fs.writeFileSync(path.join(androidAssetsPublicDir, 'icon-512.png'), icon512Png);
    fs.writeFileSync(path.join(androidAssetsPublicDir, 'playstore-icon-512.png'), icon512Png);
    fs.writeFileSync(path.join(androidAssetsPublicDir, 'developer-icon.png'), icon512Png);
    fs.writeFileSync(path.join(androidAssetsPublicDir, 'icon-192.png'), icon192Png);
    fs.writeFileSync(path.join(androidAssetsPublicDir, 'icon.svg'), iconSvgContent);
    fs.writeFileSync(path.join(androidAssetsPublicDir, 'playstore-feature-graphic-1024x500.png'), fgPng);
    console.log('✅ 6. Synced assets to Android web assets directory');
  }

  // 7. Update Android mipmaps
  const mipmaps = [
    { dir: 'mipmap-mdpi', size: 48, fgSize: 108 },
    { dir: 'mipmap-hdpi', size: 72, fgSize: 162 },
    { dir: 'mipmap-xhdpi', size: 96, fgSize: 216 },
    { dir: 'mipmap-xxhdpi', size: 144, fgSize: 324 },
    { dir: 'mipmap-xxxhdpi', size: 192, fgSize: 432 },
  ];

  for (const m of mipmaps) {
    const targetDir = path.join(androidResDir, m.dir);
    if (fs.existsSync(targetDir)) {
      // ic_launcher
      await sharp(icon512Png)
        .resize(m.size, m.size)
        .png()
        .toFile(path.join(targetDir, 'ic_launcher.png'));

      // ic_launcher_round
      await sharp(icon512Png)
        .resize(m.size, m.size)
        .png()
        .toFile(path.join(targetDir, 'ic_launcher_round.png'));

      // ic_launcher_foreground (transparent emblem on canvas)
      const emblemFg = await sharp(cleanBullPng)
        .resize(Math.round(m.fgSize * 0.72), Math.round(m.fgSize * 0.70), { fit: 'contain' })
        .toBuffer();

      const transparentCanvas = await sharp({
        create: {
          width: m.fgSize,
          height: m.fgSize,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
      .composite([{ input: emblemFg, gravity: 'center' }])
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));
    }
  }
  console.log('✅ 7. Updated Android mipmap icons in all densities');

  console.log('🎉 All assets generated successfully in exact required dimensions!');
}

generateExactBullAssets().catch(err => {
  console.error('❌ Error generating assets:', err);
  process.exit(1);
});
