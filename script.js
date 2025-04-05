const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

let bgChoice = 1;
let charX = 200;
let charY = 300;

const images = {
  bg1: new Image(),
  bg2: new Image(),
  bg3: new Image(),
  character: new Image(),
  sun: new Image(),
  cloud: new Image(),
  tree: new Image()
};

images.bg1.src = "https://i.imgur.com/dZ9m3Xr.jpg"; // Beach
images.bg2.src = "https://i.imgur.com/Fz3ZEtT.jpg"; // Forest
images.bg3.src = "https://i.imgur.com/hF6sF2Y.jpg"; // Space
images.character.src = "https://i.imgur.com/0Xsl3xl.png"; // Character
images.sun.src = "https://i.imgur.com/5Z6bD3K.png";
images.cloud.src = "https://i.imgur.com/5TCOIgk.png";
images.tree.src = "https://i.imgur.com/wfgcMzH.png";

// Sound effects
const sounds = [
  new Audio("https://www.soundjay.com/buttons/button-09.mp3"),
  new Audio("https://www.soundjay.com/buttons/button-4.mp3"),
  new Audio("https://www.soundjay.com/buttons/button-10.mp3")
];

function playSound(index) {
  sounds[index].play();
}

function drawScene() {
  // Background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const bgImg = images[`bg${bgChoice}`];
  if (bgImg.complete) ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Character
  if (images.character.complete) ctx.drawImage(images.character, charX, charY, 60, 60);

  // Items
  if (document.getElementById("item1").checked && images.sun.complete) {
    ctx.drawImage(images.sun, 450, 20, 100, 100);
  }
  if (document.getElementById("item2").checked && images.cloud.complete) {
    ctx.drawImage(images.cloud, 100, 50, 120, 60);
  }
  if (document.getElementById("item3").checked && images.tree.complete) {
    ctx.drawImage(images.tree, 50, 240, 80, 140);
  }
}

function update() {
  drawScene();
  requestAnimationFrame(update);
}

document.querySelectorAll('input[name="bg"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    bgChoice = parseInt(e.target.value);
  });
});

document.getElementById("positionSlider").addEventListener("input", (e) => {
  charX = parseInt(e.target.value);
});

["item1", "item2", "item3"].forEach(id => {
  document.getElementById(id).addEventListener("change", drawScene);
});

window.onload = () => {
  drawScene();
  update();
};
