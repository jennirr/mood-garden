const moodButtons = document.querySelectorAll(".mood-button");
const growButton = document.querySelector("#grow-button");
const intensitySlider = document.querySelector("#intensity");

const message = document.querySelector("#message");

const plant = document.querySelector("#plant");
const stem = document.querySelector(".stem");
const flower = document.querySelector(".flower");

const petals = document.querySelectorAll(".petal");
const leaves = document.querySelectorAll(".leaf");


let selectedMood = null;


/* -------------------------
   Mood settings
------------------------- */

const moodSettings = {

  calm: {
    flower: "#b7d9d0",
    leaf: "#91ad98",
    stem: "#78967d",
    height: 220,
    flowerScale: 0.95,
    animationSpeed: 6,
    message: "Your garden is growing quietly today."
  },

  happy: {
    flower: "#f0c5cb",
    leaf: "#94b58a",
    stem: "#78996f",
    height: 240,
    flowerScale: 1.15,
    animationSpeed: 3.5,
    message: "Your garden feels warm and open today."
  },

  tired: {
    flower: "#c7b9c5",
    leaf: "#89988a",
    stem: "#788478",
    height: 180,
    flowerScale: 0.8,
    animationSpeed: 8,
    message: "Your garden is taking things slowly today."
  },

  anxious: {
    flower: "#d8b5c4",
    leaf: "#7fa38f",
    stem: "#688a74",
    height: 245,
    flowerScale: 0.85,
    animationSpeed: 1.5,
    message: "Your garden feels a little restless today."
  },

  excited: {
    flower: "#f2b0b9",
    leaf: "#7eaf79",
    stem: "#6d976a",
    height: 260,
    flowerScale: 1.3,
    animationSpeed: 1.8,
    message: "Your garden is full of energy today."
  }

};


/* -------------------------
   Select mood
------------------------- */

moodButtons.forEach((button) => {

  button.addEventListener("click", () => {

    moodButtons.forEach((item) => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedMood = button.dataset.mood;

    message.textContent =
      `You selected ${selectedMood}. Adjust the intensity, then grow your plant.`;
  });

});


/* -------------------------
   Grow plant
------------------------- */

growButton.addEventListener("click", () => {

  /*
    Error handling:
    user presses Grow before selecting a mood.
  */

  if (!selectedMood) {

    message.textContent =
      "Choose a mood first, then grow your plant.";

    return;
  }


  const settings = moodSettings[selectedMood];

  const intensity = Number(intensitySlider.value);


  /*
    Intensity changes how strongly
    the selected mood affects the plant.
  */

  const intensityFactor =
    0.85 + intensity * 0.05;


  /* Stem */

  stem.style.height =
    `${settings.height * intensityFactor}px`;

  stem.style.background =
    settings.stem;


  /* Leaves */

  leaves.forEach((leaf) => {

    leaf.style.background =
      settings.leaf;

  });


  /* Flower */

  petals.forEach((petal) => {

    petal.style.background =
      settings.flower;

  });


  flower.style.transform =
    `translateX(-50%) scale(${settings.flowerScale * intensityFactor})`;


  /* Movement */

  plant.style.animation =
    `sway ${settings.animationSpeed}s ease-in-out infinite`;


  /* Feedback */

  message.textContent =
    `${settings.message} Mood intensity: ${intensity}/5.`;

});