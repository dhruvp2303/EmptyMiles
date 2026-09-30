const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const svgFullIcon = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg-glow" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#1E3E62" />
      <stop offset="100%" stop-color="#070D18" />
    </radialGradient>
    <linearGradient id="cargo-grad" x1="100" y1="120" x2="320" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF7E3E" />
      <stop offset="100%" stop-color="#F06524" />
    </linearGradient>
    <linearGradient id="cab-grad" x1="280" y1="140" x2="480" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#CBD5E1" />
    </linearGradient>
    <linearGradient id="road-grad" x1="40" y1="440" x2="340" y2="320" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F06524" />
      <stop offset="100%" stop-color="#FF9F43" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="512" height="512" rx="112" fill="url(#bg-glow)" />
  <rect x="6" y="6" width="500" height="500" rx="106" stroke="#2563EB" stroke-opacity="0.25" stroke-width="8" />

  <!-- Speed Streaks -->
  <g opacity="0.9">
    <path d="M40 200 H120 L104 220 H24 Z" fill="#38BDF8" />
    <path d="M16 244 H100 L84 264 H0 Z" fill="#38BDF8" />
    <path d="M50 288 H130 L114 308 H34 Z" fill="#38BDF8" />
  </g>

  <!-- Highway Road Perspective -->
  <path d="M50 430 L220 310 H360 L190 430 Z" fill="url(#road-grad)" />
  <path d="M110 410 L150 380 H175 L135 410 Z" fill="#FFFFFF" opacity="0.95" />
  <path d="M195 365 L225 342 H245 L215 365 Z" fill="#FFFFFF" opacity="0.95" />
  <path d="M265 330 L290 312 H305 L280 330 Z" fill="#FFFFFF" opacity="0.95" />

  <!-- Orange Cargo Container -->
  <g>
    <path d="M150 160 L360 100 V310 H150 Z" fill="url(#cargo-grad)" />
    <path d="M150 160 L360 100 L360 115 L150 172 Z" fill="#FFFFFF" opacity="0.3" />
    <!-- Container Ribs -->
    <path d="M185 152 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
    <path d="M225 141 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
    <path d="M265 130 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
    <path d="M305 119 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
    <path d="M345 108 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
    <!-- Base Rail -->
    <path d="M144 305 H360 V325 H144 Z" fill="#0B192C" />
  </g>

  <!-- Heavy-Duty Truck Cab -->
  <g>
    <path d="M360 100 L450 115 C475 120 495 142 505 170 L520 220 C524 235 526 248 526 265 V325 H360 V100 Z" fill="url(#cab-grad)" />
    <!-- Front Windshield -->
    <path d="M440 130 L495 175 C505 185 510 200 512 215 H420 V130 H440 Z" fill="#0B192C" />
    <path d="M380 130 H405 V215 H380 V130 Z" fill="#0B192C" />
    <!-- Headlights & Grille -->
    <polygon points="505,250 522,253 520,268 503,265" fill="#FFD200" />
    <path d="M490 280 H520 V292 H490 Z" fill="#0B192C" />
    <path d="M485 300 H518 V312 H485 Z" fill="#0B192C" />

    <!-- Wheels -->
    <g>
      <circle cx="210" cy="335" r="45" fill="#060E18" />
      <circle cx="210" cy="335" r="25" fill="#FFFFFF" />
      <circle cx="210" cy="335" r="12" fill="#0B192C" />
    </g>
    <g>
      <circle cx="460" cy="335" r="50" fill="#060E18" />
      <circle cx="460" cy="335" r="28" fill="#FFFFFF" />
      <circle cx="460" cy="335" r="14" fill="#0B192C" />
    </g>
  </g>
</svg>`

const svgForegroundOnly = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cargo-grad-fg" x1="100" y1="120" x2="320" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FF7E3E" />
      <stop offset="100%" stop-color="#F06524" />
    </linearGradient>
    <linearGradient id="cab-grad-fg" x1="280" y1="140" x2="480" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#CBD5E1" />
    </linearGradient>
    <linearGradient id="road-grad-fg" x1="40" y1="440" x2="340" y2="320" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F06524" />
      <stop offset="100%" stop-color="#FF9F43" />
    </linearGradient>
  </defs>

  <!-- Scaled & Centered for Adaptive Launcher Icon (Safe Zone) -->
  <g transform="translate(45, 45) scale(0.82)">
    <!-- Speed Streaks -->
    <g opacity="0.9">
      <path d="M40 200 H120 L104 220 H24 Z" fill="#38BDF8" />
      <path d="M16 244 H100 L84 264 H0 Z" fill="#38BDF8" />
      <path d="M50 288 H130 L114 308 H34 Z" fill="#38BDF8" />
    </g>

    <!-- Highway Road Perspective -->
    <path d="M50 430 L220 310 H360 L190 430 Z" fill="url(#road-grad-fg)" />
    <path d="M110 410 L150 380 H175 L135 410 Z" fill="#FFFFFF" opacity="0.95" />
    <path d="M195 365 L225 342 H245 L215 365 Z" fill="#FFFFFF" opacity="0.95" />

    <!-- Orange Cargo Container -->
    <g>
      <path d="M150 160 L360 100 V310 H150 Z" fill="url(#cargo-grad-fg)" />
      <path d="M150 160 L360 100 L360 115 L150 172 Z" fill="#FFFFFF" opacity="0.3" />
      <path d="M185 152 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
      <path d="M225 141 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
      <path d="M265 130 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
      <path d="M305 119 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
      <path d="M345 108 V305" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.9" />
      <path d="M144 305 H360 V325 H144 Z" fill="#0B192C" />
    </g>

    <!-- Heavy-Duty Truck Cab -->
    <g>
      <path d="M360 100 L450 115 C475 120 495 142 505 170 L520 220 C524 235 526 248 526 265 V325 H360 V100 Z" fill="url(#cab-grad-fg)" />
      <path d="M440 130 L495 175 C505 185 510 200 512 215 H420 V130 H440 Z" fill="#0B192C" />
      <path d="M380 130 H405 V215 H380 V130 Z" fill="#0B192C" />
      <polygon points="505,250 522,253 520,268 503,265" fill="#FFD200" />
      <path d="M490 280 H520 V292 H490 Z" fill="#0B192C" />
      <path d="M485 300 H518 V312 H485 Z" fill="#0B192C" />

      <!-- Wheels -->
      <g>
        <circle cx="210" cy="335" r="45" fill="#060E18" />
        <circle cx="210" cy="335" r="25" fill="#FFFFFF" />
        <circle cx="210" cy="335" r="12" fill="#0B192C" />
      </g>
      <g>
        <circle cx="460" cy="335" r="50" fill="#060E18" />
        <circle cx="460" cy="335" r="28" fill="#FFFFFF" />
        <circle cx="460" cy="335" r="14" fill="#0B192C" />
      </g>
    </g>
  </g>
</svg>`

async function generateAll() {
  const rootDir = path.resolve(__dirname, '..')
  const publicDir = path.join(rootDir, 'public')
  const resDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'res')

  const fullBuffer = Buffer.from(svgFullIcon)
  const fgBuffer = Buffer.from(svgForegroundOnly)

  // 1. Web Public Icons
  await sharp(fullBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon.png'))
  await sharp(fullBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-icon.png'))
  await sharp(fullBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'icon-light-32x32.png'))
  await sharp(fullBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'icon-dark-32x32.png'))
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgFullIcon)

  // 2. Android Mipmap Icons
  const androidSizes = [
    { dir: 'mipmap-mdpi', size: 48, fgSize: 108 },
    { dir: 'mipmap-hdpi', size: 72, fgSize: 162 },
    { dir: 'mipmap-xhdpi', size: 96, fgSize: 216 },
    { dir: 'mipmap-xxhdpi', size: 144, fgSize: 324 },
    { dir: 'mipmap-xxxhdpi', size: 192, fgSize: 432 },
  ]

  for (const { dir, size, fgSize } of androidSizes) {
    const targetDir = path.join(resDir, dir)
    if (fs.existsSync(targetDir)) {
      // Full launcher icon (square/rounded)
      await sharp(fullBuffer).resize(size, size).png().toFile(path.join(targetDir, 'ic_launcher.png'))
      // Round launcher icon
      await sharp(fullBuffer).resize(size, size).png().toFile(path.join(targetDir, 'ic_launcher_round.png'))
      // Adaptive foreground layer
      await sharp(fgBuffer).resize(fgSize, fgSize).png().toFile(path.join(targetDir, 'ic_launcher_foreground.png'))
    }
  }

  console.log('All Web and Android icons generated successfully!')
}

generateAll().catch(console.error)
