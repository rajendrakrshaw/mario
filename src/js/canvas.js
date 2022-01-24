import platform from "../img/platform.png";
import hills from "../img/hills.png";
import background from "../img/background.png";
import platformSmallTall from "../img/platformSmallTall.png";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
const gravity = 1;
class Player {
  constructor() {
    this.speed = 10
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    //else
    //   this.velocity.y = 0
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    //this.width = image.width
    //this.height = image.height
    this.width = 580;
    this.height = 125;
    console.log(image.width);
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    //this.width = image.width
    //this.height = image.height
    this.width = 580;
    this.height = 125;
    console.log(image.width);
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function creatImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

let player = new Player();
//const platform = new Platform()

let platforms = [
  // new Platform({
  //   x: -1,
  //   y: 470,
  //   image: creatImage(platform),
  // }),
  // new Platform({
  //   x: 577,
  //   y: 470,
  //   image: creatImage(platform),
  // }),
  // new Platform({
  //   x: 2 * 577 + 100,
  //   y: 470,
  //   image: creatImage(platform),
  // }),
];

let genericObjects = [
  // new GenericObject({
  //   x: -1,
  //   y: -1,
  //   image: creatImage(background),
  // }),
  // new GenericObject({
  //   x: -1,
  //   y: -1,
  //   image: creatImage(hills),
  // }),
];

let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;
function init() {
  player = new Player();
  //const platform = new Platform()

  platforms = [
    
    new Platform({
      x: -1,
      y: 470,
      image: creatImage(platform),
    }),
    new Platform({
      x: 577,
      y: 470,
      image: creatImage(platform),
    }),
    new Platform({
      x: 2 * 577 + 100,
      y: 470,
      image: creatImage(platform),
    }),
    new Platform({
      x: 3 * 577 + 300,
      y: 470,
      image: creatImage(platform),
    }),
    new Platform({
      x: 4 * 577 ,
      y: 470,
      image: creatImage(platform),
    }),
    new Platform({
      x: 5 * 577 - 291 ,
      y: 245,
      image: creatImage(platformSmallTall),
    }),
    new Platform({
      x: 5 * 577 + 600 ,
      y: 470,
      image: creatImage(platform),
    }),
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: creatImage(background),
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: creatImage(hills),
    }),
  ];
  scrollOffset = 0;
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  //c.clearRect(0, 0, canvas.width, canvas.height)
  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (keys.left.pressed && player.position.x > 100 || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed*.65;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed*.65;
      });
    }
  }
  //platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  //win condition
  if (scrollOffset > 5 * 577 + 600) {
    console.log("you win");
  }
  //lose condition
  if (player.position.y > canvas.height) {
    init();
  }
}
init();
animate();

addEventListener("keydown", ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;
    case 87:
      console.log("up");
      //player.velocity.y -= 20;
      break;
  }
});
