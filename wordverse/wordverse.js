const canvas = document.querySelector("#universe");
const ctx = canvas.getContext("2d");

const vocabulary = window.WORDVERSE_VOCABULARY || [];

if (vocabulary.length !== 3500) {
  throw new Error(`Wordverse vocabulary failed to load: ${vocabulary.length} / 3500`);
}

const savedLearned = (() => {
  try {
    return JSON.parse(localStorage.getItem("wordverseLearned") || "[]");
  } catch {
    return [];
  }
})();

const state = {
  width: innerWidth,
  height: innerHeight,
  dpr: Math.min(devicePixelRatio || 1, 1.7),
  rotation: { x: -0.38, y: -0.12 },
  targetRotation: { x: -0.38, y: -0.12 },
  velocity: { x: 0, y: 0 },
  zoom: 1,
  targetZoom: 1,
  drag: { active: false, moved: false, x: 0, y: 0, lastX: 0, lastY: 0, pressedStar: null },
  hover: null,
  active: null,
  focusAmount: 0,
  focusTarget: 0,
  savedView: null,
  cardTimer: null,
  learned: new Set(savedLearned),
  learnedWords: new Set(savedLearned.map((key) => key.replace(/^(?:word:|\d+:)/, ""))),
};

let stars = [];
let links = [];
let backgroundStars = [];
let galaxies = [];
let deepSpaceDust = [];
let nebulaClouds = [];
let nebulaSprites = [];

function random(seed) {
  const value = Math.sin(seed * 923.17) * 43758.5453;
  return value - Math.floor(value);
}

function randomPlanet() {
  return {
    sides: 3 + Math.floor(Math.random() * 8),
    cagePoints: 7 + Math.floor(Math.random() * 12),
    hue: Math.floor(Math.random() * 360),
    secondaryHue: Math.floor(Math.random() * 360),
    coreRotation: Math.random() * Math.PI * 2,
    cageRotation: Math.random() * Math.PI * 2,
    spin: (0.00006 + Math.random() * 0.00032) * (Math.random() > 0.5 ? -1 : 1),
    tilt: 0.15 + Math.random() * 0.85,
    satellites: Math.floor(Math.random() * 6),
    irregularity: 0.06 + Math.random() * 0.38,
    rings: 1 + Math.floor(Math.random() * 4),
    layers: 1 + Math.floor(Math.random() * 3),
    bridge: 1 + Math.floor(Math.random() * 5),
    coreScale: 0.38 + Math.random() * 0.38,
    cageScale: 1.08 + Math.random() * 0.72,
    shape: Math.floor(Math.random() * 4),
  };
}

function planetSignature(planet) {
  return [
    planet.sides,
    planet.cagePoints,
    planet.hue,
    planet.secondaryHue,
    planet.satellites,
    planet.rings,
    planet.layers,
    planet.bridge,
    planet.shape,
    planet.coreScale.toFixed(3),
    planet.cageScale.toFixed(3),
    planet.tilt.toFixed(3),
    planet.irregularity.toFixed(3),
  ].join(":");
}

function createCloudLanes(count) {
  return Array.from({ length: count }, (_, index) => ({
    start: {
      x: (random(index + 40000) - 0.5) * 6100,
      y: (random(index + 41000) - 0.5) * 4100,
      z: (random(index + 42000) - 0.5) * 6100,
    },
    end: {
      x: (random(index + 43000) - 0.5) * 6100,
      y: (random(index + 44000) - 0.5) * 4100,
      z: (random(index + 45000) - 0.5) * 6100,
    },
    phaseA: random(index + 46000) * Math.PI * 2,
    phaseB: random(index + 47000) * Math.PI * 2,
    bend: 420 + random(index + 48000) * 760,
    hue: 178 + Math.floor(random(index + 49000) * 94),
  }));
}

function cloudLanePoint(lane, progress, seed) {
  const waveA = Math.sin(progress * Math.PI * 2.2 + lane.phaseA);
  const waveB = Math.cos(progress * Math.PI * 1.7 + lane.phaseB);
  const envelope = Math.sin(progress * Math.PI);
  return {
    x:
      lane.start.x +
      (lane.end.x - lane.start.x) * progress +
      waveA * lane.bend * envelope +
      (random(seed + 1) - 0.5) * 280,
    y:
      lane.start.y +
      (lane.end.y - lane.start.y) * progress +
      waveB * lane.bend * 0.75 * envelope +
      (random(seed + 2) - 0.5) * 360,
    z:
      lane.start.z +
      (lane.end.z - lane.start.z) * progress +
      (waveA - waveB) * lane.bend * 0.62 * envelope +
      (random(seed + 3) - 0.5) * 320,
  };
}

function createNebulaSprites() {
  return Array.from({ length: 10 }, (_, spriteIndex) => {
    const sprite = document.createElement("canvas");
    const size = 256;
    const spriteCtx = sprite.getContext("2d");
    const hue = 176 + spriteIndex * 9;
    sprite.width = size;
    sprite.height = size;
    spriteCtx.globalCompositeOperation = "screen";

    for (let lobe = 0; lobe < 7; lobe += 1) {
      const angle = random(spriteIndex * 31 + lobe + 61000) * Math.PI * 2;
      const distance = random(spriteIndex * 37 + lobe + 62000) * 42;
      const x = size * 0.5 + Math.cos(angle) * distance;
      const y = size * 0.5 + Math.sin(angle) * distance * 0.72;
      const radius = 48 + random(spriteIndex * 41 + lobe + 63000) * 56;
      const gradient = spriteCtx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `hsla(${hue + lobe * 3}, 86%, 78%, 0.34)`);
      gradient.addColorStop(0.38, `hsla(${hue + 18}, 76%, 54%, 0.16)`);
      gradient.addColorStop(0.74, `hsla(${hue - 14}, 66%, 34%, 0.055)`);
      gradient.addColorStop(1, `hsla(${hue}, 70%, 24%, 0)`);
      spriteCtx.fillStyle = gradient;
      spriteCtx.beginPath();
      spriteCtx.arc(x, y, radius, 0, Math.PI * 2);
      spriteCtx.fill();
    }

    return sprite;
  });
}

function buildGalaxy() {
  const count = vocabulary.length;
  const usedPlanetSignatures = new Set();
  const galaxyMap = new Map();
  if (!nebulaSprites.length) nebulaSprites = createNebulaSprites();

  vocabulary.forEach((wordData, index) => {
    const root = wordData[4] || wordData[0];
    if (!galaxyMap.has(root)) galaxyMap.set(root, []);
    galaxyMap.get(root).push(index);
  });

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const cloudLanes = createCloudLanes(17);
  const galaxiesPerLane = Math.ceil(galaxyMap.size / cloudLanes.length);
  galaxies = [...galaxyMap.entries()].map(([root, members], index, all) => {
    const laneIndex = index % cloudLanes.length;
    const lanePosition = Math.floor(index / cloudLanes.length);
    const progress = (lanePosition + 0.5) / galaxiesPerLane;
    const lane = cloudLanes[laneIndex];
    const point = cloudLanePoint(lane, progress, index + 50000);
    const familyRadius = members.length > 1 ? 34 + Math.sqrt(members.length) * 19 : 0;

    return {
      id: index,
      root,
      members,
      x: point.x,
      y: point.y,
      z: point.z,
      radius: familyRadius,
      hue: (lane.hue + Math.floor((random(index + 26000) - 0.5) * 52) + 360) % 360,
      visible: false,
      sx: 0,
      sy: 0,
      scale: 0,
      rotatedZ: 0,
    };
  });

  const galaxyByWord = new Map();
  galaxies.forEach((galaxy) => {
    galaxy.members.forEach((wordIndex, memberIndex) => {
      galaxyByWord.set(wordIndex, { galaxy, memberIndex });
    });
  });

  stars = Array.from({ length: count }, (_, index) => {
    const a = random(index + 10);
    const b = random(index + 2000);
    const c = random(index + 4000);
    const d = random(index + 6000);
    const wordData = vocabulary[index];
    const label = wordData[0];
    const root = wordData[4] || label;
    const { galaxy, memberIndex } = galaxyByWord.get(index);
    const memberCount = galaxy.members.length;
    const localAngle = memberIndex * goldenAngle + b * 0.55;
    const localRadius = memberCount > 1
      ? 16 + Math.sqrt((memberIndex + 0.7) / memberCount) * galaxy.radius
      : 0;
    const localDepth = memberCount > 1 ? (c - 0.5) * galaxy.radius * 0.9 : 0;
    let planet = randomPlanet();
    let signature = planetSignature(planet);
    while (usedPlanetSignatures.has(signature)) {
      planet = randomPlanet();
      signature = planetSignature(planet);
    }
    usedPlanetSignatures.add(signature);
    planet.signature = signature;
    planet.hue = (galaxy.hue + Math.floor(d * 92) - 46 + 360) % 360;

    return {
      id: index,
      key: `word:${label}`,
      x: galaxy.x + Math.cos(localAngle) * localRadius,
      y: galaxy.y + Math.sin(localAngle) * localRadius * 0.72,
      z: galaxy.z + localDepth,
      size: 1.25 + d * 3.4,
      color: "planet",
      glow: true,
      label,
      root,
      galaxy,
      wordData,
      planet,
      learned: state.learnedWords.has(label),
      labelVisible: index % 12 === 0,
      hasFullDetail: true,
      pulse: a * Math.PI * 2,
      sx: 0,
      sy: 0,
      scale: 0,
      visible: false,
    };
  });

  links = [];
  galaxies.forEach((galaxy) => {
    if (galaxy.members.length < 2) return;
    galaxy.members.forEach((wordIndex, memberIndex) => {
      if (memberIndex > 0) links.push([wordIndex, galaxy.members[memberIndex - 1]]);
      if (memberIndex > 2 && memberIndex % 3 === 0) {
        links.push([wordIndex, galaxy.members[0]]);
      }
    });
  });

  backgroundStars = Array.from({ length: state.width < 700 ? 160 : 300 }, (_, index) => ({
    x: random(index + 12000) * state.width,
    y: random(index + 14000) * state.height,
    size: 0.3 + random(index + 16000) * 1.25,
    alpha: 0.12 + random(index + 18000) * 0.62,
  }));
  deepSpaceDust = Array.from({ length: state.width < 700 ? 420 : 900 }, (_, index) => {
    const laneIndex = index % cloudLanes.length;
    const lanePosition = Math.floor(index / cloudLanes.length);
    const pointsPerLane = Math.ceil((state.width < 700 ? 420 : 900) / cloudLanes.length);
    const progress = (lanePosition + random(index + 30000)) / pointsPerLane;
    const lane = cloudLanes[laneIndex];
    const point = cloudLanePoint(lane, progress, index + 51000);
    return {
      x: point.x + (random(index + 32000) - 0.5) * 620,
      y: point.y + (random(index + 32500) - 0.5) * 620,
      z: point.z + (random(index + 32750) - 0.5) * 620,
      size: 0.35 + random(index + 33000) * 1.4,
      alpha: 0.06 + random(index + 34000) * 0.28,
      hue: lane.hue + Math.floor((random(index + 35000) - 0.5) * 34),
    };
  });
  const nebulaCloudCount = state.width < 700 ? 108 : 196;
  nebulaClouds = Array.from({ length: nebulaCloudCount }, (_, index) => {
    const laneIndex = index % cloudLanes.length;
    const lanePosition = Math.floor(index / cloudLanes.length);
    const cloudsPerLane = Math.ceil(nebulaCloudCount / cloudLanes.length);
    const progress = (lanePosition + 0.22 + random(index + 52000) * 0.56) / cloudsPerLane;
    const lane = cloudLanes[laneIndex];
    const point = cloudLanePoint(lane, progress, index + 53000);
    return {
      x: point.x + (random(index + 54000) - 0.5) * 560,
      y: point.y + (random(index + 55000) - 0.5) * 560,
      z: point.z + (random(index + 56000) - 0.5) * 560,
      radius: 180 + random(index + 57000) * 430,
      stretch: 0.52 + random(index + 58000) * 0.68,
      alpha: 0.19 + random(index + 59000) * 0.23,
      hue: lane.hue + Math.floor((random(index + 60000) - 0.5) * 42),
      rotation: random(index + 60500) * Math.PI,
      sprite: Math.floor(random(index + 60750) * nebulaSprites.length),
    };
  });
  canvas.dataset.planetCount = String(stars.length);
  canvas.dataset.uniquePlanetCount = String(usedPlanetSignatures.size);
  canvas.dataset.galaxyCount = String(galaxies.length);
  canvas.dataset.familyGalaxyCount = String(galaxies.filter((galaxy) => galaxy.members.length > 1).length);
  canvas.dataset.cloudCount = String(nebulaClouds.length);
  canvas.dataset.spatialModel = "volumetric-cloud-field";
  const largestGalaxy = galaxies.reduce(
    (largest, galaxy) => galaxy.members.length > largest.members.length ? galaxy : largest,
    galaxies[0]
  );
  canvas.dataset.largestGalaxy = `${largestGalaxy.root}:${largestGalaxy.members.length}`;
  document.querySelector("#galaxyStatus").textContent =
    `${galaxies.filter((galaxy) => galaxy.members.length > 1).length} FAMILIES`;
  updateLearnedStatus();
}

function updateLearnedStatus() {
  const count = stars.filter((star) => star.learned).length;
  const status = document.querySelector("#learnedStatus");
  if (status) status.textContent = `${count} / ${stars.length || 3500} LIT`;
  canvas.dataset.learnedCount = String(count);
}

function resize() {
  state.width = innerWidth;
  state.height = innerHeight;
  state.dpr = Math.min(devicePixelRatio || 1, 1.7);
  canvas.width = state.width * state.dpr;
  canvas.height = state.height * state.dpr;
  canvas.style.width = `${state.width}px`;
  canvas.style.height = `${state.height}px`;
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  buildGalaxy();
}

function rotate(point) {
  const cy = Math.cos(state.rotation.y);
  const sy = Math.sin(state.rotation.y);
  const cx = Math.cos(state.rotation.x);
  const sx = Math.sin(state.rotation.x);
  const x = point.x * cy + point.z * sy;
  const z = -point.x * sy + point.z * cy;
  return { x, y: point.y * cx - z * sx, z: point.y * sx + z * cx };
}

function project(point) {
  const camera = 4100;
  const depth = camera - point.z;
  if (depth < 260) return null;
  const scale = (1320 * state.zoom) / depth;
  return {
    x: state.width * 0.5 + point.x * scale,
    y: state.height * 0.5 + point.y * scale,
    z: point.z,
    depth,
    scale,
  };
}

function color(star, alpha) {
  if (star.planet) {
    return `hsla(${star.planet.hue}, 88%, 68%, ${alpha})`;
  }
  if (star.color === "cyan") return `rgba(128, 244, 255, ${alpha})`;
  if (star.color === "yellow") return `rgba(255, 240, 105, ${alpha})`;
  if (star.color === "blue") return `rgba(112, 166, 255, ${alpha})`;
  return `rgba(239, 245, 248, ${alpha})`;
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(
    state.width * 0.5,
    state.height * 0.48,
    0,
    state.width * 0.5,
    state.height * 0.5,
    Math.max(state.width, state.height) * 0.72
  );
  gradient.addColorStop(0, "#07111b");
  gradient.addColorStop(0.38, "#03070d");
  gradient.addColorStop(1, "#000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, state.width, state.height);

  backgroundStars.forEach((star) => {
    ctx.fillStyle = `rgba(224, 238, 246, ${star.alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  const haze = ctx.createLinearGradient(0, state.height * 0.18, state.width, state.height * 0.82);
  haze.addColorStop(0, "rgba(14, 34, 52, 0)");
  haze.addColorStop(0.42, "rgba(29, 67, 88, 0.035)");
  haze.addColorStop(0.58, "rgba(69, 48, 91, 0.028)");
  haze.addColorStop(1, "rgba(5, 12, 24, 0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, state.width, state.height);
}

function drawDeepSpaceDust() {
  deepSpaceDust.forEach((dust) => {
    const rotated = rotate(dust);
    const projected = project(rotated);
    if (!projected) return;
    if (
      projected.x < -10 ||
      projected.x > state.width + 10 ||
      projected.y < -10 ||
      projected.y > state.height + 10
    ) return;

    const depth = Math.max(0.14, Math.min(1, projected.scale * 2.4));
    ctx.fillStyle = `hsla(${dust.hue}, 72%, 76%, ${dust.alpha * depth})`;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, Math.max(0.22, dust.size * projected.scale), 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawNebulaClouds() {
  const visibleClouds = nebulaClouds
    .map((cloud) => {
      const rotated = rotate(cloud);
      const projected = project(rotated);
      return projected ? { cloud, rotated, projected } : null;
    })
    .filter(Boolean)
    .sort((left, right) => right.projected.depth - left.projected.depth);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  visibleClouds.forEach(({ cloud, projected }) => {
    const radius = cloud.radius * projected.scale;
    if (radius < 12) return;
    if (
      projected.x < -radius ||
      projected.x > state.width + radius ||
      projected.y < -radius ||
      projected.y > state.height + radius
    ) return;

    const depthAlpha = Math.max(0.22, Math.min(1, projected.scale * 2.2));
    ctx.save();
    ctx.translate(projected.x, projected.y);
    ctx.rotate(cloud.rotation);
    ctx.scale(1, cloud.stretch);
    ctx.globalAlpha = cloud.alpha * depthAlpha * (1 - state.focusAmount * 0.52);
    ctx.drawImage(nebulaSprites[cloud.sprite], -radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  });
  ctx.restore();
}

function drawGalaxies() {
  galaxies.forEach((galaxy) => {
    if (galaxy.members.length < 2) return;
    const rotated = rotate(galaxy);
    const projected = project(rotated);
    if (!projected) {
      galaxy.visible = false;
      return;
    }

    galaxy.visible = true;
    galaxy.sx = projected.x;
    galaxy.sy = projected.y;
    galaxy.scale = projected.scale;
    galaxy.rotatedZ = rotated.z;

    const radius = Math.max(7, galaxy.radius * projected.scale);
    const depthAlpha = Math.max(0.04, Math.min(0.2, (rotated.z + 1100) / 9000));
    const isActive = state.active?.galaxy === galaxy;
    const alpha = isActive ? 0.48 : depthAlpha * (1 - state.focusAmount * 0.7);

    ctx.strokeStyle = `hsla(${galaxy.hue}, 72%, 67%, ${alpha})`;
    ctx.lineWidth = isActive ? 1.1 : 0.42;
    ctx.beginPath();
    ctx.ellipse(projected.x, projected.y, radius, radius * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = `hsla(${galaxy.hue}, 84%, 72%, ${alpha * 0.72})`;
    ctx.beginPath();
    ctx.arc(projected.x, projected.y, isActive ? 2.2 : 0.75, 0, Math.PI * 2);
    ctx.fill();

    if ((isActive || galaxy.members.length >= 7) && projected.scale > 0.38) {
      ctx.font = `${isActive ? 500 : 300} ${isActive ? 10 : 7}px "DM Mono", monospace`;
      ctx.textAlign = "center";
      ctx.fillStyle = `hsla(${galaxy.hue}, 76%, 78%, ${isActive ? 0.88 : 0.34})`;
      ctx.fillText(`ROOT · ${galaxy.root}`, projected.x, projected.y - radius - 7);
    }
  });
}

function drawLinks() {
  ctx.lineWidth = 0.42;
  links.forEach(([fromIndex, toIndex]) => {
    const from = stars[fromIndex];
    const to = stars[toIndex];
    if (!from.visible || !to.visible) return;
    if (!from.learned && !to.learned && from !== state.active && to !== state.active) return;
    const distance = Math.hypot(from.sx - to.sx, from.sy - to.sy);
    if (distance > 150) return;
    const focusFade = 1 - state.focusAmount * 0.82;
    const alpha = Math.max(0.004, (1 - distance / 150) * 0.12 * Math.min(from.scale, to.scale) * focusFade);
    ctx.strokeStyle = `rgba(119, 180, 201, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(from.sx, from.sy);
    ctx.lineTo(to.sx, to.sy);
    ctx.stroke();
  });
}

function polygonPoints(sides, radius, rotation, irregularity, seed) {
  return Array.from({ length: sides }, (_, index) => {
    const angle = rotation + index * (Math.PI * 2 / sides);
    const variation = 1 + (random(seed + index * 31) - 0.5) * irregularity;
    return {
      x: Math.cos(angle) * radius * variation,
      y: Math.sin(angle) * radius * variation,
    };
  });
}

function strokePolygon(points) {
  if (!points.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.stroke();
}

function fillPolygon(points) {
  if (!points.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.fill();
}

function drawPlanet(star, time, radius, depthAlpha, focusFade) {
  const planet = star.planet;
  const detail = star === state.active ? state.focusAmount : Math.min(1, star.scale * 0.85);
  const baseRadius = Math.max(radius * 2.2, star === state.active ? 20 : 3.1);
  const spin = time * planet.spin;
  const rgbAlpha = depthAlpha * focusFade;

  ctx.save();
  ctx.translate(star.sx, star.sy);
  ctx.globalCompositeOperation = "screen";

  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, baseRadius * 2.4);
  glow.addColorStop(0, color(star, 0.48 * rgbAlpha));
  glow.addColorStop(0.35, color(star, 0.16 * rgbAlpha));
  glow.addColorStop(1, color(star, 0));
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, baseRadius * 2.4, 0, Math.PI * 2);
  ctx.fill();

  const corePoints = polygonPoints(
    planet.sides,
    baseRadius * planet.coreScale,
    planet.coreRotation - spin * 1.7,
    planet.irregularity,
    star.id + 31000
  );
  const coreGlow = ctx.createRadialGradient(
    -baseRadius * 0.18,
    -baseRadius * 0.2,
    0,
    0,
    0,
    baseRadius
  );
  coreGlow.addColorStop(0, "rgba(255,255,255,.96)");
  coreGlow.addColorStop(0.28, color(star, 0.9 * rgbAlpha));
  coreGlow.addColorStop(1, color(star, 0.22 * rgbAlpha));
  ctx.fillStyle = coreGlow;
  fillPolygon(corePoints);

  if (star === state.active || star === state.hover || (detail > 0.3 && baseRadius > 3.7)) {
    for (let layer = 1; layer < planet.layers; layer += 1) {
      const layerPoints = polygonPoints(
        Math.max(3, planet.sides - layer + (star.id % 3)),
        baseRadius * planet.coreScale * (1 - layer * 0.2),
        planet.coreRotation + spin * (layer + 1.2),
        planet.irregularity,
        star.id + 35000 + layer * 100
      );
      ctx.fillStyle = `hsla(${planet.secondaryHue}, 90%, ${72 + layer * 7}%, ${0.34 * rgbAlpha})`;
      fillPolygon(layerPoints);
    }

    const cageRadius = baseRadius * (planet.cageScale + detail * 0.18);
    const outer = polygonPoints(
      planet.cagePoints,
      cageRadius,
      planet.cageRotation + spin,
      planet.irregularity * 1.4,
      star.id + 41000
    );
    const inner = polygonPoints(
      planet.cagePoints,
      cageRadius * 0.72,
      planet.cageRotation - spin * 0.7 + Math.PI / planet.cagePoints,
      planet.irregularity,
      star.id + 51000
    );

    ctx.strokeStyle = color(star, (0.25 + detail * 0.58) * rgbAlpha);
    ctx.lineWidth = star === state.active ? 1.15 : 0.55;
    strokePolygon(outer);
    strokePolygon(inner);

    ctx.lineWidth *= 0.72;
    for (let i = 0; i < planet.cagePoints; i += 1) {
      const next = (i + planet.bridge) % planet.cagePoints;
      ctx.beginPath();
      ctx.moveTo(outer[i].x, outer[i].y);
      ctx.lineTo(inner[next].x, inner[next].y);
      ctx.lineTo(outer[(i + 1) % planet.cagePoints].x, outer[(i + 1) % planet.cagePoints].y);
      ctx.stroke();
    }

    for (let ring = 0; ring < planet.rings; ring += 1) {
      const squash = 0.22 + planet.tilt * 0.16 + ring * 0.08;
      ctx.save();
      ctx.rotate(planet.tilt + spin * (0.2 + ring * 0.18) + ring * Math.PI / planet.rings);
      ctx.scale(1, squash);
      ctx.strokeStyle = `hsla(${ring % 2 ? planet.secondaryHue : planet.hue}, 88%, 70%, ${(0.12 + detail * 0.26) * rgbAlpha})`;
      ctx.lineWidth = (star === state.active ? 1 : 0.4) / squash;
      ctx.beginPath();
      ctx.ellipse(0, 0, cageRadius * (1.02 + ring * 0.12), cageRadius * (1.02 + ring * 0.12), 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    for (let i = 0; i < planet.satellites; i += 1) {
      const angle = spin * (3 + i * 0.4) + i * (Math.PI * 2 / planet.satellites);
      const orbit = cageRadius * (1.05 + i * 0.12);
      ctx.fillStyle = color(star, (0.52 + i * 0.08) * rgbAlpha);
      ctx.beginPath();
      ctx.arc(
        Math.cos(angle) * orbit,
        Math.sin(angle) * orbit * (0.38 + planet.tilt * 0.2),
        star === state.active ? 1.8 : 0.75,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawDormantStar(star, radius, depthAlpha, focusFade) {
  const pointRadius = Math.max(0.7, radius * 0.78);
  const alpha = Math.min(0.38, (0.09 + depthAlpha * 0.2) * focusFade);

  ctx.fillStyle = `rgba(139, 157, 168, ${alpha})`;
  ctx.beginPath();
  ctx.arc(star.sx, star.sy, pointRadius, 0, Math.PI * 2);
  ctx.fill();

  if (star === state.hover) {
    ctx.strokeStyle = "rgba(143, 248, 255, 0.42)";
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(star.sx, star.sy, Math.max(5, pointRadius * 2.8), 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawStar(star, time) {
  const depthAlpha = Math.max(0.12, Math.min(1, (star.rotatedZ + 1100) / 1700));
  const radius = Math.max(0.42, star.size * star.scale * 1.55);
  const pulse = 1 + Math.sin(time * 0.0015 + star.pulse) * 0.15;
  const focusFade = state.active && star !== state.active ? 1 - state.focusAmount * 0.78 : 1;

  if (star.learned || star === state.active) {
    drawPlanet(star, time, radius, depthAlpha, focusFade);
  } else {
    drawDormantStar(star, radius, depthAlpha, focusFade);
  }

  if (star.labelVisible && star.scale > 0.3 && depthAlpha > 0.26) {
    const fontSize = Math.max(5.5, Math.min(11, 5.8 + star.scale * 3.2));
    ctx.font = `${star.hasFullDetail ? 500 : 300} ${fontSize}px "DM Mono", monospace`;
    ctx.textAlign = "center";
    ctx.fillStyle = star.learned || star === state.active
      ? color(star, Math.min(0.92, depthAlpha) * focusFade)
      : `rgba(119, 132, 140, ${Math.min(0.42, depthAlpha * 0.48) * focusFade})`;
    ctx.fillText(star.label, star.sx, star.sy - radius - 5);
  }
}

function drawFocusRings(time) {
  const star = state.active;
  if (!star?.visible || state.focusAmount < 0.01) return;

  const amount = state.focusAmount;
  const radius = Math.max(28, star.size * star.scale * 8.5) * (0.72 + amount * 0.28);
  const ringColor = star.color === "yellow" ? "255, 240, 105" : "128, 244, 255";

  ctx.save();
  ctx.translate(star.sx, star.sy);
  ctx.globalCompositeOperation = "screen";

  const aura = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2.6);
  aura.addColorStop(0, `rgba(${ringColor}, ${0.24 * amount})`);
  aura.addColorStop(0.24, `rgba(${ringColor}, ${0.08 * amount})`);
  aura.addColorStop(1, `rgba(${ringColor}, 0)`);
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 2.6, 0, Math.PI * 2);
  ctx.fill();

  const rings = [
    { scaleY: 0.28, rotation: time * 0.00034, alpha: 0.72, width: 1.1 },
    { scaleY: 0.48, rotation: -time * 0.00022 + 0.75, alpha: 0.42, width: 0.7 },
    { scaleY: 0.72, rotation: time * 0.00016 + 1.5, alpha: 0.24, width: 0.55 },
  ];

  rings.forEach((ring, index) => {
    ctx.save();
    ctx.rotate(ring.rotation);
    ctx.scale(1, ring.scaleY);
    ctx.strokeStyle = `rgba(${ringColor}, ${ring.alpha * amount})`;
    ctx.lineWidth = ring.width / ring.scaleY;
    ctx.setLineDash(index === 0 ? [] : [4 + index * 2, 8 + index * 3]);
    ctx.lineDashOffset = time * (index % 2 ? 0.012 : -0.009);
    ctx.beginPath();
    ctx.arc(0, 0, radius * (1 + index * 0.34), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });

  for (let i = 0; i < 7; i += 1) {
    const angle = time * 0.00045 * (i % 2 ? -1 : 1) + i * (Math.PI * 2 / 7);
    const orbitRadius = radius * (1.08 + (i % 3) * 0.18);
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius * (0.28 + (i % 3) * 0.12);
    ctx.fillStyle = `rgba(${ringColor}, ${(0.5 + (i % 2) * 0.35) * amount})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.1 + (i % 2) * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function animate(time = 0) {
  state.zoom += (state.targetZoom - state.zoom) * 0.08;
  state.focusAmount += (state.focusTarget - state.focusAmount) * 0.08;
  if (!state.drag.active) {
    state.targetRotation.x += state.velocity.x;
    state.targetRotation.y += state.velocity.y;
    state.velocity.x *= 0.94;
    state.velocity.y *= 0.94;
  }
  state.rotation.x += (state.targetRotation.x - state.rotation.x) * 0.17;
  state.rotation.y += (state.targetRotation.y - state.rotation.y) * 0.17;

  drawBackground();
  drawNebulaClouds();
  drawDeepSpaceDust();
  drawGalaxies();
  stars.forEach((star) => {
    const projected = project(rotate(star));
    star.visible = Boolean(
      projected &&
      projected.x > -70 &&
      projected.x < state.width + 70 &&
      projected.y > -70 &&
      projected.y < state.height + 70
    );
    if (!star.visible) return;
    star.sx = projected.x;
    star.sy = projected.y;
    star.rotatedZ = projected.z;
    star.scale = projected.scale;
    star.depth = projected.depth;
  });

  const visible = stars.filter((star) => star.visible).sort((a, b) => b.depth - a.depth);
  const testStar = visible.find((star) => star.wordData && star.rotatedZ > -350);
  if (testStar) canvas.dataset.testStar = `${testStar.sx.toFixed(1)},${testStar.sy.toFixed(1)}`;
  const otherStar = visible.find(
    (star) =>
      star !== state.active &&
      star.rotatedZ > -250 &&
      star.sx > 45 &&
      star.sx < state.width - 390 &&
      star.sy > 70 &&
      star.sy < state.height - 70
  );
  if (otherStar) {
    canvas.dataset.otherStar = `${otherStar.sx.toFixed(1)},${otherStar.sy.toFixed(1)},${otherStar.id}`;
  }
  if (state.active?.visible) {
    canvas.dataset.activeStar = `${state.active.sx.toFixed(1)},${state.active.sy.toFixed(1)}`;
  } else {
    delete canvas.dataset.activeStar;
  }
  drawLinks();
  visible.forEach((star) => drawStar(star, time));
  drawFocusRings(time);
  requestAnimationFrame(animate);
}

function findStar(x, y) {
  let found = null;
  let nearest = Infinity;
  stars.forEach((star) => {
    if (!star.visible || star.rotatedZ < -500 || star === state.active) return;
    const distance = Math.hypot(star.sx - x, star.sy - y);
    const hitRadius = Math.max(22, star.size * star.scale * 6.5);
    if (distance <= hitRadius && distance < nearest) {
      nearest = distance;
      found = star;
    }
  });
  return found;
}

function showWord(star) {
  if (!star?.wordData) return;
  clearTimeout(state.cardTimer);
  if (!state.active) {
    state.savedView = {
      rotationX: state.targetRotation.x,
      rotationY: state.targetRotation.y,
      zoom: state.targetZoom,
    };
  }
  state.active = star;
  state.focusTarget = 1;
  state.velocity.x = 0;
  state.velocity.y = 0;

  const nearestAngle = (angle, reference) => {
    const fullTurn = Math.PI * 2;
    return angle + Math.round((reference - angle) / fullTurn) * fullTurn;
  };
  const focusY = nearestAngle(Math.atan2(-star.x, star.z), state.targetRotation.y);
  const horizontalDepth = Math.hypot(star.x, star.z);
  const focusX = nearestAngle(Math.atan2(star.y, horizontalDepth), state.targetRotation.x);
  state.targetRotation.y = focusY;
  state.targetRotation.x = focusX;
  state.targetZoom = state.width < 700 ? 1.5 : 1.78;
  document.querySelector("#viewStatus").textContent = "FOCUS LOCK";
  document.querySelector("#zoomStatus").textContent = `${Math.round(state.targetZoom * 100)}%`;

  const [word, phonetic, type, meaning] = star.wordData;
  const example = `Learn the word "${word}" and use it in a sentence.`;
  const translation = `学习单词 ${word}，并尝试用它造句。`;
  document.querySelector("#starCode").textContent = `STAR ${String(star.id + 701).padStart(4, "0")}`;
  document.querySelector("#wordTitle").textContent = word;
  document.querySelector("#wordPhonetic").textContent = phonetic ? `/${phonetic}/` : "/ pronunciation /";
  document.querySelector("#wordType").textContent = type;
  document.querySelector("#wordRoot").textContent = `ROOT · ${star.root}`;
  document.querySelector("#wordMeaning").textContent = meaning;
  document.querySelector("#wordExample").textContent = example;
  document.querySelector("#wordTranslation").textContent = translation;
  canvas.dataset.activeRoot = star.root;
  const learnButton = document.querySelector("#learnButton");
  const learnButtonText = document.querySelector("#learnButtonText");
  learnButton.classList.toggle("is-learned", star.learned);
  learnButton.disabled = star.learned;
  learnButtonText.textContent = star.learned ? "已学习 · 星球已点亮" : "完成学习 · 点亮星球";
  const card = document.querySelector("#wordCard");
  card.classList.remove("is-open");
  state.cardTimer = setTimeout(() => {
    if (state.active !== star) return;
    card.classList.add("is-open");
    card.setAttribute("aria-hidden", "false");
  }, 620);
}

function closeWord() {
  clearTimeout(state.cardTimer);
  const card = document.querySelector("#wordCard");
  card.classList.remove("is-open");
  card.setAttribute("aria-hidden", "true");
  state.focusTarget = 0;
  if (state.savedView) {
    state.targetRotation.x = state.savedView.rotationX;
    state.targetRotation.y = state.savedView.rotationY;
    state.targetZoom = state.savedView.zoom;
  }
  document.querySelector("#viewStatus").textContent = "FREE VIEW";
  document.querySelector("#zoomStatus").textContent = `${Math.round(state.targetZoom * 100)}%`;
  setTimeout(() => {
    if (state.focusTarget === 0) state.active = null;
  }, 420);
}

function lightActivePlanet() {
  const star = state.active;
  if (!star || star.learned) return;
  star.learned = true;
  state.learned.add(star.key);
  state.learnedWords.add(star.label);
  localStorage.setItem("wordverseLearned", JSON.stringify([...state.learned]));
  updateLearnedStatus();

  const learnButton = document.querySelector("#learnButton");
  learnButton.classList.add("is-learned");
  learnButton.disabled = true;
  document.querySelector("#learnButtonText").textContent = "已学习 · 星球已点亮";
  state.focusAmount = Math.max(state.focusAmount, 0.55);
}

function setupEvents() {
  addEventListener("resize", resize);

  canvas.addEventListener("pointerdown", (event) => {
    state.drag.active = true;
    state.drag.moved = false;
    state.drag.pressedStar = findStar(event.clientX, event.clientY);
    state.drag.x = state.drag.lastX = event.clientX;
    state.drag.y = state.drag.lastY = event.clientY;
    state.velocity.x = 0;
    state.velocity.y = 0;
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add("is-dragging");
    document.querySelector("#viewStatus").textContent = "ROTATING";
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!state.drag.active) {
      state.hover = findStar(event.clientX, event.clientY);
      return;
    }
    const dx = event.clientX - state.drag.lastX;
    const dy = event.clientY - state.drag.lastY;
    if (Math.hypot(event.clientX - state.drag.x, event.clientY - state.drag.y) > 5) {
      state.drag.moved = true;
    }
    state.targetRotation.y += dx * 0.005;
    state.targetRotation.x -= dy * 0.0045;
    state.velocity.y = dx * 0.00038;
    state.velocity.x = -dy * 0.00034;
    state.drag.lastX = event.clientX;
    state.drag.lastY = event.clientY;
    canvas.dataset.rotation = `${state.targetRotation.x.toFixed(3)},${state.targetRotation.y.toFixed(3)}`;
  });

  canvas.addEventListener("pointerup", (event) => {
    const selectedStar = state.drag.moved
      ? null
      : state.drag.pressedStar || findStar(event.clientX, event.clientY);
    state.drag.active = false;
    state.drag.pressedStar = null;
    canvas.classList.remove("is-dragging");
    document.querySelector("#dragGuide").style.opacity = "0";
    if (selectedStar) {
      showWord(selectedStar);
    } else {
      document.querySelector("#viewStatus").textContent = state.active ? "FOCUS LOCK" : "FREE VIEW";
    }
  });

  canvas.addEventListener("pointercancel", () => {
    state.drag.active = false;
    state.drag.pressedStar = null;
    canvas.classList.remove("is-dragging");
    document.querySelector("#viewStatus").textContent = "FREE VIEW";
  });

  canvas.addEventListener("wheel", (event) => {
    state.targetZoom = Math.max(0.55, Math.min(2.15, state.targetZoom - event.deltaY * 0.00075));
    document.querySelector("#zoomStatus").textContent = `${Math.round(state.targetZoom * 100)}%`;
    document.querySelector("#dragGuide").style.opacity = "0";
  }, { passive: true });

  document.querySelector("#cardClose").addEventListener("click", closeWord);
  document.querySelector("#learnButton").addEventListener("click", lightActivePlanet);
  document.querySelector("#speakButton").addEventListener("click", () => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(document.querySelector("#wordTitle").textContent);
    voice.lang = "en-US";
    voice.rate = 0.82;
    speechSynthesis.speak(voice);
  });

  addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeWord();
  });
}

resize();
setupEvents();
setTimeout(() => document.querySelector("#loading").classList.add("is-hidden"), 850);
animate();
