const canvas = document.querySelector("#journey-canvas");
const ctx = canvas.getContext("2d", { alpha: true });
const profileImage = new Image();
profileImage.src = "assets/profile-photo.jpg";

const chapterKicker = document.querySelector("#chapter-kicker");
const chapterTitle = document.querySelector("#chapter-title");
const chapterCopy = document.querySelector("#chapter-copy");
const storyPanel = document.querySelector(".story-panel");
const heroTitle = document.querySelector("#hero-title");
const headlineDetail = document.querySelector("#headline-detail");
const chapterFrom = document.querySelector("#chapter-from");
const chapterTo = document.querySelector("#chapter-to");
const currentYear = document.querySelector("#current-year");
const progressLabel = document.querySelector("#progress-label");
const timelineProgress = document.querySelector("#timeline-progress");
const timelineNodes = document.querySelector("#timeline-nodes");
const playToggle = document.querySelector("#play-toggle");
const restartButton = document.querySelector("#restart-button");
const stopButton = document.querySelector("#stop-button");
const timerDisplay = document.querySelector("#timer-display");

const chapters = [
  {
    year: "",
    kicker: "Ownership",
    timelineLabel: "Business Owner / Chef",
    title: "Business Owner / Chef",
    copy: "I ran a small restaurant and worked in the kitchen, learning ownership, pressure, and service.",
    from: "Restaurant",
    to: "Resilience",
    route: 0,
    aliases: ["business", "owner", "chef", "restaurant"],
  },
  {
    year: "",
    kicker: "Canada + Code",
    timelineLabel: "Canada + Coding Bootcamp",
    title: "Moved To Canada + Concordia Bootcamp",
    copy: "I moved to Montreal and completed an intensive coding and data science bootcamp at Concordia.",
    from: "Manila",
    to: "Montreal",
    route: 0,
    isFlightStart: true,
    aliases: ["canada", "flight", "coding bootcamp"],
  },
  {
    year: "",
    kicker: "Travel Tech",
    timelineLabel: "Data Scientist at FlightHub",
    title: "Data Scientist At FlightHub",
    copy: "At FlightHub, a travel tech company, I grew from analyst to data scientist over two and a half years.",
    from: "Data",
    to: "FlightHub",
    route: 1,
    aliases: ["flighthub", "travel", "tech company", "data scientist"],
  },
  {
    year: "",
    kicker: "Concordia",
    timelineLabel: "MSc at Concordia",
    title: "MSc In Business Analytics And Technology Management",
    copy: "I am pursuing my MSc at Concordia, connecting analytics, technology, and business decisions.",
    from: "Montreal",
    to: "Concordia",
    route: 1,
    aliases: ["concordia", "msc", "master", "masters"],
  },
  {
    year: "",
    kicker: "1Password",
    timelineLabel: "Now at 1Password",
    title: "Now At 1Password",
    copy: "I am excited to learn, contribute, and grow with the Enterprise Analytics team.",
    from: "Analytics",
    to: "1Password",
    route: 1,
    isDataFinale: true,
    aliases: ["onepassword", "1password", "data", "finale"],
  },
];

const defaultHeroTitle = 'From running a restaurant to building <span>with data.</span>';
const dataHeroTitle = '<span class="headline-kicker">Excited about..</span>';
const dataHeadlineItems = [
  ["D", "Discovering life at 1Password"],
  ["A", "Advancing analytics with AI"],
  ["T", "Taking on new learning every day"],
  ["A", "Advancing with the Enterprise Analytics team"],
];

const manila = { lat: 14.5995, lon: 120.9842 };
const montreal = { lat: 45.5019, lon: -73.5674 };
const brandColors = {
  intrepid: "#1a285f",
  bits: "#1a8cff",
  biscuit: "#fff6e5",
  aqua: "#39e6d2",
  gold: "#ffd166",
  coral: "#ff8a5c",
};
const highlightedPlaces = [
  { label: "Philippines", ...manila, color: brandColors.gold, primary: true },
  { label: "Canada", ...montreal, color: brandColors.aqua, primary: true },
  { label: "Vancouver", lat: 49.2827, lon: -123.1207, color: brandColors.bits },
  { label: "Tokyo", lat: 35.6762, lon: 139.6503, color: brandColors.coral },
  { label: "London", lat: 51.5072, lon: -0.1276, color: "#7f7dff" },
];
const flightRouteAnchors = [
  manila,
  { lat: 13.7563, lon: 100.5018 },
  { lat: 28.6139, lon: 77.209 },
  { lat: 25.2048, lon: 55.2708 },
  { lat: 41.0082, lon: 28.9784 },
  { lat: 51.5072, lon: -0.1276 },
  { lat: 48.8566, lon: -23.5 },
  { lat: 45.5019, lon: -45.2 },
  montreal,
];
let flightRouteSegments = null;

const countryShapes = [
  {
    name: "Canada",
    fill: "rgba(26, 140, 255, 0.16)",
    stroke: "rgba(26, 140, 255, 0.42)",
    paths: [
      [
        [52, -141],
        [69, -134],
        [72, -102],
        [63, -65],
        [51, -53],
        [44, -62],
        [45, -82],
        [49, -95],
        [49, -123],
        [52, -141],
      ],
    ],
  },
  {
    name: "United States",
    fill: "rgba(255, 246, 229, 0.08)",
    stroke: "rgba(255, 246, 229, 0.2)",
    paths: [
      [
        [49, -124],
        [49, -67],
        [32, -80],
        [25, -97],
        [32, -117],
        [42, -124],
        [49, -124],
      ],
    ],
  },
  {
    name: "Philippines",
    fill: "rgba(255, 209, 102, 0.22)",
    stroke: "rgba(255, 209, 102, 0.72)",
    paths: [
      [
        [18.6, 120.2],
        [16.5, 122.4],
        [13.3, 122.1],
        [12.5, 120.3],
        [15.5, 119.5],
        [18.6, 120.2],
      ],
      [
        [12.3, 123.4],
        [10.6, 125.2],
        [8.8, 124.4],
        [10.2, 122.3],
        [12.3, 123.4],
      ],
      [
        [8.8, 125.4],
        [6.0, 126.2],
        [5.1, 124.0],
        [7.3, 122.9],
        [8.8, 125.4],
      ],
    ],
  },
  {
    name: "Japan",
    fill: "rgba(255, 119, 107, 0.12)",
    stroke: "rgba(255, 119, 107, 0.34)",
    paths: [
      [
        [45, 142],
        [39, 141],
        [35, 139],
        [32, 131],
        [34, 129],
        [38, 136],
        [43, 141],
        [45, 142],
      ],
    ],
  },
  {
    name: "China",
    fill: "rgba(255, 246, 229, 0.07)",
    stroke: "rgba(255, 246, 229, 0.18)",
    paths: [
      [
        [53, 123],
        [47, 134],
        [30, 122],
        [21, 110],
        [28, 96],
        [39, 75],
        [49, 88],
        [53, 123],
      ],
    ],
  },
  {
    name: "India",
    fill: "rgba(255, 246, 229, 0.07)",
    stroke: "rgba(255, 246, 229, 0.18)",
    paths: [
      [
        [32, 75],
        [27, 88],
        [20, 86],
        [8, 77],
        [19, 68],
        [29, 70],
        [32, 75],
      ],
    ],
  },
  {
    name: "Indonesia",
    fill: "rgba(255, 246, 229, 0.07)",
    stroke: "rgba(255, 246, 229, 0.18)",
    paths: [
      [
        [5, 95],
        [1, 107],
        [-3, 118],
        [-7, 132],
        [-4, 141],
        [2, 128],
        [4, 110],
        [5, 95],
      ],
    ],
  },
  {
    name: "Western Europe",
    fill: "rgba(255, 246, 229, 0.08)",
    stroke: "rgba(255, 246, 229, 0.2)",
    paths: [
      [
        [58, -8],
        [54, 10],
        [47, 16],
        [41, 12],
        [37, -5],
        [45, -9],
        [50, -5],
        [58, -8],
      ],
    ],
  },
  {
    name: "Australia",
    fill: "rgba(255, 246, 229, 0.07)",
    stroke: "rgba(255, 246, 229, 0.18)",
    paths: [
      [
        [-11, 113],
        [-16, 143],
        [-29, 154],
        [-39, 145],
        [-34, 116],
        [-22, 113],
        [-11, 113],
      ],
    ],
  },
];

let width = 0;
let height = 0;
let dpr = 1;
const duration = 42000;
const requestedChapter = new URLSearchParams(window.location.search).get("chapter");
const requestedChapterKey = requestedChapter?.toLowerCase().trim();
function chapterSearchValues(chapter) {
  return [
    chapter.year,
    chapter.kicker,
    chapter.title,
    chapter.timelineLabel,
    ...(chapter.aliases || []),
  ].map((value) => String(value).toLowerCase().trim());
}
const requestedChapterIndex = requestedChapter
  ? chapters.findIndex((chapter) => chapterSearchValues(chapter).includes(requestedChapterKey))
  : 0;
const requestedChapterFallbackIndex =
  requestedChapterIndex >= 0
    ? requestedChapterIndex
    : chapters.findIndex((chapter) =>
        chapterSearchValues(chapter).some((value) => value.includes(requestedChapterKey)),
      );
const initialChapterIndex = requestedChapterFallbackIndex >= 0 ? requestedChapterFallbackIndex : 0;
const initialChapterProgress = requestedChapter ? 0.5 : 0;
let startTime =
  performance.now() - ((initialChapterIndex + initialChapterProgress) / chapters.length) * duration;
let lastTime = startTime;
let pausedAt = 0;
let isPlaying = true;
let hasStopped = false;
let stars = [];
let currentIndex = 0;
let isShowingDataFinale = false;
let worldCountries = null;
let globeGraticule = null;
const pointer = {
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
  active: false,
};

async function loadWorldData() {
  try {
    const response = await fetch("vendor/countries-110m.json");
    const topology = await response.json();
    worldCountries = topojson.feature(topology, topology.objects.countries);
    globeGraticule = d3.geoGraticule10();
  } catch (error) {
    console.warn("World map data could not be loaded.", error);
  }
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = document.documentElement.clientWidth || window.innerWidth;
  height = window.innerHeight;
  if (!pointer.x && !pointer.y) {
    pointer.x = width * 0.5;
    pointer.y = height * 0.5;
    pointer.tx = pointer.x;
    pointer.ty = pointer.y;
  }
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createStars();
}

function createStars() {
  const count = Math.max(140, Math.min(360, Math.floor((width * height) / 3900)));
  stars = Array.from({ length: count }, () => {
    const layer = Math.random();
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.25 + layer * 1.55,
      alpha: 0.16 + layer * 0.5,
      vx: 0.035 + layer * 0.105,
      vy: 0.095 + layer * 0.255,
      twinkle: Math.random() * Math.PI * 2,
      layer,
    };
  });
}

function latLonToVector(lat, lon) {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;
  return {
    x: Math.cos(phi) * Math.sin(lambda),
    y: Math.sin(phi),
    z: Math.cos(phi) * Math.cos(lambda),
  };
}

function slerpVector(a, b, t) {
  const dot = clamp(a.x * b.x + a.y * b.y + a.z * b.z, -1, 1);
  const theta = Math.acos(dot);
  if (theta < 0.0001) return a;
  const sinTheta = Math.sin(theta);
  const wa = Math.sin((1 - t) * theta) / sinTheta;
  const wb = Math.sin(t * theta) / sinTheta;
  return {
    x: a.x * wa + b.x * wb,
    y: a.y * wa + b.y * wb,
    z: a.z * wa + b.z * wb,
  };
}

function vectorToLatLon(vector) {
  return {
    lat: (Math.asin(clamp(vector.y, -1, 1)) * 180) / Math.PI,
    lon: (Math.atan2(vector.x, vector.z) * 180) / Math.PI,
  };
}

function getFlightRouteSegments() {
  if (flightRouteSegments) return flightRouteSegments;

  const segments = [];
  let total = 0;
  for (let i = 0; i < flightRouteAnchors.length - 1; i += 1) {
    const from = flightRouteAnchors[i];
    const to = flightRouteAnchors[i + 1];
    const startVector = latLonToVector(from.lat, from.lon);
    const endVector = latLonToVector(to.lat, to.lon);
    const dot = clamp(
      startVector.x * endVector.x + startVector.y * endVector.y + startVector.z * endVector.z,
      -1,
      1,
    );
    const distance = Math.acos(dot);
    segments.push({ startVector, endVector, distance });
    total += distance;
  }

  flightRouteSegments = { segments, total };
  return flightRouteSegments;
}

function getFlightRouteSample(progress) {
  const route = getFlightRouteSegments();
  let target = clamp(progress, 0, 1) * route.total;

  for (const segment of route.segments) {
    if (target <= segment.distance || segment === route.segments[route.segments.length - 1]) {
      const localProgress = segment.distance > 0 ? target / segment.distance : 0;
      const vector = slerpVector(segment.startVector, segment.endVector, clamp(localProgress, 0, 1));
      return { vector, ...vectorToLatLon(vector) };
    }
    target -= segment.distance;
  }

  const finalVector = route.segments[route.segments.length - 1].endVector;
  return { vector: finalVector, ...vectorToLatLon(finalVector) };
}

function getFlightCameraRotation(routeProgress) {
  const sample = getFlightRouteSample(routeProgress);
  const geographicRotation = -(sample.lon * Math.PI) / 180;
  const atlanticReveal = Math.sin(clamp(routeProgress, 0, 1) * Math.PI) * 0.18;
  return geographicRotation + atlanticReveal;
}

function rotateVector(vector, rotation) {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  return {
    x: vector.x * cos + vector.z * sin,
    y: vector.y,
    z: -vector.x * sin + vector.z * cos,
  };
}

function project(vector, globe) {
  const scale = globe.radius * (0.9 + vector.z * 0.1);
  return {
    x: globe.x + vector.x * scale,
    y: globe.y - vector.y * scale,
    visible: vector.z > -0.24,
    depth: vector.z,
  };
}

function drawBackground(now) {
  pointer.x += (pointer.tx - pointer.x) * 0.045;
  pointer.y += (pointer.ty - pointer.y) * 0.045;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#081436");
  gradient.addColorStop(0.45, "#07142e");
  gradient.addColorStop(1, "#020817");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const parallaxX = (pointer.x / Math.max(1, width) - 0.5) * 22;
  const parallaxY = (pointer.y / Math.max(1, height) - 0.5) * 14;

  for (const star of stars) {
    star.x += star.vx;
    star.y += star.vy;
    if (star.y > height + 12) {
      star.y = -12;
      star.x = Math.random() * width;
    }
    if (star.x > width + 12) star.x = -12;

    const twinkle = 0.72 + Math.sin(now * 0.0015 + star.twinkle) * 0.28;
    const reactDx = star.x - pointer.x;
    const reactDy = star.y - pointer.y;
    const reactDistance = Math.hypot(reactDx, reactDy);
    const glow = pointer.active ? Math.max(0, 1 - reactDistance / 180) * 0.32 : 0;
    const x = star.x + parallaxX * star.layer;
    const y = star.y + parallaxY * star.layer;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 246, 229, ${Math.min(0.95, star.alpha * twinkle + glow)})`;
    ctx.arc(x, y, star.r + glow * 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGlobe(globe, rotation, routeProgress, now) {
  const globeGradient = ctx.createRadialGradient(
    globe.x - globe.radius * 0.34,
    globe.y - globe.radius * 0.32,
    globe.radius * 0.1,
    globe.x,
    globe.y,
    globe.radius * 1.18,
  );
  globeGradient.addColorStop(0, "rgba(255, 246, 229, 0.3)");
  globeGradient.addColorStop(0.28, "rgba(26, 140, 255, 0.28)");
  globeGradient.addColorStop(0.62, "rgba(57, 230, 210, 0.13)");
  globeGradient.addColorStop(1, "rgba(5, 15, 42, 0.78)");

  ctx.save();
  ctx.beginPath();
  ctx.arc(globe.x, globe.y, globe.radius, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = globeGradient;
  ctx.fillRect(globe.x - globe.radius, globe.y - globe.radius, globe.radius * 2, globe.radius * 2);

  drawFluidBands(globe, now);
  drawAccurateWorld(globe, rotation);
  drawLandSuggestion(globe, rotation, now);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(globe.x, globe.y, globe.radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 246, 229, 0.2)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(globe.x, globe.y, globe.radius * 1.06, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(26, 140, 255, 0.18)";
  ctx.lineWidth = 8;
  ctx.stroke();

  drawRoute(globe, rotation, routeProgress);
  drawPlaces(globe, rotation);
}

function drawAccurateWorld(globe, rotation) {
  if (!worldCountries || !window.d3) {
    drawGrid(globe, rotation);
    drawCountryLayer(globe, rotation);
    return;
  }

  const projection = d3
    .geoOrthographic()
    .translate([globe.x, globe.y])
    .scale(globe.radius)
    .rotate([(rotation * 180) / Math.PI, 0])
    .clipAngle(90)
    .precision(0.8);
  const path = d3.geoPath(projection, ctx);

  if (globeGraticule) {
    ctx.beginPath();
    path(globeGraticule);
    ctx.strokeStyle = "rgba(255, 246, 229, 0.12)";
    ctx.lineWidth = 0.75;
    ctx.stroke();
  }

  for (const feature of worldCountries.features) {
    const id = String(feature.id).padStart(3, "0");
    const isPhilippines = id === "608";
    const isCanada = id === "124";
    const isAnchor = isPhilippines || isCanada;

    ctx.beginPath();
    path(feature);
    ctx.fillStyle = isPhilippines
      ? "rgba(255, 209, 102, 0.36)"
      : isCanada
        ? "rgba(26, 140, 255, 0.34)"
        : "rgba(255, 246, 229, 0.082)";
    ctx.strokeStyle = isAnchor ? "rgba(255, 246, 229, 0.78)" : "rgba(255, 246, 229, 0.17)";
    ctx.lineWidth = isAnchor ? 1.2 : 0.45;
    ctx.fill();
    ctx.stroke();
  }
}

function drawGrid(globe, rotation) {
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = "rgba(255, 246, 229, 0.14)";

  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.beginPath();
    let started = false;
    for (let lon = -180; lon <= 180; lon += 4) {
      const point = project(rotateVector(latLonToVector(lat, lon), rotation), globe);
      if (!point.visible) {
        started = false;
        continue;
      }
      if (!started) {
        ctx.moveTo(point.x, point.y);
        started = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.stroke();
  }

  for (let lon = -150; lon <= 180; lon += 30) {
    ctx.beginPath();
    let started = false;
    for (let lat = -78; lat <= 78; lat += 3) {
      const point = project(rotateVector(latLonToVector(lat, lon), rotation), globe);
      if (!point.visible) {
        started = false;
        continue;
      }
      if (!started) {
        ctx.moveTo(point.x, point.y);
        started = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.stroke();
  }
}

function drawFluidBands(globe, now) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 4; i += 1) {
    const offset = i * 0.22 + now * 0.00004;
    const y = globe.y - globe.radius * 0.45 + i * globe.radius * 0.28;
    ctx.beginPath();
    ctx.lineWidth = 1.8;
      ctx.strokeStyle = `rgba(${i % 2 ? "57, 230, 210" : "26, 140, 255"}, 0.09)`;
    ctx.moveTo(globe.x - globe.radius * 0.88, y);
    ctx.bezierCurveTo(
      globe.x - globe.radius * 0.42,
      y + Math.sin(offset) * globe.radius * 0.12,
      globe.x + globe.radius * 0.24,
      y - Math.cos(offset) * globe.radius * 0.12,
      globe.x + globe.radius * 0.9,
      y + Math.sin(offset + 1.2) * globe.radius * 0.08,
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawCountryLayer(globe, rotation) {
  for (const country of countryShapes) {
    for (const path of country.paths) {
      const projected = path.map(([lat, lon]) => project(rotateVector(latLonToVector(lat, lon), rotation), globe));
      const visible = projected.filter((point) => point.visible).length;
      if (visible < Math.max(3, projected.length * 0.45)) continue;

      ctx.beginPath();
      projected.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
      ctx.fillStyle = country.fill;
      ctx.strokeStyle = country.stroke;
      ctx.lineWidth = country.name === "Canada" || country.name === "Philippines" ? 1.45 : 0.85;
      ctx.fill();
      ctx.stroke();
    }
  }
}

function drawLandSuggestion(globe, rotation, now) {
  const clusters = [
    { lat: 13, lon: 122, size: 0.7 },
    { lat: 36, lon: 138, size: 1.6 },
    { lat: 33, lon: 78, size: 2.2 },
    { lat: 50, lon: 12, size: 2.4 },
    { lat: 47, lon: -95, size: 2.7 },
    { lat: 7, lon: 99, size: 1.4 },
  ];

  for (const cluster of clusters) {
    const base = project(rotateVector(latLonToVector(cluster.lat, cluster.lon), rotation), globe);
    if (!base.visible) continue;
    const count = Math.round(18 * cluster.size);
    for (let i = 0; i < count; i += 1) {
      const angle = i * 2.399 + now * 0.00003;
      const radius = Math.sqrt(i) * cluster.size * 2.7;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 246, 229, ${0.035 + base.depth * 0.045})`;
      ctx.arc(base.x + Math.cos(angle) * radius, base.y + Math.sin(angle) * radius * 0.55, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawRoute(globe, rotation, routeProgress) {
  const steps = 130;
  const visibleSteps = Math.floor(steps * routeProgress);
  const routePoints = [];

  for (let i = 0; i <= visibleSteps; i += 1) {
    const t = i / steps;
    const arc = getFlightRouteSample(t).vector;
    const lifted = {
      x: arc.x * (1 + Math.sin(t * Math.PI) * 0.055),
      y: arc.y * (1 + Math.sin(t * Math.PI) * 0.055),
      z: arc.z * (1 + Math.sin(t * Math.PI) * 0.055),
    };
    const point = project(rotateVector(lifted, rotation), globe);
    routePoints.push(point);
  }

  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 209, 102, 0.92)";
  ctx.shadowColor = "rgba(255, 209, 102, 0.62)";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  let started = false;
  for (const point of routePoints) {
    if (!point.visible) {
      started = false;
      continue;
    }
    if (!started) {
      ctx.moveTo(point.x, point.y);
      started = true;
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  if (routeProgress > 0.08) {
    const planeT = clamp(routeProgress, 0, 1);
    const planeVector = getFlightRouteSample(planeT).vector;
    const nextVector = getFlightRouteSample(clamp(planeT + 0.008, 0, 1)).vector;
    const lift = 1 + Math.sin(planeT * Math.PI) * 0.055;
    const plane = project(rotateVector({ x: planeVector.x * lift, y: planeVector.y * lift, z: planeVector.z * lift }, rotation), globe);
    const next = project(rotateVector({ x: nextVector.x * lift, y: nextVector.y * lift, z: nextVector.z * lift }, rotation), globe);
    if (plane.visible) drawPlane(plane, next, planeT);
  }
}

function drawPlane(point, next, progressOnRoute) {
  const angle = Math.atan2(next.y - point.y, next.x - point.x);
  const isLeftbound = Math.cos(angle) < 0;
  const visualTopAngle = isLeftbound ? angle + Math.PI / 2 : angle - Math.PI / 2;
  const scale = clamp(width / 1280, 0.78, 1.12);
  const bodyLength = 92 * scale;
  const bodyHeight = 17 * scale;
  const wingSpan = 46 * scale;
  const faceRadius = 30 * scale;
  const bob = Math.sin(progressOnRoute * Math.PI * 9) * 1.6 * scale;
  const normalX = Math.cos(visualTopAngle);
  const normalY = Math.sin(visualTopAngle);
  const faceX = point.x + normalX * (45 * scale);
  const faceY = point.y + normalY * (45 * scale) + bob;

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.rotate(isLeftbound ? angle + Math.PI : angle);
  if (isLeftbound) ctx.scale(-1, 1);

  ctx.shadowColor = "rgba(255, 255, 255, 0.24)";
  ctx.shadowBlur = 14 * scale;

  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.1, bodyHeight * 0.12);
  ctx.lineTo(-bodyLength * 0.28, wingSpan * 0.68);
  ctx.quadraticCurveTo(bodyLength * 0.01, wingSpan * 0.52, bodyLength * 0.28, bodyHeight * 0.34);
  ctx.lineTo(bodyLength * 0.12, bodyHeight * 0.08);
  ctx.closePath();
  ctx.fillStyle = "rgba(217, 224, 233, 0.94)";
  ctx.strokeStyle = "rgba(19, 22, 29, 0.48)";
  ctx.lineWidth = 0.9 * scale;
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(bodyLength * 0.02, bodyHeight * 0.82, bodyHeight * 0.5, bodyHeight * 0.24, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#151820";
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(bodyLength * 0.02, bodyHeight * 0.8, bodyHeight * 0.3, bodyHeight * 0.12, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#f8fafc";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.51, -bodyHeight * 0.18);
  ctx.lineTo(-bodyLength * 0.62, -bodyHeight * 2.0);
  ctx.quadraticCurveTo(-bodyLength * 0.42, -bodyHeight * 1.66, -bodyLength * 0.28, -bodyHeight * 0.44);
  ctx.closePath();
  ctx.fillStyle = "#101217";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.49, bodyHeight * 0.18);
  ctx.lineTo(-bodyLength * 0.68, bodyHeight * 0.94);
  ctx.lineTo(-bodyLength * 0.41, bodyHeight * 0.45);
  ctx.closePath();
  ctx.fillStyle = "#11141b";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.44, -bodyHeight * 0.1);
  ctx.lineTo(-bodyLength * 0.08, -wingSpan * 0.72);
  ctx.quadraticCurveTo(bodyLength * 0.11, -wingSpan * 0.6, bodyLength * 0.34, -bodyHeight * 0.26);
  ctx.lineTo(bodyLength * 0.2, -bodyHeight * 0.02);
  ctx.closePath();
  ctx.fillStyle = "rgba(245, 247, 251, 0.98)";
  ctx.strokeStyle = "rgba(20, 24, 31, 0.5)";
  ctx.lineWidth = 0.9 * scale;
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 8 * scale;
  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.58, 0);
  ctx.bezierCurveTo(-bodyLength * 0.5, -bodyHeight * 0.54, bodyLength * 0.24, -bodyHeight * 0.66, bodyLength * 0.5, -bodyHeight * 0.24);
  ctx.quadraticCurveTo(bodyLength * 0.65, 0, bodyLength * 0.5, bodyHeight * 0.24);
  ctx.bezierCurveTo(bodyLength * 0.22, bodyHeight * 0.64, -bodyLength * 0.48, bodyHeight * 0.52, -bodyLength * 0.58, 0);
  ctx.closePath();
  ctx.fillStyle = "#f9fafc";
  ctx.fill();
  ctx.strokeStyle = "rgba(15, 18, 24, 0.76)";
  ctx.lineWidth = 1.05 * scale;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.55, bodyHeight * 0.16);
  ctx.bezierCurveTo(-bodyLength * 0.24, bodyHeight * 0.42, bodyLength * 0.25, bodyHeight * 0.38, bodyLength * 0.52, bodyHeight * 0.08);
  ctx.lineTo(bodyLength * 0.51, bodyHeight * 0.3);
  ctx.bezierCurveTo(bodyLength * 0.18, bodyHeight * 0.62, -bodyLength * 0.38, bodyHeight * 0.56, -bodyLength * 0.55, bodyHeight * 0.16);
  ctx.closePath();
  ctx.fillStyle = "rgba(15, 17, 22, 0.9)";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(bodyLength * 0.46, -bodyHeight * 0.1, bodyHeight * 0.24, bodyHeight * 0.15, 0.05, 0, Math.PI * 2);
  ctx.fillStyle = "#101217";
  ctx.fill();

  ctx.fillStyle = "rgba(13, 17, 24, 0.82)";
  for (let i = 0; i < 8; i += 1) {
    ctx.beginPath();
    ctx.arc(-bodyLength * 0.28 + i * 7.7 * scale, -bodyHeight * 0.16, 1.25 * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(bodyLength * 0.34, -bodyHeight * 0.34);
  ctx.quadraticCurveTo(bodyLength * 0.5, -bodyHeight * 0.38, bodyLength * 0.57, -bodyHeight * 0.12);
  ctx.lineTo(bodyLength * 0.45, bodyHeight * 0.02);
  ctx.quadraticCurveTo(bodyLength * 0.38, -bodyHeight * 0.1, bodyLength * 0.34, -bodyHeight * 0.34);
  ctx.closePath();
  ctx.fillStyle = "#101217";
  ctx.fill();

  ctx.save();
  ctx.translate(-bodyLength * 0.49, -bodyHeight * 1.12);
  ctx.beginPath();
  ctx.arc(0, 0, 4.9 * scale, 0, Math.PI * 2);
  ctx.fillStyle = "#df1f2d";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, 2.6 * scale, 0, Math.PI * 2);
  ctx.fillStyle = "#111318";
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, -2.4 * scale);
  ctx.lineTo(0.8 * scale, -0.7 * scale);
  ctx.lineTo(2.4 * scale, -0.7 * scale);
  ctx.lineTo(1 * scale, 0.35 * scale);
  ctx.lineTo(1.6 * scale, 2.2 * scale);
  ctx.lineTo(0, 1.1 * scale);
  ctx.lineTo(-1.6 * scale, 2.2 * scale);
  ctx.lineTo(-1 * scale, 0.35 * scale);
  ctx.lineTo(-2.4 * scale, -0.7 * scale);
  ctx.lineTo(-0.8 * scale, -0.7 * scale);
  ctx.closePath();
  ctx.fillStyle = "#df1f2d";
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(-bodyLength * 0.18, bodyHeight * 0.48);
  ctx.lineTo(bodyLength * 0.34, bodyHeight * 0.48);
  ctx.strokeStyle = "rgba(223, 31, 45, 0.82)";
  ctx.lineWidth = 1 * scale;
  ctx.stroke();

  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255, 250, 240, 0.52)";
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(point.x + normalX * 8 * scale, point.y + normalY * 8 * scale);
  ctx.lineTo(faceX - normalX * (faceRadius * 0.82), faceY - normalY * (faceRadius * 0.82));
  ctx.stroke();
  ctx.restore();

  drawPassengerFace(faceX, faceY, faceRadius);
}

function roundedRectPath(x, y, rectWidth, rectHeight, radius) {
  const r = Math.min(radius, rectWidth / 2, rectHeight / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + rectWidth - r, y);
  ctx.quadraticCurveTo(x + rectWidth, y, x + rectWidth, y + r);
  ctx.lineTo(x + rectWidth, y + rectHeight - r);
  ctx.quadraticCurveTo(x + rectWidth, y + rectHeight, x + rectWidth - r, y + rectHeight);
  ctx.lineTo(x + r, y + rectHeight);
  ctx.quadraticCurveTo(x, y + rectHeight, x, y + rectHeight - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function drawPassengerFace(x, y, radius) {
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
  ctx.fillStyle = "#fffaf0";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(26, 140, 255, 0.82)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.clip();

  if (profileImage.complete && profileImage.naturalWidth > 0) {
    const size = radius * 2;
    const sourceSize = Math.min(profileImage.naturalWidth, profileImage.naturalHeight) * 0.45;
    const sourceX = profileImage.naturalWidth * 0.53 - sourceSize / 2;
    const sourceY = profileImage.naturalHeight * 0.205;
    ctx.drawImage(profileImage, sourceX, sourceY, sourceSize, sourceSize, x - radius, y - radius, size, size);
  } else {
    const gradient = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
    gradient.addColorStop(0, "#1a8cff");
    gradient.addColorStop(1, "#39e6d2");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.fillStyle = "#fff6e5";
    ctx.font = `700 ${radius}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("S", x, y);
  }

  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius + 4.5, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 250, 240, 0.92)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, radius + 7.5, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(26, 140, 255, 0.32)";
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.restore();
}

function drawPlaces(globe, rotation) {
  for (const place of highlightedPlaces) {
    const point = project(rotateVector(latLonToVector(place.lat, place.lon), rotation), globe);
    if (!point.visible) continue;
    ctx.beginPath();
    ctx.fillStyle = place.color;
    ctx.shadowColor = place.color;
    ctx.shadowBlur = 12;
    ctx.arc(point.x, point.y, place.primary ? 4.4 : 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    if (place.primary) {
      ctx.font = "600 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.fillStyle = "rgba(255, 246, 229, 0.82)";
      ctx.fillText(place.label, point.x + 9, point.y - 8);
    }
  }
}

function drawTimelineRibbon(progress, chapterProgress) {
  const left = width * 0.06;
  const right = width * 0.58;
  const y = height * 0.5 + Math.sin(progress * Math.PI * 2) * 18;
  const lineWidth = Math.max(2, width * 0.003);

  ctx.save();
  ctx.globalAlpha = width > 780 ? 0.42 : 0.18;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "rgba(255, 246, 229, 0.18)";
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.bezierCurveTo(width * 0.22, y - 180, width * 0.42, y + 120, right, y - 60);
  ctx.stroke();

  ctx.strokeStyle = "rgba(26, 140, 255, 0.62)";
  ctx.shadowColor = "rgba(26, 140, 255, 0.34)";
  ctx.shadowBlur = 22;
  ctx.beginPath();
  ctx.moveTo(left, y);
  const end = lerp(left, right, chapterProgress);
  ctx.bezierCurveTo(width * 0.22, y - 180, width * 0.42, y + 120, end, y - 60);
  ctx.stroke();
  ctx.restore();
}

function render(now) {
  if (isPlaying) lastTime = now;
  const elapsed = isPlaying ? clamp(now - startTime, 0, duration) : pausedAt;
  const progress = elapsed / duration;
  const rawChapter = progress * chapters.length;
  const chapterIndex = clamp(Math.floor(rawChapter), 0, chapters.length - 1);
  const chapterProgress = easeInOutCubic(clamp(rawChapter - chapterIndex, 0, 1));
  const chapter = chapters[chapterIndex];
  const flightChapterIndex = chapters.findIndex((item) => item.isFlightStart);
  const flightStartProgress = flightChapterIndex / chapters.length;
  const flightEndProgress = (flightChapterIndex + 2) / chapters.length;
  const routeProgress = easeInOutCubic(
    clamp((progress - flightStartProgress) / (flightEndProgress - flightStartProgress), 0, 1),
  );

  if (chapterIndex !== currentIndex) {
    currentIndex = chapterIndex;
    updateContent(chapterIndex);
  }
  updateTimeline(progress, chapterIndex);
  updateTimer(elapsed);

  drawBackground(now);
  const compact = width < 840;
  const globe = {
    x: compact ? width * 0.52 : width * 0.77,
    y: compact ? height * 0.6 : height * 0.46,
    radius: Math.min(width, height) * (compact ? 0.34 : 0.38),
  };
  const preFlightProgress = easeInOutCubic(clamp(progress / Math.max(flightStartProgress, 0.001), 0, 1));
  const philippinesCenterRotation = -2.16;
  const preFlightRotation = lerp(-3.55, philippinesCenterRotation, preFlightProgress);
  const flightCamera = getFlightCameraRotation(easeInOutCubic(routeProgress));
  const focusRotation = routeProgress > 0 ? flightCamera : preFlightRotation;
  const ambientRotation = routeProgress > 0 ? Math.sin(now * 0.00014) * 0.035 : 0;
  drawTimelineRibbon(progress, chapterProgress);
  drawGlobe(globe, focusRotation + ambientRotation, routeProgress, now);

  if (isPlaying && elapsed >= duration) {
    pausedAt = duration;
    isPlaying = false;
    hasStopped = true;
    playToggle.textContent = "Restart";
    playToggle.setAttribute("aria-label", "Restart timeline");
  }

  requestAnimationFrame(render);
}

function updateContent(index) {
  const chapter = chapters[index];
  const shouldShowDataFinale = Boolean(chapter.isDataFinale);
  const shouldAnimateHeroTitle = shouldShowDataFinale !== isShowingDataFinale;
  if (chapterKicker) chapterKicker.textContent = chapter.kicker;
  chapterTitle.textContent = chapter.title;
  if (chapterCopy) chapterCopy.textContent = chapter.copy;
  if (shouldShowDataFinale) {
    storyPanel.classList.add("is-data-finale");
    if (shouldAnimateHeroTitle) {
      heroTitle.innerHTML = dataHeroTitle;
      headlineDetail.innerHTML = dataHeadlineItems
        .map(([letter, text], itemIndex) => `<span style="--line-index: ${itemIndex}"><strong>${letter}</strong><em>${text}</em></span>`)
        .join("");
      headlineDetail.removeAttribute("aria-hidden");
    }
  } else {
    storyPanel.classList.remove("is-data-finale");
    if (shouldAnimateHeroTitle) {
      heroTitle.innerHTML = defaultHeroTitle;
      headlineDetail.innerHTML = "";
      headlineDetail.setAttribute("aria-hidden", "true");
    }
  }
  if (shouldAnimateHeroTitle) {
    storyPanel.classList.remove("is-title-revealing");
    void storyPanel.offsetWidth;
    storyPanel.classList.add("is-title-revealing");
    isShowingDataFinale = shouldShowDataFinale;
  }
  if (chapterFrom) chapterFrom.textContent = chapter.from;
  if (chapterTo) chapterTo.textContent = chapter.to;
  if (currentYear) currentYear.textContent = chapter.year;
  if (progressLabel) progressLabel.textContent = `Chapter ${index + 1} of ${chapters.length}`;
  document.querySelectorAll(".timeline-node").forEach((node, nodeIndex) => {
    node.classList.toggle("is-active", nodeIndex === index);
  });
}

function updateTimeline(progress, chapterIndex) {
  timelineProgress.style.transform = `scaleX(${clamp(progress, 0, 1)})`;
  document.querySelectorAll(".timeline-node").forEach((node, nodeIndex) => {
    node.classList.toggle("is-active", nodeIndex === chapterIndex);
  });
}

function formatTime(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateTimer(elapsed) {
  const remaining = duration - elapsed;
  timerDisplay.textContent = `${formatTime(remaining)} left`;
}

function playTimeline() {
  if (pausedAt >= duration) {
    restartTimeline();
    return;
  }
  isPlaying = true;
  hasStopped = false;
  startTime = performance.now() - pausedAt;
  playToggle.textContent = "Pause";
  playToggle.setAttribute("aria-label", "Pause timeline");
}

function pauseTimeline() {
  pausedAt = clamp(performance.now() - startTime, 0, duration);
  isPlaying = false;
  playToggle.textContent = "Play";
  playToggle.setAttribute("aria-label", "Play timeline");
}

function restartTimeline() {
  pausedAt = 0;
  startTime = performance.now();
  isPlaying = true;
  hasStopped = false;
  currentIndex = -1;
  playToggle.textContent = "Pause";
  playToggle.setAttribute("aria-label", "Pause timeline");
}

function stopTimeline() {
  pausedAt = 0;
  isPlaying = false;
  hasStopped = true;
  currentIndex = -1;
  updateContent(0);
  updateTimeline(0, 0);
  updateTimer(0);
  playToggle.textContent = "Play";
  playToggle.setAttribute("aria-label", "Play timeline");
}

function jumpToChapter(index) {
  const targetIndex = clamp(index, 0, chapters.length - 1);
  pausedAt = (targetIndex / chapters.length) * duration;
  startTime = performance.now() - pausedAt;
  isPlaying = true;
  hasStopped = false;
  currentIndex = -1;
  updateContent(targetIndex);
  updateTimeline(targetIndex / chapters.length, targetIndex);
  updateTimer(pausedAt);
  playToggle.textContent = "Pause";
  playToggle.setAttribute("aria-label", "Pause timeline");
}

function buildTimeline() {
  timelineNodes.style.setProperty("--timeline-count", chapters.length);
  timelineNodes.innerHTML = chapters
    .map(
      (chapter, index) => `
        <button
          class="timeline-node${index === 0 ? " is-active" : ""}"
          type="button"
          data-chapter-index="${index}"
          aria-label="Jump to ${chapter.timelineLabel}"
        >
          <strong>${chapter.timelineLabel}</strong>
        </button>
      `,
    )
    .join("");
}

playToggle.addEventListener("click", () => {
  if (isPlaying) pauseTimeline();
  else {
    if (hasStopped) pausedAt = 0;
    playTimeline();
  }
});

restartButton.addEventListener("click", restartTimeline);
stopButton.addEventListener("click", stopTimeline);
timelineNodes.addEventListener("click", (event) => {
  const node = event.target.closest(".timeline-node");
  if (!node) return;
  jumpToChapter(Number(node.dataset.chapterIndex));
});

window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  pointer.tx = event.clientX;
  pointer.ty = event.clientY;
  pointer.active = true;
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

buildTimeline();
resize();
updateContent(0);
loadWorldData();
requestAnimationFrame(render);
