'use strict';
let ImgArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
  'usb']
  ;

let count = 25;
let firstImageIndex = 0;
let secondImageIndex = 0;
let thirdImageIndex = 0;
const section = document.getElementById('images');
const firstImage = document.getElementById('firstImage');
const secondImage = document.getElementById('secondImage');
const thirdImage = document.getElementById('thirdImage');
document.getElementById('result');


function Obj(name) {
  this.name = name;
  if (name === 'usb') {
    this.img = `/img/${name}.gif`;
  }
  else if (name === 'sweep') {
    this.img = `/img/${name}.png`;
  } else {
    this.img = `./img/${name}.jpg`;
  }
  this.NumberOfClicks = 0;
  this.show= 0;
  Obj.all.push(this);
}


Obj.all = [];
Obj.counter = 0;



for (let i = 0; i < ImgArray.length; i++) {
  new Obj(ImgArray[i]);
}



function render() {
  let firstIndex;
  let secondIndex;
  let thirdIndex;



  firstIndex = randomNumber(0, Obj.all.length - 1);
  firstImage.src = Obj.all[firstIndex].img;
  firstImage.alt = Obj.all[firstIndex].name;
  firstImageIndex = firstIndex;


  do {
    secondIndex = randomNumber(0, Obj.all.length - 1);
  } while (firstIndex === secondIndex || secondIndex === thirdIndex);

  secondImage.src = Obj.all[secondIndex].img;
  secondImage.alt = Obj.all[secondIndex].name;
  secondImageIndex = secondIndex;



  do {
    thirdIndex = randomNumber(0, Obj.all.length - 1);
  } while (firstIndex === thirdIndex || thirdIndex === secondIndex);
  thirdImage.src = Obj.all[thirdIndex].img;
  thirdImage.alt = Obj.all[thirdIndex].name;
  thirdImageIndex = thirdIndex;

  Obj.all[firstIndex].show++;
  Obj.all[secondIndex].show++;
  Obj.all[thirdIndex].show++;
}


function handleClick(event) {
  if (Obj.counter < count) {
    const clickedElement = event.target;
    if (clickedElement.id === 'firstImage' || clickedElement.id === 'secondImage' || clickedElement.id === 'thirdImage') {
      if (clickedElement.id === 'firstImage') {
        Obj.all[firstImageIndex].NumberOfClicks++;
      }
      if (clickedElement.id === 'secondImage') {
        Obj.all[secondImageIndex].NumberOfClicks++;
      }
      if (clickedElement.id === 'thirdImage') {
        Obj.all[thirdImageIndex].NumberOfClicks++;
      }
    }
    Obj.counter++;
    render();
  }
  if (Obj.counter === count) {
    document.getElementById('result');
    section.removeEventListener('click', handleClick);
  }
}

section.addEventListener('click', handleClick);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let buttonClick = 0;

render();
document.getElementById('result').addEventListener('click', function () {
  buttonClick = buttonClick + 1;
  const container = document.getElementById('Results');
  const ulElement = document.createElement('ul');
  container.appendChild(ulElement);
  for (let index = 0; index < Obj.length; index++) {
    const liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = (`${ImgArray[index]} had ${Obj.all[index].clicks} votes, and was seen ${Obj.all[index].show} times.`);

  }

  if (buttonClick >= 1) {
    document.getElementById('result');
  }

});
