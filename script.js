import * as THREE from "three";

import {
  OrbitControls
} from "three/addons/controls/OrbitControls.js";


/* ==================================================
   UI
================================================== */

const container =
  document.querySelector(
    "#garden-canvas"
  );

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

const emptyMessage =
  document.querySelector(
    "#empty-message"
  );


let selectedMood = null;

let plantCount = 0;


/* ==================================================
   INTENSITY
================================================== */

const intensityLabels = {
  1: "Low",
  2: "Medium",
  3: "High"
};


const intensityScale = {
  1: 0.82,
  2: 1.0,
  3: 1.18
};


/* ==================================================
   MOOD SETTINGS
================================================== */

const moods = {

  calm: {
    flower: 0xa9d5d1,
    leaf: 0x8eaf98,
    stem: 0x718d79,
    center: 0xe1c77f,

    message:
      "A quiet feeling has taken root."
  },


  happy: {
    flower: 0xf3c769,
    leaf: 0x8fb27f,
    stem: 0x73966d,
    center: 0xae7e43,

    message:
      "A little happiness is blooming."
  },


  tired: {
    flower: 0xb8adc4,
    leaf: 0x879488,
    stem: 0x747f75,
    center: 0xc4aa80,

    message:
      "This feeling is resting for a while."
  },


  anxious: {
    flower: 0xd6a8bb,
    leaf: 0x789c8a,
    stem: 0x668575,
    center: 0xc79e76,

    message:
      "A restless feeling found room to grow."
  },


  excited: {
    flower: 0xf0a7b3,
    leaf: 0x79aa72,
    stem: 0x668e63,
    center: 0xe6b950,

    message:
      "Energy is spreading through your garden."
  }

};


/* ==================================================
   THREE.JS SCENE
================================================== */

const scene =
  new THREE.Scene();


scene.background =
  new THREE.Color(
    0xf6f2ea
  );


scene.fog =
  new THREE.Fog(
    0xf6f2ea,
    14,
    26
  );


/* ==================================================
   CAMERA
================================================== */

const camera =
  new THREE.PerspectiveCamera(
    38,

    container.clientWidth
      /
      container.clientHeight,

    0.1,

    100
  );


camera.position.set(
  8.5,
  7.2,
  11.5
);


/* ==================================================
   RENDERER
================================================== */

const renderer =
  new THREE.WebGLRenderer({
    antialias: true
  });


renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);


renderer.setSize(
  container.clientWidth,
  container.clientHeight
);


renderer.shadowMap.enabled =
  true;


renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;


renderer.outputColorSpace =
  THREE.SRGBColorSpace;


renderer.toneMapping =
  THREE.ACESFilmicToneMapping;


renderer.toneMappingExposure =
  1.05;


container.prepend(
  renderer.domElement
);


/* ==================================================
   ORBIT CONTROLS
================================================== */

const controls =
  new OrbitControls(
    camera,
    renderer.domElement
  );


controls.target.set(
  0,
  1.2,
  0
);


controls.enableDamping =
  true;


controls.dampingFactor =
  0.06;


controls.enablePan =
  false;


controls.minDistance =
  8;


controls.maxDistance =
  18;


controls.minPolarAngle =
  Math.PI * 0.20;


controls.maxPolarAngle =
  Math.PI * 0.47;


controls.update();


/* ==================================================
   LIGHTING
================================================== */

const hemisphereLight =
  new THREE.HemisphereLight(
    0xfff7ea,
    0x91a889,
    2
  );


scene.add(
  hemisphereLight
);


const sunlight =
  new THREE.DirectionalLight(
    0xfff0d0,
    3
  );


sunlight.position.set(
  -6,
  10,
  6
);


sunlight.castShadow =
  true;


sunlight.shadow.mapSize.set(
  2048,
  2048
);


sunlight.shadow.camera.left =
  -12;

sunlight.shadow.camera.right =
  12;

sunlight.shadow.camera.top =
  12;

sunlight.shadow.camera.bottom =
  -12;


scene.add(
  sunlight
);


/* ==================================================
   MATERIAL HELPER
================================================== */

function makeMaterial(
  color,
  roughness = 0.82
) {

  return new THREE.MeshStandardMaterial({
    color: color,

    roughness: roughness,

    metalness: 0
  });

}


/* ==================================================
   GROUND
================================================== */

const ground =
  new THREE.Mesh(

    new THREE.CircleGeometry(
      9,
      96
    ),

    makeMaterial(
      0xcbd7bd,
      0.95
    )
  );


ground.rotation.x =
  -Math.PI / 2;


ground.scale.set(
  1.3,
  1,
  0.85
);


ground.receiveShadow =
  true;


scene.add(
  ground
);


/* ==================================================
   SOFT HILLS
================================================== */

function createHill(
  x,
  z,
  scale,
  color
) {

  const hill =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        1.8,
        32,
        18
      ),

      makeMaterial(
        color,
        1
      )
    );


  hill.position.set(
    x,
    -1.4,
    z
  );


  hill.scale.set(
    scale * 2.2,
    0.65,
    scale
  );


  hill.receiveShadow =
    true;


  scene.add(
    hill
  );

}


createHill(
  -4.5,
  2.8,
  1.4,
  0xdfe7d4
);


createHill(
  4.5,
  2,
  1.5,
  0xd1ddc6
);


createHill(
  0,
  -3,
  1.8,
  0xbdceb2
);


/* ==================================================
   STEM
================================================== */

function createStem(
  height,
  radius,
  color
) {

  const stem =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        radius,
        radius * 1.1,
        height,
        10
      ),

      makeMaterial(
        color,
        0.9
      )
    );


  stem.position.y =
    height / 2;


  stem.castShadow =
    true;


  return stem;
}


/* ==================================================
   LEAF
================================================== */

function createLeaf(
  color,
  scale = 1
) {

  const leaf =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.42,
        18,
        12
      ),

      makeMaterial(
        color,
        0.85
      )
    );


  leaf.scale.set(
    1.5 * scale,
    0.18 * scale,
    0.58 * scale
  );


  leaf.castShadow =
    true;


  return leaf;
}


/* ==================================================
   ROUND LEAF
================================================== */

function createRoundLeaf(
  color,
  scale = 1
) {

  const leaf =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.32,
        18,
        14
      ),

      makeMaterial(
        color,
        0.85
      )
    );


  leaf.scale.set(
    1.15 * scale,
    0.25 * scale,
    scale
  );


  leaf.castShadow =
    true;


  return leaf;
}


/* ==================================================
   PETAL
================================================== */

function createPetal(
  color
) {

  const petal =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.38,
        20,
        14
      ),

      makeMaterial(
        color,
        0.75
      )
    );


  petal.scale.set(
    0.62,
    0.28,
    1.25
  );


  petal.castShadow =
    true;


  return petal;
}


/* ==================================================
   FLOWER
================================================== */

function createFlower(
  flowerColor,
  centerColor,
  petalCount = 6,
  size = 1
) {

  const flower =
    new THREE.Group();


  for (
    let i = 0;
    i < petalCount;
    i++
  ) {

    const angle =
      i
      /
      petalCount
      *
      Math.PI
      *
      2;


    const petal =
      createPetal(
        flowerColor
      );


    petal.scale.multiplyScalar(
      size
    );


    petal.position.set(
      Math.cos(angle)
        *
        0.36
        *
        size,

      0,

      Math.sin(angle)
        *
        0.36
        *
        size
    );


    petal.rotation.y =
      -angle;


    flower.add(
      petal
    );

  }


  const center =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.26 * size,
        20,
        14
      ),

      makeMaterial(
        centerColor,
        0.75
      )
    );


  center.scale.y =
    0.65;


  center.castShadow =
    true;


  flower.add(
    center
  );


  return flower;
}


/* ==================================================
   CALM
   Rounded eucalyptus-like plant
================================================== */

function createCalmPlant(
  intensity
) {

  const colors =
    moods.calm;


  const group =
    new THREE.Group();


  const height =
    1.65
    +
    intensity
    *
    0.25;


  const stem =
    createStem(
      height,
      0.055,
      colors.stem
    );


  group.add(
    stem
  );


  const numberOfPairs =
    2
    +
    intensity;


  for (
    let i = 0;
    i < numberOfPairs;
    i++
  ) {

    const y =
      0.5
      +
      i
      *
      0.35;


    const left =
      createRoundLeaf(
        colors.leaf,
        0.9
      );


    left.position.set(
      -0.28,
      y,
      0
    );


    left.rotation.z =
      -0.25;


    group.add(
      left
    );


    const right =
      createRoundLeaf(
        colors.leaf,
        0.9
      );


    right.position.set(
      0.28,
      y + 0.12,
      0
    );


    right.rotation.z =
      0.25;


    group.add(
      right
    );

  }


  const flower =
    createFlower(
      colors.flower,
      colors.center,
      5,
      0.65
    );


  flower.position.y =
    height + 0.05;


  group.add(
    flower
  );


  return group;
}


/* ==================================================
   HAPPY
   Big open flower
================================================== */

function createHappyPlant(
  intensity
) {

  const colors =
    moods.happy;


  const group =
    new THREE.Group();


  const height =
    1.8
    +
    intensity
    *
    0.32;


  group.add(
    createStem(
      height,
      0.065,
      colors.stem
    )
  );


  const flower =
    createFlower(
      colors.flower,
      colors.center,
      8,
      1.0
      +
      intensity
      *
      0.08
    );


  flower.position.y =
    height + 0.05;


  group.add(
    flower
  );


  const left =
    createLeaf(
      colors.leaf,
      1
    );


  left.position.set(
    -0.4,
    height * 0.45,
    0
  );


  left.rotation.z =
    -0.35;


  group.add(
    left
  );


  const right =
    createLeaf(
      colors.leaf,
      1
    );


  right.position.set(
    0.4,
    height * 0.62,
    0
  );


  right.rotation.z =
    0.35;


  group.add(
    right
  );


  return group;
}


/* ==================================================
   TIRED
   Drooping plant
================================================== */

function createTiredPlant(
  intensity
) {

  const colors =
    moods.tired;


  const group =
    new THREE.Group();


  const height =
    1.55
    +
    intensity
    *
    0.22;


  const stem =
    createStem(
      height,
      0.06,
      colors.stem
    );


  stem.rotation.z =
    0.15;


  stem.position.x =
    0.12;


  group.add(
    stem
  );


  const flower =
    createFlower(
      colors.flower,
      colors.center,
      5,
      0.82
    );


  flower.position.set(
    0.28,
    height - 0.02,
    0
  );


  flower.rotation.z =
    -0.7;


  flower.rotation.x =
    0.35;


  group.add(
    flower
  );


  const leaf1 =
    createLeaf(
      colors.leaf,
      0.9
    );


  leaf1.position.set(
    -0.28,
    height * 0.43,
    0
  );


  leaf1.rotation.z =
    -0.75;


  group.add(
    leaf1
  );


  const leaf2 =
    createLeaf(
      colors.leaf,
      0.8
    );


  leaf2.position.set(
    0.35,
    height * 0.28,
    0
  );


  leaf2.rotation.z =
    0.8;


  group.add(
    leaf2
  );


  return group;
}


/* ==================================================
   ANXIOUS
   Thin lavender-like plant
================================================== */

function createAnxiousPlant(
  intensity
) {

  const colors =
    moods.anxious;


  const group =
    new THREE.Group();


  const height =
    1.95
    +
    intensity
    *
    0.38;


  group.add(
    createStem(
      height,
      0.035,
      colors.stem
    )
  );


  const pairs =
    3
    +
    intensity;


  for (
    let i = 0;
    i < pairs;
    i++
  ) {

    const y =
      0.45
      +
      i
      *
      0.30;


    const left =
      createLeaf(
        colors.leaf,
        0.55
      );


    left.scale.z *=
      0.45;


    left.position.set(
      -0.28,
      y,
      0
    );


    left.rotation.z =
      -0.35;


    group.add(
      left
    );


    const right =
      createLeaf(
        colors.leaf,
        0.55
      );


    right.scale.z *=
      0.45;


    right.position.set(
      0.28,
      y + 0.13,
      0
    );


    right.rotation.z =
      0.35;


    group.add(
      right
    );

  }


  const flowerCluster =
    new THREE.Group();


  const count =
    5
    +
    intensity
    *
    2;


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const bloom =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          0.1,
          12,
          10
        ),

        makeMaterial(
          colors.flower,
          0.8
        )
      );


    const angle =
      i * 1.7;


    bloom.position.set(
      Math.cos(angle)
        *
        0.13,

      i
        *
        0.095,

      Math.sin(angle)
        *
        0.13
    );


    bloom.castShadow =
      true;


    flowerCluster.add(
      bloom
    );

  }


  flowerCluster.position.y =
    height;


  group.add(
    flowerCluster
  );


  return group;
}


/* ==================================================
   EXCITED
   Branching multi-flower plant
================================================== */

function createExcitedPlant(
  intensity
) {

  const colors =
    moods.excited;


  const group =
    new THREE.Group();


  const height =
    1.85
    +
    intensity
    *
    0.32;


  group.add(
    createStem(
      height,
      0.055,
      colors.stem
    )
  );


  const topFlower =
    createFlower(
      colors.flower,
      colors.center,
      7,
      0.92
    );


  topFlower.position.y =
    height;


  group.add(
    topFlower
  );


  const branchCount =
    intensity;


  for (
    let i = 0;
    i < branchCount;
    i++
  ) {

    const direction =
      i % 2 === 0
        ? -1
        : 1;


    const branchHeight =
      0.75
      +
      i
      *
      0.42;


    const branchLength =
      0.72;


    const branch =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          0.03,
          0.04,
          branchLength,
          8
        ),

        makeMaterial(
          colors.stem,
          0.9
        )
      );


    branch.rotation.z =
      direction
      *
      -0.85;


    branch.position.set(
      direction
        *
        0.22,

      branchHeight,

      0
    );


    branch.castShadow =
      true;


    group.add(
      branch
    );


    const smallFlower =
      createFlower(
        colors.flower,
        colors.center,
        6,
        0.62
      );


    smallFlower.position.set(
      direction
        *
        0.52,

      branchHeight
        +
        0.28,

      0
    );


    group.add(
      smallFlower
    );

  }


  const left =
    createLeaf(
      colors.leaf,
      0.9
    );


  left.position.set(
    -0.35,
    height * 0.35,
    0
  );


  left.rotation.z =
    -0.4;


  group.add(
    left
  );


  const right =
    createLeaf(
      colors.leaf,
      0.9
    );


  right.position.set(
    0.35,
    height * 0.53,
    0
  );


  right.rotation.z =
    0.4;


  group.add(
    right
  );


  return group;
}


/* ==================================================
   FACTORY
================================================== */

function createMoodPlant(
  mood,
  intensity
) {

  if (mood === "calm") {
    return createCalmPlant(
      intensity
    );
  }


  if (mood === "happy") {
    return createHappyPlant(
      intensity
    );
  }


  if (mood === "tired") {
    return createTiredPlant(
      intensity
    );
  }


  if (mood === "anxious") {
    return createAnxiousPlant(
      intensity
    );
  }


  return createExcitedPlant(
    intensity
  );

}


/* ==================================================
   PLANT POSITIONS
================================================== */

const gardenPositions = [];


for (
  let z = -3.4;
  z <= 3.4;
  z += 1.6
) {

  for (
    let x = -5;
    x <= 5;
    x += 1.7
  ) {

    gardenPositions.push({

      x:
        x
        +
        randomBetween(
          -0.2,
          0.2
        ),

      z:
        z
        +
        randomBetween(
          -0.18,
          0.18
        )

    });

  }

}


shuffle(
  gardenPositions
);


let positionIndex = 0;


/* ==================================================
   PLANT STORAGE
================================================== */

const plants = [];


/* ==================================================
   GROW PLANT
================================================== */

function growPlant(
  mood,
  intensity
) {

  if (
    positionIndex
    >=
    gardenPositions.length
  ) {

    message.textContent =
      "Your garden is full for now.";

    return;
  }


  const plant =
    createMoodPlant(
      mood,
      intensity
    );


  const position =
    gardenPositions[
      positionIndex
    ];


  positionIndex += 1;


  plant.position.set(
    position.x,
    0.03,
    position.z
  );


  plant.rotation.y =
    randomBetween(
      -0.3,
      0.3
    );


  const targetScale =
    intensityScale[
      intensity
    ]
    *
    randomBetween(
      0.93,
      1.06
    );


  plant.scale.setScalar(
    0.01
  );


  plant.userData = {

    mood:
      mood,

    intensity:
      intensity,

    targetScale:
      targetScale,

    born:
      performance.now(),

    phase:
      Math.random()
      *
      Math.PI
      *
      2

  };


  scene.add(
    plant
  );


  plants.push(
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
    `${moods[mood].message} Intensity: ${intensityLabels[intensity]}.`;

}


/* ==================================================
   MOOD BUTTONS
================================================== */

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


/* ==================================================
   INTENSITY
================================================== */

intensitySlider.addEventListener(
  "input",
  () => {

    const value =
      Number(
        intensitySlider.value
      );


    intensityValue.textContent =
      intensityLabels[
        value
      ];

  }
);


/* ==================================================
   GROW BUTTON
================================================== */

growButton.addEventListener(
  "click",
  () => {

    if (
      !selectedMood
    ) {

      message.textContent =
        "Choose a mood before growing a plant.";

      return;
    }


    growPlant(
      selectedMood,

      Number(
        intensitySlider.value
      )
    );

  }
);


/* ==================================================
   ANIMATION
================================================== */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const elapsed =
    clock.getElapsedTime();


  const now =
    performance.now();


  plants.forEach(
    (plant) => {

      /* Growth */

      const age =
        (
          now
          -
          plant.userData.born
        )
        /
        900;


      const growth =
        Math.min(
          age,
          1
        );


      const eased =
        1
        -
        Math.pow(
          1 - growth,
          3
        );


      const target =
        plant.userData.targetScale;


      plant.scale.setScalar(
        Math.max(
          0.01,
          target
          *
          eased
        )
      );


      /* Mood animation */

      const mood =
        plant.userData.mood;


      let speed = 0.7;

      let amount = 0.015;


      if (mood === "calm") {

        speed = 0.5;

        amount = 0.012;

      }


      if (mood === "happy") {

        speed = 0.85;

        amount = 0.02;

      }


      if (mood === "tired") {

        speed = 0.3;

        amount = 0.008;

      }


      if (mood === "anxious") {

        speed = 3;

        amount = 0.026;

      }


      if (mood === "excited") {

        speed = 1.6;

        amount = 0.035;

      }


      plant.rotation.z =
        Math.sin(
          elapsed
          *
          speed
          +
          plant.userData.phase
        )
        *
        amount;

    }
  );


  controls.update();


  renderer.render(
    scene,
    camera
  );

}


animate();


/* ==================================================
   RESIZE
================================================== */

window.addEventListener(
  "resize",
  () => {

    const width =
      container.clientWidth;


    const height =
      container.clientHeight;


    camera.aspect =
      width
      /
      height;


    camera.updateProjectionMatrix();


    renderer.setSize(
      width,
      height
    );

  }
);


/* ==================================================
   HELPERS
================================================== */

function randomBetween(
  min,
  max
) {

  return (
    min
    +
    Math.random()
    *
    (
      max
      -
      min
    )
  );

}


function shuffle(
  array
) {

  for (
    let i =
      array.length - 1;

    i > 0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random()
        *
        (
          i + 1
        )
      );


    [
      array[i],
      array[j]
    ]
    =
    [
      array[j],
      array[i]
    ];

  }


  return array;
}


function capitalize(
  text
) {

  return (
    text.charAt(0)
      .toUpperCase()
    +
    text.slice(1)
  );

}