const moodButtons = document.querySelectorAll(".mood-button");
const growButton = document.querySelector("#grow-button");
const intensitySlider = document.querySelector("#intensity");
const intensityValue = document.querySelector("#intensity-value");

const message = document.querySelector("#message");
const plantCountText = document.querySelector("#plant-count");
const plantsLayer = document.querySelector("#plants-layer");
const emptyMessage = document.querySelector("#empty-message");

let selectedMood = null;
let plantCount = 0;


/* =========================
   INTENSITY
========================= */

const intensityLabels = {
  1: "Low",
  2: "Medium",
  3: "High"
};

const intensityScaleMap = {
  1: 0.88,
  2: 1.00,
  3: 1.12
};


/* =========================
   MOOD SETTINGS
========================= */

const moods = {

  calm: {
    flower: "#A9D5D1",
    flowerLight: "#D8ECE8",
    leaf: "#91AD98",
    stem: "#78937D",
    center: "#E1C77F",
    speed: {
      1: "9s",
      2: "7s",
      3: "5.8s"
    },
    lean: 0,
    leafAngle: 8,
    flowerScale: 0.92,
    message: "A quiet feeling has taken root."
  },

  happy: {
    flower: "#F2C5CB",
    flowerLight: "#F8DDE1",
    leaf: "#94B589",
    stem: "#769970",
    center: "#E6C06C",
    speed: {
      1: "6s",
      2: "4.5s",
      3: "3.5s"
    },
    lean: 0,
    leafAngle: -5,
    flowerScale: 1.08,
    message: "A little happiness is blooming."
  },

  tired: {
    flower: "#BEB3C8",
    flowerLight: "#DDD5E2",
    leaf: "#89968A",
    stem: "#788278",
    center: "#C7AE84",
    speed: {
      1: "11s",
      2: "9s",
      3: "7.5s"
    },
    lean: 7,
    leafAngle: 28,
    flowerScale: 0.90,
    message: "This feeling is resting for a while."
  },

  anxious: {
    flower: "#D9AFC0",
    flowerLight: "#E9CED8",
    leaf: "#7FA291",
    stem: "#688A77",
    center: "#D3B47D",
    speed: {
      1: "3s",
      2: "2s",
      3: "1.25s"
    },
    lean: -3,
    leafAngle: 18,
    flowerScale: 0.88,
    message: "A restless feeling found room to grow."
  },

  excited: {
    flower: "#F2AEB8",
    flowerLight: "#FFD2D8",
    leaf: "#7EAE78",
    stem: "#6B9568",
    center: "#EABD59",
    speed: {
      1: "3.5s",
      2: "2.5s",
      3: "1.7s"
    },
    lean: 0,
    leafAngle: -10,
    flowerScale: 1.15,
    message: "Energy is spreading through your garden."
  }

};


/* =========================
   GARDEN SLOTS
========================= */

function createGardenSlots() {

  const slots = [];

  const rows = [
    {
      bottom: 92,
      scale: 0.74,
      z: 2,
      xValues: [8, 18, 28, 38, 48, 58, 68, 78, 88]
    },

    {
      bottom: 56,
      scale: 0.88,
      z: 4,
      xValues: [4, 14, 24, 34, 44, 54, 64, 74, 84, 94]
    },

    {
      bottom: 20,
      scale: 1.02,
      z: 6,
      xValues: [8, 18, 28, 38, 48, 58, 68, 78, 88]
    }
  ];

  rows.forEach((row) => {

    row.xValues.forEach((x) => {

      slots.push({
        x,
        bottom: row.bottom,
        depthScale: row.scale,
        z: row.z
      });

    });

  });

  return shuffle(slots);
}


let availableSlots = createGardenSlots();


/* =========================
   MOOD SELECT
========================= */

moodButtons.forEach((button) => {

  button.addEventListener("click", () => {

    moodButtons.forEach((item) => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedMood = button.dataset.mood;

    message.textContent =
      `${capitalize(selectedMood)} is ready to grow.`;

  });

});


/* =========================
   INTENSITY
========================= */

intensitySlider.addEventListener("input", () => {

  const intensity = Number(intensitySlider.value);

  intensityValue.textContent =
    intensityLabels[intensity];

});


/* =========================
   GROW
========================= */

growButton.addEventListener("click", () => {

  if (!selectedMood) {

    message.textContent =
      "Choose a mood before planting it.";

    return;

  }

  const intensity =
    Number(intensitySlider.value);

  growPlant(
    selectedMood,
    intensity
  );

});


/* =========================
   CREATE PLANT
========================= */

function growPlant(mood, intensity) {

  const settings = moods[mood];

  if (availableSlots.length === 0) {
    availableSlots = createGardenSlots();
  }

  const slot = availableSlots.pop();

  const plant =
    document.createElement("div");

  plant.className =
    `garden-plant ${mood}-plant`;


  const xJitter =
    randomBetween(-1.3, 1.3);

  const bottomJitter =
    randomBetween(-4, 4);

  const naturalVariation =
    randomBetween(0.96, 1.04);

  const finalScale =
    slot.depthScale
    *
    intensityScaleMap[intensity]
    *
    naturalVariation;


  plant.style.left =
    `${slot.x + xJitter}%`;

  plant.style.bottom =
    `${slot.bottom + bottomJitter}px`;

  plant.style.zIndex =
    slot.z;

  plant.style.setProperty(
    "--plant-scale",
    finalScale
  );

  plant.style.setProperty(
    "--flower",
    settings.flower
  );

  plant.style.setProperty(
    "--flower-light",
    settings.flowerLight
  );

  plant.style.setProperty(
    "--leaf",
    settings.leaf
  );

  plant.style.setProperty(
    "--stem",
    settings.stem
  );

  plant.style.setProperty(
    "--center",
    settings.center
  );

  plant.style.setProperty(
    "--sway-speed",
    settings.speed[intensity]
  );

  plant.style.setProperty(
    "--lean",
    `${settings.lean}deg`
  );

  plant.style.setProperty(
    "--leaf-angle",
    `${settings.leafAngle}deg`
  );

  plant.style.setProperty(
    "--flower-scale",
    settings.flowerScale
    *
    intensityScaleMap[intensity]
  );

  plant.style.setProperty(
    "--growth-level",
    intensity
  );


  const saturationMap = {
    1: 0.88,
    2: 1.0,
    3: 1.1
  };

  plant.style.filter =
    `saturate(${saturationMap[intensity]})`;


  plant.innerHTML =
    getPlantTemplate(
      mood,
      intensity
    );


  plantsLayer.appendChild(
    plant
  );


  emptyMessage.style.opacity =
    "0";

  plantCount += 1;

  plantCountText.textContent =
    `${plantCount} ${
      plantCount === 1
        ? "plant"
        : "plants"
    } growing`;

  message.textContent =
    `${settings.message} Intensity: ${intensityLabels[intensity]}.`;

}


/* =========================
   UNIFIED PLANT TEMPLATE
========================= */

function getPlantTemplate(mood, intensity) {

  const extraLeaf =
    intensity === 3
      ? `
        <span class="leaf extra-left"></span>
        <span class="leaf extra-right"></span>
      `
      : "";


  const sideFlower =
    mood === "excited" && intensity === 3
      ? `
        <div class="side-flower side-left">
          ${makePetals(5)}
          <i></i>
        </div>
      `
      : "";


  return `
    <div class="plant-motion">

      <div class="stem">

        <div class="flower">

          ${makePetals(
            mood === "happy"
              ? 6
              : mood === "excited"
                ? 7
                : 5
          )}

          <i></i>

        </div>

        ${sideFlower}

        <span class="leaf leaf-left"></span>
        <span class="leaf leaf-right"></span>

        ${extraLeaf}

      </div>

    </div>
  `;
}


/* =========================
   PETALS
========================= */

function makePetals(count) {

  let petals = "";

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const angle =
      360
      /
      count
      *
      i;

    petals += `
      <span
        class="petal"
        style="
          transform:
            translate(-50%, -100%)
            rotate(${angle}deg);
        "
      ></span>
    `;

  }

  return petals;
}


/* =========================
   HELPERS
========================= */

function capitalize(text) {

  return (
    text.charAt(0).toUpperCase()
    +
    text.slice(1)
  );

}


function randomBetween(min, max) {

  return (
    min
    +
    Math.random()
    *
    (max - min)
  );

}


function shuffle(array) {

  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random()
        *
        (i + 1)
      );

    [
      copy[i],
      copy[j]
    ]
    =
    [
      copy[j],
      copy[i]
    ];
  }

  return copy;
}