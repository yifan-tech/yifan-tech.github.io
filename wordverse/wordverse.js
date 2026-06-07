const canvas = document.querySelector("#universe");
const ctx = canvas.getContext("2d");

const vocabulary = [
  ["explore", "/ɪkˈsplɔː(r)/", "v.", "探索；探测；仔细研究", "We use language to explore the world and understand each other.", "我们用语言探索世界，也理解彼此。"],
  ["achieve", "/əˈtʃiːv/", "v.", "达到；完成；成功", "Small steps help us achieve a much bigger dream.", "微小的步伐帮助我们实现更大的梦想。"],
  ["ancient", "/ˈeɪnʃənt/", "adj.", "古代的；古老的", "The ancient stars still shine above our heads.", "古老的星辰依然在我们头顶闪耀。"],
  ["approach", "/əˈprəʊtʃ/", "v. / n.", "接近；方法；途径", "Try a different approach when the old one fails.", "旧方法失效时，试试另一种途径。"],
  ["brilliant", "/ˈbrɪliənt/", "adj.", "杰出的；灿烂的", "A brilliant idea can appear in a quiet moment.", "出色的想法可能诞生于安静的时刻。"],
  ["challenge", "/ˈtʃælɪndʒ/", "n. / v.", "挑战；向……挑战", "Every new word is a challenge worth accepting.", "每个新单词都是值得接受的挑战。"],
  ["curious", "/ˈkjʊəriəs/", "adj.", "好奇的；求知欲强的", "Stay curious about everything you do not know.", "对所有未知之事保持好奇。"],
  ["discover", "/dɪˈskʌvə(r)/", "v.", "发现；发觉", "You may discover a new world inside a book.", "你也许会在书中发现一个新世界。"],
  ["essential", "/ɪˈsenʃl/", "adj.", "必不可少的；本质的", "Patience is essential for lasting progress.", "耐心是持久进步所必需的。"],
  ["gravity", "/ˈɡrævəti/", "n.", "重力；严重性", "Gravity keeps every planet in its orbit.", "重力让每颗行星维持在轨道上。"],
  ["imagine", "/ɪˈmædʒɪn/", "v.", "想象；设想", "Imagine the person you will become next year.", "想象一下明年的你会成为怎样的人。"],
  ["inspire", "/ɪnˈspaɪə(r)/", "v.", "鼓舞；启发", "Great teachers inspire us to keep asking why.", "优秀的老师鼓励我们不断追问为什么。"],
  ["knowledge", "/ˈnɒlɪdʒ/", "n.", "知识；学问", "Knowledge grows when it is shared with others.", "知识在分享中增长。"],
  ["observe", "/əbˈzɜːv/", "v.", "观察；注意到；遵守", "Observe the pattern before you make a choice.", "作出选择前先观察规律。"],
  ["possibility", "/ˌpɒsəˈbɪləti/", "n.", "可能；可能性", "Each decision opens a new possibility.", "每个决定都会开启一种新的可能。"],
  ["remarkable", "/rɪˈmɑːkəbl/", "adj.", "非凡的；显著的", "Her progress in one month was remarkable.", "她一个月内的进步非常显著。"],
  ["transform", "/trænsˈfɔːm/", "v.", "改变；使转化", "Daily practice can transform your ability.", "每日练习能够改变你的能力。"],
  ["universe", "/ˈjuːnɪvɜːs/", "n.", "宇宙；天地万物", "Language is a universe waiting to be explored.", "语言是一个等待探索的宇宙。"],
  ["wander", "/ˈwɒndə(r)/", "v.", "漫游；徘徊；走神", "Let your mind wander among the stars.", "让你的思绪在群星间漫游。"],
  ["wisdom", "/ˈwɪzdəm/", "n.", "智慧；明智", "Wisdom begins with knowing what you do not know.", "智慧始于知道自己的无知。"],
  ["abandon", "/əˈbændən/", "v.", "放弃；抛弃", "Never abandon a goal because progress feels slow.", "不要因为进步缓慢就放弃目标。"],
  ["balance", "/ˈbæləns/", "n. / v.", "平衡；使平衡", "Find a balance between study and rest.", "在学习与休息间找到平衡。"],
  ["contrast", "/ˈkɒntrɑːst/", "n. / v.", "对比；形成对照", "The bright star contrasts with the dark sky.", "明亮的星星与暗夜形成对比。"],
  ["destination", "/ˌdestɪˈneɪʃn/", "n.", "目的地；终点", "Learning is a journey, not a destination.", "学习是一段旅程，而非一个终点。"],
  ["evidence", "/ˈevɪdəns/", "n.", "证据；证明", "Look for evidence before reaching a conclusion.", "下结论前先寻找证据。"],
  ["frequent", "/ˈfriːkwənt/", "adj.", "频繁的；经常发生的", "Frequent review makes memory stronger.", "经常复习能让记忆更牢固。"],
  ["generate", "/ˈdʒenəreɪt/", "v.", "产生；引起", "Questions generate more ideas than answers.", "问题比答案更能产生新想法。"],
  ["horizon", "/həˈraɪzn/", "n.", "地平线；眼界", "A pale light appeared on the horizon.", "地平线上出现了一线微光。"],
  ["independent", "/ˌɪndɪˈpendənt/", "adj.", "独立的；自主的", "Independent thinking takes courage.", "独立思考需要勇气。"],
  ["journey", "/ˈdʒɜːni/", "n.", "旅行；历程", "Your vocabulary journey starts with one word.", "你的词汇旅程从一个单词开始。"],
  ["maintain", "/meɪnˈteɪn/", "v.", "维持；保养；坚持", "Maintain your focus for just ten more minutes.", "再保持十分钟专注。"],
  ["opportunity", "/ˌɒpəˈtjuːnəti/", "n.", "机会；时机", "Every mistake is an opportunity to learn.", "每个错误都是一次学习机会。"],
  ["accomplish", "/əˈkʌmplɪʃ/", "v.", "完成；实现", "Together we can accomplish more than we expect.", "齐心协力，我们能完成超出预期的事情。"],
  ["attitude", "/ˈætɪtjuːd/", "n.", "态度；看法", "A positive attitude changes the way you learn.", "积极的态度会改变你的学习方式。"],
  ["available", "/əˈveɪləbl/", "adj.", "可获得的；有空的", "More learning resources are available online.", "网上可以获得更多学习资源。"],
  ["benefit", "/ˈbenɪfɪt/", "n. / v.", "益处；使受益", "Reading every day will benefit your writing.", "每天阅读会提升你的写作。"],
  ["capacity", "/kəˈpæsəti/", "n.", "能力；容量", "The human brain has a remarkable capacity to learn.", "人脑拥有非凡的学习能力。"],
  ["concentrate", "/ˈkɒnsntreɪt/", "v.", "集中；专心", "It is easier to concentrate in a quiet room.", "在安静的房间里更容易集中注意力。"],
  ["consequence", "/ˈkɒnsɪkwəns/", "n.", "结果；后果", "Every choice has a consequence.", "每个选择都会带来结果。"],
  ["creative", "/kriˈeɪtɪv/", "adj.", "有创造力的", "Creative thinking helps us solve difficult problems.", "创造性思维帮助我们解决难题。"],
  ["determine", "/dɪˈtɜːmɪn/", "v.", "决定；确定", "Your habits determine much of your future.", "你的习惯在很大程度上决定未来。"],
  ["effective", "/ɪˈfektɪv/", "adj.", "有效的；起作用的", "Regular review is an effective learning method.", "定期复习是一种有效的学习方法。"],
  ["encounter", "/ɪnˈkaʊntə(r)/", "v. / n.", "遇到；遭遇", "You will encounter unfamiliar words while reading.", "阅读时你会遇到陌生单词。"],
  ["environment", "/ɪnˈvaɪrənmənt/", "n.", "环境；周围状况", "A good environment makes learning easier.", "良好的环境让学习更轻松。"],
  ["establish", "/ɪˈstæblɪʃ/", "v.", "建立；确立", "Establish a routine that you can follow every day.", "建立一个每天都能坚持的习惯。"],
  ["eventually", "/ɪˈventʃuəli/", "adv.", "最终；终于", "Consistent effort will eventually bring results.", "持续努力最终会带来成果。"],
  ["flexible", "/ˈfleksəbl/", "adj.", "灵活的；可变通的", "A flexible plan can adapt to unexpected changes.", "灵活的计划可以适应意外变化。"],
  ["gradually", "/ˈɡrædʒuəli/", "adv.", "逐渐地", "Your vocabulary will gradually become larger.", "你的词汇量会逐渐扩大。"],
  ["identity", "/aɪˈdentəti/", "n.", "身份；特征", "Language is closely connected with identity.", "语言与身份密切相关。"],
  ["influence", "/ˈɪnfluəns/", "n. / v.", "影响；对……起作用", "Friends can strongly influence our decisions.", "朋友会强烈影响我们的决定。"],
  ["involve", "/ɪnˈvɒlv/", "v.", "涉及；使参加", "Real learning must involve active thinking.", "真正的学习必须包含主动思考。"],
  ["perspective", "/pəˈspektɪv/", "n.", "观点；视角", "Travel gives us a wider perspective on life.", "旅行让我们拥有更宽广的人生视角。"],
  ["preserve", "/prɪˈzɜːv/", "v.", "保护；保存", "We should preserve valuable cultural traditions.", "我们应当保护珍贵的文化传统。"],
  ["principle", "/ˈprɪnsəpl/", "n.", "原则；原理", "The same principle applies to language learning.", "同样的原则也适用于语言学习。"],
  ["resource", "/rɪˈsɔːs/", "n.", "资源；资料", "Time is one of our most valuable resources.", "时间是我们最宝贵的资源之一。"],
  ["significant", "/sɪɡˈnɪfɪkənt/", "adj.", "重要的；显著的", "Practice made a significant difference to her score.", "练习使她的成绩有了显著变化。"],
  ["strategy", "/ˈstrætədʒi/", "n.", "策略；行动计划", "Choose a strategy that matches your learning style.", "选择符合自己学习方式的策略。"],
  ["sufficient", "/səˈfɪʃnt/", "adj.", "足够的；充分的", "Make sure you get sufficient sleep before the exam.", "考试前要确保获得充足睡眠。"],
  ["temporary", "/ˈtemprəri/", "adj.", "暂时的；临时的", "Failure is temporary if you keep moving forward.", "只要继续前进，失败就是暂时的。"],
  ["valuable", "/ˈvæljuəbl/", "adj.", "宝贵的；有价值的", "Every question can lead to a valuable discovery.", "每个问题都可能带来有价值的发现。"],
  ["variety", "/vəˈraɪəti/", "n.", "多样；种类", "Use a variety of methods to remember new words.", "使用多种方法记忆新单词。"],
  ["visible", "/ˈvɪzəbl/", "adj.", "看得见的；明显的", "The progress became visible after several weeks.", "几周后，进步变得明显起来。"],
  ["volunteer", "/ˌvɒlənˈtɪə(r)/", "n. / v.", "志愿者；自愿", "She volunteered to help younger students.", "她自愿帮助低年级学生。"],
  ["worthwhile", "/ˌwɜːθˈwaɪl/", "adj.", "值得的", "Learning another language is always worthwhile.", "学习另一门语言总是值得的。"],
];

const ambientWords = [
  "absolute", "academic", "accurate", "adapt", "admire", "advance", "afford", "aim", "alarm", "ambition",
  "analyse", "annual", "anxious", "appeal", "arrange", "atmosphere", "attitude", "average", "aware", "benefit",
  "beyond", "capacity", "capture", "career", "certain", "complex", "concentrate", "conduct", "confirm", "consequence",
  "consider", "creative", "decline", "define", "delight", "deserve", "determine", "device", "distant", "effective",
  "emerge", "emotion", "encounter", "energy", "enormous", "establish", "eventually", "exchange", "existence", "expand",
  "feature", "flexible", "focus", "fortunate", "function", "gradually", "guidance", "identity", "impact", "improve",
  "include", "influence", "intend", "involve", "limit", "material", "measure", "memory", "method", "mystery",
  "normal", "obvious", "occasion", "ordinary", "organize", "particular", "pattern", "perform", "persuade", "potential",
  "precise", "predict", "preserve", "principle", "process", "produce", "quality", "reflect", "region", "represent",
  "require", "resource", "respond", "responsible", "result", "significant", "solution", "specific", "structure", "suitable",
  "survive", "theory", "therefore", "tradition", "unique", "valuable", "variety", "visible", "volunteer", "wonder",
  "ability", "aboard", "absence", "absorb", "abstract", "access", "accompany", "account", "accumulate", "acknowledge",
  "acquire", "addition", "adequate", "adjust", "adventure", "advertise", "advocate", "agriculture", "alternative", "amaze",
  "announce", "anticipate", "apparent", "appreciate", "approve", "argument", "arise", "artificial", "assess", "assume",
  "attempt", "attract", "authority", "automatic", "background", "barrier", "behavior", "belief", "belong", "broaden",
  "calculate", "campaign", "candidate", "category", "cautious", "civilization", "combine", "comfort", "commercial", "commit",
  "communicate", "community", "compare", "compete", "complete", "compose", "concept", "concern", "conclude", "condition",
  "connection", "conscious", "constant", "construct", "consume", "contact", "contain", "contribute", "convenient", "convince",
  "cooperate", "courage", "crucial", "culture", "damage", "debate", "decade", "decision", "demonstrate", "depend",
  "describe", "design", "detail", "develop", "difference", "difficulty", "direction", "disappear", "discipline", "display",
  "distance", "educate", "enable", "encourage", "entire", "equal", "equipment", "especially", "essentially", "estimate",
  "evaluate", "exact", "examine", "example", "excellent", "exception", "experience", "experiment", "explain", "express",
  "facility", "factor", "familiar", "favour", "financial", "foreign", "freedom", "fundamental", "future", "general",
  "global", "goal", "growth", "habit", "harmful", "historic", "honest", "however", "immediate", "importance",
  "increase", "individual", "industry", "information", "initiative", "instead", "intelligent", "interest", "international", "introduce",
  "investigate", "language", "likely", "majority", "manage", "meaning", "mental", "natural", "necessary", "notice",
  "objective", "obtain", "operate", "organization", "original", "participate", "patient", "personal", "physical", "positive",
  "practical", "prepare", "present", "prevent", "primary", "professional", "progress", "provide", "purpose", "realize",
  "recognize", "recommend", "reduce", "relationship", "reliable", "remain", "replace", "research", "respect", "similar",
  "society", "standard", "strength", "subject", "suggest", "support", "technology", "understand", "unusual", "various"
];

const state = {
  width: innerWidth,
  height: innerHeight,
  dpr: Math.min(devicePixelRatio || 1, 1.7),
  rotation: { x: -0.14, y: 0.15 },
  targetRotation: { x: -0.14, y: 0.15 },
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
  learned: new Set(JSON.parse(localStorage.getItem("wordverseLearned") || "[]")),
};

let stars = [];
let links = [];
let backgroundStars = [];

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

function ambientWordData(word) {
  return [
    word,
    "/ vocabulary /",
    "word",
    "英语 3500 词汇星球",
    `Explore the word "${word}" in the vocabulary universe.`,
    `在词汇宇宙中探索单词 ${word}。`,
  ];
}

function buildGalaxy() {
  const count = state.width < 700 ? 650 : 1100;
  const usedPlanetSignatures = new Set();
  const wordSlots = new Map(
    vocabulary.map((_, index) => [Math.floor(((index + 0.5) * count) / vocabulary.length), index])
  );

  stars = Array.from({ length: count }, (_, index) => {
    const a = random(index + 10);
    const b = random(index + 2000);
    const c = random(index + 4000);
    const d = random(index + 6000);
    const arm = index % 7;
    const radius = 110 + Math.pow(a, 0.68) * 960;
    const angle = b * Math.PI * 2 + radius * 0.0068 + arm * (Math.PI * 2 / 7);
    const thickness = (c - 0.5) * (260 + radius * 0.32);
    const wordIndex = wordSlots.get(index);
    const label = wordIndex === undefined
      ? ambientWords[index % ambientWords.length]
      : vocabulary[wordIndex][0];
    const wordData = wordIndex === undefined ? ambientWordData(label) : vocabulary[wordIndex];
    let planet = randomPlanet();
    let signature = planetSignature(planet);
    while (usedPlanetSignatures.has(signature)) {
      planet = randomPlanet();
      signature = planetSignature(planet);
    }
    usedPlanetSignatures.add(signature);
    planet.signature = signature;

    return {
      id: index,
      key: `${index}:${label}`,
      x: Math.cos(angle) * radius + (d - 0.5) * 190,
      y: thickness + Math.sin(angle * 1.7) * 80,
      z: Math.sin(angle) * radius + (c - 0.5) * 190,
      size: 1.25 + d * 3.4,
      color: "planet",
      glow: true,
      label,
      wordData,
      planet,
      learned: state.learned.has(`${index}:${label}`),
      labelVisible: index % 4 === 0 || wordIndex !== undefined,
      hasFullDetail: wordIndex !== undefined,
      pulse: a * Math.PI * 2,
      sx: 0,
      sy: 0,
      scale: 0,
      visible: false,
    };
  });

  links = [];
  for (let i = 0; i < stars.length; i += 1) {
    if (i % 3) continue;
    let closest = -1;
    let distance = 280;
    for (let j = i + 1; j < Math.min(stars.length, i + 28); j += 1) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dz = stars[i].z - stars[j].z;
      const current = Math.hypot(dx, dy, dz);
      if (current < distance) {
        distance = current;
        closest = j;
      }
    }
    if (closest >= 0) links.push([i, closest]);
  }

  backgroundStars = Array.from({ length: state.width < 700 ? 180 : 360 }, (_, index) => ({
    x: random(index + 12000) * state.width,
    y: random(index + 14000) * state.height,
    size: 0.3 + random(index + 16000) * 1.25,
    alpha: 0.12 + random(index + 18000) * 0.62,
  }));
  canvas.dataset.planetCount = String(stars.length);
  canvas.dataset.uniquePlanetCount = String(usedPlanetSignatures.size);
  updateLearnedStatus();
}

function updateLearnedStatus() {
  const count = stars.filter((star) => star.learned).length;
  const status = document.querySelector("#learnedStatus");
  if (status) status.textContent = `${count} / ${stars.length || 1100} LIT`;
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
  const camera = 1450;
  const depth = camera - point.z;
  if (depth < 170) return null;
  const scale = (900 * state.zoom) / depth;
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

  const [word, phonetic, type, meaning, example, translation] = star.wordData;
  document.querySelector("#starCode").textContent = `STAR ${String(star.id + 701).padStart(4, "0")}`;
  document.querySelector("#wordTitle").textContent = word;
  document.querySelector("#wordPhonetic").textContent = phonetic;
  document.querySelector("#wordType").textContent = type;
  document.querySelector("#wordMeaning").textContent = meaning;
  document.querySelector("#wordExample").textContent = example;
  document.querySelector("#wordTranslation").textContent = translation;
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
