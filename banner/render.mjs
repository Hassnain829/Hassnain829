import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import gifenc from 'gifenc';
import pngjs from 'pngjs';

const { GIFEncoder, applyPalette, quantize } = gifenc;
const { PNG } = pngjs;
const width = 1200;
const height = 360;
const frameCount = 30;
const frameDelayMs = 130;
const stillOnly = process.argv.includes('--still');
const bannerDir = path.dirname(fileURLToPath(import.meta.url));
const frameDir = path.join(bannerDir, '.frames');
const assetsDir = path.resolve(bannerDir, '..', 'assets');
const chrome = process.env.CHROME_PATH
  ?? (process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : 'google-chrome');

mkdirSync(frameDir, { recursive: true });
mkdirSync(assetsDir, { recursive: true });

function frameSvg(frame) {
  const phase = (frame / frameCount) * Math.PI * 2;
  const floatY = (Math.sin(phase) * 4).toFixed(2);
  const sweepX = (600 + (frame / frameCount) * 675).toFixed(1);
  const pulse = (0.46 + 0.28 * Math.sin(phase + 0.8)).toFixed(2);
  const nodeX = (1110 + 45 * Math.cos(phase)).toFixed(1);
  const nodeY = (38 + 17 * Math.sin(phase)).toFixed(1);
  const node2X = (675 + 33 * Math.cos(phase + Math.PI)).toFixed(1);
  const node2Y = (317 + 16 * Math.sin(phase + Math.PI)).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">Hassnain Ahmed — Software Engineer</title>
  <desc id="desc">An animated three-dimensional Python editor with a working scikit-learn example.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07101e"/>
      <stop offset=".58" stop-color="#0b1730"/>
      <stop offset="1" stop-color="#151536"/>
    </linearGradient>
    <radialGradient id="aura">
      <stop offset="0" stop-color="#386de3" stop-opacity=".37"/>
      <stop offset="1" stop-color="#386de3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cyanAura">
      <stop offset="0" stop-color="#36e5df" stop-opacity=".18"/>
      <stop offset="1" stop-color="#36e5df" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f3ffff"/>
      <stop offset=".47" stop-color="#70dff1"/>
      <stop offset="1" stop-color="#9d90ff"/>
    </linearGradient>
    <linearGradient id="top" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2b8d9f"/>
      <stop offset=".55" stop-color="#335da5"/>
      <stop offset="1" stop-color="#6550b1"/>
    </linearGradient>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7b65dc"/>
      <stop offset="1" stop-color="#31266d"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#142944"/>
      <stop offset="1" stop-color="#0b1730"/>
    </linearGradient>
    <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#67fbf3" stop-opacity="0"/>
      <stop offset=".5" stop-color="#67fbf3" stop-opacity=".24"/>
      <stop offset="1" stop-color="#67fbf3" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse">
      <path d="M35 0H0V35" fill="none" stroke="#a9c7ed" stroke-opacity=".08"/>
    </pattern>
    <filter id="blur" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="16"/>
    </filter>
    <clipPath id="rounded"><rect width="1200" height="360" rx="20"/></clipPath>
    <clipPath id="codeClip"><rect x="642" y="74" width="506" height="234" rx="16"/></clipPath>
  </defs>
  <g clip-path="url(#rounded)">
    <rect width="1200" height="360" fill="url(#bg)"/>
    <rect width="1200" height="360" fill="url(#grid)"/>
    <ellipse cx="960" cy="105" rx="390" ry="275" fill="url(#aura)"/>
    <ellipse cx="702" cy="336" rx="270" ry="160" fill="url(#cyanAura)"/>
    <path d="M0 359h1200" stroke="#58cfdf" stroke-opacity=".55" stroke-width="2"/>

    <g fill="none" stroke="#6bc3e3" stroke-opacity=".22" stroke-width="1.4">
      <path d="M603 178c55-126 212-174 359-149 92 15 165 74 214 151"/>
      <path d="M632 293c105 69 243 71 359 45 75-17 141-67 184-119"/>
      <path d="M611 340 837 130M703 360 867 127M826 360 911 129M950 360 966 129M1074 360 1021 128"/>
    </g>
    <circle cx="${nodeX}" cy="${nodeY}" r="5" fill="#7de7f6" opacity="${pulse}"/>
    <circle cx="${node2X}" cy="${node2Y}" r="4" fill="#9c8aff" opacity="${pulse}"/>
    <ellipse cx="899" cy="333" rx="231" ry="23" fill="#315ed0" opacity=".38" filter="url(#blur)"/>
    <ellipse cx="900" cy="332" rx="207" ry="17" fill="#020819" opacity=".65"/>

    <g font-family="Arial, Helvetica, sans-serif">
      <rect x="52" y="37" width="205" height="39" rx="19.5" fill="#10334a" stroke="#58dadc" stroke-opacity=".7"/>
      <circle cx="75" cy="56.5" r="5" fill="#70eadc"/>
      <text x="92" y="63" fill="#e6faff" font-size="19" font-weight="700">@Hassnain829</text>
      <text x="49" y="158" fill="#f7fbff" font-size="75" font-weight="800" letter-spacing="1">HASSNAIN</text>
      <text x="49" y="241" fill="url(#name)" font-size="87" font-weight="800" letter-spacing="2">AHMED</text>
      <rect x="54" y="259" width="368" height="3" rx="1.5" fill="url(#name)"/>
      <text x="54" y="299" fill="#f3f7ff" font-size="24" font-weight="700" letter-spacing="4">SOFTWARE ENGINEER</text>
      <text x="54" y="332" fill="#a8d1df" font-size="18" font-weight="600" letter-spacing="1.1">PYTHON  ·  LARAVEL  ·  APPLIED AI</text>
    </g>

    <g transform="translate(0 ${floatY})">
      <rect x="663" y="56" width="506" height="234" rx="16" fill="#121d42" stroke="#6b65c8" stroke-opacity=".6" stroke-width="2"/>
      <path d="M642 74 1148 74 1169 56 663 56Z" fill="url(#top)" stroke="#9addeb" stroke-opacity=".63"/>
      <path d="M1148 74 1169 56 1169 290 1148 308Z" fill="url(#side)" stroke="#a59bfa" stroke-opacity=".7"/>
      <rect x="642" y="74" width="506" height="234" rx="16" fill="url(#screen)" stroke="#6bcee9" stroke-opacity=".79" stroke-width="2"/>
      <path d="M643 90a16 16 0 0 1 16-16h473a16 16 0 0 1 16 16v30H643Z" fill="#203552"/>
      <path d="M643 120h505" stroke="#57a1c4" stroke-opacity=".34"/>
      <circle cx="665" cy="98" r="5" fill="#6bdedb"/>
      <text x="681" y="104" fill="#e2faff" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700">model.py</text>
      <text x="1088" y="102" text-anchor="end" fill="#9fcbd8" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="1">PYTHON / ML</text>
      <circle cx="1114" cy="97" r="5" fill="#68eddc" opacity="${pulse}"/>
      <rect x="${sweepX}" y="74" width="116" height="234" fill="url(#sweep)" clip-path="url(#codeClip)"/>

      <g font-family="Consolas, 'Courier New', monospace" font-size="17" xml:space="preserve">
        <text x="663" y="154" fill="#6f89a9">01</text>
        <text x="702" y="154"><tspan fill="#b6a1ff">from </tspan><tspan fill="#8bd6ef">sklearn.datasets </tspan><tspan fill="#b6a1ff">import </tspan><tspan fill="#f4d287">load_iris</tspan></text>
        <text x="663" y="187" fill="#6f89a9">02</text>
        <text x="702" y="187"><tspan fill="#b6a1ff">from </tspan><tspan fill="#8bd6ef">sklearn.svm </tspan><tspan fill="#b6a1ff">import </tspan><tspan fill="#f4d287">SVC</tspan></text>
        <text x="663" y="220" fill="#6f89a9">03</text>
        <text x="702" y="220"><tspan fill="#e6f4ff">X, y = </tspan><tspan fill="#f4d287">load_iris</tspan><tspan fill="#e6f4ff">(return_X_y=</tspan><tspan fill="#9de6c0">True</tspan><tspan fill="#e6f4ff">)</tspan></text>
        <text x="663" y="253" fill="#6f89a9">04</text>
        <text x="702" y="253"><tspan fill="#e6f4ff">model = </tspan><tspan fill="#f4d287">SVC</tspan><tspan fill="#e6f4ff">(kernel=</tspan><tspan fill="#9de6c0">"rbf"</tspan><tspan fill="#e6f4ff">).fit(X, y)</tspan></text>
        <text x="663" y="286" fill="#6f89a9">05</text>
        <text x="702" y="286"><tspan fill="#e6f4ff">prediction = model.predict(X[:1])</tspan></text>
      </g>
      <path d="M658 76h466" stroke="#c3ffff" stroke-opacity=".32" stroke-width="1.5"/>
    </g>
  </g>
  <rect x="1" y="1" width="1198" height="358" rx="19" fill="none" stroke="#73a3cd" stroke-opacity=".38" stroke-width="2"/>
</svg>`;
}

const frames = [];
const count = stillOnly ? 1 : frameCount;
for (let index = 0; index < count; index++) {
  const name = String(index).padStart(3, '0');
  const svgPath = path.join(frameDir, `frame-${name}.svg`);
  const pngPath = path.join(frameDir, `frame-${name}.png`);
  writeFileSync(svgPath, frameSvg(index), 'utf8');
  const result = spawnSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    `--screenshot=${pngPath}`,
    `--window-size=${width},${height}`,
    pathToFileURL(svgPath).href,
  ], { encoding: 'utf8', timeout: 30_000, windowsHide: true });
  if (result.error || result.status !== 0 || !existsSync(pngPath)) {
    throw new Error(`Chrome failed on frame ${index}: ${result.error ?? result.stderr}`);
  }
  frames.push(pngPath);
  if ((index + 1) % 5 === 0 || index === count - 1) {
    console.log(`Rendered ${index + 1}/${count} frames`);
  }
}

const stillPath = path.join(assetsDir, 'profile-header-still.png');
copyFileSync(frames[0], stillPath);
console.log(`Wrote ${stillPath}`);
if (stillOnly) process.exit(0);

const decodedFrames = frames.map((framePath) => PNG.sync.read(readFileSync(framePath)));
for (const png of decodedFrames) {
  if (png.width !== width || png.height !== height) {
    throw new Error(`Unexpected frame size: ${png.width}x${png.height}`);
  }
}
const samples = Buffer.concat([0, 8, 15, 23].map((index) => decodedFrames[index].data));
const palette = quantize(samples, 160);
const gif = GIFEncoder();
for (let index = 0; index < decodedFrames.length; index++) {
  const pixels = applyPalette(decodedFrames[index].data, palette);
  gif.writeFrame(pixels, width, height, {
    palette,
    delay: frameDelayMs,
    repeat: 0,
  });
  if ((index + 1) % 5 === 0 || index === decodedFrames.length - 1) {
    console.log(`Encoded ${index + 1}/${decodedFrames.length} frames`);
  }
}
gif.finish();
const gifPath = path.join(assetsDir, 'profile-header.gif');
writeFileSync(gifPath, Buffer.from(gif.bytes()));
console.log(`Wrote ${gifPath}`);
