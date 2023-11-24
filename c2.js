//----------Input word changer
let inputText = document.getElementById("Welcome");
let hehe = [
  "heh, are you stuck?",
  "hey now...",
  "could you not",
  "I'm trying to help",
  "stop!",
  "seriously",
  "OKOK HERE",
  "",
];
let i = 0;
let time = 0;

function check() {
  inputText.addEventListener("keyup", function () {
    if (inputText.value.includes("OKOK")) {
      document.getElementById("dropDown").style.display = "flex";
    }
    if (
      !inputText.value.includes("oh hello") ||
      !inputText.value.includes(hehe[i])
    ) {
      time++;
      if (time % 7 === 0) {
        inputText.value = hehe[i];
        if (i < hehe.length - 1) {
          i++;
        }
      }
    }
  });
}
check();

//-------------Draggable elements from W3Schools (Modified to also apply to mobile and only work in a specified area)
// Make the DIV element draggable:
dragElement(
  document.getElementById("cat1"),
  -5000,
  window.innerHeight + 20,
  5000,
  window.innerHeight * 2 - 20
);
dragElement(
  document.getElementById("cat2"),
  -5000,
  window.innerHeight + 20,
  5000,
  window.innerHeight * 2 - 20
);
dragElement(
  document.getElementById("cat3"),
  -5000,
  window.innerHeight + 20,
  5000,
  window.innerHeight * 2 - 20
);
dragElement(
  document.getElementById("cat4"),
  -5000,
  window.innerHeight + 20,
  5000,
  window.innerHeight * 2 - 20
);
dragElement(
  document.getElementById("cat5"),
  -5000,
  window.innerHeight + 20,
  5000,
  window.innerHeight * 2 - 20
);

function dragElement(elmnt, minX, minY, maxX, maxY) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    document.getElementById(elmnt.id + "header").addEventListener("touchstart", dragMouseDown);
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    elmnt.addEventListener("touchstart", dragMouseDown);
  }

  function dragMouseDown(e) {
    e = e || window.event; //deprecated but things broke without it :(
    e.preventDefault();
    // get the touch or mouse position at startup:
    pos3 = e.clientX || e.touches[0].clientX;
    pos4 = e.clientY || e.touches[0].clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event; //deprecated but things broke without it :(
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - (e.clientX || e.touches[0].clientX);
    pos2 = pos4 - (e.clientY || e.touches[0].clientY);
    pos3 = e.clientX || e.touches[0].clientX;
    pos4 = e.clientY || e.touches[0].clientY;
    
    let leftmargin = elmnt.offsetLeft - pos1; // calculate margin left
    let topmargin = elmnt.offsetTop - pos2; // calculate margin top

    if (leftmargin > minX && leftmargin + elmnt.offsetWidth < maxX) { //margin left within boundaries
      elmnt.style.left = leftmargin + "px";
    }

    if (topmargin > minY && topmargin + elmnt.offsetHeight < maxY) { //margin top within boundaries
      elmnt.style.top = topmargin + "px";
    }
  }

  function closeDragElement() {
    // stop moving when the mouse button or touch is released:
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

//-------------Text changer only after certain location
let text = [
  "hi again",
  "you're not supposed to be here",
  "no, you can't change this text",
  "it's okay",
  "it's peaceful here",
  "stay for as long as you'd like",
  "",
  "here",
];
let elem = document.getElementById("changeText");
let counter = 0;
let inst;

//intersection observer API
function change(entries) {
  if (entries[0].isIntersecting) {
    inst = setInterval(updateText, 3500);
    observer.disconnect();
  } else {
    clearInterval(inst);
  }
}

function updateText() {
  if (counter < text.length - 1) {
    elem.innerHTML = text[counter];
  } else {
    elem.innerHTML = `<a href="https://drive.google.com/drive/folders/1FbNXsuYPL2DAb7U4DjeEvQQuPQo-Z2WP?usp=sharing" target="_blank">${text[counter]}</a>`;
    clearInterval(inst);
  }

  counter++;
  if (counter >= text.length) {
    counter = 0;
  }
}

const observer = new IntersectionObserver(change, { threshold: 1 });
observer.observe(elem);

//Created by Ren Yuan (Modified to react to mouse input)
let starry = function (p) {
  let agents = new Array(30);

  class Agent extends c2.Point {
    constructor(isMouseAgent = false) {
      let x, y;
      if (isMouseAgent) {
        x = p.mouseX;
        y = p.mouseY;
      } else {
        x = p.random(p.windowWidth);
        y = p.random(p.windowHeight);
      }
      super(x, y);

      this.vx = p.random(-2, 2);
      this.vy = p.random(-2, 2);
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) {
        this.x = 0;
        this.vx *= -1;
      } else if (this.x > p.windowWidth) {
        this.x = p.windowWidth;
        this.vx *= -1;
      }
      if (this.y < 0) {
        this.y = 0;
        this.vy *= -1;
      } else if (this.y > p.windowHeight) {
        this.y = p.windowHeight;
        this.vy *= -1;
      }
    }

    updatePosition(x, y) {
      this.x = x;
      this.y = y;
    }

    display() {
      p.stroke("white");
      p.strokeWeight(5);
      p.point(this.x, this.y);
    }
  }

  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('canvasContainer');
    p.colorMode(p.HSL, 360, 100, 100);

    for (let i = 0; i < agents.length - 1; i++) {
      agents[i] = new Agent();
    }
    agents[agents.length - 1] = new Agent(true);
  };

  p.draw = function () {
    p.background("#1a1d27");

    agents[agents.length - 1].updatePosition(p.mouseX, p.mouseY);

    let voronoi = new c2.Voronoi();
    voronoi.compute(agents);
    let regions = voronoi.regions;

    let rectangle = new c2.Rect(0, 0, p.windowWidth, p.windowHeight);

    let maxArea = 0;
    let minArea = Number.POSITIVE_INFINITY;
    for (let i = 0; i < regions.length; i++) {
      let clip = rectangle.clip(regions[i]);
      if (clip != null) regions[i] = clip;

      let area = regions[i].area();
      if (area < minArea) minArea = area;
      if (area > maxArea) maxArea = area;
    }

    for (let i = 0; i < regions.length; i++) {
      /*let t = p.norm(regions[i].area(), minArea, maxArea);
            let red = 30 + 20 * t; // Adjust the range of red component
            let green = 30 + 20 * t; // Adjust the range of green component
            let c = p.color(red, green, 30 + 50 * t);*/
      let c = p.color(0, 0, 0, 0);
      if (i === regions.length - 1) {
        p.stroke("white");
        p.strokeWeight(2);
        c = p.color("#bf2e56");
        drawPolygon(regions[i].vertices, c);
      } else {
        p.stroke(0, 0, 0, 0);
        drawPolygon(regions[i].vertices, c);
      }
    }

    for (let i = 0; i < agents.length; i++) {
      agents[i].display();
      agents[i].update();
    }

    p.fill("#1a1d27");
    p.ellipse(
      p.windowWidth / 2,
      p.windowHeight,
      p.windowWidth * 1.2,
      p.windowHeight / 1.9
    );
    p.text("Continue");
  };

  function drawPolygon(vertices, c) {
    p.fill(c);
    p.beginShape();
    for (let v of vertices) p.vertex(v.x, v.y);
    p.endShape(p.CLOSE);
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};
let starryp5 = new p5(starry);

//---------blank canvas for structure
let blank = function (p) {
  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0, p.windowHeight);
    canvas.parent('canvasContainer');
    // p.noStroke();
    p.background("#1a1d27");
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};
let blankp5 = new p5(blank);

//Created by Ren Yuan
let waves = function (p) {
  let perlin = new c2.Perlin();

  let row = 15;
  let col = 10;
  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0, p.windowHeight * 2);
    canvas.parent('canvasContainer');
    p.colorMode(p.HSL, 360, 100, 100);
  };

  p.draw = function () {
    p.background("#1a1d27");
    let start = p.frameCount * 0.01;

    p.stroke("#333333");
    p.strokeWeight(1);
    for (let i = 0; i < row; i++) {
      let t = p.norm(i, 0, row);
      let c = p.color(30 * t, 30 + 30 * t, 20 + 70 * t);
      p.fill(c);
      p.beginShape();
      for (let j = 0; j < col; j++) {
        let x = p.map(j, 0, col - 1, 0, p.windowWidth);
        let y =
          p.map(i, 0, row, p.windowHeight / 3, p.windowHeight) +
          (perlin.noise(start + j * 0.1, start + i * 0.04) - 0.5) *
            p.windowHeight;
        p.vertex(x, y);
      }
      p.vertex(p.windowWidth, p.windowHeight);
      p.vertex(0, p.windowHeight);
      p.endShape(p.CLOSE);
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};
let wavesp5 = new p5(waves);
