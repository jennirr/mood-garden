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
   MOOD SETTINGS
========================= */

const moods = {

  calm: {
    flower: "#AFCFD0",
    flowerLight: "#DCE9E5",
    leaf: "#8FAE98",
    stem: "#789680",
    center: "#DCC98D",
    sway: "6s",
    message: "A quiet feeling has taken root."
  },

  happy: {
    flower: "#F2BFC8",
    flowerLight: "#F8DDE1",
    leaf: "#95B985",
    stem: "#759B70",
    center: "#E7C46D",
    sway: "3.8s",
    message: "A little happiness is blooming."
  },

  tired: {
    flower: "#BEB4C6",
    flowerLight: "#DED7E1",
    leaf: "#89968A",
    stem: "#778278",
    center: "#C5AE84",
    sway: "8s",
    message: "This plant is taking things slowly."
  },

  anxious: {
    flower: "#D8AABC",
    flowerLight: "#E8C8D3",
    leaf: "#78A08D",
    stem: "#638675",
    center: "#D7BB7F",
    sway: "1.25s",
    message: "A restless feeling found a place to grow."
  },

  excited: {
    flower: "#F4A9B5",
    flowerLight: "#FFD2D8",
    leaf: "#79AD73",
    stem: "#659162",
    center: "#E9BD58",
    sway: "1.8s",
    message: "Energy is growing in your garden."
  }

};


/* =========================
   MOOD SELECTION
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

  intensityValue.textContent =
    `${intensitySlider.value} / 5`;

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
   PLANT TEMPLATE
========================= */

function getPlantTemplate(mood) {

  /*
    Each mood uses a different structure,
    so the plant can be recognised
    by shape as well as colour.
  */

  if (mood === "calm") {

    return `
      <div class="plant-inner calm-inner">

        <div class="stem calm-stem">

          <div class="flower calm-flower">
            <span class="petal p1"></span>
            <span class="petal p2"></span>
            <span class="petal p3"></span>
            <span class="petal p4"></span>
            <span class="petal p5"></span>
            <span class="flower-center"></span>
          </div>

          <span class="leaf calm-leaf left"></span>
          <span class="leaf calm-leaf right"></span>

        </div>

      </div>
    `;
  }


  if (mood === "happy") {

    return `
      <div class="plant-inner happy-inner">

        <div class="stem happy-stem">

          <div class="flower happy-flower">
            <span class="petal p1"></span>
            <span class="petal p2"></span>
            <span class="petal p3"></span>
            <span class="petal p4"></span>
            <span class="petal p5"></span>
            <span class="petal p6"></span>
            <span class="flower-center"></span>
          </div>

          <span class="leaf happy-leaf left"></span>
          <span class="leaf happy-leaf right"></span>

        </div>

      </div>
    `;
  }


  if (mood === "tired") {

    return `
      <div class="plant-inner tired-inner">

        <div class="stem tired-stem">

          <div class="flower tired-flower">
            <span class="petal p1"></span>
            <span class="petal p2"></span>
            <span class="petal p3"></span>
            <span class="petal p4"></span>
            <span class="flower-center"></span>
          </div>

          <span class="leaf tired-leaf left"></span>
          <span class="leaf tired-leaf right"></span>

        </div>

      </div>
    `;
  }


  if (mood === "anxious") {

    return `
      <div class="plant-inner anxious-inner">

        <div class="stem anxious-stem">

          <div class="flower anxious-flower">
            <span class="petal p1"></span>
            <span class="petal p2"></span>
            <span class="petal p3"></span>
            <span class="petal p4"></span>
            <span class="flower-center"></span>
          </div>

          <span class="leaf anxious-leaf left leaf-1"></span>
          <span class="leaf anxious-leaf right leaf-2"></span>

          <span class="leaf anxious-leaf left leaf-3"></span>
          <span class="leaf anxious-leaf right leaf-4"></span>

        </div>

      </div>
    `;
  }


  if (mood === "excited") {

    return `
      <div class="plant-inner excited-inner">

        <div class="stem excited-stem">

          <div class="flower excited-flower main-flower">
            <span class="petal p1"></span>
            <span class="petal p2"></span>
            <span class="petal p3"></span>
            <span class="petal p4"></span>
            <span class="petal p5"></span>
            <span class="petal p6"></span>
            <span class="petal p7"></span>
            <span class="petal p8"></span>
            <span class="flower-center"></span>
          </div>

          <div class="mini-flower mini-left">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <i></i>
          </div>

          <div class="mini-flower mini-right">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <i></i>
          </div>

          <span class="leaf excited-leaf left"></span>
          <span class="leaf excited-leaf right"></span>

        </div>

      </div>
    `;
  }

}


/* =========================
   GROW PLANT
========================= */

function growPlant(mood, intensity) {

  const settings = moods[mood];

  const plant =
    document.createElement("div");

  plant.className =
    `garden-plant ${mood}-plant`;


  /* -------------------------
     POSITION
  ------------------------- */

  const x =
    7 + Math.random() * 86;

  const bottom =
    35 + Math.random() * 50;


  /* -------------------------
     SCALE
  ------------------------- */

  const intensityScale =
    0.72 + intensity * 0.08;

  const naturalVariation =
    0.90 + Math.random() * 0.18;

  const finalScale =
    intensityScale *
    naturalVariation;


  plant.style.left =
    `${x}%`;

  plant.style.bottom =
    `${bottom}px`;

  plant.style.setProperty(
    "--plant-scale",
    finalScale
  );


  /* -------------------------
     COLOURS
  ------------------------- */

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
    settings.sway
  );


  /* -------------------------
     INTENSITY VARIABLES
  ------------------------- */

  plant.style.setProperty(
    "--intensity",
    intensity
  );

  plant.style.setProperty(
    "--height-extra",
    `${intensity * 5}px`
  );

  plant.style.setProperty(
    "--flower-extra",
    1 + intensity * 0.035
  );


  /* -------------------------
     TEMPLATE
  ------------------------- */

  plant.innerHTML =
    getPlantTemplate(mood);


  plantsLayer.appendChild(
    plant
  );


  /* -------------------------
     FEEDBACK
  ------------------------- */

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
    settings.message;

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