const moodButtons =
  document.querySelectorAll(
    ".mood-button"
  );

const growButton =
  document.querySelector(
    "#grow-button"
  );

const intensitySlider =
  document.querySelector(
    "#intensity"
  );

const intensityValue =
  document.querySelector(
    "#intensity-value"
  );

const message =
  document.querySelector(
    "#message"
  );

const plantCountText =
  document.querySelector(
    "#plant-count"
  );

const plantsLayer =
  document.querySelector(
    "#plants-layer"
  );

const emptyMessage =
  document.querySelector(
    "#empty-message"
  );


let selectedMood = null;

let plantCount = 0;


/* =========================
   MOOD SETTINGS
========================= */

const moods = {

  calm: {

    flower: "#B9D8D0",

    leaf: "#94AD98",

    stem: "#78947D",

    sway: "6s",

    message:
      "A quiet feeling has taken root."

  },


  happy: {

    flower: "#F0BCC5",

    leaf: "#91B587",

    stem: "#73966E",

    sway: "3.8s",

    message:
      "A little happiness is blooming."

  },


  tired: {

    flower: "#C6B9C5",

    leaf: "#909A8D",

    stem: "#7C887A",

    sway: "8s",

    message:
      "This plant is taking its time."

  },


  anxious: {

    flower: "#DBB2C2",

    leaf: "#82A493",

    stem: "#688A75",

    sway: "1.8s",

    message:
      "A restless feeling found a place to grow."

  },


  excited: {

    flower: "#F3AEB8",

    leaf: "#7FAE78",

    stem: "#6D9668",

    sway: "2.2s",

    message:
      "Energy is growing in your garden."

  }

};


/* =========================
   SELECT MOOD
========================= */

moodButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        moodButtons.forEach(
          (item) => {
            item.classList.remove(
              "selected"
            );
          }
        );

        button.classList.add(
          "selected"
        );

        selectedMood =
          button.dataset.mood;

        message.textContent =
          `${capitalize(selectedMood)} is ready to grow.`;

      }
    );

  }
);


/* =========================
   INTENSITY
========================= */

intensitySlider.addEventListener(
  "input",
  () => {

    intensityValue.textContent =
      `${intensitySlider.value} / 5`;

  }
);


/* =========================
   GROW
========================= */

growButton.addEventListener(
  "click",
  () => {

    if (!selectedMood) {

      message.textContent =
        "Choose a mood before planting it.";

      return;

    }


    const intensity =
      Number(
        intensitySlider.value
      );


    growPlant(
      selectedMood,
      intensity
    );

  }
);


/* =========================
   CREATE PLANT
========================= */

function growPlant(
  mood,
  intensity
) {

  const settings =
    moods[mood];


  const plant =
    document.createElement(
      "div"
    );


  plant.className =
    "garden-plant";


  /*
    Random position.

    Leave some space around
    the edges of the garden.
  */

  const x =
    8
    +
    Math.random()
    * 84;


  /*
    Different plants sit
    at slightly different
    depths in the garden.
  */

  const bottom =
    38
    +
    Math.random()
    * 55;


  /*
    Intensity influences size.
  */

  const intensityScale =
    0.72
    +
    intensity
    * 0.09;


  /*
    Add some natural variation.
  */

  const randomScale =
    0.88
    +
    Math.random()
    * 0.22;


  const finalScale =
    intensityScale
    *
    randomScale;


  const stemHeight =
    120
    +
    intensity
    * 16
    +
    Math.random()
    * 30;


  plant.style.left =
    `${x}%`;

  plant.style.bottom =
    `${bottom}px`;

  plant.style.transform =
    `translateX(-50%) scale(${finalScale})`;


  plant.style.setProperty(
    "--flower",
    settings.flower
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
    "--sway-speed",
    settings.sway
  );

  plant.style.setProperty(
    "--stem-height",
    `${stemHeight}px`
  );


  plant.style.setProperty(
    "--flower-scale",
    0.8
    +
    intensity
    * 0.07
  );


  plant.innerHTML = `

    <div class="plant-inner">

      <div class="plant-stem">

        <div class="plant-flower">

          <div class="plant-petal p1"></div>

          <div class="plant-petal p2"></div>

          <div class="plant-petal p3"></div>

          <div class="plant-petal p4"></div>

          <div class="plant-center"></div>

        </div>


        <div class="plant-leaf left"></div>

        <div class="plant-leaf right"></div>

      </div>

    </div>

  `;


  plantsLayer.appendChild(
    plant
  );


  /*
    Hide empty-state message
    after the first plant.
  */

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
   HELPER
========================= */

function capitalize(text) {

  return (
    text.charAt(0).toUpperCase()
    +
    text.slice(1)
  );

}