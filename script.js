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
}

document.addEventListener("DOMContentLoaded", () => {
  attachListeners();
});
