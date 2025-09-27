const characterData = {
  "Dan Heng • Imbibitor Lunae": {
    path: "Destruction",
    description: "Focus on stacking attack and crit while weaving skill-enhanced basic attacks for massive Imaginary damage."
  },
  Kafka: {
    path: "Nihility",
    description: "Trigger damage-over-time effects frequently. Prioritize ATK%, Lightning DMG, and Effect Hit Rate on relic pieces."
  },
  Seele: {
    path: "Hunt",
    description: "Stack crit and speed for successive turns. Quantum DMG Sphere and ATK% Rope shine for her assassin playstyle."
  },
  Bronya: {
    path: "Harmony",
    description: "Keep allies buffed with high speed and energy regeneration. SPD boots and Energy Rope help loop her turn order."
  },
  Jingliu: {
    path: "Destruction",
    description: "Alternate between Spectral Transmigration states while maintaining crit and ATK to maximize HP drain conversions."
  },
  Clara: {
    path: "Destruction",
    description: "Build for defense and aggro. DEF% and Physical DMG with taunt-focused cone keep Svarog countering."
  },
  "Ruan Mei": {
    path: "Harmony",
    description: "Boost Break Effect and team speed to supercharge weakness breaks. Effect RES keeps her safe on the field."
  },
  "Trailblazer (Fire)": {
    path: "Preservation",
    description: "Layer shields by investing in DEF% and Fire DMG while balancing aggro control for consistent taunts."
  },
  "Trailblazer (Imaginary)": {
    path: "Harmony",
    description: "Support allies with buffs and break damage. Look for SPD boots and Break Effect main stats."
  }
};

const relicData = {
  "Firesmith of Lava-Forging": "Boosts Fire DMG and amplifies skill usage for offensive Fire characters.",
  "Genius of Brilliant Stars": "Quantum DMG set that pierces DEF—perfect for Seele-style burst damage.",
  "Eagle of Twilight Line": "Wind DMG and forward-advance set ideal for speedy, skill-spamming units.",
  "Longevous Disciple": "Enhances HP and crit when taking hits, enabling bruiser-style sustain builds.",
  "The Ashblazing Grand Duke": "Summons follow-up DMG multipliers and ATK boosts for layered offense.",
  "Musketeer of Wild Wheat": "Flexible ATK and SPD boosts that work on almost any main DPS."
};

const planarData = {
  "Rutilant Arena": "Increases Crit Rate and Basic ATK DMG for consistent DPS.",
  "Space Sealing Station": "Offers ATK and extra scaling at higher SPD thresholds—great for fast carries.",
  "Broken Keel": "DEF and teamwide Crit DMG buff when maintaining high Effect RES.",
  "Inert Salsotto": "Crit buffs with follow-up and Ult DMG boosts for trigger-happy kits.",
  "Sprightly Vonwacq": "Massive SPD increase at battle start for quick utility setups."
};

const lightConeData = {
  "In the Night": "Raises Crit and boosts speed-scaling DMG for agile hunters like Seele.",
  "Patience Is All You Need": "Stacking ATK boosts and DoT amplification for Nihility experts.",
  "Moment of Victory": "DEF-focused sustain cone perfect for Preservation tanks.",
  "Night on the Milky Way": "Stacks ATK on enemies hit while improving Break Effect—great for Erudition.",
  "Before Dawn": "Ultimate and follow-up DMG buffs shine on bursty Erudition units.",
  "On the Fall of an Aeon": "F2P friendly ATK scaling cone triggered by weakness breaks.",
  "Texture of Memories": "Imaginary DMG and defensive utility for sustain-based Preservation units."
};

let buildSources = {
  characters: {},
  relics: {},
  planars: {},
  lightCones: {},
};

function updateCharacterDetails(value) {
  const details = characterData[value];
  const tagElements = document.querySelectorAll(".tag");
  tagElements.forEach((tag) => tag.classList.remove("active"));

  const pathTag = Array.from(tagElements).find((tag) => tag.textContent === details?.path);
  if (pathTag) {
    pathTag.classList.add("active");
  }

  const description = document.getElementById("character-description");
  if (description) {
    description.textContent = details
      ? `${value} follows the Path of ${details.path}. ${details.description}`
      : "";
  }
}

function updateRelicDetails(value, type) {
  const element = document.getElementById(type === "planar" ? "planar-description" : "relic-description");
  const data = type === "planar" ? planarData : relicData;
  if (element) {
    element.textContent = value ? data[value] ?? "" : "";
  }
}

function updateLightConeDetails(value) {
  const description = document.getElementById("lightcone-description");
  if (description) {
    description.textContent = value ? lightConeData[value] ?? "" : "";
  }
}

function attachListeners() {
  const characterSelect = document.getElementById("character");
  const relicSelect = document.getElementById("relic-set");
  const planarSelect = document.getElementById("planar");
  const lightConeSelect = document.getElementById("light-cone");
  const generateButton = document.getElementById("generate-button");

  if (characterSelect) {
    characterSelect.addEventListener("change", (event) => updateCharacterDetails(event.target.value));
  }
  if (relicSelect) {
    relicSelect.addEventListener("change", (event) => updateRelicDetails(event.target.value, "relic"));
  }
  if (planarSelect) {
    planarSelect.addEventListener("change", (event) => updateRelicDetails(event.target.value, "planar"));
  }
  if (lightConeSelect) {
    lightConeSelect.addEventListener("change", (event) => updateLightConeDetails(event.target.value));
  }
  if (generateButton) {
    generateButton.addEventListener("click", () => {
      const character = characterSelect?.value;
      const relic = relicSelect?.value;
      const planar = planarSelect?.value;
      const lightCone = lightConeSelect?.value;
      const notes = document.getElementById("notes")?.value.trim();

      displaySummary({ character, relic, planar, lightCone, notes });
    });
  }
}

async function loadBuildSources() {
  try {
    const response = await fetch("data/build-sources.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch build sources: ${response.status}`);
    }
    const data = await response.json();
    buildSources = {
      characters: data.characters ?? {},
      relics: data.relics ?? {},
      planars: data.planars ?? {},
      lightCones: data.lightCones ?? {},
    };
  } catch (error) {
    console.error("Unable to load build sources.", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadBuildSources();
  attachListeners();
});

const buildRecommendations = {
  "Dan Heng • Imbibitor Lunae": {
    bestRelics: ["Eagle of Twilight Line", "The Ashblazing Grand Duke"],
    bestPlanars: ["Rutilant Arena", "Space Sealing Station"],
    bestLightCones: ["In the Night", "On the Fall of an Aeon"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/7/7a/Character_Dan_Heng_Imbibitor_Lunae_Splash_Art.png",
      alt: "Dan Heng • Imbibitor Lunae readying a strike",
    },
  },
  Kafka: {
    bestRelics: ["The Ashblazing Grand Duke", "Musketeer of Wild Wheat"],
    bestPlanars: ["Space Sealing Station", "Broken Keel"],
    bestLightCones: ["Patience Is All You Need"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/25/Character_Kafka_Splash_Art.png",
      alt: "Kafka surrounded by crackling purple lightning",
    },
  },
  Seele: {
    bestRelics: ["Genius of Brilliant Stars", "Musketeer of Wild Wheat"],
    bestPlanars: ["Rutilant Arena", "Inert Salsotto"],
    bestLightCones: ["In the Night"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/89/Character_Seele_Splash_Art.png",
      alt: "Seele striking with her scythe amid blue particles",
    },
  },
  Bronya: {
    bestRelics: ["Eagle of Twilight Line", "Musketeer of Wild Wheat"],
    bestPlanars: ["Sprightly Vonwacq", "Broken Keel"],
    bestLightCones: ["Moment of Victory"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/a/ad/Character_Bronya_Splash_Art.png",
      alt: "Bronya raising her lance with flowing cape",
    },
  },
  Jingliu: {
    bestRelics: ["Genius of Brilliant Stars", "The Ashblazing Grand Duke"],
    bestPlanars: ["Rutilant Arena", "Inert Salsotto"],
    bestLightCones: ["Before Dawn"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/3/3f/Character_Jingliu_Splash_Art.png",
      alt: "Jingliu poised with her icy blade",
    },
  },
  Clara: {
    bestRelics: ["Longevous Disciple", "Musketeer of Wild Wheat"],
    bestPlanars: ["Belobog of the Architects", "Inert Salsotto"],
    bestLightCones: ["Moment of Victory", "Texture of Memories"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/d/db/Character_Clara_Splash_Art.png",
      alt: "Clara standing beside Svarog",
    },
  },
  "Ruan Mei": {
    bestRelics: ["Musketeer of Wild Wheat", "Longevous Disciple"],
    bestPlanars: ["Sprightly Vonwacq", "Broken Keel"],
    bestLightCones: ["Before Dawn"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/8f/Character_Ruan_Mei_Splash_Art.png",
      alt: "Ruan Mei smiling with holographic butterflies",
    },
  },
  "Trailblazer (Fire)": {
    bestRelics: ["Longevous Disciple", "Musketeer of Wild Wheat"],
    bestPlanars: ["Belobog of the Architects", "Broken Keel"],
    bestLightCones: ["Moment of Victory", "Texture of Memories"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/86/Character_Trailblazer_%28Fire%29_Splash_Art.png",
      alt: "Fire Trailblazer shielding with blazing sword",
    },
  },
  "Trailblazer (Imaginary)": {
    bestRelics: ["Musketeer of Wild Wheat", "Eagle of Twilight Line"],
    bestPlanars: ["Sprightly Vonwacq", "Broken Keel"],
    bestLightCones: ["On the Fall of an Aeon", "Before Dawn"],
    image: {
      src: "https://static.wikia.nocookie.net/houkai-star-rail/images/8/82/Character_Trailblazer_%28Imaginary%29_Splash_Art.png",
      alt: "Imaginary Trailblazer channeling golden energy",
    },
  },
};

const fallbackImage = {
  src: "https://static.wikia.nocookie.net/houkai-star-rail/images/2/21/Icon_Character_Default.png",
  alt: "Placeholder silhouette of a character",
};


function displaySummary({ character, relic, planar, lightCone, notes }) {
  const summarySection = document.getElementById("build-summary");
  const summaryText = document.getElementById("summary-text");
  const optimalityText = document.getElementById("optimality-text");
  const summaryImage = document.getElementById("summary-image");
  const summaryCaption = document.getElementById("summary-caption");
  const summarySources = document.getElementById("summary-sources");
  const summarySourcesList = summarySources?.querySelector("ul");

  if (!summarySection || !summaryText || !optimalityText || !summaryImage || !summaryCaption) {
    return;
  }

  if (summarySourcesList) {
    summarySourcesList.innerHTML = "";
  }
  if (summarySources) {
    summarySources.hidden = true;
  }

  const hasAllSelections = character && relic && planar && lightCone;

  if (!hasAllSelections) {
    summarySection.hidden = false;
    summaryText.textContent = "Please complete every selection to generate a full build summary.";
    optimalityText.textContent = "";
    summaryImage.src = fallbackImage.src;
    summaryImage.alt = fallbackImage.alt;
    summaryCaption.textContent = "Awaiting your complete build selections.";
    return;
  }

  const recommendation = buildRecommendations[character] ?? {};
  const evaluation = evaluateBuild({ recommendation, relic, planar, lightCone });

  const description = characterData[character]?.description ?? "";
  const summaryParts = [
    `${character} build overview: ${description}`,
    `Relic Set: ${relic}. ${relicData[relic] ?? ""}`,
    `Planar Ornament: ${planar}. ${planarData[planar] ?? ""}`,
    `Light Cone: ${lightCone}. ${lightConeData[lightCone] ?? ""}`,
  ];

  if (notes) {
    summaryParts.push(`Trailblazer notes: ${notes}`);
  }

  summarySection.hidden = false;
  summaryText.textContent = summaryParts.join(" ");
  optimalityText.textContent = `Optimality Score: ${evaluation.score}/100 — ${evaluation.label}`;

  const portrait = recommendation.image ?? fallbackImage;
  summaryImage.src = portrait.src;
  summaryImage.alt = portrait.alt;
  summaryCaption.textContent = evaluation.caption;

  const mappedSources = [];
  const sourceLabels = {
    characters: "Character overview",
    relics: "Relic set details",
    planars: "Planar ornament details",
    lightCones: "Light cone overview",
  };
  const sourceRequests = [
    { type: "characters", key: character },
    { type: "relics", key: relic },
    { type: "planars", key: planar },
    { type: "lightCones", key: lightCone },
  ];

  sourceRequests.forEach(({ type, key }) => {
    if (!key) {
      return;
    }
    const entry = buildSources?.[type]?.[key];
    if (entry?.sourceUrl) {
      const linkText = entry.sourceLabel ?? `${sourceLabels[type] ?? "Build reference"} – ${key}`;
      mappedSources.push({ url: entry.sourceUrl, text: linkText });
    }
  });

  if (summarySources && summarySourcesList) {
    if (mappedSources.length > 0) {
      mappedSources.forEach(({ url, text }) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.textContent = text;
        listItem.appendChild(anchor);
        summarySourcesList.appendChild(listItem);
      });
      summarySources.hidden = false;
    } else {
      summarySources.hidden = true;
    }
  }
}

function evaluateBuild({ recommendation, relic, planar, lightCone }) {
  const bestRelics = recommendation.bestRelics ?? [];
  const bestPlanars = recommendation.bestPlanars ?? [];
  const bestLightCones = recommendation.bestLightCones ?? [];

  let score = 60;
  const insights = [];

  if (bestRelics.includes(relic)) {
    score += 15;
    insights.push("Relic choice aligns with top recommendations.");
  } else {
    insights.push("Consider relics that boost this character's core strengths.");
  }

  if (bestPlanars.includes(planar)) {
    score += 15;
    insights.push("Planar ornament synergy is excellent.");
  } else {
    insights.push("Explore planar ornaments that match their speed or break needs.");
  }

  if (bestLightCones.includes(lightCone)) {
    score += 10;
    insights.push("Light cone choice reinforces their combat role.");
  } else {
    insights.push("Swap to a path-aligned light cone for better results.");
  }

  score = Math.min(100, Math.max(40, score));

  let label = "Needs Refinement";
  if (score >= 90) {
    label = "Outstanding";
  } else if (score >= 80) {
    label = "Excellent";
  } else if (score >= 70) {
    label = "Great";
  } else if (score >= 60) {
    label = "Solid";
  }

  const caption = insights.join(" ");

  return { score, label, caption };
}
