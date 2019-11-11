let instrument;
let color;
const currentColor = document.getElementById('current');
const previousColor = document.getElementById('previous');
const button3232 = document.getElementById('button3232');
const button256256 = document.getElementById('button256256');
const button44 = document.getElementById('button44');
const li44 = document.getElementById('li44');
const li3232 = document.getElementById('li3232');
const li256256 = document.getElementById('li256256');
const full = document.getElementById('full');
const mainContainer = document.getElementById('main_container');

function paintingCanvas44() {
  const canvas = document.getElementById('can44');
  const ctx = canvas.getContext('2d');
  const array44Colors = [
    ['blue', 'yellow', 'yellow', 'blue'],
    ['yellow', 'orange', 'orange', 'yellow'],
    ['yellow', 'orange', 'orange', 'yellow'],
    ['blue', 'yellow', 'yellow', 'blue'],
  ];
  const unit = 64;
  for (let i = 0; i < array44Colors.length; i++) {
    for (let j = 0; j < array44Colors.length; j++) {
      ctx.fillStyle = array44Colors[i][j];
      ctx.fillRect(j * unit, i * unit, unit, unit);
    }
  }
}

function paintingCanvas3232() {
  const canvas = document.getElementById('can3232');
  const ctx = canvas.getContext('2d');
  const unit = 8;
  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
      if ((i + j) % 2 === 0) { ctx.fillStyle = 'orange'; } else { ctx.fillStyle = 'green'; }
      ctx.fillRect(j * unit, i * unit, unit, unit);
    }
  }
}

function chooseCanvas(id, propertyDisplay) {
  const carouselItem = document.getElementsByClassName('carousel_item');
  for (let n = 0; n < carouselItem.length; n++) {
    carouselItem[n].style.display = 'none';
  }
  id.style.display = propertyDisplay;
}

function markSizeButtonAsActive(idButton) {
  const sizeBox = document.getElementsByClassName('size');
  for (let i = 0; i < sizeBox.length; i++) {
    sizeBox[i].classList.remove('active');
  }
  idButton.classList.add('active');
}

function chooseInstrument() {
  const instrumentBox = document.getElementsByClassName('instrument_box');
  const instruments = document.getElementById('instruments');
  instruments.addEventListener('click', (event) => {
    if (event.target.localName === 'div' || event.target.localName === 'img') {
      instrument = event.target.innerText;
      for (let i = 0; i < instrumentBox.length; i++) {
        instrumentBox[i].classList.remove('active');
      }
      event.target.parentNode.classList.add('active');
    }
  });
}

function chooseColorBox() {
  const colorBox = document.getElementsByClassName('color');
  const colorPalette = document.getElementById('color_palette');
  colorPalette.addEventListener('click', (event) => {
    if (event.target.id !== 'color_palette') {
      color = getComputedStyle(event.target.firstChild.nextSibling).backgroundColor;
      for (let i = 0; i < colorBox.length; i++) {
        colorBox[i].classList.remove('active');
      }
      event.target.classList.add('active');
    }
  });
}

function addCanvasEventListeners(id) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  let xStart;
  let xFinish;
  let yStart;
  let yFinish;
  function paint(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.fillStyle = color;
    ctx.fillRect(0.6 * x, 0.6 * y, 5, 5);
    ctx.fill();
  }

  function moveStart(event) {
    ctx.beginPath();
    xStart = event.clientX - canvas.offsetLeft;
    yStart = event.clientY - canvas.offsetTop;
    ctx.moveTo(xStart, yStart);
    ctx.strokeStyle = color;
    ctx.lineWidth = '5';
  }

  function moveEnd(event) {
    xFinish = event.clientX - canvas.offsetLeft;
    yFinish = event.clientY - canvas.offsetTop;
    ctx.lineTo(xFinish, yFinish);
    ctx.lineCap = 'butt';
    ctx.stroke();
  }

  function chooseColor(event) {
    const x = 0.6 * event.offsetX;
    const y = 0.6 * event.offsetY;
    const imgData = ctx.getImageData(x, y, 1, 1).data;
    const R = imgData[0];
    const G = imgData[1];
    const B = imgData[2];
    const rgb = `${R},${G},${B}`;
    previousColor.style.background = currentColor.style.background;
    currentColor.style.background = `RGB(${rgb})`;
  }

  canvas.onmousedown = function () {
    if (instrument === 'Pencil') {
      paint(event);
      canvas.onmousemove = function () {
        paint(event);
      };
    }
    if (instrument === 'Move') {
      moveStart(event);
    }
    if (instrument === 'Choose color') {
      chooseColor(event);
    }
  };

  canvas.onmouseup = function () {
    if (instrument === 'Move') {
      moveEnd(event);
    }
    canvas.onmousemove = null;
  };
}

function addDivEventListeners() {
  const divContainer = document.getElementById('li256256');
  let xStart;
  let yStart;
  let xFinish;
  let yFinish;

  function moveDivStart(event) {
    const divEvent = event.target;
    divEvent.ondragstart = function () {
      return false;
    };
    divEvent.style.position = 'relative';
    divEvent.style.zIndex = 1000;
    xStart = event.pageX;
    yStart = event.pageY;
  }

  function moveDivFinish(event) {
    xFinish = event.pageX;
    yFinish = event.pageY;
    const xWay = xFinish - xStart;
    const yWay = yFinish - yStart;
    const divEvent = event.target;
    divEvent.ondragstart = function () {
      return false;
    };
    if (divEvent.classList.left === undefined) {
      divEvent.classList.left = 0;
      divEvent.classList.top = 0;
    }
    divEvent.style.left = `${parseFloat(divEvent.classList.left) + xWay}px`;
    divEvent.style.top = `${parseFloat(divEvent.classList.top) + yWay}px`;
  }

  divContainer.onclick = function (event) {
    const divEvent = event.target;
    if (instrument === 'Paint bucket') {
      divEvent.style.background = color;
    }
    if (instrument === 'Transform') {
      divEvent.classList.toggle('circle');
    }
    if (instrument === 'Choose color') {
      previousColor.style.background = currentColor.style.background;
      currentColor.style.background = getComputedStyle(divEvent).backgroundColor;
    }
  };

  divContainer.onmousedown = function (event) {
    if (instrument === 'Move') {
      moveDivStart(event);
    }
  };

  divContainer.onmouseup = function (event) {
    if (instrument === 'Move') {
      moveDivFinish(event);
    }
  };
}

button44.onclick = function () {
  chooseCanvas(li44, 'flex');
  markSizeButtonAsActive(button44);
  paintingCanvas44();
  addCanvasEventListeners('can44');
  chooseInstrument();
  chooseColorBox();
};

button3232.onclick = function () {
  chooseCanvas(li3232, 'flex');
  markSizeButtonAsActive(button3232);
  paintingCanvas3232();
  addCanvasEventListeners('can3232');
  chooseInstrument();
  chooseColorBox();
};

button256256.onclick = function () {
  chooseCanvas(li256256, 'grid');
  markSizeButtonAsActive(button256256);
  addDivEventListeners();
  chooseInstrument();
  chooseColorBox();
};

full.onclick = function () {
  mainContainer.requestFullscreen();
};

// let x = event.pageX - this.offsetLeft;
// let y = event.pageY - this.offsetTop;
// let left = event.clientX - canvas.left
